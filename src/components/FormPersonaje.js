import React from 'react';

function FormPersonaje({nombre, jugador, informacion, raza, razas, boton, accion}){

    return(
        <div className="div-form new-form">
        <section>
            <form id="form-personaje" onSubmit={accion} encType="multipart/form-data">
                <input type="text" id="nombre" name="nombre" placeholder="Nombre" defaultValue={nombre} required /><br />
                <div>
                    <label htmlFor="raza">Raza: </label>
                    <select className="selector-raza" name="raza" id="raza" defaultValue={raza} required>
                    {
                        razas.map((r) =>
                            <option key={r.id + 1} value={r.id}>{r.denominacion}</option>
                        )
                    }
                    </select>
                </div>
                <br />
                <input type="text" id="jugador" name="jugador" placeholder="Jugador" defaultValue={jugador}/><br />
                <textarea name="informacion" id="informacion" placeholder="Otra información" rows="10" defaultValue={informacion}></textarea><br />
                <div>
                    <label htmlFor="file">Imagen: <span className="consejo" title="Se recomienda que la dimensión de la imagen sea 1:1">(?)</span></label>
                    <input type="file" id="imagen-personaje" name="file" className="imagen-personaje"/>
                </div>
                <input className="boton" title={boton + " personaje"} type="submit" value={boton} />
            </form>
            <p id="mensaje-feedback" className="mensaje-feedback"></p>
        </section>
    </div>

    );
}

export default FormPersonaje;