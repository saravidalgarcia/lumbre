import React, { useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import FormCampanha from '../../components/FormCampanha';
import { crearCampanha } from '../../peticiones';

/**
 * Componente que representa la interfaz de creación de campaña - Lumbre
 * 
 * @author Sara Vidal García
 */
function CrearCampanha() {

    /**
     * Se establece el nombre de usuario y la sección actual
     */
    useEffect(() => {
        document.getElementById("menu-ppal-campanhas").classList.add("actual");
        document.getElementById("username").innerHTML = localStorage.getItem("username");
    }, []);

    /**
     * Devuelve un JSON con los datos del formulario 
     */
    const getDatosFormulario = () => {
        return {
            titulo: document.getElementById('titulo').value,
            resumen: document.getElementById('resumen').value,
            informacion: document.getElementById('informacion').value,
            creacion: new Date(),
            modificacion: new Date()
        };
    }

    /**
     * Llama a la función que hace la petición a la API para crear la campaña con los datos del 
     * formulario y procesa el resultado 
     */
    const crear = async (event) => {
        event.preventDefault();
        let datos = getDatosFormulario();
        let resultado = await crearCampanha(datos);
        if (resultado !== "OK")
            document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al crear la campaña";
        else
            window.location.href = "/campanhas";
    }

    /**
     * Contenido de la interfaz de creación de campaña
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <section className="cabecera-info">
                        <h3>Nueva campaña</h3>
                    </section>
                    <FormCampanha accion={crear} boton={"Crear"} />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default CrearCampanha;