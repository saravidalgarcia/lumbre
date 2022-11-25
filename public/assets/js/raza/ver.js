/**
 * Lumbre - Funciones de la página de visualización de raza (raza/ver_raza.html)
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
  document.getElementById("denominacion").innerHTML = data.denominacion;
  document.getElementById("descripcion").innerHTML = data.descripcion ? data.descripcion : "No hay información de la raza.";
  document.getElementById("creacion").innerHTML = "Creación: " + data.creacion;
  document.getElementById("modificacion").innerHTML = "Modificacion: " + data.modificacion;
  if (data.tipo == "Propia") {
    let div = document.getElementById("contenedor-botones");
    div.innerHTML += `
      <div class="contenedor-botones-titulo">
        <button title="Editar raza" onclick="editar()">Editar</button>
        <button title="Eliminar raza" onclick="eliminar()">Eliminar</button>
      </div>
      `;
  }
}

/**
 * Redirecciona al usuario a la página de edición de raza
 */
function editar() {
  window.location.href = "../raza/editar.html";
}

/**
 * Solicita confirmación al usuario y, en caso afirmativo, llama a la
 * función que hace la petición de borrado de raza a la API y
 * procesa el resultado
 */
async function eliminar() {
  if (confirm("¿Seguro que quieres borrar esta raza?")) {
    let resultado = await eliminarRaza(localStorage.id_raza);
    if (resultado != "OK") {
      document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al eliminar la raza";
    }
    else {
      window.location.href = "../campanhas.html";
    }
  }
}