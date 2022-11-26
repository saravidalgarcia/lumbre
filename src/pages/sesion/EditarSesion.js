import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import { getSesion, actualizarSesion } from '../../peticiones';
import FormSesion from '../../components/FormSesion';

function EditarSesion(props){

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {document.title = props.title + " - Lumbre"}, []);

    const [sesiones, setSesiones] = useState([{nombre: "Nombre", campanha:{}, creacion:"", modificacion:""}]);

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login
     * Si lo está, recupera la información de la sesión de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token") == null)
            window.location.replace("/login");
            else {
                document.getElementById("menu-ppal-sesiones").classList.add("actual");
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                let data = await getSesion();
                setSesiones([data]);  
            }
          }
          fetchData().catch(console.error);
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() =>{
        if (sesiones[0].estado === "Completada"){
            document.getElementById("estado").checked = true;
            let resultado = document.createElement("textarea");
            resultado.classList.add("con-espacios");
            resultado.id = "resultados";
            resultado.placeholder = "Resumen de la sesión";
            resultado.rows = "10";
            resultado.defaultValue=(sesiones[0].resultados) ? sesiones[0].resultados : "";
            document.getElementById("contenedor-resultados").appendChild(resultado);
        }  
    },[sesiones]);

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
    async function actualizar(event) {
    event.preventDefault();
    let datos = getDatosFormulario();
    let resultado = await actualizarSesion(datos);
    if (resultado !== "OK") {
        document.getElementById("error").innerHTML = "Se ha producido un error al actualizar la sesión";
    }
    else {
        window.location.href = "/sesion/ver";
    }

    }

    return(
    <>
    <Cabecera />
        <main className="contenido">
        <MenuPpal />
            <section className="info">
                <section className="cabecera-info">
                    <h3>Editar sesión</h3>
                </section>
                { sesiones.map((sesion) =>
                    <FormSesion key={sesion.nombre} nombre={sesion.nombre} campanhas={[sesion.campanha]} planificacion={sesion.planificacion} boton={"Actualizar"} fecha={sesion.fecha} resultados={sesion.resultados} accion={actualizar}/>
                )  
                }
            </section>
        </main>
        <Footer />
    </>
    );
}

export default EditarSesion;