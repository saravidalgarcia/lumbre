import React from 'react';

function TarjetaC({id, titulo, resumen, creacion, modificacion}){

    /**
     * Redirecciona al usuario a la página de visualización de campaña
     * con el id recibido
     * @param id
     */
    function verCampanha(id) {
        localStorage.id_campanha = id;
        window.location.href = "/campanha/ver-campanha";
    }

    return(
    <div className="campanha" title="Ver campanha" onclick = {verCampanha(id)}>
        <h4 id="titulo">{titulo}</h4>
        <p>{resumen}</p>
        <br/>
        <p class="small">Creado: {creacion}</p>
        <p class="small">Modificado: {modificacion}</p>
    </div>
    );
}

export default TarjetaC;