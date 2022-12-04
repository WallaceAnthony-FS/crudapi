import './App.css';
import { useState, useEffect } from "react"

function App() {
  const [students, setStudents] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE = process.env.NODE_ENV === "development"
  ? `http://localhost:8000`
  : process.env.REACT_APP_BASE_URL

  let ignore = false
  useEffect(() => {

    if(!ignore){
      getStudents()
    }
    return () => {
      ignore = true
    }
  }, [])
  
  const getStudents = async () => {
    setLoading(true)
    try {
      await fetch(`${API_BASE}/students`)
      .then(res => res.json())
      .then(data => {
        console.log(data.students)
        setStudents(data.students)
      })
    } catch (err) {
      setError(error.message || "Unexpected Error")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Students:</h1>
        <ul>
          <li>Students</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
