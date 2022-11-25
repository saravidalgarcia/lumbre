/**
 * Lumbre - Peticiones a la API
 * 
 * @author Sara Vidal García
 */

//URL base para las peticiones a la API de Lumbre
const URL = 'http://localhost:8080/lumbre/api/';

/**
 * Devuelve los headers por defecto de las peticiones
 */
function headers() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
}

/* --- PETICIONES --- */

// CONTROL DE ACCESO

async function login(datos) {
  const respuesta = await fetch(URL + 'login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  return respuesta;
}

async function registrar(datos) {
  const respuesta = await fetch(URL + 'usuarios', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  return respuesta;
}

async function getListaUsuarios() {
  const respuesta = await fetch(URL + 'usuarios', {
    method: 'GET',
    headers: headers()
  });
  return respuesta;
}


//CAMPAÑAS

async function getCampanhas() {
  const respuesta = await fetch(URL + localStorage.username + '/campanhas', {
    method: 'GET',
    headers: headers()
  });
  const data = await respuesta.json();
  return data;
}

async function crearCampanha(datos) {
  const respuesta = await fetch(URL + localStorage.username + '/campanhas', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.text();
  return resultado;
}

async function getCampanha() {
  const respuesta = await fetch(URL + localStorage.username + '/campanhas/' + localStorage.id_campanha, {
    method: 'GET',
    headers: headers()
  });
  const data = await respuesta.json();
  return data;
}

async function actualizarCampanha(datos) {
  const respuesta = await fetch(URL + localStorage.username + '/campanhas/' + localStorage.id_campanha, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.text();
  return resultado;
}

async function eliminarCampanha() {
  const respuesta = await fetch(URL + localStorage.username + '/campanhas/' + localStorage.id_campanha, {
    method: 'DELETE',
    headers: headers()
  });
  const resultado = await respuesta.text();
  return resultado;
}

async function removePersonajeCampanha(id) {
  const respuesta = await fetch(URL + localStorage.username + '/campanhas/' + localStorage.id_campanha + '/removeP/' + id, {
    method: 'PUT',
    headers: headers()
  });
  if (respuesta.status == "200") {
    window.location.href = "./ver-campanha.html";
  } else {
    document.getElementById("mensaje-error").innerHTML = "No se ha podido quitar el personaje";
  }
}

async function addPersonajeCampanha(id) {
  const respuesta = await fetch(URL + localStorage.username + '/campanhas/' + localStorage.id_campanha + '/addP/' + id, {
    method: 'PUT',
    headers: headers()
  });
  if (respuesta.status == "200") {
    window.location.href = "./ver-campanha.html";
  } else {
    document.getElementById("mensaje-error").innerHTML = "No se ha podido añadir el personaje.";
  }
}


// RAZAS

async function getRazas() {
  const respuesta = await fetch(URL + localStorage.username + '/razas', {
    method: 'GET',
    headers: headers()
  });
  const data = await respuesta.json();
  return data;
}

async function crearRaza(datos) {
  const respuesta = await fetch(URL + localStorage.username + '/razas', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.text();
  return resultado;
}

async function getRaza() {
  const respuesta = await fetch(URL + localStorage.username + '/razas/' + localStorage.id_raza, {
    method: 'GET',
    headers: headers()
  });
  const data = await respuesta.json();
  return data;
}

async function actualizarRaza(datos) {
  const respuesta = await fetch(URL + localStorage.username + '/razas/' + localStorage.id_raza, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.text();
  return resultado;
}

async function eliminarRaza(id) {
  const respuesta = await fetch(URL + localStorage.username + '/razas/' + id, {
    method: 'DELETE',
    headers: headers()
  });
  const resultado = await respuesta.text();
  return resultado;
}


//PERSONAJES

async function getPersonajes() {
  const respuesta = await fetch(URL + localStorage.username + '/personajes', {
    method: 'GET',
    headers: headers()
  });
  const data = await respuesta.json();
  return data;
}

async function crearPersonaje(datos) {
  const respuesta = await fetch(URL + localStorage.username + '/personajes', {
    method: 'POST',
    headers: {
      'Authorization': localStorage.token
    },
    body: datos
  });
  const resultado = await respuesta.text();
  return resultado;
}

async function getPersonaje() {
  const respuesta = await fetch(URL + localStorage.username + '/personajes/' + localStorage.id_personaje, {
    method: 'GET',
    headers: headers()
  });
  const data = await respuesta.json();
  return data;
}

async function actualizarPersonaje(datos) {
  const respuesta = await fetch(URL + localStorage.username + '/personajes/' + localStorage.id_personaje, {
    method: 'PUT',
    headers: {
      'Authorization': localStorage.token
    },
    body: datos
  });
  const resultado = await respuesta.text();
  return resultado;
}

async function eliminarPersonaje(id) {
  const respuesta = await fetch(URL + localStorage.username + '/personajes/' + id, {
    method: 'DELETE',
    headers: headers()
  });
  const resultado = await respuesta.text();
  return resultado;
}


//SESIONES

async function getSesiones() {
  const respuesta = await fetch(URL + localStorage.username + '/sesiones', {
    method: 'GET',
    headers: headers()
  });
  const data = await respuesta.json();
  return data;
}

async function crearSesion(datos) {
  let campanha = document.getElementById("campanha").value;
  const respuesta = await fetch(URL + localStorage.username + '/' + campanha + "/sesiones", {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.text();
  return resultado;
}

async function getSesion() {
  const respuesta = await fetch(URL + localStorage.username + '/' + localStorage.id_campanha + '/sesiones/' + localStorage.id_sesion, {
    method: 'GET',
    headers: headers()
  });
  const data = await respuesta.json();
  return data;
}

async function actualizarSesion(datos) {
  const respuesta = await fetch(URL + localStorage.username + '/' + localStorage.id_campanha + "/sesiones/" + localStorage.id_sesion, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.text();
  return resultado;
}

async function eliminarSesionCampanha() {
  const respuesta = await fetch(URL + localStorage.username + '/' + localStorage.id_campanha + '/sesiones/' + localStorage.id_sesion, {
    method: 'DELETE',
    headers: headers()
  });
  const resultado = await respuesta.text();
  return resultado;
}


//CONTRASEÑA

async function actualizar(datos) {
  const respuesta = await fetch(URL + localStorage.username + '/password', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.text();
  return resultado;
}