import { createContext } from 'react'

export interface QuizModalContextValue {
  openQuiz: () => void
  closeQuiz: () => void
}

export const QuizModalContext = createContext<QuizModalContextValue | null>(null)
