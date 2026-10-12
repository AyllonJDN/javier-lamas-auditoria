import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Summary from './components/Summary'
import Evolution from './components/Evolution'
import Instagram from './components/Instagram'
import TikTok from './components/TikTok'
import Editorial from './components/Editorial'
import Conclusions from './components/Conclusions'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Summary />
        <Evolution />
        <Instagram />
        <TikTok />
        <Editorial />
        <Conclusions />
      </main>
    </>
  )
}
