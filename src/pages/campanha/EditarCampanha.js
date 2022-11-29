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
function EditarCampanha(props) {

    /**
     * Almacena la información de la campaña
     */
    const [campanhas, setCampanhas] = useState([{ titulo: "Título", resumen: "Resumen", creacion: "", modificacion: "" }]);

    /**
     * Actualiza el título de la página
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { document.title = props.title + " - Lumbre" }, []);

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login
     * Si lo está, recupera la información de la campaña de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token") == null)
                window.location.replace("/login");
            else {
                document.getElementById("menu-ppal-campanhas").classList.add("actual");
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                let data = await getCampanha();
                setCampanhas([data]);
            }
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
                    {campanhas.map((campanha) =>
                        <FormCampanha key={campanha.titulo} titulo={campanha.titulo} resumen={campanha.resumen} informacion={campanha.informacion} boton={"Actualizar"} accion={actualizar} />
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}

export default EditarCampanha;