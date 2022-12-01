import React from 'react';

/**
 * Componente que representa una tarjeta de campaña - Lumbre
 * 
 * @author Sara Vidal García
 */
function TarjetaC({ id, titulo, resumen, creacion, modificacion }) {

    /**
     * Redirecciona al usuario a la página de visualización de la campaña
     * con el id recibido
     * @param id
     */
    const verCampanha = (id) => {
        localStorage.id_campanha = id;
        window.location.href = "/campanha/ver";
    }

    /**
     * Contenido de la tarjeta de campaña
     */
    return (
        <div className="campanha" title="Ver campanha" onClick={() => verCampanha(id)}>
            <h4 id="titulo">{titulo}</h4>
            <p>{resumen}</p>
            <br />
            <p className="small">Creado: {creacion}</p>
            <p className="small">Modificado: {modificacion}</p>
        </div>
    );
}

export default TarjetaC;