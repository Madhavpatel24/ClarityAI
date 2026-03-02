import { AnalysisRequest, AnalysisResponse, AnalysisResult } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function analyzePolicy(formData: FormData) {
  const token = localStorage.getItem("clarity_token")

  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired → force login
      localStorage.removeItem("clarity_token")
      window.location.href = "/login"
      return
    }

    const err = await response.json()
    throw new Error(err.detail || "Analysis failed")
  }

  return response.json()
}
export function storeResultsInSession(results: AnalysisResult): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(`analysis_${results.firebase_id}`, JSON.stringify(results));
  }
}

export function getResultsFromSession(firebase_id: string): AnalysisResult | null {
  if (typeof window === 'undefined') return null;
  
  const stored = sessionStorage.getItem(`analysis_${firebase_id}`);
  return stored ? JSON.parse(stored) : null;
}

export function clearSessionResults(): void {
  if (typeof window !== 'undefined') {
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('analysis_')) {
        sessionStorage.removeItem(key);
      }
    });
  }
}

export function getHistoryFromSession(): Array<{ firebase_id: string; document_name: string; timestamp: string }> {
  if (typeof window === 'undefined') return [];
  
  const history: Array<{ firebase_id: string; document_name: string; timestamp: string }> = [];
  Object.keys(sessionStorage).forEach(key => {
    if (key.startsWith('analysis_')) {
      try {
        const data = JSON.parse(sessionStorage.getItem(key) || '{}');
        history.push({
          firebase_id: data.firebase_id,
          document_name: data.document_name,
          timestamp: data.analysis_timestamp,
        });
      } catch (e) {
        // Silently skip invalid entries
      }
    }
  });
  return history;
}
export async function fetchHistory() {
  const token = localStorage.getItem("clarity_token");

  if (!token) {
    throw new Error("User not logged in");
  }

  const res = await fetch(`${API_BASE_URL}/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // ✅ REQUIRED
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("clarity_token");
      window.location.href = "/login";
      return;
    }

    throw new Error("Failed to fetch history");
  }

  return res.json();
}

export async function deleteHistoryItem(id: string) {
  const token = localStorage.getItem("clarity_token");

  const res = await fetch(`${API_BASE_URL}/history/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete report");
  }

  return res.json();
}

export async function loginUser(email: string, password: string) {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);

  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    body: form, // ⚠️ DO NOT set headers for FormData
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Login failed");
  }

  return res.json();
}

export async function signupUser(email: string, password: string) {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);

  const res = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Signup failed");
  }

  return res.json();
}