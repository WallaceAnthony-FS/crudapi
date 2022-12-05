import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom"
import '../App.css';

function Student() {
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [values, setValues] = useState({
    name: '',
    class: ''
  })
  const { id } = useParams()
  const navigate = useNavigate()

  const API_BASE = process.env.NODE_ENV === "development"
  ? `http://localhost:8000/api/v1`
  : process.env.REACT_APP_BASE_URL

  let ignore = false
  useEffect(() => {

    if(!ignore){
      getStudent()
    }
    return () => {
      ignore = true
    }
  }, [])
  
  const getStudent = async () => {
    setLoading(true)
    try {
      await fetch(`${API_BASE}/students/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setStudent(data)
        setValues(data)
      })
    } catch (err) {
      setError(error.message || "Unexpected Error")
    } finally {
      setLoading(false)
    }
  }

  const deleteStudent = async () => {
    setLoading(true)
    try {
      await fetch(`${API_BASE}/students/${id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        setStudent(data)
        navigate("/dashboard", {replace: true})
      })
    } catch (err) {
      setError(error.message || "Unexpected Error")
    } finally {
      setLoading(false)
    }
  }

  const updateStudent = async () => {
    setLoading(true)
    try {
      await fetch(`${API_BASE}/students/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
        setStudent(data)
      })
    } catch (err) {
      setError(error.message || "Unexpected Error")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    updateStudent()
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
        <h1>Student Profile Page</h1>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        { student && <h3>{student.name}</h3> }
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
        <button onClick={deleteStudent}>Delete Student</button>
      </header>
    </div>
  );
}

export default Student;
