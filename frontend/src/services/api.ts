export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

const BASE_URL = "http://localhost:5000";

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* AUTH  */

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

/*  QUIZ */

export async function generateQuiz(topic: string): Promise<Question[]> {
  const res = await fetch(`${BASE_URL}/api/quiz/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ topic, count: 5 }),
  });

  if (!res.ok) {
    const text = await res.text(); //  get backend message
    throw new Error(`Generate failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data.questions;
}

export async function submitQuiz(
  topic: string,
  questions: Question[],
  answers: number[]
): Promise<{ score: number; total: number; feedback: string }> {
  const res = await fetch(`${BASE_URL}/api/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ topic, questions, answers }),
  });

  if (!res.ok) throw new Error("Failed to submit quiz");
  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${BASE_URL}/api/quiz/history`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });

  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}
