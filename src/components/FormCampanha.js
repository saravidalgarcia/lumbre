import React from 'react';

/**
 * Componente que representa el formulario para crear/editar campañas - Lumbre
 * 
 * @author Sara Vidal García
 */
function FormCampanha({ titulo, resumen, informacion, accion, boton }) {

    /**
     * Contenido del formulario de campaña
     */
    return (
        <div className="div-form new-form">
            <section>
                <form onSubmit={accion}>
                    <input type="text" id="titulo" name="titulo" placeholder="Título" defaultValue={titulo} required /><br />
                    <textarea id="resumen" placeholder="Resumen" rows="4" defaultValue={resumen} required></textarea><br />
                    <textarea id="informacion" placeholder="Información" defaultValue={informacion} rows="10"></textarea><br />
                    <input className="boton" title={boton + " campaña"} type="submit" value={boton} />
                </form>
                <p id="mensaje-feedback" className="mensaje-feedback"></p>
            </section>
        </div>
    );
}

export default FormCampanha;