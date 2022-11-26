import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import { eliminarSesionCampanha, getSesion } from '../../peticiones';

function VerSesion(){

    const [sesion, setSesion] = useState({nombre: "Nombre", campanha:{}, creacion:"", modificacion:""}); 

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login.
     * Si lo está, recupera la información de la sesión de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token") == null)
                window.location.replace("/login");
            else {
                document.getElementById("menu-ppal-sesiones").classList.add("actual");
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                let data = await getSesion();
                setSesion(data);
            }
        }
        fetchData().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    /**
     * Redirecciona al usuario a la página de edición de sesión
     */
    function editar() {
        window.location.href = "/sesion/editar";
    }

    /**
     * Solicita confirmación al usuario y, en caso afirmativo, llama a la
     * función que hace la petición de borrado de sesión a la API y
     * procesa el resultado
     */
    async function eliminar() {
        if (window.confirm("¿Seguro que quieres borrar esta sesión?")) {
            let resultado = await eliminarSesionCampanha();
            if (resultado !== "OK") {
                document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al eliminar la sesión";
            }
            else {
                window.location.href = "../campanha/ver-campanha.html";
            }
        }
    }


    
    return(
    <>
    <Cabecera />
        <main className="contenido">
        <MenuPpal />
        <section className="info">
            <p id="mensaje-feedback" className="mensaje-feedback"></p>
            <section className="cabecera-info" id="contenedor-botones">
                <h3 id="nombre">{sesion.nombre}</h3>
                <div className="contenedor-botones-titulo">
                    <button title="Editar sesión" onClick={editar}>Editar</button>
                    <button title="Eliminar sesión" onClick={eliminar}>Eliminar</button>
                </div>
            </section>
            <section className="cuerpo-info ficha-sesion">
                <article>
                    <h3>Información</h3>
                    <h4>Campaña:</h4>
                    <p id="campanha">{sesion.campanha.titulo}</p>
                    <h4>Estado:</h4>
                    <p id="estado">{sesion.estado}</p>
                    <h4>Fecha:</h4>
                    <p id="fecha">{(sesion.fecha ? sesion.fecha.replace("T", " ") : "-")}</p>
                </article>
                <article>
                    <h3>Planificación</h3>
                    <p className="con-espacios dos-cols" id="planificacion">{sesion.planificacion ? sesion.planificacion : "No se ha planificado la sesión."}</p>
                </article>
                <article>
                    <h3>Resultados</h3>
                    <p className="con-espacios dos-cols" id="resultados">{(sesion.estado === "Completada") ? (sesion.resultados ? sesion.resultados : "No se han registrado resultados de la sesión.") : "La sesión aún no está completada."}</p>
                </article>
                <hr className="black"/>
                <p id="creacion" className="small">{"Creación: " + sesion.creacion}</p>
                <p id="modificacion" className="small">{"Modificacion: " + sesion.modificacion}</p>
            </section>
        </section>
    </main>
        <Footer />
    </>
    );
}

export default VerSesion;