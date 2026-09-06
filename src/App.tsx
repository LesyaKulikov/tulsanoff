import { Route, Routes } from 'react-router-dom'
import { Layout } from './Layout'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { CertificatesPage } from './pages/CertificatesPage'
import { AboutPage } from './pages/AboutPage'
import { ContactsPage } from './pages/ContactsPage'
import { ROUTES } from './routes'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.services} element={<ServicesPage />} />
        <Route path={ROUTES.certificates} element={<CertificatesPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.contacts} element={<ContactsPage />} />
      </Route>
    </Routes>
  )
}

export default App
