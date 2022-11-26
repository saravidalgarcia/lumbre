import React, { useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import FormRaza from '../../components/FormRaza';
import { crearRaza } from '../../peticiones';

function CrearRaza(){
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
    },[]);

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
         async function crear(event) {
            event.preventDefault();
            let datos = getDatosFormulario();
            let resultado = await crearRaza(datos);
            if (resultado !== "OK") {
                document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al crear la raza";
            }
            else {
                window.location.href = "/razas";
            }
        }
    
    return(
    <>
    <Cabecera />
        <main className="contenido">
        <MenuPpal />
            <section className="info">
                <section className="cabecera-info">
                    <h3>Nueva raza</h3>
                </section>
                <FormRaza accion={crear} boton={"Crear"}/>
            </section>
        </main>
        <Footer />
    </>
    );
}

export default CrearRaza;