import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Journal from './pages/Journal'
import Meditations from './pages/Meditations'
import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/meditations" element={<Meditations />} />
          <Route path="/profile" element={<div>Profile Coming Soon</div>} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  )
}

export default App