/**
 * Lumbre - Funciones de la página de login (index.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si es así, se le redirige a
 * la página de visualización de campañas
 */
window.onload = () => {
    if (localStorage.getItem("token") != null)
        window.location.replace("../campanhas.html");
}

/**
 * Redirecciona al usuario según la dirección recibida
 * @param direccion 
 */
function redireccionar(direccion) {
    window.location.href = direccion;
}

/**
 * Llama a la función que hace la petición de login a la API con los datos
 * del formulario y procesa el resultado 
 */
async function enviar(event) {
    event.preventDefault();
    let datos = {};
    datos.username = document.getElementById('username').value;
    datos.passwd = document.getElementById('passwd').value;
    let respuesta = await login(datos);
    if (respuesta.status == '200') {
        localStorage.token = await respuesta.text();
        localStorage.username = datos.username;
        window.location.replace("../campanhas.html");
    } else {
        document.getElementById("mensaje-feedback").innerHTML = "Credenciales incorrectas.";
    }
}