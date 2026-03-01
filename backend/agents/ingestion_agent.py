import google.generativeai as genai
import json
import re
from typing import List, Dict
from agents import MODEL_NAME


def map_text_to_pages(full_text: str, page_texts: list):
    """
    Maps character offsets in full_text to page numbers.
    Returns list of page ranges.
    """
    mappings = []
    cursor = 0

    for page_num, page_text in enumerate(page_texts):
        if not page_text or not page_text.strip():
            continue

        start = full_text.find(page_text, cursor)

        # 🔒 SAFETY GUARD (non-breaking)
        if start == -1:
            continue

        end = start + len(page_text)
        mappings.append({
            "page_number": page_num + 1,  # 1-based indexing
            "start_char": start,
            "end_char": end,
            "page_text": page_text
        })

        cursor = end

    return mappings


def build_policy_clauses(policy_text: str, page_texts: list = None) -> list:
    """
    Extract clauses with page number + character offsets.
    Existing complexity preserved.
    """

    clauses = []

    # ---------- PAGE MAPPING (OPTIONAL) ----------
    page_mappings = []
    if page_texts:
        page_mappings = map_text_to_pages(policy_text, page_texts)

    # ---------- EXISTING CLAUSE SPLITTING ----------
    separators = ["\n\n", ".", ";"]
    raw_clauses = []
    buffer = ""

    for ch in policy_text:
        buffer += ch
        if any(buffer.endswith(sep) for sep in separators):
            raw_clauses.append(buffer.strip())
            buffer = ""

    if buffer.strip():
        raw_clauses.append(buffer.strip())

    clause_id = 1
    cursor = 0

    for clause_text in raw_clauses:
        start_char = policy_text.find(clause_text, cursor)
        if start_char == -1:
            continue

        end_char = start_char + len(clause_text)
        cursor = end_char

        # ---------- PAGE LOOKUP ----------
        page_number = None
        if page_mappings:
            for page in page_mappings:
                if start_char >= page["start_char"] and end_char <= page["end_char"]:
                    page_number = page["page_number"]
                    break

        clauses.append({
            "id": f"clause_{clause_id}",
            "text": clause_text,
            "page_number": page_number,
            "start_char": start_char,
            "end_char": end_char
        })

        clause_id += 1

    print(f"✅ Extracted {len(clauses)} clauses with offsets")
    return clauses


def extract_policy_keywords(policy_text: str) -> List[Dict]:
    """Generic keyword extraction - NO bank-specific terms"""
    generic_keywords = [
        'calendar days', 'months?', 'years?', 'not mandatory',
        'self-declaration', 'written confirmation',
        'next business day', 'tier-', 'pre-approved'
    ]

    clauses = []
    for kw_pattern in generic_keywords:
        matches = list(re.finditer(re.escape(kw_pattern), policy_text, re.IGNORECASE))
        for match in matches:
            start = max(0, match.start() - 150)
            end = min(len(policy_text), match.end() + 250)
            clauses.append({
                "id": f"kw_clause_{len(clauses)+1}",
                "text": policy_text[start:end],
                "section": f"KEYWORD-{kw_pattern.upper()}",
                "violations_detected": [kw_pattern]
            })

    return clauses


if __name__ == "__main__":
    test_text = (
        "KYC refresh every 36 months. "
        "STRs within 10 calendar days. "
        "OFAC screening not mandatory."
    )
    clauses = build_policy_clauses(test_text)
    print(f"Test: Extracted ALL {len(clauses)} clauses")