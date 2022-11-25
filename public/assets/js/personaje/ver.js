/**
 * Lumbre - Funciones de la página de visualización de personaje (personaje/ver_personaje.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 * Si lo está, recupera la información del personaje de la API
 */
window.onload = async () => {
  if (localStorage.getItem("token") == null)
    window.location.replace("../index.html");
  else {
    document.getElementById("username").innerHTML = localStorage.getItem("username");
    let data = await getPersonaje();
    setPersonaje(data);
  }
}

/**
 * Establece la información del personaje a partir de los datos recibidos de la API
 * @param data 
 */
function setPersonaje(data) {
  document.getElementById("imagen").setAttribute("src", 'data:image/jpeg;base64,' + data.imagen);
  document.getElementById("nombre").innerHTML = data.nombre;
  document.getElementById("raza").innerHTML = "Raza: " + data.raza.denominacion;
  document.getElementById("jugador").innerHTML = data.jugador ? "Jugador: " + data.jugador : "Jugador: No asignado";
  document.getElementById("informacion").innerHTML = data.informacion ? data.informacion : "No hay información del personaje";
  document.getElementById("creacion").innerHTML = "Creación: " + data.creacion;
  document.getElementById("modificacion").innerHTML = "Modificacion: " + data.modificacion;
}

/**
 * Redirecciona al usuario a la página de edición de personaje
 */
function editar() {
  window.location.href = "../personaje/editar.html";
}

/**
 * Solicita confirmación al usuario y, en caso afirmativo, llama a la
 * función que hace la petición de borrado de personaje a la API y
 * procesa el resultado
 */
async function eliminar() {
  if (confirm("¿Seguro que quieres borrar este personaje?")) {
    let resultado = await eliminarPersonaje(localStorage.id_personaje);
    if (resultado != "OK") {
      document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al eliminar el personaje";
    }
    else {
      window.location.href = "../personajes.html";
    }
  }
}