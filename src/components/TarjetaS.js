import React from 'react';

/**
 * Componente que representa una tarjeta de sesión - Lumbre
 * 
 * @author Sara Vidal García
 */
function TarjetaS({ id, campanha, nombre, estado, fecha }) {

    /**
     * Redirecciona al usuario a la página de visualización de la sesión
     * con el id de sesión y el id de campaña recibidos
     * @param id - id de la sesión
     * @param id_c - id de la campaña
     */
    const verSesion = (id, id_c) => {
        localStorage.id_sesion = id;
        localStorage.id_campanha = id_c;
        window.location.href = "/sesion/ver";
    }

    /**
     * Contenido de la tarjeta de sesión
     */
    return (
        <div className={`sesion campanha-${campanha.id} ${estado}`} title="Ver sesión" onClick={() => verSesion(id, campanha.id)}>
            <h4 id="titulo">{nombre}</h4>
            <p>{campanha.titulo}</p>
            {(estado === "Completada") ? <p className='envoltorio'>Completada</p> : <br />}
            <p className="small">Fecha: {fecha ? fecha.replace("T", " ") : "Sin fecha"}</p>
        </div>
    );
}

export default TarjetaS;