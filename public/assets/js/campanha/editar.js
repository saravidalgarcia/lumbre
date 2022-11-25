/**
 * Lumbre - Funciones de la página de edición de campaña (campanha/editar.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 * Si lo está, recupera la información de la campaña de la API
 */
window.onload = async () => {
    if (localStorage.getItem("token") == null)
        window.location.replace("../index.html");
    else {
        document.getElementById("username").innerHTML = localStorage.getItem("username");
        let data = await getCampanha();
        setCampanha(data);
    }
}

/**
 * Establece la información de la campaña a partir de los datos recibidos de la API
 * @param data
 */
function setCampanha(data) {
    document.getElementById("titulo").value = data.titulo;
    document.getElementById("resumen").innerHTML = data.resumen;
    if (data.informacion)
        document.getElementById("informacion").innerHTML = data.informacion;
}

/**
 * Devuelve un JSON con los datos del formulario 
 */
const getDatosFormulario = () => {
    return {
        titulo: document.getElementById('titulo').value,
        resumen: document.getElementById('resumen').value,
        informacion: document.getElementById('informacion').value,
        modificacion: new Date()
    };
}

/**
 * Llama a la función que hace la petición a la API para actualizar la campaña con los datos del 
 * formulario y procesa el resultado 
 */
async function actualizar(event) {
    event.preventDefault();
    let datos = getDatosFormulario();
    let resultado = await actualizarCampanha(datos);
    if (resultado != "OK") {
        document.getElementById("error").innerHTML = "Se ha producido un error al modificar la campaña";
    }
    else {
        window.location.href = "../campanha/ver-campanha.html";
    }
}