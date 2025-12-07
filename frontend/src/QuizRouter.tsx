import { useQuiz } from "./context/QuizContext";
import TopicSelector from "./components/TopicSelector";
import Loader from "./components/Loader";
import QuizLayout from "./components/QuizLayout";
import ResultScreen from "./components/ResultScreen";

export default function QuizRouter() {
  const { screen } = useQuiz();

  if (screen === "topic") return <TopicSelector />;
  if (screen === "loading") return <Loader />;
  if (screen === "quiz") return <QuizLayout />;
  if (screen === "result") return <ResultScreen />;

  return null;
}
