import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.tsx'
import { LocaleProvider } from './i18n/LocaleProvider'
import { QuizModalProvider } from './components/Quiz/QuizModalProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <LocaleProvider>
          <QuizModalProvider>
            <App />
          </QuizModalProvider>
        </LocaleProvider>
      </HashRouter>
    </MotionConfig>
  </StrictMode>,
)
