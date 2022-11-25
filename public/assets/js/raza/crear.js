/**
 * Lumbre - Funciones de la página de creación de raza (raza/crear.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 */
window.onload = () => {
    if (localStorage.getItem("token") == null)
        window.location.replace("../index.html");
    else {
        document.getElementById("username").innerHTML = localStorage.getItem("username");
    }
}

/**
 * Devuelve un JSON con los datos del formulario 
 */
const getDatosFormulario = () => {
    return {
        denominacion: document.getElementById('denominacion').value,
        descripcion: document.getElementById('descripcion').value,
        tipo: "Propia",
        creacion: new Date(),
        modificacion: new Date()
    };
}

/**
 * Llama a la función que hace la petición a la API para crear la raza con los datos del 
 * formulario y procesa el resultado 
 */
async function crear(event) {
    event.preventDefault();
    let datos = getDatosFormulario();
    let resultado = await crearRaza(datos);
    if (resultado != "OK") {
        document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al crear la raza";
    }
    else {
        window.location.href = "../razas.html";
    }
}