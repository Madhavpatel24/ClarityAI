from typing import List, Dict
import google.generativeai as genai
from agents import MODELNAME
import json

def link_policy_to_rbi(clauses: List[Dict], rbi_rules: List[Dict]) -> List[Dict]:
    """DYNAMIC linking based on input size"""
    print("🔗 Dynamic linking...")
    
    links = keyword_fallback(clauses, rbi_rules)
    
    # Scale AI usage by clause count
    if len(links) < len(clauses) * 1.5:  # Need more links?
        try:
            clauses_text = '\n'.join([f"{c['id']}: {c['text'][:200]}" for c in clauses[:15]])  # Limit context
            rbi_text = '\n'.join([f"{r['id']}: {r['text'][:200]}" for r in rbi_rules])
            
            model = genai.GenerativeModel(MODELNAME)
            target_links = min(len(clauses) * 2, 40)
            prompt = f"""POLICY CLAUSES: {clauses_text}
RBI RULES: {rbi_text}

Create {target_links} JSON links between clauses and rules.
Return ONLY valid JSON array:
[
  {{"policyid": "clauseX", "rbiid": "ruleY", "similarity": 0.85}},
  ...
]
"""
            
            resp = model.generate_content(prompt)
            ai_links_data = json.loads(resp.text.strip())
            
            for link_data in ai_links_data:
                policy_clause = next((c for c in clauses if c['id'] == link_data['policyid']), clauses[0])
                rbi_rule = next((r for r in rbi_rules if r['id'] == link_data['rbiid']), rbi_rules[0])
                links.append({
                    'policyid': link_data['policyid'],
                    'policytext': policy_clause['text'],
                    'rbiid': link_data['rbiid'],
                    'rbitext': rbi_rule['text'],
                    'similarity': link_data['similarity']
                })
        except Exception as e:
            print(f"AI linking failed: {e}")
    
    print(f"🔗 Created {len(links)} policy-RBI pairs")
    return links  # No hard limit

def keyword_fallback(clauses: List[Dict], rbi_rules: List[Dict]) -> List[Dict]:
    """
    PATCH: Prevent unrelated RBI rules from being compared.
    Existing functionality preserved.
    """

    CONTROL_TOPICS = {
        "kyc": ["kyc", "identity", "document", "ovd"],
        "edd": ["enhanced due diligence", "edd"],
        "str": ["str", "suspicious"],
        "pep": ["pep", "politically exposed"],
        "swift": ["swift", "wire"],
        "sanctions": ["sanctions", "ofac", "unsc"],
        "bo": ["beneficial owner", "ubo"],
        "monitoring": ["monitoring", "alerts"]
    }

    links = []

    for clause in clauses:
        clause_lower = clause["text"].lower()

        for rbi in rbi_rules:
            rbi_lower = rbi["text"].lower()

            # 🔒 NEW: require same compliance topic
            same_topic = False
            for terms in CONTROL_TOPICS.values():
                if any(t in clause_lower for t in terms) and any(t in rbi_lower for t in terms):
                    same_topic = True
                    break

            if not same_topic:
                continue

            links.append({
                "policyid": clause["id"],
                "policytext": clause["text"],
                "rbiid": rbi["id"],
                "rbitext": rbi["text"],
                "similarity": 0.15  # SAME VALUE AS BEFORE
            })

    return links
