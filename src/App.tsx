import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NewRoom from './pages/NewRoom'
import './global.css'
import Room from './pages/Room'
import AdminRoom from './pages/AdminRoom'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' >
          <Route path='new' element={<NewRoom />} />
          <Route path='admin/:id' element={<AdminRoom />} />
          <Route path=':id' element={<Room />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
