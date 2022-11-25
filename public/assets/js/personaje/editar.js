/**
 * Lumbre - Funciones de la página de edición de personaje (personaje/editar.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 * Si lo está, recupera la información de las razas para cubrir el desplegable de
 * elección de raza y recupera la información del personaje
 */
window.onload = async () => {
  if (localStorage.getItem("token") == null)
    window.location.replace("../index.html");
  else {
    document.getElementById("username").innerHTML = localStorage.getItem("username");
    let razas = await getRazas();
    if (razas != null && razas.length > 0)
      rellenarDesplegable(razas);
    let data = await getPersonaje();
    setPersonaje(data);
  }
}

/**
 * Establece la información del personaje a partir de los datos recibidos de la API
 * @param data
 */
function setPersonaje(data) {
  document.getElementById("nombre").value = data.nombre;
  document.getElementById("raza").value = data.raza.id;
  if (data.jugador)
    document.getElementById("jugador").value = data.jugador;
  if (data.informacion)
    document.getElementById("informacion").innerHTML = data.informacion;
}

/**
 * Llama a la función que hace la petición a la API para actualizar el personaje con los datos del 
 * formulario y procesa el resultado 
 */
async function actualizar(event) {
  event.preventDefault();
  let datos = new FormData(document.getElementById("form-personaje"));
  let resultado = await actualizarPersonaje(datos);
  if (resultado != "OK") {
    console.log(resultado);
    document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al actualizar el personaje";
  }
  else {
    window.location.href = "./ver-personaje.html";
  }
}

/**
 * Cubre el desplegable de razas con los resultados obtenidos de la API
 * @param resultado 
 */
function rellenarDesplegable(resultado) {
  let select = document.getElementById("raza");
  for (let i = 0; i < resultado.length; i++) {
    let option = document.createElement("option");
    option.value = resultado[i].id;
    option.innerText = resultado[i].denominacion;
    select.appendChild(option);
  }
}