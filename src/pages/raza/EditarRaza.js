import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import { getRaza, actualizarRaza } from '../../peticiones';
import FormRaza from '../../components/FormRaza';

function EditarRaza(props){

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {document.title = props.title + " - Lumbre"}, []);

    const [razas, setRazas] = useState([{denominacion:"", descripcion:"", creacion: "", modificacion: ""}]); 

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login
     * Si lo está, recupera la información de la raza de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token") == null)
            window.location.replace("/login");
            else {
                document.getElementById("menu-ppal-razas").classList.add("actual");
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                let data = await getRaza();
                setRazas([data]);
            }
          }
          fetchData().catch(console.error);       
    },[]);

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
    async function actualizar(event) {
        event.preventDefault();
        let datos = getDatosFormulario();
        let resultado = await actualizarRaza(datos);
        if (resultado !== "OK") {
            document.getElementById("error").innerHTML = "Se ha producido un error al modificar la raza";
        }
        else {
            window.location.href = "/raza/ver";
        }
    }

    return(
    <>
    <Cabecera />
        <main className="contenido">
        <MenuPpal />
            <section className="info">
                <section className="cabecera-info">
                    <h3>Editar raza</h3>
                </section>
                { razas.map((raza) =>
                <FormRaza key={raza.denominacion} denominacion={raza.denominacion} descripcion={raza.descripcion} boton={"Actualizar"} accion={actualizar} />
                )  
                }
                
            </section>
        </main>
        <Footer />
    </>
    );
}

export default EditarRaza;