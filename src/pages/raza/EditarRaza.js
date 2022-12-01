import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import { getRaza, actualizarRaza } from '../../peticiones';
import FormRaza from '../../components/FormRaza';

/**
 * Componente que representa la interfaz de edición de raza - Lumbre
 * 
 * @author Sara Vidal García
 */
function EditarRaza(){

    /**
     * Almacena la información de la raza
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
    }, []);

    /**
     * Devuelve un JSON con los datos del formulario 
     */
    const getDatosFormulario = () => {
        return {
            denominacion: document.getElementById('denominacion').value,
            descripcion: document.getElementById('descripcion').value,
            modificacion: new Date()
        };
    }

    /**
     * Llama a la función que hace la petición a la API para actualizar la raza con los datos del 
     * formulario y procesa el resultado 
     */
    const actualizar = async (event) => {
        event.preventDefault();
        let datos = getDatosFormulario();
        let resultado = await actualizarRaza(datos);
        if (resultado !== "OK")
            document.getElementById("error").innerHTML = "Se ha producido un error al modificar la raza";
        else
            window.location.href = "/raza/ver";
    }

    /**
     * Contenido de la interfaz de edición de raza
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <section className="cabecera-info">
                        <h3>Editar raza</h3>
                    </section>
                    <FormRaza key={raza.denominacion} denominacion={raza.denominacion} descripcion={raza.descripcion} boton={"Actualizar"} accion={actualizar} />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default EditarRaza;