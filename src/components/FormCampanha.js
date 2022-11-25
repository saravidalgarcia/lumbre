import React from 'react';

function FormCampanha({titulo, resumen, informacion, accion}){



    return(
    <div className="div-form new-form">
        <section>
            <form onSubmit={accion}>
                <input type="text" id="titulo" name="titulo" placeholder="Título" value={titulo} required /><br />
                <textarea id="resumen" placeholder="Resumen" rows="4" value={resumen} required></textarea><br />
                <textarea id="informacion" placeholder="Información" value={informacion} rows="10"></textarea><br />
                <input className="boton" title="Crear campaña" type="submit" value="Crear" />
            </form>
            <p id="mensaje-feedback" className="mensaje-feedback"></p>
        </section>
    </div>
    );
}

export default FormCampanha;