import React from 'react';

function FormSesion({nombre, campanhas, planificacion, fecha, resultados, boton, accion}){

    const verResultados = e => {
        if (e.target.checked) {
            let resultado = document.createElement("textarea");
            resultado.classList.add("con-espacios");
            resultado.id = "resultados";
            resultado.placeholder = "Resumen de la sesión";
            resultado.rows = "10";
            resultado.innerHTML = (resultados) ? resultados : "";
            document.getElementById("contenedor-resultados").appendChild(resultado);
        } else {
            document.getElementById("contenedor-resultados").removeChild(document.getElementById("resultados"));
        }
    };
    
    return(
        <div className="div-form new-form">
        <section>
            <form onSubmit={accion}>
                <input type="text" id="nombre" name="nombre" placeholder="Nombre" defaultValue={nombre} required /><br />
                <div id="contenedor-campanha">
                    <label htmlFor="campanha">Campaña: </label>
                    <select className="selector-campanha" name="campanha" id="campanha" required>
                    {
                        campanhas.map((c) =>
                            <option key={c.id + 1} value={c.id}>{c.titulo}</option>
                        )
                    }
                    </select>
                </div>
                <br/>
                <textarea className="con-espacios" id="planificacion" placeholder="Desarrollo previsto de la sesión" rows="10" defaultValue={planificacion}></textarea><br />
                <div>
                    <label htmlFor="fecha">Fecha y hora: </label>
                    <input className="fecha-formulario" type="datetime-local" id="fecha" name="fecha" defaultValue={fecha}/><br />
                </div>
                <hr/>
                <div className="sesion-completada" id="completada">
                    <label className="checkbox" htmlFor="fecha">¿Sesión completada?</label>
                    <label className="switch">
                        <input id="estado" type="checkbox" name="estado" onChange={verResultados}/>
                        <span className="slider"></span>
                    </label>
                
                </div>
                <div id="contenedor-resultados"></div>
                <br />
                <input className="boton" title="Crear sesión" type="submit" value={boton} />
            </form>
            <p id="mensaje-feedback" className="mensaje-feedback"></p>
        </section>
    </div>

    );
}

export default FormSesion;