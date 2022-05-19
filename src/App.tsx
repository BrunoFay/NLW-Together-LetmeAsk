import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NewRoom from './pages/NewRoom'
import './global.css'
import Room from './pages/Room'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' >
          <Route path='new' element={<NewRoom />} />
          <Route path=':id' element={<Room />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
