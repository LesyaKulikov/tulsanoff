import { useContext } from 'react'
import { QuizModalContext } from './quizModalContext'

export function useQuizModal() {
  const ctx = useContext(QuizModalContext)
  if (!ctx) throw new Error('useQuizModal must be used inside <QuizModalProvider>')
  return ctx
}