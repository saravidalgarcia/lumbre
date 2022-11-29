import React, { useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import FormRaza from '../../components/FormRaza';
import { crearRaza } from '../../peticiones';

/**
 * Componente que representa la interfaz de creación de raza - Lumbre
 * 
 * @author Sara Vidal García
 */
function CrearRaza(props) {

    /**
     * Actualiza el título de la página
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { document.title = props.title + " - Lumbre" }, []);

    /**
      * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
      * la página de login
      */
    useEffect(() => {
        if (localStorage.getItem("token") == null)
            window.location.replace("/login");
        else {
            document.getElementById("menu-ppal-razas").classList.add("actual");
            document.getElementById("username").innerHTML = localStorage.getItem("username");
        }
    }, []);

    /**
     * Devuelve un JSON con los datos del formulario 
     */
    const getDatosFormulario = () => {
        return {
            denominacion: document.getElementById('denominacion').value,
            descripcion: document.getElementById('descripcion').value,
            tipo: "Propia",
            creacion: new Date(),
            modificacion: new Date()
        };
    }

    /**
     * Llama a la función que hace la petición a la API para crear la raza con los datos del 
     * formulario y procesa el resultado 
     */
    const crear = async (event) => {
        event.preventDefault();
        let datos = getDatosFormulario();
        let resultado = await crearRaza(datos);
        if (resultado !== "OK")
            document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al crear la raza";
        else
            window.location.href = "/razas";
    }

    /**
     * Contenido de la interfaz de creación de raza
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <section className="cabecera-info">
                        <h3>Nueva raza</h3>
                    </section>
                    <FormRaza accion={crear} boton={"Crear"} />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default CrearRaza;