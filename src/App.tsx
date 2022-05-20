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
          <Route path=':id' element={<Room />} />
        </Route>
        <Route path='/admin' >
          <Route path='rooms/:id' element={<AdminRoom />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
