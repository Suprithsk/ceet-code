import { useEffect } from 'react'
import './App.css'
import questions from './assets/questions.json'
import { useState } from 'react'
import HomePage from './pages/HomePage'
import { Question } from './types/types'
function App() {
  
  const [data, setData] = useState<Question[]>([])
  useEffect(() => {
    setData(questions as unknown as Question[])
    console.log(questions)
  }, [])
  return (
    <section className=''>
        <HomePage />
    </section>
  )
}

export default App
