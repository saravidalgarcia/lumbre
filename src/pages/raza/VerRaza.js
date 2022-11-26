import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import { getRaza, eliminarRaza } from '../../peticiones';

function VerRaza(){

    const [raza, setRaza] = useState({denominacion: "", descripcion: "", creacion:"", modificacion:""}); 

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
                document.getElementById("menu-ppal-razas").classList.add("actual");
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                let data = await getRaza();
                setRaza(data);
            }
        }
        fetchData().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if(raza.tipo === "Propia"){
            document.getElementById("botones-raza").style.display = "";
        }else{
            document.getElementById("botones-raza").style.display = "none";
        }
    },[raza]);

    /**
     * Redirecciona al usuario a la página de edición de raza
     */
    function editar() {
        window.location.href = "/raza/editar";
    }

    /**
     * Solicita confirmación al usuario y, en caso afirmativo, llama a la
     * función que hace la petición de borrado de raza a la API y
     * procesa el resultado
     */
    async function eliminar() {
        if (window.confirm("¿Seguro que quieres borrar esta raza?")) {
            let resultado = await eliminarRaza(localStorage.id_raza);
            if (resultado !== "OK") {
                document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al eliminar la raza";
            }
            else {
                window.location.href = "/razas";
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
                <h3 id="denominacion">{raza.denominacion}</h3>
                <div className="contenedor-botones-titulo" id="botones-raza">
                    <button title="Editar raza" onClick={editar}>Editar</button>
                    <button title="Eliminar raza" onClick={eliminar}>Eliminar</button>
                </div>
            </section>
            <section className="cuerpo-info">
                <p className="con-espacios" id="descripcion">{raza.descripcion ? raza.descripcion : "No hay información de la raza."}</p>
                <hr className="black"/>
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