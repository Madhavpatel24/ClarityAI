# CLARITY – AI Powered Compliance Analysis

CLARITY is a web application that analyzes financial policy documents and detects conflicts with RBI regulations using AI.

The system allows users to upload a policy document, automatically compare it with regulatory guidelines, detect compliance conflicts, classify their severity, and generate a downloadable audit report.

This helps financial institutions identify regulatory risks early and improve compliance review efficiency.

---

# How It Works

1. The user uploads a policy document (PDF or text).
2. The backend extracts clauses from the document.
3. AI agents compare the clauses with RBI regulatory guidelines.
4. Conflicts between the policy and regulations are detected.
5. Each conflict is assigned a severity level:
   - High
   - Medium
   - Low
6. The system generates a detailed compliance report.
7. The report can be viewed in the dashboard or downloaded as a PDF.

---

# Tech Stack

Frontend
- Next.js
- React
- Tailwind CSS
- TypeScript

Backend
- FastAPI
- Python
- SQLAlchemy
- JWT Authentication

AI / NLP
- Google Gemini API
- Document clause analysis
- Risk classification

Deployment
- Vercel (Frontend)
- Render (Backend)

---

# Project Structure

clarity-project
│
├── frontend
│   ├── app
│   ├── components
│   ├── hooks
│   ├── lib
│   └── styles
│
├── backend
│   ├── agents
│   ├── storage
│   ├── main.py
│   ├── database.py
│   └── requirements.txt
│
└── README.md

---

# Running the Project Locally

## 1. Clone the repository

git clone https://github.com/your-username/ClarityAI.git
cd ClarityAI

---

# Run Backend

Navigate to backend folder

cd backend

Create virtual environment

python -m venv venv

Activate environment

Mac/Linux

source venv/bin/activate

Windows

venv\Scripts\activate

Install dependencies

pip install -r requirements.txt

Start the FastAPI server

uvicorn main:app –reload

Backend will run on

http://localhost:8000

You can access API docs at

http://localhost:8000/docs

---

# Run Frontend

Open a new terminal and go to frontend folder

cd frontend

Install dependencies

npm install

Create `.env.local` file

NEXT_PUBLIC_API_URL=http://localhost:8000/api

Run the development server

npm run dev

Frontend will run on

http://localhost:3000

---

# Usage

1. Sign up or login.
2. Upload a policy document.
3. The system analyzes the document.
4. View detected compliance conflicts.
5. Download the generated audit report.

---

Demo: https://clarity-ai-murex.vercel.app/

