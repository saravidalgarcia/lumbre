import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import { getCampanha, actualizarCampanha } from '../../peticiones';
import FormCampanha from '../../components/FormCampanha';

/**
 * Componente que representa la interfaz de edición de campaña - Lumbre
 * 
 * @author Sara Vidal García
 */
function EditarCampanha(){

    /**
     * Almacena la información de la campaña
     */
    const [campanha, setCampanha] = useState({ titulo: "", resumen: "", creacion: "", modificacion: "" });

    /**
     * Se establece el nombre de usuario y la sección actual, y se recupera la información de la
     * campaña de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            document.getElementById("menu-ppal-campanhas").classList.add("actual");
            document.getElementById("username").innerHTML = localStorage.getItem("username");
            setCampanha(await getCampanha());
        }
        fetchData().catch(console.error);
    }, []);

    /**
     * Devuelve un JSON con los datos del formulario 
     */
    const getDatosFormulario = () => {
        return {
            titulo: document.getElementById('titulo').value,
            resumen: document.getElementById('resumen').value,
            informacion: document.getElementById('informacion').value,
            modificacion: new Date()
        };
    }

    /**
     * Llama a la función que hace la petición a la API para actualizar la campaña con los datos del 
     * formulario y procesa el resultado 
     */
    const actualizar = async (event) => {
        event.preventDefault();
        let datos = getDatosFormulario();
        let resultado = await actualizarCampanha(datos);
        if (resultado !== "OK")
            document.getElementById("error").innerHTML = "Se ha producido un error al modificar la campaña";
        else
            window.location.href = "/campanha/ver";
    }

    /**
     * Contenido de la interfaz de edición de campaña
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <section className="cabecera-info">
                        <h3>Editar campaña</h3>
                    </section>
                    <FormCampanha key={campanha.titulo} titulo={campanha.titulo} resumen={campanha.resumen} informacion={campanha.informacion} boton={"Actualizar"} accion={actualizar} />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default EditarCampanha;