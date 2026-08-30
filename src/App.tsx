import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Services } from './components/Services/Services'
import { Stats } from './components/Stats/Stats'
import { Gallery } from './components/Gallery/Gallery'
import { BigCards } from './components/BigCards/BigCards'
import { Video } from './components/Video/Video'
import { Testimonials } from './components/Testimonials/Testimonials'
import { FaqList } from './components/FaqList/FaqList'
import { CtaBand } from './components/CtaBand/CtaBand'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Gallery />
        <BigCards />
        <Video />
        <Testimonials />
        <FaqList />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}

export default App
