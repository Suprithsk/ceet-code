import './App.css'
import HomePage from './pages/HomePage'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
    <Analytics />
    <section className=''>
        <HomePage />
    </section>
    </>
  )
}

export default App
