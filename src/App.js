import React, { useEffect, useState } from 'react';
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

    /**
     * Comprueba si el usuario puede acceder a la página solicitada (si no puede,
     * lo redirige a la página apropiada) y actualiza el título de la página
     * antes de devolver el componente
     */      
    function Page({title, auth, component}){
        
        //El componente que se va a devolver
        const [comp, setComp] = useState(null);

        useEffect(() => {
            setComp(component);
            //Página requiere autenticación y el usuario no lo está: se muestra login
            if (localStorage.getItem("token") === null && auth === 1)
                setComp(<Page title="Inicio" auth={0} component={<Login />} />);    
            else{
                //Página requiere autenticación y el usuario no lo está: se muestra gestión de campañas
                if (localStorage.getItem("token") !== null && auth === 0)
                    setComp(<Page title="Campañas" auth={1} component={<Campanhas />} />);
            }
            document.title = title + " - Lumbre";
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[component, auth, title]);

        if (!comp) return null;
        return comp;
    }

    return (
        <Routes>
            <Route path="/" element={<Page title="Inicio" auth={0} component={<Login />} />} />
            <Route path="/login" element={<Page title="Inicio" auth={0} component={<Login />} />} />
            <Route path="/registro" element={<Page title="Registro" auth={0} component={<Registro />} />} />
            <Route path="/about" element={<Page title="Información y Contacto" auth={-1} component={<About />} />} />
            <Route path="/contrasenha" element={<Page title="Cambiar contraseña" auth={1} component={<Contrasenha />} />} />
            <Route path="/campanhas" element={<Page title="Campañas" auth={1} component={<Campanhas />} />} />
            <Route path="/sesiones" element={<Page title="Sesiones" auth={1} component={<Sesiones />} />} />
            <Route path="/personajes" element={<Page title="Personajes" auth={1} component={<Personajes />} />} />
            <Route path="/razas" element={<Page title="Razas" auth={1} component={<Razas />} />} />
            <Route path="/calendario" element={<Page title="Calendario" auth={1} component={<Calendario />} />} />
            <Route path="/campanha/crear" element={<Page title="Crear campaña" auth={1} component={<CrearCampanha />} />} />
            <Route path="/campanha/editar" element={<Page title="Editar campaña" auth={1} component={<EditarCampanha />} />} />
            <Route path="/campanha/ver" element={<Page title="Ver campaña" auth={1} component={<VerCampanha />} />} />
            <Route path="/sesion/crear" element={<Page title="Crear sesión" auth={1} component={<CrearSesion />} />} />
            <Route path="/sesion/editar" element={<Page title="Editar sesión" auth={1} component={<EditarSesion />} />} />
            <Route path="/sesion/ver" element={<Page title="Ver sesión" auth={1} component={<VerSesion />} />} />
            <Route path="/raza/crear" element={<Page title="Crear raza" auth={1} component={<CrearRaza />} />} />
            <Route path="/raza/editar" element={<Page title="Editar raza" auth={1} component={<EditarRaza />} />} />
            <Route path="/raza/ver" element={<Page title="Ver raza" auth={1} component={<VerRaza />} />} />
            <Route path="/personaje/crear" element={<Page title="Crear personaje" auth={1} component={<CrearPersonaje />} />} />
            <Route path="/personaje/editar" element={<Page title="Editar personaje" auth={1} component={<EditarPersonaje />} />} />
            <Route path="/personaje/ver" element={<Page title="Ver personaje" auth={1} component={<VerPersonaje />} />} />
        </Routes>
    )
}

export default App;
