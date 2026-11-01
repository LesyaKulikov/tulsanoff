import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { QuizModal } from './QuizModal'
import { QuizModalContext } from './quizModalContext'

export function QuizModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openQuiz = useCallback(() => setOpen(true), [])
  const closeQuiz = useCallback(() => setOpen(false), [])
  const location = useLocation()

  useEffect(() => {
    closeQuiz()
  }, [location.pathname, closeQuiz])

  return (
    <QuizModalContext.Provider value={{ openQuiz, closeQuiz }}>
      {children}
      <QuizModal open={open} onClose={closeQuiz} />
    </QuizModalContext.Provider>
  )
}