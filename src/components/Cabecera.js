import React from 'react';

function Cabecera(){
    const inicio = () =>{
        window.location.href="/campanhas";
    }
    
    const cambiarContrasenha = () =>{
        window.location.href = "/contrasenha";
    }
    
    const cerrarSesion = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.replace("/login");
    }
    
    return(
    <>
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
    </>
    );
}

export default Cabecera;