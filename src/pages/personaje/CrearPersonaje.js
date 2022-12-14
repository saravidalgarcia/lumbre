import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import FormPersonaje from '../../components/FormPersonaje';
import { crearPersonaje, getRazas } from '../../peticiones';

/**
 * Componente que representa la interfaz de creación de personaje - Lumbre
 * 
 * @author Sara Vidal García
 */
function CrearPersonaje(){

    /**
     * Se almacena la información de las razas (para mostrarla en el desplegable)
     */
    const [razas, setRazas] = useState([]);

    /**
     * Se establece el nombre de usuario y la sección actual, y se recuperan las razas para cubrir
     * el desplegable de selección de raza
     */
    useEffect(() => {
        const fetchData = async () => {
            document.getElementById("menu-ppal-personajes").classList.add("actual");
            document.getElementById("username").innerHTML = localStorage.getItem("username");
            setRazas(await getRazas());
            document.getElementById("imagen-personaje").required = true;
        }
        fetchData().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Llama a la función que hace la petición a la API para crear el personaje con los datos del 
     * formulario y procesa el resultado 
     */
    const crear = async (event) => {
        event.preventDefault();
        let datos = new FormData(document.getElementById("form-personaje"));
        let resultado = await crearPersonaje(datos);
        if (resultado !== "OK")
            document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al crear el personaje";
        else
            window.location.href = "/personajes";
    }

    /**
     * Contenido de la interfaz de creación de personaje
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <section className="cabecera-info">
                        <h3>Nuevo personaje</h3>
                    </section>
                    <FormPersonaje razas={razas} accion={crear} boton={"Crear"} />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default CrearPersonaje;