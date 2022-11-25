/**
 * Lumbre - Funciones de la página de visualización de sesión (sesion/ver_sesion.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login.
 * Si lo está, recupera la información de la sesión de la API
 */
window.onload = async () => {
    if (localStorage.getItem("token") == null)
        window.location.replace("../index.html");
    else {
        document.getElementById("username").innerHTML = localStorage.getItem("username");
        let data = await getSesion();
        setSesion(data);
    }
}

/**
 * Establece la información de la sesión a partir de los datos recibidos de la API
 * @param data 
 */
function setSesion(data) {
    document.getElementById("nombre").innerHTML = data.nombre;
    document.getElementById("campanha").innerHTML = "Campaña: " + data.campanha.titulo;
    document.getElementById("estado").innerHTML = "Estado: " + data.estado;
    document.getElementById("fecha").innerHTML = "Fecha: " + (data.fecha ? data.fecha.replace("T", " ") : "-");
    document.getElementById("planificacion").innerHTML = data.planificacion ? data.planificacion : "No se ha planificado la sesión.";
    if (data.estado == "Completada")
        document.getElementById("resultados").innerHTML = data.resultados ? data.resultados : "No se han registrado resultados de la sesión.";
    else
        document.getElementById("resultados").innerHTML = "La sesión aún no está completada.";
    document.getElementById("creacion").innerHTML = "Creación: " + data.creacion;
    document.getElementById("modificacion").innerHTML = "Modificacion: " + data.modificacion;
}

/**
 * Redirecciona al usuario a la página de edición de sesión
 */
function editar() {
    window.location.href = "../sesion/editar.html";
}

/**
 * Solicita confirmación al usuario y, en caso afirmativo, llama a la
 * función que hace la petición de borrado de sesión a la API y
 * procesa el resultado
 */
async function eliminar() {
    if (confirm("¿Seguro que quieres borrar esta sesión?")) {
        let resultado = await eliminarSesionCampanha();
        if (resultado != "OK") {
            document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al eliminar la sesión";
        }
        else {
            window.location.href = "../campanha/ver-campanha.html";
        }
    }
}