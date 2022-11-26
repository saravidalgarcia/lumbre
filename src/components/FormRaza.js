import React from 'react';

function FormRaza({denominacion, descripcion, accion, boton}){



    return(
    <div className="div-form new-form">
        <section>
            <form onSubmit={accion}>
            <input type="text" id="denominacion" name="denominacion" placeholder="Denominación" required defaultValue={denominacion}/><br />
            <textarea className="text-area-formulario" id="descripcion" placeholder="Información" rows="10" defaultValue={descripcion}></textarea><br />
                <input className="boton" title={boton + " raza"} type="submit" value={boton} />
            </form>
            <p id="mensaje-feedback" className="mensaje-feedback"></p>
        </section>
    </div>
    );
}

export default FormRaza;