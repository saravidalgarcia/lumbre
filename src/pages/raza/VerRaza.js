import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import { getRaza, eliminarRaza, getPersonajes } from '../../peticiones';

/**
 * Componente que representa la interfaz de visualización de una raza - Lumbre
 * 
 * @author Sara Vidal García
 */
function VerRaza(){

    /**
     * Se almacena la información de la raza
     */
    const [raza, setRaza] = useState({ denominacion: "", descripcion: "", creacion: "", modificacion: "" });

    /**
     * Se establece el nombre de usuario y la sección actual, y se recupera la información
     * de la raza de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            document.getElementById("menu-ppal-razas").classList.add("actual");
            document.getElementById("username").innerHTML = localStorage.getItem("username");
            setRaza(await getRaza());
        }
        fetchData().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Se determina si la raza tiene opciones de editar y borrar
     * en función de su tipo
     */
    useEffect(() => {
        if (raza.tipo === "Propia") {
            document.getElementById("botones-raza").style.display = "";
        } else {
            document.getElementById("botones-raza").style.display = "none";
        }
    }, [raza]);

    /**
     * Redirecciona al usuario a la página de edición de raza
     */
    const editar = () => {
        window.location.href = "/raza/editar";
    }

    /**
     * Comprueba si hay algún personaje con la raza recibida
     * por parámetro asociada
     * @param raza - El id de la raza 
     * @param personajes - Los personajes del usuario
     */
    const checkPersonajes = (raza, personajes) => {
        let tienePjs = false;
        personajes.forEach(personaje => {
            if (personaje.raza.id.toString() === raza.toString()) {
                tienePjs = true;
            }
        });
        return tienePjs;
    }

    /**
     * Comprueba que la raza se pueda borrar (que no existan personajes
     * con esa raza asociada).
     * Solicita confirmación al usuario y, en caso afirmativo, llama a la
     * función que hace la petición de borrado de raza a la API y
     * procesa el resultado
     */
    const eliminar = async () => {
        let id = localStorage.id_raza;
        let personajes = await getPersonajes();
        let tienePjs = checkPersonajes(id, personajes);
        if (tienePjs) {
            document.getElementById("mensaje-feedback").innerHTML = "No se puede borrar una raza con personajes asociados, elimine o cambie de raza a sus personajes primero.";
            document.getElementById("mensaje-feedback").focus();
        } else {
            if (window.confirm("¿Seguro que quieres borrar esta raza?")) {
                let resultado = await eliminarRaza(id);
                if (resultado !== "OK")
                    document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al eliminar la raza";
                else
                    window.location.href = "/razas";
            }
        }
    }

    /**
     * Contenido de la interfaz de visualización de una raza
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <p id="mensaje-feedback" className="mensaje-feedback"></p>
                    <section className="cabecera-info" id="contenedor-botones">
                        <h3 id="denominacion">{raza.denominacion}</h3>
                        <div className="contenedor-botones-titulo" id="botones-raza">
                            <button title="Editar raza" onClick={editar}>Editar</button>
                            <button title="Eliminar raza" onClick={eliminar}>Eliminar</button>
                        </div>
                    </section>
                    <section className="cuerpo-info">
                        <p className="con-espacios" id="descripcion">{raza.descripcion ? raza.descripcion : "No hay información de la raza."}</p>
                        <hr className="black" />
                        <p id="creacion" className="small">{"Creación: " + (raza.creacion ? raza.creacion : "-")}</p>
                        <p id="modificacion" className="small">{"Modificacion: " + (raza.modificacion ? raza.modificacion : "-")}</p>
                    </section>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default VerRaza;