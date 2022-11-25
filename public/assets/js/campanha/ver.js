/**
 * Lumbre - Funciones de la página de visualización de campaña (campanha/ver_campanha.html)
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
    localStorage.removeItem("id_sesion");
    let data = await getCampanha();
    setCampanha(data);
    setSesiones(data.sesiones);
  }
}

/**
 * Redirecciona al usuario a la página de edición de campaña
 */
function editar() {
  window.location.href = "editar.html";
}

/**
 * Establece la información de las sesiones de la campaña a partir de los datos recibidos de la API
 * @param data 
 */
function setSesiones(data) {
  if (data.length == 0) return;
  let div = document.getElementById("contenedor-sesiones");
  document.getElementById("mensaje-sin-sesiones").innerHTML = "";
  div.innerHTML = `
    <div class="contenedor-tabla contenedor-tabla-sesiones">
        <table class="tabla-sesiones">
            <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha y hora</th>
                  <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody id="filas-sesiones">
            </tbody>
        </table>
    </div>
    `;
  const filas = document.getElementById("filas-sesiones");
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="t-sesion">${data[i].nombre}</td>
            <td class="t-sesion">${data[i].estado}</td>
            <td class="t-sesion">${data[i].fecha ? data[i].fecha.replace("T", " ") : "Sin fecha"}</td>
            <td class="t-sesion t-opciones">
            <button class="b-opcion-tabla" onclick="verSesion(${data[i].id})" title="Ver sesión">Ver</button>
            <button class="b-opcion-tabla" onclick="eliminarSesion(${data[i].id})" title="Eliminar sesión">Eliminar</button>
            </td>
        `;
    filas.appendChild(tr);
  }
}

/**
 * Establece la información de la campaña a partir de los datos recibidos de la API
 * @param data 
 */
function setCampanha(data) {
  document.getElementById("titulo").innerHTML = data.titulo;
  document.getElementById("resumen").innerHTML = data.resumen;
  document.getElementById("informacion").innerHTML = data.informacion ? data.informacion : "No hay información de la campaña.";
  document.getElementById("creacion").innerHTML = "Creación: " + data.creacion;
  document.getElementById("modificacion").innerHTML = "Modificación: " + data.modificacion;
  if (data.personajes.length > 0) setPersonajes(data.personajes);
  cubrirDesplegable(data.personajes);
}

/**
 * Establece la información de los personajes de la campaña a partir de los datos recibidos de la API
 * @param personajes
 */
function setPersonajes(personajes) {
  let div = document.getElementById("contenedor-personajes");
  document.getElementById("mensaje-sin-personajes").innerHTML = "";
  div.innerHTML = `
    <div class="contenedor-tabla contenedor-tabla-personajes">
        <table class="tabla-personajes">
            <thead>
                <tr>
                  <th scope="col">Imagen</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Raza</th>
                  <th scope="col">Jugador</th>
                  <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody id="filas-personajes">
            </tbody>
        </table>
    </div>
    `;
  const filas = document.getElementById("filas-personajes");
  for (let i = 0; i < personajes.length; i++) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="t-personaje t-hidden"><img id="imagen" alt="Imagen ${personajes[i].nombre}" src="data:image/jpeg;base64,${personajes[i].imagen}" style="width: 50px;height: 50px;"></td>
            <td class="t-personaje">${personajes[i].nombre}</td>
            <td class="t-personaje">${personajes[i].raza.denominacion}</td>
            <td class="t-personaje">${personajes[i].jugador ? personajes[i].jugador : "No asignado"}</td>
            <td class="t-personaje t-opciones">
            <button class="b-opcion-tabla" onclick="verPersonaje(${personajes[i].id})" title="Ver personaje">Ver</button>
            <button class="b-opcion-tabla" onclick="removePersonajeCampanha(${personajes[i].id})" title="Quitar personaje">Quitar</button>
            </td>
        `;
    filas.appendChild(tr);
  }
}

/**
 * Cubre el desplegable de personajes asociables a la campaña 
 * descartando los que ya están asociados
 * @param pc - Personajes ya asociados a la campaña
 */
async function cubrirDesplegable(pc) {
  let personajes = await getPersonajes();
  if (personajes.length > pc.length) {
    let select = document.getElementById("add-personaje");
    select.removeChild(document.getElementById("opcion-defecto"));
    for (let i = 0; i < personajes.length; i++) {
      let repetido = false;
      for (let j = 0; j < pc.length; j++) {
        if (personajes[i].id == pc[j].id) {
          repetido = true;
          break;
        }
      }
      if (!repetido) {
        let option = document.createElement("option");
        option.value = personajes[i].id;
        option.innerText = personajes[i].nombre;
        select.appendChild(option);
      }
    }
  }
}

/**
 * Recupera el nombre del personaje que se quiere añadir a la
 * campaña y llama a la función pertinente 
 */
function addPersonaje(event) {
  event.preventDefault();
  var e = document.getElementById("add-personaje");
  var value = e.options[e.selectedIndex].value;
  if (value == 0) return;
  addPersonajeCampanha(value);
}

/**
 * Redirecciona al usuario a la página de visualización del personaje
 * con el id dado
 * @param id 
 */
function verPersonaje(id) {
  localStorage.id_personaje = id;
  window.location.href = "../personaje/ver-personaje.html";
}

/**
 * Solicita confirmación al usuario y, en caso afirmativo, llama a la
 * función que hace la petición de borrado de campaña a la API y
 * procesa el resultado
 */
async function eliminar() {
  if (confirm("¿Seguro que quieres borrar esta campaña?")) {
    let resultado = await eliminarCampanha();
    if (resultado != "OK") {
      document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al eliminar la campaña";
    }
    else {
      window.location.href = "../campanhas.html";
    }
  }
}

/**
 * Redirecciona al usuario a la página de creación de sesión
 */
function addSesion() {
  window.location.href = "../sesion/crear.html";
}

/**
 * Redirecciona al usuario a la página de visualización de sesión
 * con el id dado
 * @param id 
 */
function verSesion(id) {
  localStorage.id_sesion = id;
  window.location.href = "../sesion/ver-sesion.html";
}

/**
 * Solicita confirmación y, en caso afirmativo, llama a la función que hace
 * la petición a la API para borrar la sesión con el id dado y procesa los
 * resultados
 * @param id 
 */
async function eliminarSesion(id) {
  if (confirm("¿Seguro que quieres borrar esta sesión?")) {
    localStorage.id_sesion = id;
    let resultado = await eliminarSesionCampanha();
    if (resultado != "OK") {
      document.getElementById("mensaje-feedback").innerHTML = "Se ha producido un error al eliminar la sesión";
    }
    else {
      window.location.href = "../campanha/ver-campanha.html";
    }
  }
}

/**
 * Muestra uno de los apartados de campaña (información, personajes o sesiones)
 * y oculta los demás según el id recibido
 * @param id 
 */
function mostrar(id) {
  for (let c of document.querySelectorAll('.contenedor')) {
    if (!c.classList.contains("oculto"))
      c.classList.add("oculto");
  }
  document.getElementById(id).classList.remove("oculto");
  for (let c of document.querySelectorAll('.tab')) {
    if (c.classList.contains("actual"))
      c.classList.remove("actual");
  }
  document.querySelector('.tab-' + id).classList.add("actual");
}