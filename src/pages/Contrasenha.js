import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Cabecera from '../components/Cabecera';
import Footer from '../components/Footer';
import { actualizar } from '../peticiones';

function Contrasenha(){

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login
     */
    useEffect(() => {
        if (localStorage.getItem("token") === null)
            window.location.replace("/login");
        else {
            document.getElementById("username").innerHTML = localStorage.getItem("username");
        }
    },[]);

    /**
     * Llama a la función que comprueba la información introducida en el
     * formulario de cambio de contraseña antes de permitir el envío de
     * los nuevos datos
     * @param event
     */
    function enviar(event) {
        event.preventDefault();
        checkActualizacion();
    }

    /**
     * Comprueba que los datos del formulario son correctos y llama
     * a la función que actualiza la contraseña
     */
    function checkActualizacion() {
        let passwd = document.getElementById("passwd");
        let passwdn = document.getElementById("passwdn");
        let passwdn2 = document.getElementById("passwdn2");
        let mensaje = document.getElementById("mensaje-feedback");
        //Comprobaciones: 
        //Contraseña de 8 o más caracteres, una mayúscula, una minúscula y un número
        let patron = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwdn.value.match(patron)) {
            mensaje.innerHTML = "La contraseña debe tener 8 o más caracteres, y contener mayúsculas, minúsculas y números.";
            passwdn.focus();
            return;
        }
        //Contraseñas coincidentes
        if (passwdn.value !== passwdn2.value) {
            mensaje.innerHTML = "Las contraseñas introducidas deben coincidir.";
            passwd.focus();
            return;
        }
        actualizarContrasenha(passwd.value, passwdn.value);
    }

    /**
     * Prepara los datos a enviar, llama a la función que hace la petición a la API
     * y procesa el resultado
     */
    async function actualizarContrasenha(oldP, newP) {
        let datos = {};
        datos.email = newP;
        datos.username = localStorage.username;
        datos.passwd = oldP;
        let resultado = await actualizar(datos);
        if (resultado === "OK") {
            window.location.href = "/campanhas";
        } else {
            if (resultado === "ERROR")
                document.getElementById("mensaje-feedback").innerHTML = "La contraseña actual introducida es incorrecta.";
            else
                document.getElementById("mensaje-feedback").innerHTML = "Error en la actualización de la contraseña.";
        }
    }

    return(
    <>
        <Cabecera />
        <main className="registro">
        <div className="div-form registro-form">
          <section>
            <form onSubmit={enviar}>
              <input type="password" id="passwd" name="passwd" placeholder="Contraseña actual" required /><br />
              <input type="password" id="passwdn" name="passwd" placeholder="Contraseña nueva" required /><br />
              <input type="password" id="passwdn2" name="passwd2" placeholder="Repetir contraseña nueva" required /><br />
              <input className="boton" title="Actualizar contraseña" type="submit" defaultValue="Actualizar" />
            </form>
            <p id="mensaje-feedback" className="mensaje-feedback" />
          </section>
          <hr />
          <section>
            <Link to='/campanhas' className="boton" title="Volver" type="button">Volver</Link>
          </section>
        </div>
      </main>
        <Footer />
    </>
    );
}

export default Contrasenha;