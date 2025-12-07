import { Schema, model, Document, Types } from "mongoose";

interface QuestionDoc {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface IQuizSession extends Document {
  user: Types.ObjectId;
  topic: string;
  questions: QuestionDoc[];
  answers: number[];
  score: number;
  createdAt: Date;
}

const questionSchema = new Schema<QuestionDoc>(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true }, //array of strings
    correctIndex: { type: Number, required: true },
  },
  { _id: false }
);

const quizSessionSchema = new Schema<IQuizSession>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    questions: { type: [questionSchema], required: true },
    answers: { type: [Number], required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

export const QuizSession = model<IQuizSession>(
  "QuizSession",
  quizSessionSchema
);
