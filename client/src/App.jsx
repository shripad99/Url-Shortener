import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const routes = (
  <Router>
    <Routes>
      <Route path = '/' element={<Login />} />
      <Route path = '/signup' element={<Register />} />
      <Route path = '/dashboard' element={<Dashboard />} />
    </Routes>
  </Router>
)


function App() {

  return (
    <>
      <div>
        {routes}
      </div>
    </>
  )
}

export default App
