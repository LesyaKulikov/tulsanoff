import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.tsx'
import { DEFAULT_LOCALE, loadMessages } from './i18n/messages'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <IntlProvider locale={DEFAULT_LOCALE} messages={loadMessages(DEFAULT_LOCALE)}>
          <App />
        </IntlProvider>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
)
