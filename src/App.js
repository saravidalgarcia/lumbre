import React from 'react';
import { Route, Routes } from "react-router-dom"
import Login from './pages/Login';
import Registro from './pages/Registro';
import About from './pages/About';
import Campanhas from './pages/Campanhas';
import Contrasenha from './pages/Contrasenha';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/about" element={<About />} />
        <Route path="/contrasenha" element={<Contrasenha />} />
        <Route path="/campanhas" element={<Campanhas />} />
      </Routes>
  )
}

export default App;
