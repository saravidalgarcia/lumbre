/**
 * Lumbre - Funciones de la página de visualización de personajes (personajes.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 * Si lo está, se recuperan los personajes de la API
 */
window.onload = async () => {
    if (localStorage.getItem("token") == null)
        window.location.replace("../index.html");
    else {
        document.getElementById("username").innerHTML = localStorage.getItem("username");
        localStorage.removeItem("id_personaje");
        let data = await getPersonajes();
        if (data.length > 0)
            setPersonajes(data);
    }
}

/**
 * Redirecciona al usuario a la página de creación de personaje
 */
function crearPersonaje() {
    window.location.href = "../personaje/crear.html";
}

/**
 * Redirecciona al usuario a la página de visualización de personaje
 * con el id recibido
 * @param id
 */
function verPersonaje(id) {
    localStorage.id_personaje = id;
    window.location.href = "./personaje/ver-personaje.html";
}

/**
 * Establece la información de los personajes a partir de los datos recibidos de la API
 * @param personajes
 */
function setPersonajes(personajes) {
    let contenedor = document.getElementById("personajes");
    contenedor.innerHTML = `
    <div class="personajes">
        <input type="text" class="buscador" id="buscador" onkeyup="buscarEnTabla(new Array(1, 2, 3))" placeholder="Buscar..." title="Escribe un nombre">
        <p class="mensaje orden-tabla" id="mensaje-error">Pulsa sobre el nombre de una columna para ordenar los resultados.</p>
        <table id="tabla">
            <thead>
                <tr>
                    <th scope="col">Imagen</th>
                    <th onclick="ordenarTabla(1)" scope="col">Nombre</th>
                    <th onclick="ordenarTabla(2)" scope="col">Raza</th>
                    <th onclick="ordenarTabla(3)" scope="col">Jugador</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody id="filas">
            </tbody>
        </table>
    </div>
    `;
    let filas = document.getElementById("filas");
    for (let i = 0; i < personajes.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td class="t-personaje t-imagen"><img id="imagen" alt="Imagen ${personajes[i].nombre}" src="data:image/jpeg;base64,${personajes[i].imagen}" style="width: 50px;height: 50px;"></td>
        <td class="t-personaje">${personajes[i].nombre}</td>
        <td class="t-personaje">${personajes[i].raza.denominacion}</td>
        <td class="t-personaje">${personajes[i].jugador ? personajes[i].jugador : "No asignado"}</td>
        <td class="t-personaje t-opciones">
        <button class="b-opcion-tabla" onclick="verPersonaje(${personajes[i].id})" title="Ver personaje">Ver</button>
        <button class="b-opcion-tabla" onclick="eliminar(${personajes[i].id})" title="Eliminar personaje">Eliminar</button>
        </td>
        `;
        filas.appendChild(tr);
    }
}

/**
 * Solicita confirmación al usuario y, en caso afirmativo, llama a la
 * función que hace la petición de borrado de personaje a la API y
 * procesa el resultado
 * @param id
 */
async function eliminar(id) {
    if (confirm("¿Seguro que quieres borrar este personaje?")) {
        let resultado = await eliminarPersonaje(id);
        if (resultado != "OK") {
            document.getElementById("mensaje-error").innerHTML = "Se ha producido un error al eliminar el personaje";
        }
        else {
            window.location.href = "../personajes.html";
        }
    }
}