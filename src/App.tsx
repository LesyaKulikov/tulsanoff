import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Approach } from './components/Approach/Approach'
import { Services } from './components/Services/Services'
import { Masters } from './components/Masters/Masters'
import { Story } from './components/Story/Story'
import { Testimonials } from './components/Testimonials/Testimonials'
import { FaqList } from './components/FaqList/FaqList'
import { CtaBand } from './components/CtaBand/CtaBand'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Approach />
        <Services />
        <Masters />
        <Story />
        <Testimonials />
        <FaqList />
        <CtaBand />
      </main>
      <Footer />
    </div>
  )
}

export default App
