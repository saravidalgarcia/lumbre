/**
 * Lumbre - Funciones de la página de creación de sesión (sesion/crear.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 * Si lo está, determina si se está creando la sesión para una campaña concreta o
 * no y, en función de eso, recupera los nombres de campañas para cubrir el desplegable
 * del formulario
 */
window.onload = async () => {
  if (localStorage.getItem("token") == null)
    window.location.replace("../index.html");
  else {
    document.getElementById("username").innerHTML = localStorage.getItem("username");
    if (localStorage.getItem("id_campanha") == null) {
      let data = await getCampanhas();
      if (data != null && data.length > 0)
        rellenarDesplegable(data);
    }
    else {
      let data = await getCampanha();
      let select = document.getElementById("campanha");
      select.innerHTML = `<option value="${data.id}" selected disabled>${data.titulo}</option>`;
    }
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
 * Devuelve un JSON con los datos del formulario 
 */
const getDatosFormulario = () => {
  return {
    nombre: document.getElementById('nombre').value,
    estado: document.getElementById('estado').checked ? "Completada" : "Prevista",
    planificacion: document.getElementById('planificacion').value,
    resultados: document.getElementById('estado').checked ? document.getElementById('resultados').value : null,
    fecha: document.getElementById('fecha').value,
    creacion: new Date(),
    modificacion: new Date()
  };
}

/**
 * Llama a la función que hace la petición a la API para crear la sesión con los datos del 
 * formulario y procesa el resultado 
 */
async function crear(event) {
  event.preventDefault();
  let datos = getDatosFormulario();
  let resultado = await crearSesion(datos);
  if (resultado != "OK") {
    document.getElementById("error").innerHTML = "Se ha producido un error al crear la sesión";
  }
  else {
    if (localStorage.getItem("id_campanha") == null)
      window.location.href = "../sesiones.html";
    else
      window.location.href = "../campanha/ver-campanha.html";
  }
}

/**
 * Cubre el desplegable de campañas con los resultados obtenidos de la API
 * @param resultado 
 */
function rellenarDesplegable(resultado) {
  let select = document.getElementById("campanha");
  for (let i = 0; i < resultado.length; i++) {
    let option = document.createElement("option");
    option.value = resultado[i].id;
    option.innerText = resultado[i].titulo;
    select.appendChild(option);
  }
}

