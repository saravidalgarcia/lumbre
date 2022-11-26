/**
 * Lumbre - Funciones de la página de calendario
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 * Si está autenticado, se recuperan sus sesiones y se crea un nuevo calendario
 */
 if (localStorage.getItem("token") == null)
 window.location.replace("/login");
else {
 document.getElementById("username").innerHTML = localStorage.getItem("username");
 localStorage.removeItem("id_sesion");
 document.getElementById("menu-ppal-calendario").classList.add("actual");
 console.log("hola");
 recuperarSesiones();
}

async function recuperarSesiones(){
  sesiones = await getSesiones();
  calendario = new Calendario();
}

/**
 *  Hace una llamada a la API para recuperar las sesiones del usuario 
 */
async function getSesiones() {
  const respuesta = await fetch('http://localhost:8080/lumbre/api/' + localStorage.username + '/sesiones', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    }
  });
  const data = await respuesta.json();
  return data;
}

//Variables para el calendario, las sesiones y la información de sesiones por día
var calendario = null;
var sesiones = null;
var sesionesdia = null;

/**
 * Recibe un día y comprueba si tiene sesiones asociadas
 * @param dia 
 */
function checkSesiones(dia) {
  let fecha = new Date(dia.getAttribute("data-date"));
  let f = fecha.getFullYear() + "-" + ((fecha.getMonth() + 1 > 9) ? (fecha.getMonth() + 1) : ("0" + (fecha.getMonth() + 1))) + "-" + ((fecha.getDate() > 9) ? fecha.getDate() : ("0" + fecha.getDate()));
  let tiene = false;
  sesionesdia = ("<h3>Sesiones para el " + f + ":</h3>");
  if (sesiones == null || sesiones.length == 0) return false;
  for (let i = 0; i < sesiones.length; i++) {
    if (sesiones[i].fecha != null) {
      if (sesiones[i].fecha.includes(f)) {
        tiene = true;
        sesionesdia += ("<p><b>" + sesiones[i].fecha.substring(11) + "h&nbsp;&nbsp;</b> " + sesiones[i].nombre + " (" + sesiones[i].campanha.titulo + ")<button onclick='verSesion(" + sesiones[i].campanha.id + "," + sesiones[i].id + ")' title='Ver sesión'>Ver</button></p>");
      }
    }
  }
  return tiene;
}

/**
 * Recibe una fecha y crea el calendario
 * @param fecha 
 */
function Calendario(fecha) {
  if (!(fecha instanceof Date)) {
    fecha = new Date();
  }
  this.dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  this.meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  this.seleccionado = null;
  this.calendario = document.getElementById("calendario");
  this.vista = document.getElementById("dias");
  this.mes = document.getElementById("mes");
  this.anterior = document.getElementById("mes-anterior");
  this.siguiente = document.getElementById("mes-siguiente");
  this.mostrar(fecha);
  this.addEventListeners();
}

/**
 * Listeners para mostrar el mes anterior o el siguiente si el usuario pulsa
 * en el botón pertinente
 */
Calendario.prototype.addEventListeners = function () {
  this.anterior.addEventListener("click", this.mostrarMes.bind(this));
  this.siguiente.addEventListener("click", this.mostrarMes.bind(this));
};

/**
 * Muestra el calendario relativo al mes recibido en la fecha
 * @param fecha 
 */
Calendario.prototype.mostrar = function (fecha) {
  //Obtiene los datos clave para la generación de la vista del calendario
  if (!fecha || (!(fecha instanceof Date))) fecha = new Date();
  var ahora = new Date(fecha),
    y = ahora.getFullYear(),
    m = ahora.getMonth();
  var hoy = new Date();
  var ultimoD = new Date(y, m + 1, 0).getDate();
  var primerD = new Date(y, m, 1).getDay();
  var anteriorM = new Date(y, ahora.getMonth() - 1, 1);
  var siguienteM = new Date(y, ahora.getMonth() + 1, 1);

  //Resetea el calendario
  while (this.vista.firstChild) {
    this.vista.removeChild(this.vista.firstChild);
  }

  //Introduce los huecos necesarios antes del primer día del mes
  for (var x = 0; x < primerD - 1; x++) {
    var hueco = document.createElement("div");
    hueco.className = "hueco";
    this.vista.appendChild(hueco);
  }

  //Bucle que recorre todos los días del mes
  for (var z = 1; z <= ultimoD; z++) {
    var _date = new Date(y, m, z);
    var dia = document.createElement("div");
    dia.className = "dia";
    dia.textContent = z;
    dia.setAttribute("data-date", _date);
    //Comprueba si es el día actual
    if (z == hoy.getDate() && y == hoy.getFullYear() && m == hoy.getMonth()) {
      dia.classList.add("hoy");
    }
    //Comprueba si tiene sesiones asociadas
    if (checkSesiones(dia)) {
      let x = sesionesdia;
      dia.classList.add("tiene-sesiones");
      dia.onclick = function () { mostrarSesiones(x); };
    }
    //Añade el día al calendario
    this.vista.appendChild(dia);
  }

  //Cubre la información del mes actual, anterior y siguiente
  this.mes.textContent = this.meses[ahora.getMonth()] + " " + ahora.getFullYear();
  this.mes.setAttribute("data-date", ahora);
  this.anterior.textContent = "< " + this.meses[anteriorM.getMonth()];
  this.anterior.setAttribute("data-date", anteriorM);
  this.siguiente.textContent = this.meses[siguienteM.getMonth()] + " >";
  this.siguiente.setAttribute("data-date", siguienteM);
}

/**
 * Obtiene el mes que se desea mostrar y llama a la función
 * que mustra el calendario
 */
Calendario.prototype.mostrarMes = function (e) {
  var fecha = e.currentTarget.dataset.date;
  var nuevoMes = new Date(fecha);
  this.mostrar(nuevoMes);
  return true;
};


/* --- VENTANA MODAL --- */

//Variables con los elementos del modal
var modal = document.getElementById("contenedor-sesiones-dia");
var span = document.getElementsByClassName("close")[0];

/**
 * Muestra la ventana modal con la información recibida
 * @param info 
 */
function mostrarSesiones(info) {
  modal.style.display = "block";
  document.getElementById("info-sesiones-dia").innerHTML = info;
}

/**
 * Oculta la ventana modal si se pulsa la "x"
 */
span.onclick = function () {
  modal.style.display = "none";
}

/**
 * Oculta la ventana modal si se pulsa en la zona oscurecida de la ventana 
 */
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/**
 * Redirige al usuario a la página de visualización de sesión
 * guardando los datos relativos al id de la campaña y de la sesión
 * @param idcamp - id de la campaña
 * @param id - id de la sesión
 */
function verSesion(idcamp, id) {
  localStorage.id_campanha = idcamp;
  localStorage.id_sesion = id;
  window.location.href = "/sesion/ver";
}