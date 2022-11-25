/**
 * Lumbre - Funciones de la página de edición de sesión (sesion/editar.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
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

//Variables con elementos del formulario
let checkbox = document.getElementById('estado');
let formulario = document.getElementById('form-sesion');
let completada = document.getElementById('contenedor-resultados');

/**
 * Listener para modificar la visibilidad del campo "resultados" en función
 * de si la checkbox de campaña completada está marcada o no
 */
checkbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    let resultados = document.createElement("textarea");
    resultados.classList.add("con-espacios");
    resultados.id = "resultados";
    resultados.placeholder = "Resumen de la sesión";
    resultados.rows = "10";
    completada.appendChild(resultados);
  } else {
    completada.removeChild(document.getElementById("resultados"));
  }
});

/**
 * Establece la información del campo "resultados" solo si la checkbox
 * está marcada
 */
function setResultados() {
  if (document.getElementById("estado").checked) {
    let resultados = document.createElement("textarea");
    resultados.classList.add("con-espacios");
    resultados.id = "resultados";
    resultados.placeholder = "Resumen de la sesión";
    resultados.rows = "10";
    completada.appendChild(resultados);
  } else {
    completada.removeChild(document.getElementById("resultados"));
  }
}

/**
 * Establece la información de la sesión a partir de los datos recibidos de la API
 * @param data
 */
function setSesion(data) {
  if (data.estado == "Completada") {
    document.getElementById("estado").checked = true;
    setResultados();
    if (data.resultados)
      document.getElementById("resultados").innerHTML = data.resultados;
  }
  document.getElementById("nombre").value = data.nombre;
  document.getElementById("campanha").innerHTML = "Campaña: " + data.campanha.titulo;
  if (data.planificacion)
    document.getElementById("planificacion").innerHTML = data.planificacion;
  if (data.fecha)
    document.getElementById("fecha").value = data.fecha;
}

/**
 * Devuelve un JSON con los datos del formulario 
 */
const getDatosFormulario = () => {
  return {
    nombre: document.getElementById('nombre').value,
    estado: document.getElementById('estado').checked ? "Completada" : "Prevista",
    planificacion: document.getElementById('planificacion').value,
    resultados: document.getElementById('estado').checked ? document.getElementById('resultados').value : null,
    fecha: document.getElementById('fecha').value,
    modificacion: new Date()
  };
}

/**
 * Llama a la función que hace la petición a la API para actualizar la sesión con los datos del 
 * formulario y procesa el resultado 
 */
async function actualizar(event) {
  event.preventDefault();
  let datos = getDatosFormulario();
  let resultado = await actualizarSesion(datos);
  if (resultado != "OK") {
    document.getElementById("error").innerHTML = "Se ha producido un error al actualizar la sesión";
  }
  else {
    window.location.href = "../sesion/ver-sesion.html";
  }

}