import React, { useState, useEffect } from 'react';
import Cabecera from '../components/Cabecera';
import Footer from '../components/Footer';
import MenuPpal from '../components/MenuPpal';
import TarjetaS from '../components/TarjetaS';
import { getSesiones, getCampanhas } from '../peticiones';

/**
 * Componente que representa la interfaz de visualización de sesiones - Lumbre
 * 
 * @author Sara Vidal García
 */
function Sesiones(props) {

    /**
     * Almacena las sesiones del usuario
     */
    const [sesiones, setSesiones] = useState([]);

    /**
     * Actualiza el título de la página
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { document.title = props.title + " - Lumbre" }, []);

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login
     * Si lo está, se recuperan las sesiones de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token") == null)
                window.location.replace("/login");
            else {
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                localStorage.removeItem("id_sesion");
                localStorage.removeItem("id_campanha");
                document.getElementById("menu-ppal-sesiones").classList.add("actual");
                let data = await getSesiones();
                if (data.length > 0) {
                    setSesiones(data);
                    let campanhas = await getCampanhas();
                    setCampanhas(campanhas);
                }
            }
        }
        fetchData().catch(console.error);
    }, []);

    /**
     * Cada vez que se actualizan las sesiones, se muestran u ocultan
     * los filtros y mensajes
     */
    useEffect(() => {
        if (sesiones.length > 0) {
            document.getElementById("vacio").innerHTML = "";
            document.getElementById("filtros").style.display = "";
        }
        else {
            document.getElementById("vacio").innerHTML = "No hay nada que mostrar aquí todavía.";
            document.getElementById("filtros").style.display = "none";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sesiones]);

    /**
     * Redirecciona al usuario a la página de creación de sesión
     */
    const crearSesion = () => {
        window.location.href = "/sesion/crear";
    }

    /**
     * Establece los nombres de las campañas con sesiones en el desplegable para
     * filtrar por campaña a partir de los datos recibidos de la API
     * @param campanhas  
     */
    const setCampanhas = (campanhas) => {
        if (campanhas.length === 0) return;
        const filtro = document.getElementById("filtro-campanha");
        for (let i = 0; i < campanhas.length; i++) {
            const opcion = document.createElement("option");
            opcion.value = campanhas[i].id;
            opcion.innerText = campanhas[i].titulo;
            filtro.appendChild(opcion);
        }
    }

    /**
     * Filtra las sesiones mostradas según los valores seleccionados en los desplegables
     * de filtro por campaña y estado
     */
    const filtrar = () => {
        let div = document.getElementById("contenedor-sesiones");
        let f1 = document.getElementById("filtro-campanha").value; //Filtro por campaña
        let f2 = document.getElementById("filtro-estado").value; //Filtro por estado
        let sesiones = div.children;
        let contador = 0;
        for (var i = 0; i < sesiones.length; i++) {
            var child = sesiones[i];
            if (f1 !== "0") {
                if (!child.classList.contains("campanha-" + f1)) {
                    child.classList.add("oculto1");
                } else {
                    child.classList.remove("oculto1");
                }
            }
            else {
                child.classList.remove("oculto1");
            }
            if (f2 !== "0") {
                if (!child.classList.contains(f2)) {
                    child.classList.add("oculto2");
                } else {
                    child.classList.remove("oculto2");
                }
            }
            else {
                child.classList.remove("oculto2");
            }
            if (child.classList.contains("oculto1") || child.classList.contains("oculto2")) {
                contador++;
            }
        }
        let p = document.getElementById("vacio");
        if (contador === sesiones.length) {
            p.innerHTML = "No hay sesiones disponibles.";
        }
        else {
            p.innerHTML = "";
        }
    }

    /**
     * Contenido de la interfaz de visualización de sesiones
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <section className="cabecera-info">
                        <h1>Mis Sesiones</h1>
                        <button title="Crear sesion" onClick={crearSesion}>Nueva</button>
                    </section>
                    <section id="sesiones" className="cuerpo-info">
                        <div className="filtros" id="filtros">
                            <select className="filtro" onChange={filtrar} id="filtro-campanha" defaultValue="0">
                                <option value="0">Campaña</option>
                            </select>
                            <select className="filtro" onChange={filtrar} id="filtro-estado" defaultValue="0">
                                <option value="0">Estado</option>
                                <option value="Prevista">Prevista</option>
                                <option value="Completada">Completada</option>
                            </select>
                        </div>
                        <p id="vacio" className="mensaje-noinfo">No hay nada que mostrar aquí todavía.</p>
                        <div className="sesiones" id="contenedor-sesiones">
                            {sesiones.map((s) => 
                                <TarjetaS key={s.id} id={s.id} campanha={s.campanha} nombre={s.nombre} estado={s.estado} fecha={s.fecha} />
                            )}
                        </div>
                    </section>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Sesiones;