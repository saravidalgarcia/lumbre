import React from 'react';
import { Route, Routes } from "react-router-dom"
//Páginas de primer nivel
import Login from './pages/Login';
import Registro from './pages/Registro';
import About from './pages/About';
import Campanhas from './pages/Campanhas';
import Sesiones from './pages/Sesiones';
import Personajes from './pages/Personajes';
import Razas from './pages/Razas';
import Calendario from './pages/Calendario';
import Contrasenha from './pages/Contrasenha';
//Páginas de segundo nivel
import CrearCampanha from './pages/campanha/CrearCampanha';
import EditarCampanha from './pages/campanha/EditarCampanha';
import VerCampanha from './pages/campanha/VerCampanha';

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
        <Route path="/sesiones" element={<Sesiones />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/razas" element={<Razas />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/campanha/crear" element={<CrearCampanha />} />
        <Route path="/campanha/editar" element={<EditarCampanha />} />
        <Route path="/campanha/ver" element={<VerCampanha />} />
      </Routes>
  )
}

export default App;
