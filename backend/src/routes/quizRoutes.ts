import { Router } from "express";
import { generateQuizQuestions, generateFeedback } from "../services/aiService";
import { QuizSession } from "../models/QuizSession";
import passport from "passport";

const router = Router();

// protect all quiz routes
router.use(passport.authenticate("jwt", { session: false }));

// POST /api/quiz/generate
router.post("/generate", async (req, res) => {
  const { topic, count = 5 } = req.body;

  if (!topic) {
    return res.status(400).json({ message: "Topic is required" });
  }

  try {
    const quiz = await generateQuizQuestions(topic, count);
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate quiz" });
  }
});

// POST /api/quiz/submit
router.post("/submit", async (req, res) => {
  const { topic, questions, answers } = req.body;
  // @ts-ignore
  const user = req.user as any;

  if (!topic || !questions || !answers) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const score = questions.reduce((acc: number, q: any, idx: number) => {
    return acc + (q.correctIndex === answers[idx] ? 1 : 0);
  }, 0);

  try {
    const session = await QuizSession.create({
      user: user?._id,
      topic,
      questions,
      answers,
      score,
    });

    const feedback = await generateFeedback(topic, score, questions.length);

    res.json({
      score,
      total: questions.length,
      feedback,
      sessionId: session._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
});

// GET /api/quiz/history
router.get("/history", async (req, res) => {
  // @ts-ignore
  const user = req.user as any;

  try {
    const history = await QuizSession.find({ user: user?._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

export default router;
