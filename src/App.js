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
import CrearSesion from './pages/sesion/CrearSesion';
import EditarSesion from './pages/sesion/EditarSesion';
import VerSesion from './pages/sesion/VerSesion';
import CrearRaza from './pages/raza/CrearRaza';
import EditarRaza from './pages/raza/EditarRaza';
import VerRaza from './pages/raza/VerRaza';

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
        <Route path="/sesion/crear" element={<CrearSesion />} />
        <Route path="/sesion/editar" element={<EditarSesion />} />
        <Route path="/sesion/ver" element={<VerSesion />} />
        <Route path="/raza/crear" element={<CrearRaza />} />
        <Route path="/raza/editar" element={<EditarRaza />} />
        <Route path="/raza/ver" element={<VerRaza />} />
      </Routes>
  )
}

export default App;
