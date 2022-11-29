import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import { getPersonaje, actualizarPersonaje, getRazas } from '../../peticiones';
import FormPersonaje from '../../components/FormPersonaje';

/**
 * Componente que representa la interfaz de edición de personaje - Lumbre
 * 
 * @author Sara Vidal García
 */
function EditarPersonaje(props) {

    /**
     * Se almacenan el personaje y las razas (para el desplegable de razas)
     */
    const [personajes, setPersonajes] = useState([{ nombre: "", jugador: "", informacion: "", raza: {}, creacion: "", modificacion: "" }]);
    const [razas, setRazas] = useState([]);

    /**
     * Actualiza el título de la página
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { document.title = props.title + " - Lumbre" }, []);

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login
     * Si lo está, recupera la información de las razas para cubrir el desplegable de
     * elección de raza y recupera la información del personaje
     */
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token") == null)
                window.location.replace("/login");
            else {
                document.getElementById("menu-ppal-personajes").classList.add("actual");
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                setRazas(await getRazas());
                setPersonajes([await getPersonaje()]);
            }
        }
        fetchData().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Llama a la función que hace la petición a la API para actualizar el personaje con los datos del 
     * formulario y procesa el resultado 
     */
    const actualizar = async (event) => {
        event.preventDefault();
        let datos = new FormData(document.getElementById("form-personaje"));
        let resultado = await actualizarPersonaje(datos);
        if (resultado !== "OK")
            document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al actualizar el personaje";
        else
            window.location.href = "/personaje/ver";
    }

    /**
     * Contenido de la interfaz de edición de personaje
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <section className="cabecera-info">
                        <h3>Editar personaje</h3>
                    </section>
                    {personajes.map((personaje) =>
                        <FormPersonaje key={personaje.nombre} nombre={personaje.nombre} jugador={personaje.jugador} informacion={personaje.informacion} raza={personaje.raza.id} razas={razas} accion={actualizar} boton={"Actualizar"} />
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}

export default EditarPersonaje;