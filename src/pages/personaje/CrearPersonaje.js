import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import FormPersonaje from '../../components/FormPersonaje';
import { crearPersonaje, getRazas } from '../../peticiones';

function CrearPersonaje(props){

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {document.title = props.title + " - Lumbre"}, []);

    const [razas, setRazas] = useState([]); 

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login
     * Si lo está, recupera las razas para cubrir el desplegable de selección de raza
     */
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token") == null)
                window.location.replace("/login");
            else {
                document.getElementById("menu-ppal-personajes").classList.add("actual");
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                setRazas(await getRazas());
                document.getElementById("imagen-personaje").required = true;
            }
        }
        fetchData().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    /**
     * Llama a la función que hace la petición a la API para crear el personaje con los datos del 
     * formulario y procesa el resultado 
     */
    async function crear(event) {
        event.preventDefault();
        let datos = new FormData(document.getElementById("form-personaje"));
        let resultado = await crearPersonaje(datos);
        if (resultado !== "OK") {
            document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al crear el personaje";
        }
        else {
            window.location.href = "/personajes";
        }
    }

    
    return(
    <>
    <Cabecera />
        <main className="contenido">
        <MenuPpal />
            <section className="info">
                <section className="cabecera-info">
                    <h3>Nuevo personaje</h3>
                </section>
                <FormPersonaje razas={razas} accion={crear} boton={"Crear"}/>
            </section>
        </main>
        <Footer />
    </>
    );
}

export default CrearPersonaje;