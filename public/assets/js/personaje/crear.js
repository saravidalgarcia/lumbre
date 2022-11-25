/**
 * Lumbre - Funciones de la página de creación de personaje (personaje/crear.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 * Si lo está, recupera las razas para cubrir el desplegable de selección de raza
 */
window.onload = async () => {
  if (localStorage.getItem("token") == null)
    window.location.replace("../index.html");
  else {
    document.getElementById("username").innerHTML = localStorage.getItem("username");
    let data = await getRazas();
    if (data != null && data.length > 0)
      rellenarDesplegable(data);
  }
}

/**
 * Llama a la función que hace la petición a la API para crear el personaje con los datos del 
 * formulario y procesa el resultado 
 */
async function crear(event) {
  event.preventDefault();
  let datos = new FormData(document.getElementById("form-personaje"));
  let resultado = await crearPersonaje(datos);
  if (resultado != "OK") {
    console.log(resultado);
    document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al crear el personaje";
  }
  else {
    window.location.href = "../personajes.html";
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