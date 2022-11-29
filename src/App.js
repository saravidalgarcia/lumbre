import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
/* --- Páginas de primer nivel --- */
import Login from './pages/Login';
import Registro from './pages/Registro';
import About from './pages/About';
import Campanhas from './pages/Campanhas';
import Sesiones from './pages/Sesiones';
import Personajes from './pages/Personajes';
import Razas from './pages/Razas';
import Calendario from './pages/Calendario';
import Contrasenha from './pages/Contrasenha';
/* --- Páginas de segundo nivel --- */
//Campañas
import CrearCampanha from './pages/campanha/CrearCampanha';
import EditarCampanha from './pages/campanha/EditarCampanha';
import VerCampanha from './pages/campanha/VerCampanha';
//Sesiones
import CrearSesion from './pages/sesion/CrearSesion';
import EditarSesion from './pages/sesion/EditarSesion';
import VerSesion from './pages/sesion/VerSesion';
//Razas
import CrearRaza from './pages/raza/CrearRaza';
import EditarRaza from './pages/raza/EditarRaza';
import VerRaza from './pages/raza/VerRaza';
//Personajes
import CrearPersonaje from './pages/personaje/CrearPersonaje';
import EditarPersonaje from './pages/personaje/EditarPersonaje';
import VerPersonaje from './pages/personaje/VerPersonaje';

/**
 * Componente principal de la aplicación
 * 
 * @author Sara Vidal García
 */
function App() {
    return (
        <Routes>
            <Route path="/" element={<Login title="Inicio" />} />
            <Route path="/login" element={<Login title="Inicio" />} />
            <Route path="/registro" element={<Registro title="Registro" />} />
            <Route path="/about" element={<About title="Información y Contacto" />} />
            <Route path="/contrasenha" element={<Contrasenha title="Cambiar contraseña" />} />
            <Route path="/campanhas" element={<Campanhas title="Campañas" />} />
            <Route path="/sesiones" element={<Sesiones title="Sesiones" />} />
            <Route path="/personajes" element={<Personajes title="Personajes" />} />
            <Route path="/razas" element={<Razas title="Razas" />} />
            <Route path="/calendario" element={<Calendario title="Calendario" />} />
            <Route path="/campanha/crear" element={<CrearCampanha title="Crear campaña" />} />
            <Route path="/campanha/editar" element={<EditarCampanha title="Editar campaña" />} />
            <Route path="/campanha/ver" element={<VerCampanha title="Ver campaña" />} />
            <Route path="/sesion/crear" element={<CrearSesion title="Crear sesión" />} />
            <Route path="/sesion/editar" element={<EditarSesion title="Editar sesión" />} />
            <Route path="/sesion/ver" element={<VerSesion title="Ver sesión" />} />
            <Route path="/raza/crear" element={<CrearRaza title="Crear raza" />} />
            <Route path="/raza/editar" element={<EditarRaza title="Editar raza" />} />
            <Route path="/raza/ver" element={<VerRaza title="Ver raza" />} />
            <Route path="/personaje/crear" element={<CrearPersonaje title="Crear personaje" />} />
            <Route path="/personaje/editar" element={<EditarPersonaje title="Editar personaje" />} />
            <Route path="/personaje/ver" element={<VerPersonaje title="Ver personaje" />} />
        </Routes>
    )
}

export default App;
