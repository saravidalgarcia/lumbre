import React, { useState, useEffect } from 'react';
import Cabecera from '../components/Cabecera';
import Footer from '../components/Footer';
import MenuPpal from '../components/MenuPpal';
import { getRazas, eliminarRaza, getPersonajes } from '../peticiones';

function Razas(props){

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {document.title = props.title + " - Lumbre"}, []);

    const [razas, setRazas] = useState([]); 

    /**
     * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
     * la página de login
     * Si lo está, se recuperan las razas de la API
     */
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("token") === null)
                window.location.replace("/login");
            else {
                document.getElementById("username").innerHTML = localStorage.getItem("username");
                localStorage.removeItem("id_raza");
                document.getElementById("menu-ppal-razas").classList.add("actual");
                let data = await getRazas();
                if (data.length > 0)
                    setRazas(data);
            }
        }
        fetchData().catch(console.error);
    },[]);

    useEffect(() => {
        if(razas.length > 0)
        document.getElementById("vacio").innerHTML = "";
        else
        document.getElementById("vacio").innerHTML = "No hay nada que mostrar aquí todavía.";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[razas]);

    /**
     * Redirecciona al usuario a la página de creación de raza
     */
    function crearRaza() {
        window.location.href = "raza/crear";
    }

    /**
     * Redirecciona al usuario a la página de visualización de raza
     * con el id recibido
     * @param id
     */
    function verRaza(id) {
        localStorage.id_raza = id;
        window.location.href = "/raza/ver";
    }

    /**
     * Comprueba si hay algún personaje con la raza recibida
     * por parámetro asociada
     * @param raza - El id de la raza 
     * @param personajes - Los personajes del usuario
     */
         function checkPersonajes(raza, personajes){
            let tienePjs = false;
            personajes.forEach(personaje => {
                if(personaje.raza.id.toString() === raza.toString()){
                    tienePjs = true;
                }
            });
            return tienePjs;
        }

    /**
     * Comprueba que la raza se pueda borrar (que no existan personajes
     * con esa raza asociada).
     * Solicita confirmación al usuario y, en caso afirmativo, llama a la
     * función que hace la petición de borrado de raza a la API y
     * procesa el resultado
     * @param id
     */
    async function eliminar(id) {
        let personajes = await getPersonajes();
        let tienePjs = checkPersonajes(id,personajes);
        if (tienePjs){
            document.getElementById("mensaje-error").innerHTML = "No se puede borrar una raza con personajes asociados, elimine o cambie de raza a sus personajes primero.";
            document.getElementById("mensaje-error").focus();
        }else{
            if (window.confirm("¿Seguro que quieres borrar esta raza?")) {
                let resultado = await eliminarRaza(id);
                if (resultado !== "OK") {
                    document.getElementById("mensaje-error").innerHTML = "Se ha producido un error al eliminar la raza";
                }
                else {
                    window.location.href = "/razas";
                }
            }
        }
    }

    /**
     * Filtra los resultados de la tabla por el texto introducido
     * por el usuario en el buscador y las columnas indicadas en el
     * parámetro columnas
     * @param columnas - Array con los números de columna filtrables
     */
    function buscarEnTabla(columnas) {
        var busqueda, filtro, tabla, tr, td, i, texto;
        busqueda = document.getElementById("buscador");
        filtro = busqueda.value.toUpperCase();
        tabla = document.getElementById("tabla");
        tr = tabla.getElementsByTagName("tr");
        //Recorre las filas de la tabla
        let contador = 0;
        for (i = 0; i < tr.length; i++) {
        //Para cada fila, toma el valor de las columnas filtrables
        for(let j = 0; j < columnas.length; j++){
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
    function ordenarTabla(n) {
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
        for (i = 1; i < (tabla.rows.length - 1); i++) {
            if (i % 2 === 0)
                tabla.rows[i].style.backgroundColor = "var(--font-color-soft)";
            else
                tabla.rows[i].style.backgroundColor = "transparent";
        }
    }

    return(
    <>
        <Cabecera />
        <main className="contenido">
        <MenuPpal />
        <section className="info">
        <section className="cabecera-info">
                <h1>Mis razas</h1>
                <button onClick={crearRaza} title="Crear raza">Nueva</button>
            </section>
            <section id="razas" className="cuerpo-info">
                <p className="mensaje-noinfo" id="vacio">No hay nada que mostrar aquí todavía.</p>
                <div className="personajes">
                <p className="mensaje mensaje-feedback black" id="mensaje-error"></p>
            <input type="text" className="buscador" id="buscador" onKeyUp={() => buscarEnTabla([0, 1])} placeholder="Buscar..." title="Escribe un nombre"/>
            <p className="mensaje orden-tabla">Pulsa sobre el nombre de una columna para ordenar los resultados.</p>
            <table id="tabla">
                <thead>
                    <tr>
                        <th onClick={() => ordenarTabla(0)} scope="col">Denominación</th>
                        <th onClick={() => ordenarTabla(1)} scope="col">Tipo</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody id="filas">
                {
                    razas.map((r) => 
                    (r.tipo === "Predefinida") ?
                        <tr key={r.id}>
                            <td className="t-raza">{r.denominacion}</td>
                            <td className="t-raza">{r.tipo}</td>
                            <td className="t-raza t-opciones">
                                <button className="b-opcion-tabla" onClick={() => verRaza(r.id)} title="Ver raza">Ver</button>
                            </td>
                        </tr>
                        :
                        <tr key={r.id}>
                            <td className="t-raza">{r.denominacion}</td>
                            <td className="t-raza">{r.tipo}</td>
                            <td className="t-raza t-opciones">
                                <button className="b-opcion-tabla" onClick={() => verRaza(r.id)} title="Ver raza">Ver</button>
                                <button className="b-opcion-tabla" onClick={() => eliminar(r.id)} title="Eliminar raza">Eliminar</button>
                            </td>
                        </tr>
                    )
                }   
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

export default Razas;