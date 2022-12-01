import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import { getSesion, actualizarSesion } from '../../peticiones';
import FormSesion from '../../components/FormSesion';

/**
 * Componente que representa la interfaz de edición de sesión - Lumbre
 * 
 * @author Sara Vidal García
 */
function EditarSesion(){
    
    /**
     * Almacena la información de la sesión
     */
    const [sesion, setSesion] = useState({ nombre: "", campanha: {}, creacion: "", modificacion: "" });

    /**
     * Se establece el nombre de usuario y la sección actual, y se recupera la información
     * de la sesión de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            document.getElementById("menu-ppal-sesiones").classList.add("actual");
            document.getElementById("username").innerHTML = localStorage.getItem("username");
            setSesion(await getSesion());
        }
        fetchData().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Si la sesión está completada, se marca la checkbox y se muestran los resultados
     * de la sesión (si los hay)
     */
    useEffect(() => {
        if (sesion.estado === "Completada") {
            document.getElementById("estado").checked = true;
            let resultado = document.createElement("textarea");
            resultado.classList.add("con-espacios");
            resultado.id = "resultados";
            resultado.placeholder = "Resumen de la sesión";
            resultado.rows = "10";
            resultado.defaultValue = (sesion.resultados) ? sesion.resultados : "";
            document.getElementById("contenedor-resultados").appendChild(resultado);
        }
    }, [sesion]);

    /**
     * Devuelve un JSON con los datos del formulario 
     */
    const getDatosFormulario = () => {
        return {
            nombre: document.getElementById('nombre').value,
            estado: document.getElementById('estado').checked ? "Completada" : "Prevista",
            planificacion: document.getElementById('planificacion').value,
            resultados: document.getElementById('estado').checked ? document.getElementById('resultados').value : null,
            fecha: document.getElementById('fecha').value,
            modificacion: new Date()
        };
    }

    /**
     * Llama a la función que hace la petición a la API para actualizar la sesión con los datos del 
     * formulario y procesa el resultado 
     */
    const actualizar = async (event) => {
        event.preventDefault();
        let datos = getDatosFormulario();
        let resultado = await actualizarSesion(datos);
        if (resultado !== "OK")
            document.getElementById("error").innerHTML = "Se ha producido un error al actualizar la sesión";
        else
            window.location.href = "/sesion/ver";
    }

    /**
     * Contenido de la interfaz de edición de sesión
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <section className="cabecera-info">
                        <h3>Editar sesión</h3>
                    </section>
                    <FormSesion key={sesion.nombre} nombre={sesion.nombre} campanhas={[sesion.campanha]} planificacion={sesion.planificacion} boton={"Actualizar"} fecha={sesion.fecha} resultados={sesion.resultados} accion={actualizar} />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default EditarSesion;