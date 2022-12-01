import React, { useState, useEffect } from 'react';
import Cabecera from '../components/Cabecera';
import Footer from '../components/Footer';
import MenuPpal from '../components/MenuPpal';
import { getPersonajes, eliminarPersonaje } from '../peticiones';

/**
 * Componente que representa la interfaz de visualización de personajes - Lumbre
 * 
 * @author Sara Vidal García
 */
function Personajes(){

    /**
     * Se almacenan los personajes del usuario
     */
    const [personajes, setPersonajes] = useState([]);

    /**
     * Se establece el nombre de usuario y la sección actual, y se recuperan los
     * personajes de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            document.getElementById("username").innerHTML = localStorage.getItem("username");
            localStorage.removeItem("id_personaje");
            document.getElementById("menu-ppal-personajes").classList.add("actual");
            let data = await getPersonajes();
            if (data.length > 0)
                setPersonajes(data);
        }
        fetchData().catch(console.error);
    }, []);

    /**
     * Cuando se actualizan los personajes, se determina si hay que
     * mostrar la tabla con personajes o el mensaje que informa de que
     * no hay personajes
     */
    useEffect(() => {
        if (personajes.length > 0) {
            document.getElementById("vacio").innerHTML = "";
            document.getElementById("contenedor-personajes").style.display = "";
        }
        else {
            document.getElementById("vacio").innerHTML = "No hay nada que mostrar aquí todavía.";
            document.getElementById("contenedor-personajes").style.display = "none";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [personajes]);

    /**
     * Redirecciona al usuario a la página de creación de personaje
     */
    const crearPersonaje = () => {
        window.location.href = "/personaje/crear";
    }

    /**
     * Redirecciona al usuario a la página de visualización de personaje
     * con el id recibido
     * @param id
     */
    const verPersonaje = (id) => {
        localStorage.id_personaje = id;
        window.location.href = "/personaje/ver";
    }

    /**
     * Solicita confirmación al usuario y, en caso afirmativo, llama a la
     * función que hace la petición de borrado de personaje a la API y
     * procesa el resultado
     * @param id
     */
    const eliminar = async (id) => {
        if (window.confirm("¿Seguro que quieres borrar este personaje?")) {
            let resultado = await eliminarPersonaje(id);
            if (resultado !== "OK")
                document.getElementById("mensaje-error").innerHTML = "Se ha producido un error al eliminar el personaje";
            else
                window.location.href = "/personajes";
        }
    }

    /**
     * Filtra los resultados de la tabla por el texto introducido
     * por el usuario en el buscador y las columnas indicadas en el
     * parámetro columnas
     * @param columnas - Array con los números de columna filtrables
     */
    const buscarEnTabla = (columnas) => {
        var busqueda, filtro, tabla, tr, td, i, texto;
        busqueda = document.getElementById("buscador");
        filtro = busqueda.value.toUpperCase();
        tabla = document.getElementById("tabla");
        tr = tabla.getElementsByTagName("tr");
        //Recorre las filas de la tabla
        let contador = 0;
        for (i = 0; i < tr.length; i++) {
            //Para cada fila, toma el valor de las columnas filtrables
            for (let j = 0; j < columnas.length; j++) {
                td = tr[i].getElementsByTagName("td")[columnas[j]];
                if (td) {
                    texto = td.textContent || td.innerText;
                    //Oculta las filas en las que el valor de columna no coindica con el filtro
                    if (texto.toUpperCase().indexOf(filtro) > -1) {
                        tr[i].style.display = "";
                        if (contador % 2 === 0)
                            tr[i].style.backgroundColor = "var(--font-color-soft)";
                        else
                            tr[i].style.backgroundColor = "transparent";
                        contador++;
                        break;
                    } else {
                        tr[i].style.display = "none";
                        tr[i].style.backgroundColor = "";
                    }
                }
            }
        }
    }

    /**
     * Ordena las filas de la tabla alfabéticamente por la columna
     * que se indique en el parámetro n.
     * @param n - La columna por la que se ordena
     */
    const ordenarTabla = (n) => {
        var tabla, filas, cambiar, i, x, y, hacerCambio, dir, contador = 0;
        tabla = document.getElementById("tabla");
        cambiar = true;
        //La ordenación por defecto es ascendente
        dir = "asc";
        //Bucle que se repite mientras queden filas por ordenar
        while (cambiar) {
            cambiar = false;
            filas = tabla.rows;
            //Se recorren las filas
            for (i = 1; i < (filas.length - 1); i++) {
                hacerCambio = false;
                //Se toma el valor de la columna n de dos filas consecutivas
                x = filas[i].getElementsByTagName("td")[n];
                y = filas[i + 1].getElementsByTagName("td")[n];
                //Se comprueba si hay que intercambiar las filas
                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        hacerCambio = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        hacerCambio = true;
                        break;
                    }
                }
            }
            //Se intercambian las filas si es necesario
            if (hacerCambio) {
                filas[i].parentNode.insertBefore(filas[i + 1], filas[i]);
                cambiar = true;
                //Se aumenta el contador para saber cuántos cambios se han realizado
                contador++;
            } else {
                //Si la tabla ya estaba ordenada ascendentemente, entonces se
                //reordena descendentemente
                if (contador === 0 && dir === "asc") {
                    dir = "desc";
                    cambiar = true;
                }
            }
        }
        for (i = 1; i < (tabla.rows.length); i++) {
            if (i % 2 === 0)
                tabla.rows[i].style.backgroundColor = "var(--font-color-soft)";
            else
                tabla.rows[i].style.backgroundColor = "transparent";
        }
    }

    /**
     * Contenido de la interfaz de visualización de personajes
     */
    return (
        <>
            <Cabecera />
            <main className="contenido">
                <MenuPpal />
                <section className="info">
                    <section className="cabecera-info">
                        <h1>Mis personajes</h1>
                        <button onClick={crearPersonaje} title="Crear personaje">Nuevo</button>
                    </section>
                    <section id="personajes" className="cuerpo-info">
                        <p className="mensaje-noinfo" id="vacio">No hay nada que mostrar aquí todavía.</p>
                        <div className="personajes" id="contenedor-personajes">
                            <p className="mensaje mensaje-feedback black" id="mensaje-error"></p>
                            <input type="text" className="buscador" id="buscador" onKeyUp={() => { buscarEnTabla([1, 2, 3]) }} placeholder="Buscar..." title="Escribe un nombre" />
                            <p className="mensaje orden-tabla">Pulsa sobre el nombre de una columna para ordenar los resultados.</p>
                            <table id="tabla">
                                <thead>
                                    <tr>
                                        <th scope="col">Imagen</th>
                                        <th onClick={() => ordenarTabla(1)} scope="col">Nombre</th>
                                        <th onClick={() => ordenarTabla(2)} scope="col">Raza</th>
                                        <th onClick={() => ordenarTabla(3)} scope="col">Jugador</th>
                                        <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody id="filas">
                                    {personajes.map((p) =>
                                        <tr key={p.id}>
                                            <td className="t-personaje t-imagen">
                                                <img id="imagen" alt={`Imagen de ${p.nombre}`} src={`data:image/jpeg;base64,${p.imagen}`} style={{ width: "50px", height: "50px" }} />
                                            </td>
                                            <td className="t-personaje">{p.nombre}</td>
                                            <td className="t-personaje">{p.raza.denominacion}</td>
                                            <td className="t-personaje">{p.jugador ? p.jugador : "No asignado"}</td>
                                            <td className="t-personaje t-opciones">
                                                <button className="b-opcion-tabla" onClick={() => verPersonaje(p.id)} title="Ver personaje">Ver</button>
                                                <button className="b-opcion-tabla" onClick={() => eliminar(p.id)} title="Eliminar personaje">Eliminar</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Personajes;