/**
 * Lumbre - Funciones de la página de visualización de sesiones (sesiones.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 * Si lo está, se recuperan las sesiones de la API
 */
window.onload = async () => {
    if (localStorage.getItem("token") == null)
        window.location.replace("../index.html");
    else {
        document.getElementById("username").innerHTML = localStorage.getItem("username");
        localStorage.removeItem("id_sesion");
        localStorage.removeItem("id_campanha");
        let data = await getSesiones();
        if (data.length > 0) {
            setSesiones(data);
            let campanhas = await getCampanhas();
            setCampanhas(campanhas);
        }
    }
}

/**
 * Redirecciona al usuario a la página de creación de sesión
 */
function crearSesion() {
    window.location.href = "../sesion/crear.html";
}

/**
 * Redirecciona al usuario a la página de visualización de la sesión
 * con el id de sesión y el id de campaña recibidos
 * @param id - id de la sesión
 * @param id_c - id de la campaña
 */
function verSesion(id, id_c) {
    localStorage.id_sesion = id;
    localStorage.id_campanha = id_c;
    window.location.href = "./sesion/ver-sesion.html";
}

/**
 * Establece la información de las sesiones a partir de los datos recibidos de la API
 * @param sesiones 
 */
function setSesiones(sesiones) {
    let contenedor = document.getElementById("sesiones");
    contenedor.innerHTML = `
    <div class="filtros">
        <select class="filtro" onchange="filtrar()" id="filtro-campanha">
            <option value="0" selected>Campaña</option>
        </select>
        <select class="filtro" onchange="filtrar()" id="filtro-estado">
            <option value="0" selected>Estado</option>
            <option value="Prevista">Prevista</option>
            <option value="Completada">Completada</option>
        </select>
    </div>
    <p class="mensaje" id="mensaje-sin-sesiones">No hay sesiones disponibles.</p>
    <div class="sesiones" id="contenedor-sesiones">
    </div>
    `;
    let cc = document.getElementById("contenedor-sesiones");
    if (sesiones.length > 0) document.getElementById("mensaje-sin-sesiones").innerHTML = "";
    for (let i = 0; i < sesiones.length; i++) {
        let c = document.createElement("div");
        c.classList.add("sesion");
        c.classList.add("campanha-" + sesiones[i].campanha.id);
        c.classList.add(sesiones[i].estado);
        c.title = "Ver sesion";
        c.onclick = function () { verSesion(sesiones[i].id, sesiones[i].campanha.id); };
        c.innerHTML = `
            <h4 id="titulo">${sesiones[i].nombre}</h4>
            <p>${sesiones[i].campanha.titulo}</p>
            ${(sesiones[i].estado == "Completada") ? "<p class='envoltorio'>Completada</p>" : "<br>"}
            <p class="small">Fecha: ${sesiones[i].fecha ? sesiones[i].fecha.replace("T", " ") : "Sin fecha"}</p>
        `;
        cc.appendChild(c);
    }
}

/**
 * Solicita confirmación al usuario y, en caso afirmativo, llama a la
 * función que hace la petición de borrado de sesión a la API y
 * procesa el resultado
 */
async function eliminar() {
    if (confirm("¿Seguro que quieres borrar esta sesión?")) {
        let resultado = await eliminarSesion();
        if (resultado != "OK") {
            document.getElementById("mensaje-error").innerHTML = "Se ha producido un error al eliminar la sesión";
        }
        else {
            window.location.href = "../campanha/ver-campanha.html";
        }
    }
}

/**
 * Establece los nombres de las campañas con sesiones en el desplegable para
 * filtrar por campaña, a partir de los datos recibidos de la API
 * @param campanhas  
 */
function setCampanhas(campanhas) {
    if (campanhas.length == 0) return;
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
function filtrar() {
    let div = document.getElementById("contenedor-sesiones");
    let f1 = document.getElementById("filtro-campanha").value;
    let f2 = document.getElementById("filtro-estado").value;
    let sesiones = div.children;
    let contador = 0;
    for (var i = 0; i < sesiones.length; i++) {
        var child = sesiones[i];
        if (f1 != "0") {
            if (!child.classList.contains("campanha-" + f1)) {
                child.classList.add("oculto1");
            } else {
                child.classList.remove("oculto1");
            }
        }
        else {
            child.classList.remove("oculto1");
        }
        if (f2 != "0") {
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
    let p = document.getElementById("mensaje-sin-sesiones");
    if (contador == sesiones.length) {
        p.innerHTML = "No hay sesiones disponibles.";
    }
    else {
        p.innerHTML = "";
    }
}