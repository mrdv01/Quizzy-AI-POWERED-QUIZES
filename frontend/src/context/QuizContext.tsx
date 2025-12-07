import { createContext, useContext, useState, type ReactNode } from "react";
import type { Question } from "../services/api";

type Screen = "topic" | "loading" | "quiz" | "result";
type LoadingType = "generate" | "submit" | null;

interface QuizState {
  screen: Screen;
  loadingType: LoadingType;
  topic: string;
  questions: Question[];
  currentIndex: number;
  answers: number[];
  score: number | null;
  feedback: string;
}

interface QuizContextValue extends QuizState {
  setTopicAndStart: (topic: string) => void;
  setQuestions: (qs: Question[]) => void;
  setScreen: (screen: Screen) => void;
  setLoadingType: (t: LoadingType) => void;
  goNext: () => void;
  goPrev: () => void;
  answerCurrent: (optionIndex: number) => void;
  setResult: (score: number, feedback: string) => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [screen, setScreenState] = useState<Screen>("topic");
  const [loadingType, setLoadingTypeState] = useState<LoadingType>(null);
  const [topic, setTopic] = useState("");
  const [questions, setQuestionsState] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const setScreen = (s: Screen) => setScreenState(s);
  const setLoadingType = (t: LoadingType) => setLoadingTypeState(t);

  // when user picks a topic
  const setTopicAndStart = (t: string) => {
    setTopic(t);
    setLoadingTypeState("generate");
    setScreenState("loading");
  };

  // when questions arrive from backend
  const setQuestions = (qs: Question[]) => {
    setQuestionsState(qs);
    setAnswers(new Array(qs.length).fill(-1));
    setCurrentIndex(0);
    setScreenState("quiz");
    setLoadingTypeState(null);
  };

  const goNext = () => {
    setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
  };

  const goPrev = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const answerCurrent = (optionIndex: number) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = optionIndex;
      return copy;
    });
  };

  const setResult = (s: number, f: string) => {
    setScore(s);
    setFeedback(f);
    setScreenState("result");
    setLoadingTypeState(null);
  };

  const value: QuizContextValue = {
    screen,
    loadingType,
    topic,
    questions,
    currentIndex,
    answers,
    score,
    feedback,
    setTopicAndStart,
    setQuestions,
    setScreen,
    setLoadingType,
    goNext,
    goPrev,
    answerCurrent,
    setResult,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
