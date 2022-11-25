/**
 * Lumbre - Funciones de la página de edición de raza (raza/editar.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 * Si lo está, recupera la información de la raza de la API
 */
window.onload = async () => {
    if (localStorage.getItem("token") == null)
        window.location.replace("../index.html");
    else {
        document.getElementById("username").innerHTML = localStorage.getItem("username");
        let data = await getRaza();
        setRaza(data);
    }
}

/**
 * Establece la información de la raza a partir de los datos recibidos de la API
 * @param data
 */
function setRaza(data) {
    document.getElementById("denominacion").value = data.denominacion;
    if (data.descripcion)
        document.getElementById("descripcion").innerHTML = data.descripcion;
}

/**
 * Devuelve un JSON con los datos del formulario 
 */
const getDatosFormulario = () => {
    return {
        denominacion: document.getElementById('denominacion').value,
        descripcion: document.getElementById('descripcion').value,
        modificacion: new Date()
    };
}

/**
 * Llama a la función que hace la petición a la API para actualizar la raza con los datos del 
 * formulario y procesa el resultado 
 */
async function actualizar(event) {
    event.preventDefault();
    let datos = getDatosFormulario();
    let resultado = await actualizarRaza(datos);
    if (resultado != "OK") {
        document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al modificar la raza";
    }
    else {
        window.location.href = "../raza/ver-raza.html";
    }
}