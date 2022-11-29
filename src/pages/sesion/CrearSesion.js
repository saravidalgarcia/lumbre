import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import FormSesion from '../../components/FormSesion';
import { crearSesion, getCampanha, getCampanhas } from '../../peticiones';

/**
 * Componente que representa la interfaz de creación de sesión - Lumbre
 * 
 * @author Sara Vidal García
 */
function CrearSesion(props) {

    /**
     * Almacena las campañas (para el desplegable de campaña)
     */
    const [campanhas, setCampanhas] = useState([]);

    /**
     * Actualiza el título de la página
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { document.title = props.title + " - Lumbre" }, []);

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login
     * Si lo está, determina si se está creando la sesión para una campaña concreta o
     * no y, en función de eso, recupera los nombres de campañas para cubrir el desplegable
     * del formulario
     */
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token") == null)
                window.location.replace("/login");
            else {
                document.getElementById("menu-ppal-sesiones").classList.add("actual");
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                if (localStorage.getItem("id_campanha") == null) {
                    setCampanhas(await getCampanhas());
                }
                else {
                    let campanha = await getCampanha();
                    setCampanhas([campanha]);
                }
            }
        }
        fetchData().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            creacion: new Date(),
            modificacion: new Date()
        };
    }

    /**
     * Llama a la función que hace la petición a la API para crear la sesión con los datos del 
     * formulario y procesa el resultado 
     */
    const crear = async (event) => {
        event.preventDefault();
        let datos = getDatosFormulario();
        let resultado = await crearSesion(datos);
        if (resultado !== "OK")
            document.getElementById("error").innerHTML = "Se ha producido un error al crear la sesión";
        else
            if (localStorage.getItem("id_campanha") == null)
                window.location.href = "/sesiones";
            else
                window.location.href = "/campanha/ver";
    }

    /**
     * Contenido de la interfaz de creación de sesión
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <section className="cabecera-info">
                        <h3>Nueva sesión</h3>
                    </section>
                    <FormSesion completada={false} campanhas={campanhas} accion={crear} boton={"Crear"} />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default CrearSesion;