import { Route, Routes } from 'react-router-dom'
import { Layout } from './Layout'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { MassageDetailPage } from './pages/MassageDetailPage'
import { CertificatesPage } from './pages/CertificatesPage'
import { AboutPage } from './pages/AboutPage'
import { ContactsPage } from './pages/ContactsPage'
import { ContactsPreviewPage } from './pages/ContactsPreviewPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ROUTES } from './routes'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.services} element={<ServicesPage />} />
        <Route path={ROUTES.serviceDetail} element={<MassageDetailPage />} />
        <Route path={ROUTES.certificates} element={<CertificatesPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.contacts} element={<ContactsPage />} />
        <Route path={ROUTES.contactsPreview} element={<ContactsPreviewPage />} />
        <Route path={ROUTES.notFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
