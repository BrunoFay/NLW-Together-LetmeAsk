import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './global.css'
import AdminRoom from './pages/AdminRoom'
import Home from './pages/Home'
import NewRoom from './pages/NewRoom'
import Room from './pages/Room'
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
