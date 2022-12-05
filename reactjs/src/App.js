import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import Student from './pages/Student';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" exact element={<Dashboard />}/>
        <Route path="/student/:id" exact element={<Student />}/>
        <Route path="/" exact element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
