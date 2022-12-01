import React from 'react';
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import { login } from '../peticiones';

/**
 * Componente que representa la interfaz de inicio de sesión - Lumbre
 * 
 * @author Sara Vidal García
 */
function Login(){

    /**
     * Llama a la función que hace la petición de login a la API con los datos
     * del formulario y procesa el resultado 
     */
    const enviar = async e => {
        e.preventDefault();
        let datos = {};
        datos.username = document.getElementById('username').value;
        datos.passwd = document.getElementById('passwd').value;
        let respuesta = await login(datos);
        if (respuesta.status === 200) {
            localStorage.token = await respuesta.text();
            localStorage.username = datos.username;
            window.location.replace("/campanhas");
        } else
            document.getElementById("mensaje-feedback").innerHTML = "Credenciales incorrectas.";
    };

    /**
     * Contenido de la interfaz de inicio de sesión
     */
    return (
        <>
            <main className="login">
                <section className="s-login left">
                    <div className="lumbre-texto" title="LUMBRE" alt="Logo de LUMBRE" />
                    <h2>Una web pensada por y para Dungeon Masters</h2>
                    <p>para organizar fácilmente tus campañas, sesiones y personajes.</p>
                </section>
                <section className="s-login right">
                    <div className="div-form login-form">
                        <section>
                            <form onSubmit={enviar}>
                                <input type="text" id="username" name="username" placeholder="Nombre de usuario" required /><br />
                                <input type="password" id="passwd" name="passwd" placeholder="Contraseña" required /><br />
                                <input className="boton" title="Iniciar sesión" type="submit" value="Iniciar sesión" />
                            </form>
                            <p id="mensaje-feedback" className="mensaje-feedback" />
                        </section>
                        <hr />
                        <section>
                            <p>¿No tienes cuenta?</p>
                            <Link className="boton" to="/registro" title="Crear cuenta" type="button">Crear cuenta</Link>
                        </section>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Login;