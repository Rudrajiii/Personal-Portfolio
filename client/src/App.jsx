import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../components/NavBar/NavBar";
import Body from '../components/Body/Body';
import About from '../components/About/About';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<About />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
