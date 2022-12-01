import React from 'react';
import { Link } from "react-router-dom";

/**
 * Componente que representa el menú principal - Lumbre
 * 
 * @author Sara Vidal García
 */
function MenuPpal() {

    /**
     * Obtiene un número aleatorio entre 1 y 20 lo muestra en el dado
     */
    function tirarDado() {
        let resultado = document.getElementById("resultado-dado");
        let tirada = Math.floor(Math.random() * 20) + 1;
        if (tirada === 1 || tirada === 20)
            resultado.classList.add("critico");
        else
            resultado.classList.remove("critico");
        resultado.innerHTML = tirada;
    }

    /**
     * Contenido del menú principal
     */
    return (
        <section className="menu-ppal">
            <Link to="/campanhas" id="menu-ppal-campanhas" title="Mis campañas" target="_self">
                <img src="https://lumbre.es/assets/img/icon_campanha.png" alt="Icono de campaña" />
                <span>Campañas</span>
            </Link>
            <Link to="/sesiones" id="menu-ppal-sesiones" title="Mis sesiones" target="_self">
                <img src="https://lumbre.es/assets/img/icon_sesion.png" alt="Icono de sesión" />
                <span>Sesiones</span>
            </Link>
            <Link to="/personajes" id="menu-ppal-personajes" title="Mis personajes" target="_self">
                <img src="https://lumbre.es/assets/img/icon_personaje.png" alt="Icono de personaje" />
                <span>Personajes</span>
            </Link>
            <Link to="/razas" id="menu-ppal-razas" title="Mis razas" target="_self">
                <img src="https://lumbre.es/assets/img/icon_raza.png" alt="Icono de raza" />
                <span>Razas</span>
            </Link>
            <Link to="/calendario" id="menu-ppal-calendario" title="Mi calendario" target="_self">
                <img src="https://lumbre.es/assets/img/icon_calendario.png" alt="Icono de calendario" />
                <span>Calendario</span>
            </Link>
            <div>
                <img id="dado" src="https://lumbre.es/assets/img/dado.png" title="Tirar dado" alt="Imagen de un dado de 20 caras" onClick={tirarDado} />
                <p id="resultado-dado" className="critico" onClick={tirarDado}>20</p>
            </div>
        </section>
    );
}

export default MenuPpal;