import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import { getPersonaje, eliminarPersonaje } from '../../peticiones';

/**
 * Componente que representa la interfaz de visualización de un personaje - Lumbre
 * 
 * @author Sara Vidal García
 */
function VerPersonaje(props) {

    /**
     * Se almacena la información del personaje
     */
    const [personaje, setPersonaje] = useState({ imagen: "", nombre: "", raza: "", jugador: "", informacion: "", creacion: "", modificacion: "" });

    /**
     * Actualiza el título de la página
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { document.title = props.title + " - Lumbre" }, []);

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login
     * Si lo está, recupera la información del personaje de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token") == null)
                window.location.replace("/login");
            else {
                document.getElementById("menu-ppal-personajes").classList.add("actual");
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                let data = await getPersonaje();
                setPersonaje(data);
            }
        }
        fetchData().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Redirecciona al usuario a la página de edición de personaje
     */
    const editar = () => {
        window.location.href = "/personaje/editar";
    }

    /**
     * Solicita confirmación al usuario y, en caso afirmativo, llama a la
     * función que hace la petición de borrado de personaje a la API y
     * procesa el resultado
     */
    const eliminar = async () => {
        if (window.confirm("¿Seguro que quieres borrar este personaje?")) {
            let resultado = await eliminarPersonaje(localStorage.id_personaje);
            if (resultado !== "OK")
                document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al eliminar el personaje";
            else
                window.location.href = "/personajes";
        }
    }

    /**
     * Contenido de la interfaz de visualización de un personaje
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <p id="mensaje-feedback" className="mensaje-feedback"></p>
                    <section className="cabecera-info" id="contenedor-botones">
                        <img id="imagen" alt={`Imagen de ${personaje.nombre}`} src={`data:image/jpeg;base64,${personaje.imagen}`} style={{ width: "100px", height: "100px" }} />
                        <h3 id="nombre">{personaje.nombre}</h3>
                        <div className="contenedor-botones-titulo">
                            <button title="Editar personaje" onClick={editar}>Editar</button>
                            <button title="Eliminar personaje" onClick={eliminar}>Eliminar</button>
                        </div>
                    </section>
                    <section className="cuerpo-info">
                        <p id="raza">{"Raza: " + personaje.raza.denominacion}</p>
                        <p id="jugador">{personaje.jugador ? "Jugador: " + personaje.jugador : "Jugador: No asignado"}</p>
                        <hr className="black" />
                        <p id="informacion" className="con-espacios">{personaje.informacion ? personaje.informacion : "No hay información del personaje"}</p>
                        <hr className="black" />
                        <p id="creacion" className="small">{"Creación: " + personaje.creacion}</p>
                        <p id="modificacion" className="small">{"Modificacion: " + personaje.modificacion}</p>
                    </section>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default VerPersonaje;