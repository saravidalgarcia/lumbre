/**
 * Lumbre - Funciones de la página de visualización de razas (razas.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 * Si lo está, se recuperan las razas de la API
 */
window.onload = async () => {
    if (localStorage.getItem("token") == null)
        window.location.replace("../index.html");
    else {
        document.getElementById("username").innerHTML = localStorage.getItem("username");
        localStorage.removeItem("id_raza");
        let data = await getRazas();
        if (data.length > 0)
            setRazas(data);
    }
}

/**
 * Redirecciona al usuario a la página de creación de raza
 */
function crearRaza() {
    window.location.href = "../raza/crear.html";
}

/**
 * Redirecciona al usuario a la página de visualización de raza
 * con el id recibido
 * @param id
 */
function verRaza(id) {
    localStorage.id_raza = id;
    window.location.href = "./raza/ver-raza.html";
}

/**
 * Establece la información de las razas a partir de los datos recibidos de la API
 * @param razas
 */
function setRazas(razas) {
    let contenedor = document.getElementById("razas");
    contenedor.innerHTML = `
    <div class="razas">
        <input type="text" class="buscador" id="buscador" onkeyup="buscarEnTabla(new Array(0,1))" placeholder="Buscar..." title="Escribe una denominación">
        <p class="mensaje orden-tabla" id="mensaje-error">Pulsa sobre el nombre de una columna para ordenar los resultados.</p>
        <table id="tabla">
            <thead>
                <tr>
                    <th onclick="ordenarTabla(0)" scope="col">Denominación</th>
                    <th onclick="ordenarTabla(1)" scope="col">Tipo</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody id="filas">
            </tbody>
        </table>
    </div>
    `;
    let filas = document.getElementById("filas");
    for (let i = 0; i < razas.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="t-raza">${razas[i].denominacion}</td>
            <td class="t-raza">${razas[i].tipo}</td>
        `;
        if (razas[i].tipo != "Predefinida") {
            tr.innerHTML += `
            <td class="t-raza t-opciones"><button class="b-opcion-tabla" onclick="verRaza(${razas[i].id})" title="Ver raza">Ver</button>
            <button class="b-opcion-tabla" onclick="eliminar(${razas[i].id})" title="Eliminar raza">Eliminar</button>
            </td>
            `;
        } else {
            tr.innerHTML += `
            <td class="t-raza t-opciones"><button class="b-opcion-tabla" onclick="verRaza(${razas[i].id})" title="Ver raza">Ver</button>
            </td>
            `;
        }
        filas.appendChild(tr);
    }
}

/**
 * Solicita confirmación al usuario y, en caso afirmativo, llama a la
 * función que hace la petición de borrado de raza a la API y
 * procesa el resultado
 * @param id
 */
async function eliminar(id) {
    if (confirm("¿Seguro que quieres borrar esta raza?")) {
        let resultado = await eliminarRaza(id);
        if (resultado != "OK") {
            document.getElementById("mensaje-error").innerHTML = "Se ha producido un error al eliminar la raza";
        }
        else {
            window.location.href = "../razas.html";
        }
    }
}