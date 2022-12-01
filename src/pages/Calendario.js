import React, { useState, useEffect } from 'react';
import Cabecera from '../components/Cabecera';
import Footer from '../components/Footer';
import MenuPpal from '../components/MenuPpal';
import { getSesiones } from '../peticiones';

/**
 * Componente que representa la interfaz de calendario - Lumbre
 * 
 * @author Sara Vidal García
 */
function Calendario(){

    /**
     * Almacena las sesiones del usuario
     */
    const [sesiones, setSesiones] = useState([]);

    /**
     * Se establece el nombre de usuario y la sección actual, y se recuperan las sesiones
     * del usuario de la API
     */
    useEffect(() => {
        const fetchData = async () => {
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                localStorage.removeItem("id_sesion");
                document.getElementById("menu-ppal-calendario").classList.add("actual");
                setSesiones(await getSesiones());
        }
        fetchData().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Crea el script que contiene la función de la ventana modal
     */
     useEffect(() => {
        const script = document.createElement('script');
        script.innerHTML = `
        function verSesion(idcamp, id) {
            localStorage.id_campanha = idcamp;
            localStorage.id_sesion = id;
            window.location.href = "/sesion/ver";
            }
        `;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    /**
     * Cuando se actualizan las sesiones, genera el calendario
     */
    useEffect(() => {
        crearCalendario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sesiones]);


    //Variables del calendario
    const dias = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    let vista, mes, anterior, siguiente, sesionesdia, mesanterior, messiguiente;

    /**
     * Recibe una fecha y crea el calendario
     * @param fecha 
     */
    const crearCalendario = (fecha) => {
        if (!(fecha instanceof Date)) {
            fecha = new Date();
        }
        vista = document.getElementById("dias");
        mes = document.getElementById("mes");
        anterior = document.getElementById("mes-anterior");
        siguiente = document.getElementById("mes-siguiente");
        mostrar(fecha);
        /**
         * Listeners para mostrar el mes anterior o el siguiente si el usuario pulsa
         * en el botón pertinente
         */
        mesanterior = new Date();
        messiguiente = new Date();
        mesanterior.setMonth(fecha.getMonth() - 1);
        messiguiente.setMonth(fecha.getMonth() + 1);
        mesanterior.setDate(1);
        messiguiente.setDate(1);
        anterior.addEventListener("click", () => mostrar(mesanterior));
        siguiente.addEventListener("click", () => mostrar(messiguiente));
    }

    /**
     * Muestra el calendario relativo al mes recibido en la fecha
     * @param fecha 
     */
    const mostrar = (fecha) => {
        //Obtiene los datos clave para la generación de la vista del calendario
        if (!fecha || (!(fecha instanceof Date))) fecha = new Date();
        var ahora = new Date(fecha),
            y = ahora.getFullYear(),
            m = ahora.getMonth();
        var hoy = new Date();
        var ultimoD = new Date(y, m + 1, 0).getDate();
        var primerD = new Date(y, m, 1).getDay();
        var anteriorM = new Date(y, ahora.getMonth() - 1, 1);
        var siguienteM = new Date(y, ahora.getMonth() + 1, 1);
        //Establece los meses para los botones de cambio de mes
        mesanterior = anteriorM;
        messiguiente = siguienteM;
        //Resetea el calendario
        while (vista.firstChild) {
            vista.removeChild(vista.firstChild);
        }
        //Introduce los huecos necesarios antes del primer día del mes
        for (var x = 0; x < primerD - 1; x++) {
            var hueco = document.createElement("div");
            hueco.className = "hueco";
            vista.appendChild(hueco);
        }
        //Bucle que recorre todos los días del mes
        for (var z = 1; z <= ultimoD; z++) {
            var _date = new Date(y, m, z);
            var dia = document.createElement("div");
            dia.className = "dia";
            dia.textContent = z;
            dia.setAttribute("data-fecha", _date);
            //Comprueba si es el día actual
            if (z === hoy.getDate() && y === hoy.getFullYear() && m === hoy.getMonth()) {
                dia.classList.add("hoy");
            }
            //Comprueba si tiene sesiones asociadas
            if (checkSesiones(dia)) {
                let x = sesionesdia;
                dia.classList.add("tiene-sesiones");
                dia.onclick = function () { mostrarSesiones(x); };
            }
            //Añade el día al calendario
            vista.appendChild(dia);
        }
        //Cubre la información del mes actual, anterior y siguiente
        mes.textContent = meses[ahora.getMonth()] + " " + ahora.getFullYear();
        mes.setAttribute("data-fecha", ahora);
        anterior.textContent = "< " + meses[anteriorM.getMonth()];
        anterior.setAttribute("data-fecha", anteriorM);
        siguiente.textContent = meses[siguienteM.getMonth()] + " >";
        siguiente.setAttribute("data-fecha", siguienteM);
    }

    /**
     * Recibe un día y comprueba si tiene sesiones asociadas
     * @param dia 
     */
    const checkSesiones = (dia) => {
        let fecha = new Date(dia.getAttribute("data-fecha"));
        let f = fecha.getFullYear() + "-" + ((fecha.getMonth() + 1 > 9) ? (fecha.getMonth() + 1) : ("0" + (fecha.getMonth() + 1))) + "-" + ((fecha.getDate() > 9) ? fecha.getDate() : ("0" + fecha.getDate()));
        let tiene = false;
        sesionesdia = `<h3>Sesiones para el ${f}:</h3>`;
        if (sesiones === null || sesiones.length === 0) return false;
        else {
            for (let i = 0; i < sesiones.length; i++) {
                if (sesiones[i].fecha != null) {
                    if (sesiones[i].fecha.includes(f)) {
                        tiene = true;
                        sesionesdia += ("<p><b>" + sesiones[i].fecha.substring(11) + "h&nbsp;&nbsp;</b> " + sesiones[i].nombre + " (" + sesiones[i].campanha.titulo + ")<button onclick='verSesion(" + sesiones[i].campanha.id + "," + sesiones[i].id + ")' title='Ver sesión'>Ver</button></p>");
                    }
                }
            }
            return tiene;
        }
    }


    /* --- VENTANA MODAL --- */

    //Ventana modal
    var modal = document.getElementById("contenedor-sesiones-dia");

    /**
     * Muestra la ventana modal con la información recibida
     * @param info 
     */
    const mostrarSesiones = (info) => {
        modal.style.display = "block";
        document.getElementById("info-sesiones-dia").innerHTML = info;
    }

    /**
     * Oculta la ventana modal si se pulsa en la zona oscurecida de la ventana 
     */
    window.onClick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    /**
     * Contenido de la interfaz de calendario
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <section className="cabecera-info">
                        <h1>Mi Calendario</h1>
                    </section>
                    <section id="sesiones" className="cuerpo-info">
                        <div className="calendario">
                            <div className="vista-calendario" id="vista-calendario">
                                <div className="mes">
                                    <span className="mes-anterior" id="mes-anterior"></span>
                                    <span className="mes-actual" id="mes"></span>
                                    <span className="mes-siguiente" id="mes-siguiente"></span>
                                </div>
                                {dias.map((dia) => <div key={dia} className="cal-dia">{dia}</div>)}
                                <div className="vista-calendario" id="dias"></div>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
            <Footer />
            <div id="contenedor-sesiones-dia" className="modal">
                <div id="sesiones-dia" className="sesiones-dia">
                    <span className="close" onClick={() => modal.style.display = "none"}>&times;</span>
                    <div id="info-sesiones-dia"></div>
                </div>
            </div>
        </>
    );
}

export default Calendario;