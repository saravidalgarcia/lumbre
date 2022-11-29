import React from 'react';

/**
 * Componente que representa la cabecera - Lumbre
 * 
 * @author Sara Vidal García
 */
function Cabecera() {

    /**
     * Redirige a la página de gestión de campañas
     */
    const inicio = () => {
        window.location.href = "/campanhas";
    }

    /**
     * Redirige a la página de cambio de contraseña
     */
    const cambiarContrasenha = () => {
        window.location.href = "/contrasenha";
    }

    /**
     * Cierra la sesión y redirige a la página de login
     */
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.replace("/login");
    }

    /**
     * Contenido de la cabecera
     */
    return (
        <header className="cabecera" id="cabecera">
            <div className="lumbre" onClick={inicio} title="LUMBRE" alt="Logo de LUMBRE" />
            <div className="menu-cabecera">
                <button id="username" className="boton-cabecera" />
                <div className="menu-cabecera-opciones">
                    <button onClick={cambiarContrasenha}>Cambiar contraseña</button>
                    <button onClick={cerrarSesion}>Cerrar sesión</button>
                </div>
            </div>
        </header>
    );
}

export default Cabecera;