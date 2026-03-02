import os
import io
import json
import uuid
import time
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

import PyPDF2
import fitz  # PyMuPDF
from PyPDF2 import PdfMerger

from passlib.context import CryptContext
from jose import jwt, JWTError

from database import SessionLocal, AnalysisRecord, User, init_db
from agents.orchestrator import run_clarity
from fastapi.responses import FileResponse
from fastapi.responses import FileResponse

from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib import colors   # ✅ required

# ================== ENV ==================
load_dotenv()
STORAGE_DIR = "storage"
ORIGINALS_DIR = os.path.join(STORAGE_DIR, "originals")
REPORTS_DIR = os.path.join(STORAGE_DIR, "reports")

os.makedirs(ORIGINALS_DIR, exist_ok=True)
os.makedirs(REPORTS_DIR, exist_ok=True)

GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("❌ Add GOOGLE_API_KEY to .env!")


# ================== AUTH CONFIG ==================
SECRET_KEY = "super-secret-key-change-this"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str):
    return pwd_context.verify(password, hashed)


def create_access_token(user_id: str):
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    payload = {"sub": user_id, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    db = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    db.close()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


# ================== FASTAPI ==================
app = FastAPI(title="🚀 CLARITY - RBI Compliance")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://clarity-ai-murex.vercel.app", "http://localhost:3000"],  # Add your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()
UPLOAD_DIR = "stored_documents"
os.makedirs(UPLOAD_DIR, exist_ok=True)
print("💾 SQLite DB initialized")


# ================== PDF EXTRACTION ==================
def extract_pdf_text(pdf_file: UploadFile):
    pdf_bytes = pdf_file.file.read()
    pdf_file.file.seek(0)

    reader = PyPDF2.PdfReader(io.BytesIO(pdf_bytes))
    page_texts = [page.extract_text() or "" for page in reader.pages]

    return "\n\n".join(page_texts).strip(), page_texts


# ================== SIGNUP ==================
@app.post("/api/signup")
def signup(email: str = Form(...), password: str = Form(...)):
    db = SessionLocal()

    if db.query(User).filter(User.email == email).first():
        db.close()
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        id=str(uuid.uuid4()),
        email=email,
        hashed_password=hash_password(password)
    )

    db.add(user)
    db.commit()
    db.close()

    return {"status": "success"}


# ================== LOGIN ==================
@app.post("/api/login")
def login(email: str = Form(...), password: str = Form(...)):
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    db.close()

    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(user.id)

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# ================== ANALYZE (PROTECTED) ==================
@app.post("/api/analyze")
async def analyze_policy(
    current_user: User = Depends(get_current_user),
    policy_text: str = Form(None),
    policy_pdf: UploadFile = File(None)
):

    original_filename = None   # ✅ IMPORTANT (this was missing)

    # ================= PDF INPUT =================
    if policy_pdf and policy_pdf.filename:
        input_text, page_texts = extract_pdf_text(policy_pdf)
        input_type = f"PDF ({policy_pdf.filename})"

        # ✅ Save original uploaded file
        original_filename = f"{uuid.uuid4()}_{policy_pdf.filename}"
        original_path = os.path.join(ORIGINALS_DIR, original_filename)

        with open(original_path, "wb") as f:
            f.write(await policy_pdf.read())

        await policy_pdf.seek(0)

    # ================= TEXT INPUT =================
    elif policy_text:
        input_text = policy_text.strip()
        page_texts = None
        input_type = "Text"

    else:
        return {"status": "failed", "error": "Upload PDF or paste policy text"}

    # ================= RUN CLARITY =================
    start = time.time()
    result = run_clarity(input_text, page_texts)
    duration = time.time() - start

    db = SessionLocal()

    analysis_id = str(uuid.uuid4())

    record = AnalysisRecord(
        id=analysis_id,
        user_id=current_user.id,
        input_type=input_type,
        input_length=len(input_text),
        result_json=json.dumps(result),
        critical=result["summary"]["critical"],
        warnings=result["summary"]["warnings"],
        original_file=original_filename   # ✅ stored for PDF merge
    )

    db.add(record)
    db.commit()
    db.close()

    return {
        "status": "success",
        "firebase_id": analysis_id,
        "duration_seconds": round(duration, 1),
        "data": result
    }

def generate_report_pdf(analysis_id: str, result: dict):
    report_path = os.path.join(REPORTS_DIR, f"{analysis_id}_report.pdf")

    doc = SimpleDocTemplate(report_path, pagesize=A4)

    styles = {
        "title": ParagraphStyle(name="title", fontSize=18, spaceAfter=20, leading=22),
        "heading": ParagraphStyle(name="heading", fontSize=14, spaceAfter=10, leading=18),
        "body": ParagraphStyle(name="body", fontSize=10, spaceAfter=8, leading=14),
    }

    elements = []

    elements.append(Paragraph("<b>CLARITY Compliance Analysis Report</b>", styles["title"]))
    elements.append(Paragraph(f"Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}", styles["body"]))
    elements.append(Spacer(1, 12))

    summary = result.get("summary", {})
    elements.append(Paragraph("<b>Executive Summary</b>", styles["heading"]))
    elements.append(Paragraph(f"Critical Issues: {summary.get('critical',0)}", styles["body"]))
    elements.append(Paragraph(f"Warnings: {summary.get('warnings',0)}", styles["body"]))
    elements.append(Spacer(1, 20))

    for conflict in result.get("conflicts", []):
        severity = conflict.get("risk_category", "LOW")

        if "CRITICAL" in severity:
            color = "red"
        elif "MEDIUM" in severity:
            color = "orange"
        else:
            color = "green"

        elements.append(
            Paragraph(f"<font color='{color}'><b>{conflict['shorttitle']}</b></font>", styles["heading"])
        )

        elements.append(Paragraph(conflict["reason"], styles["body"]))
        elements.append(Spacer(1, 12))

    doc.build(elements)

    return report_path
    # ---------- MERGE SUMMARY + ANNOTATED ----------
    merged = fitz.open()

    summary_doc = fitz.open(summary_path)
    annotated_doc = fitz.open(annotated_path)

    merged.insert_pdf(summary_doc)
    merged.insert_pdf(annotated_doc)

    merged.save(final_path)

    summary_doc.close()
    annotated_doc.close()
    merged.close()

    return final_path
# ================== USER HISTORY ==================
@app.get("/api/history")
def get_history(current_user: User = Depends(get_current_user)):
    db = SessionLocal()

    records = db.query(AnalysisRecord)\
        .filter(AnalysisRecord.user_id == current_user.id)\
        .order_by(AnalysisRecord.created_at.desc())\
        .all()

    history = [{
        "firebase_id": r.id,
        "input_type": r.input_type,
        "critical": r.critical,
        "warnings": r.warnings,
        "createdAt": r.created_at.isoformat()
    } for r in records]

    db.close()

    return {"status": "success", "data": history}


# ================== HEALTH ==================
@app.get("/api/health")
def health():
    return {"status": "✅ READY", "database": "SQLite + Auth Enabled"}


# ================== ROOT ==================
@app.get("/", response_class=HTMLResponse)
def root():
    return "<h2>CLARITY Backend Running with Auth + SQLite ✅</h2>"

@app.get("/api/report/{analysis_id}")
def download_report(analysis_id: str, current_user: User = Depends(get_current_user)):
    db = SessionLocal()
    record = db.query(AnalysisRecord).filter(
        AnalysisRecord.id == analysis_id,
        AnalysisRecord.user_id == current_user.id
    ).first()
    db.close()

    if not record:
        raise HTTPException(status_code=404, detail="Report not found")

    result = json.loads(record.result_json)

    original_pdf_path = os.path.join(ORIGINALS_DIR, record.original_file)

    # Step 1 — generate CLARITY summary
    report_pdf = generate_report_pdf(analysis_id, result)

    # Step 2 — highlight original document
    annotated_pdf = highlight_conflicts(original_pdf_path, analysis_id, result)

    # Step 3 — merge both
    final_path = os.path.join(REPORTS_DIR, f"{analysis_id}_FINAL.pdf")

    merger = PdfMerger()
    merger.append(report_pdf)
    merger.append(annotated_pdf)
    merger.write(final_path)
    merger.close()

    return FileResponse(final_path, filename="CLARITY_Report.pdf")

@app.get("/api/original/{analysis_id}")
def download_original(
    analysis_id: str,
    current_user: User = Depends(get_current_user)
):
    db = SessionLocal()
    record = db.query(AnalysisRecord).filter(
        AnalysisRecord.id == analysis_id,
        AnalysisRecord.user_id == current_user.id
    ).first()

    if not record or not record.original_file:
        db.close()
        raise HTTPException(status_code=404, detail="File not found")

    file_path = os.path.join(ORIGINALS_DIR, record.original_file)
    db.close()

    return FileResponse(file_path)

def highlight_conflicts(original_pdf_path: str, analysis_id: str, result: dict):
    doc = fitz.open(original_pdf_path)

    for conflict in result.get("conflicts", []):
        text_to_find = conflict.get("policytext", "")[:100]

        for page in doc:
            areas = page.search_for(text_to_find)

            for rect in areas:
                highlight = page.add_highlight_annot(rect)

                severity = conflict.get("risk_category", "")
                if "CRITICAL" in severity:
                    highlight.set_colors(stroke=(1, 0, 0))
                elif "MEDIUM" in severity:
                    highlight.set_colors(stroke=(1, 0.6, 0))
                else:
                    highlight.set_colors(stroke=(0, 1, 0))

                highlight.update()

    highlighted_path = os.path.join(REPORTS_DIR, f"{analysis_id}_annotated.pdf")
    doc.save(highlighted_path)
    doc.close()

    return highlighted_path


@app.delete("/api/history/{analysis_id}")
def delete_analysis(
    analysis_id: str,
    current_user: User = Depends(get_current_user)
):
    db = SessionLocal()

    record = db.query(AnalysisRecord).filter(
        AnalysisRecord.id == analysis_id,
        AnalysisRecord.user_id == current_user.id
    ).first()

    if not record:
        db.close()
        raise HTTPException(status_code=404, detail="Report not found")

    # Optional: delete original file if stored
    if record.original_file:
        file_path = os.path.join(ORIGINALS_DIR, record.original_file)
        if os.path.exists(file_path):
            os.remove(file_path)

    db.delete(record)
    db.commit()
    db.close()

    return {"status": "deleted"}