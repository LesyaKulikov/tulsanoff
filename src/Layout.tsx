import { Outlet } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { CtaBand } from './components/CtaBand/CtaBand'
import { Footer } from './components/Footer/Footer'

export function Layout() {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      <CtaBand />
      <Footer />
    </div>
  )
}
