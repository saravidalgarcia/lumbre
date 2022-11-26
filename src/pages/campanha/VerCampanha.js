import React, { useState, useEffect } from 'react';
import Cabecera from '../../components/Cabecera';
import Footer from '../../components/Footer';
import MenuPpal from '../../components/MenuPpal';
import { getCampanha, getPersonajes, addPersonajeCampanha, removePersonajeCampanha, eliminarCampanha, eliminarSesionCampanha } from '../../peticiones';

function VerCampanha(props){

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {document.title = props.title + " - Lumbre"}, []);

    const [campanha, setCampanha] = useState({id: 0, titulo:"Título",resumen:"Resumen",creacion:"", modificacion:"", personajes:[]}); 
    const [sesiones, setSesiones] = useState([]);

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login
     * Si lo está, recupera la información de la campaña de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token") === null)
            window.location.replace("/login");
            else {
                document.getElementById("menu-ppal-campanhas").classList.add("actual");
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                localStorage.removeItem("id_sesion");
                let data = await getCampanha();
                setCampanha(data);
                setSesiones(data.sesiones);
                cubrirDesplegable();
            }
          }
          fetchData().catch(console.error);  
          // eslint-disable-next-line react-hooks/exhaustive-deps     
    },[]);

    useEffect(() => {
        if(sesiones.length > 0){
          document.getElementById("mensaje-sin-sesiones").innerHTML = "";
          document.getElementById("tabla-sesiones").style.display = "";
        }
        else{
            document.getElementById("mensaje-sin-sesiones").innerHTML = "No hay sesiones para esta campaña.";
            document.getElementById("tabla-sesiones").style.display = "none";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sesiones]);

    useEffect(() => {
        if(campanha.personajes.length > 0){
            document.getElementById("mensaje-sin-personajes").innerHTML = "";
            document.getElementById("tabla-personajes").style.display = "";
        }else{
            document.getElementById("mensaje-sin-personajes").innerHTML = "No hay personajes asociados a esta campaña.";
            document.getElementById("tabla-personajes").style.display = "none";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[campanha]);

    /**
     * Redirecciona al usuario a la página de edición de campaña
     */
    function editar() {
        window.location.href = "/campanha/editar";
    }
    
    /**
     * Cubre el desplegable de personajes asociables a la campaña 
     * descartando los que ya están asociados
     * @param pc - Personajes ya asociados a la campaña
     */
    async function cubrirDesplegable() {
        let pc = campanha.personajes;
        let personajes = await getPersonajes();
        if (personajes.length > pc.length) {
        let select = document.getElementById("add-personaje");
        select.removeChild(select.firstChild);
        for (let i = 0; i < personajes.length; i++) {
            let repetido = false;
            for (let j = 0; j < pc.length; j++) {
            if (personajes[i].id === pc[j].id) {
                repetido = true;
                break;
            }
            }
            if (!repetido) {
            let option = document.createElement("option");
            option.value = personajes[i].id;
            option.innerText = personajes[i].nombre;
            select.appendChild(option);
            }
        }
        }
    }
    
    /**
     * Recupera el nombre del personaje que se quiere añadir a la
     * campaña y llama a la función pertinente 
     */
    function addPersonaje(event) {
        event.preventDefault();
        var e = document.getElementById("add-personaje");
        var value = e.options[e.selectedIndex].value;
        if (value === 0) return;
        addPersonajeCampanha(value);
    }
    
    /**
     * Redirecciona al usuario a la página de visualización del personaje
     * con el id dado
     * @param id 
     */
    function verPersonaje(id) {
        localStorage.id_personaje = id;
        window.location.href = "/personaje/ver";
    }
    
    /**
     * Solicita confirmación al usuario y, en caso afirmativo, llama a la
     * función que hace la petición de borrado de campaña a la API y
     * procesa el resultado
     */
    async function eliminar() {
        if (window.confirm("¿Seguro que quieres borrar esta campaña?")) {
        let resultado = await eliminarCampanha();
        if (resultado !== "OK") {
            document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al eliminar la campaña";
        }
        else {
            window.location.href = "/campanhas";
        }
        }
    }
    
    /**
     * Redirecciona al usuario a la página de creación de sesión
     */
    function addSesion() {
        window.location.href = "/sesion/crear";
    }
    
    /**
     * Redirecciona al usuario a la página de visualización de sesión
     * con el id dado
     * @param id 
     */
    function verSesion(id) {
        localStorage.id_sesion = id;
        window.location.href = "/sesion/ver";
    }
    
    /**
     * Solicita confirmación y, en caso afirmativo, llama a la función que hace
     * la petición a la API para borrar la sesión con el id dado y procesa los
     * resultados
     * @param id 
     */
    async function eliminarSesion(id) {
        if (window.confirm("¿Seguro que quieres borrar esta sesión?")) {
        localStorage.id_sesion = id;
        let resultado = await eliminarSesionCampanha();
        if (resultado !== "OK") {
            document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al eliminar la sesión";
        }
        else {
            window.location.href = "/campanha/ver";
        }
        }
    }
    
    /**
     * Muestra uno de los apartados de campaña (información, personajes o sesiones)
     * y oculta los demás según el id recibido
     * @param id 
     */
    function mostrar(id) {
        for (let c of document.querySelectorAll('.contenedor')) {
        if (!c.classList.contains("oculto"))
            c.classList.add("oculto");
        }
        document.getElementById(id).classList.remove("oculto");
        for (let c of document.querySelectorAll('.tab')) {
        if (c.classList.contains("actual"))
            c.classList.remove("actual");
        }
        document.querySelector('.tab-' + id).classList.add("actual");
    }

    return(
    <>
    <Cabecera />
        <main className="contenido">
        <MenuPpal />
        <section className="info">
            <p id="mensaje-feedback" className="mensaje-feedback"></p>
            <section className="cabecera-info">
                <h3 id="titulo">{campanha.titulo}</h3>
                <div className="contenedor-botones-titulo">
                    <button title="Editar campaña" onClick={editar}>Editar</button>
                    <button title="Eliminar campaña" onClick={eliminar}>Eliminar</button>
                </div>
            </section>
            <section id="campanha" className="ver-campanha">
                <ul className="ul-tabs">
                    <li className="tab tab-datos actual" onClick={() => mostrar('datos')}>Información</li>
                    <li className="tab tab-personajes" onClick={() => mostrar('personajes')}>Personajes</li>
                    <li className="tab tab-sesiones" onClick={() => mostrar('sesiones')}>Sesiones</li>
                </ul>

                <div className="contenedor" id="datos">
                    <h4 id="resumen">{campanha.resumen}</h4>
                    <p className="con-espacios" id="informacion">{campanha.informacion ? campanha.informacion : "No hay información de la campaña."}</p>
                    <hr className="black"/>
                    <p id="creacion" className="small">{"Creación: " + campanha.creacion}</p>
                    <p id="modificacion" className="small">{"Modificación: " + campanha.modificacion}</p>
                </div>

                <div className="contenedor oculto" id="personajes">
                    <form id="form-add-personaje" className="form-add-personaje" onSubmit={addPersonaje}>
                        <select className="selector" id="add-personaje">
                            <option id="opcion-defecto" value="0">No hay personajes disponibles</option>
                        </select>
                        <button type="submit" title="Añadir personaje">Añadir</button>
                    </form>
                    <section className="section-pjs-campanha" id="contenedor-personajes">
                        <p className="mensaje centrado" id="mensaje-sin-personajes">No hay personajes asociados a esta campaña.</p>
                        <div className="contenedor-tabla contenedor-tabla-personajes">
                            <table className="tabla-personajes" id="tabla-personajes">
                                <thead>
                                    <tr>
                                        <th scope="col">Imagen</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Raza</th>
                                        <th scope="col">Jugador</th>
                                        <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody id="filas-personajes">
                                    {campanha.personajes.map((p) =>
                                    <tr key={p.id}>
                                        <td className="t-personaje t-hidden">
                                            <img id="imagen" alt={`Imagen ${p.nombre}`} src={`data:image/jpeg;base64,${p.imagen}`} style={{width: "50px", height: "50px"}}/>
                                        </td>
                                        <td className="t-personaje">{p.nombre}</td>
                                        <td className="t-personaje">{p.raza.denominacion}</td>
                                        <td className="t-personaje">{p.jugador ? p.jugador : "No asignado"}</td>
                                        <td className="t-personaje t-opciones">
                                            <button className="b-opcion-tabla" onClick={() => verPersonaje(p.id)} title="Ver personaje">Ver</button>
                                            <button className="b-opcion-tabla" onClick={() => removePersonajeCampanha(p.id)} title="Quitar personaje">Quitar</button>
                                        </td>

                                    </tr>

                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <p className="mensaje centrado" id="mensaje-error"></p>
                </div>

                <div className="contenedor oculto" id="sesiones">
                    <div className="add-sesion">
                        <button className="boton-add-sesion" onClick={addSesion} title="Añadir sesión">Añadir nueva sesión</button>
                    </div>
                    <section className="section-sesiones-campanha" id="contenedor-sesiones">
                        <p className="mensaje centrado" id="mensaje-sin-sesiones">No hay sesiones para esta campaña.</p>
                        <div className="contenedor-tabla contenedor-tabla-sesiones">
                        <table className="tabla-sesiones" id="tabla-sesiones">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Fecha y hora</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody id="filas-sesiones">
                        {
                            sesiones.map((s) =>
                                <tr key = {s.id}>
                                    <td className="t-sesion">{s.nombre}</td>
                                    <td className="t-sesion">{s.estado}</td>
                                    <td className="t-sesion">{s.fecha ? s.fecha.replace("T", " ") : "Sin fecha"}</td>
                                    <td className="t-sesion t-opciones">
                                        <button className="b-opcion-tabla" onClick={() => verSesion(s.id)} title="Ver sesión">Ver</button>
                                        <button className="b-opcion-tabla" onClick={() => eliminarSesion(s.id)} title="Eliminar sesión">Eliminar</button>
                                    </td>
                                </tr>
                            )
                        }     
                </tbody>
            </table>
        </div>
                    </section>
                </div>

            </section>
        </section>
    </main>
        <Footer />
    </>
    );
}

export default VerCampanha;