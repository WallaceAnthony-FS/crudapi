import '../App.css';
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

function Dashboard() {
  const [students, setStudents] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [values, setValues] = useState({
    name: '',
    class: ''
  })

  const API_BASE = process.env.NODE_ENV === "development"
  ? `http://localhost:8000/api/v1`
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

  const createStudent = async () => {
    setLoading(true)
    try {
      await fetch(`${API_BASE}/students/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(() => getStudents())
    } catch (err) {
      setError(error.message || "Unexpected Error")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    createStudent()
  }

  const handleInputChange = e => {
    e.persist()
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Students:</h1>
        <Link to="/">Home</Link>
        <form onSubmit={(event) => handleSubmit(event)}>
          <label>
            Name:
            <input type="text" name="name" value={values.name} onChange={handleInputChange}/>
          </label>
          <label>
            Class:
            <input type="text" name="class" value={values.class} onChange={handleInputChange}/>
          </label>
          <button type='submit'>Submit</button>
        </form>
        <ul>
          {
            students && students.map(student => {
              return <li key={student._id}><Link to={`/student/${student._id}`}>{student.name}</Link></li>
            })
          }
        </ul>
      </header>
    </div>
  );
}

export default Dashboard;
