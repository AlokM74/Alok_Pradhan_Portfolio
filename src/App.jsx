import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTopButton from './components/ScrollToTopButton.jsx'
import Home from './pages/Home.jsx'
import GSAPExperience from './components/GSAPExperience.jsx'

export default function App() {
  return (
    <div className="portfolio-root flex min-h-screen flex-col">
      <GSAPExperience />
      <div className="scroll-progress" />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-follower" aria-hidden="true" />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
