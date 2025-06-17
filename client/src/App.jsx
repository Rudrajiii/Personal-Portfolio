import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../components/NavBar/NavBar";
import Body from '../components/Body/Body';
import About from '../components/About/About';
import Contact from '../components/Contact/Contacts';
import Paintings from '../components/Paintings/Paintings';
import FunProject from '../components/FunProjects/FunProjects';
import AdminPanel from '../components/Admin/AdminPanel';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/paintings" element={<Paintings />} />
          <Route path="/fun-projects" element={<FunProject />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
