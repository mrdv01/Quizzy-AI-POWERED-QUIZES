import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY!;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in .env");
}

// Create a client instance (SDK picks up apiKey here)
const ai = new GoogleGenAI({
  apiKey,
});

interface GeneratedQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizResponse {
  questions: GeneratedQuestion[];
}

async function callGemini(systemInstruction: string, userPrompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: userPrompt,
    config: {
      systemInstruction,

      temperature: 0.3,

      responseMimeType: "text/plain",
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("No text returned from Gemini");
  }
  return text as string;
}

export async function generateQuizQuestions(
  topic: string,
  count = 5,
  maxRetries = 2
): Promise<QuizResponse> {
  const systemInstruction = `
You are a quiz generator.

Return STRICT JSON ONLY, no explanations, no markdown, no extra text.

The JSON must be:

{
  "questions": [
    {
      "id": "string",
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctIndex": 0
    }
  ]
}

Rules:
- "questions" must contain EXACTLY ${count} items.
- "options" must have EXACTLY 4 strings.
- "correctIndex" must be an integer between 0 and 3.
`;

  const userPrompt = `Generate a multiple-choice quiz about "${topic}" using simple, clear language.`;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const raw = await callGemini(systemInstruction, userPrompt);

      // Sometimes models wrap JSON in ```json ... ``` strip that just in case
      const cleaned = raw
        .trim()
        .replace(/^```json/i, "")
        .replace(/^```/i, "")
        .replace(/```$/i, "");

      const parsed: QuizResponse = JSON.parse(cleaned);

      if (!parsed.questions || parsed.questions.length !== count) {
        throw new Error("Invalid questions length");
      }

      return parsed;
    } catch (err) {
      lastError = err;
      console.warn("Gemini quiz JSON parse error, attempt:", attempt + 1, err);
    }
  }

  throw lastError;
}

export async function generateFeedback(
  topic: string,
  score: number,
  total: number
): Promise<string> {
  const systemInstruction = `
You generate short, encouraging feedback for quiz takers.

Return STRICT JSON ONLY in this shape:
{ "feedback": "string" }

- Mention the score and topic.
- Be positive and supportive.
- Give 2–3 practical tips to improve.
`;

  const userPrompt = `The user completed a quiz on "${topic}" and scored ${score} out of ${total}.`;

  const raw = await callGemini(systemInstruction, userPrompt);

  const cleaned = raw
    .trim()
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "");

  const parsed = JSON.parse(cleaned) as { feedback: string };
  return parsed.feedback;
}
