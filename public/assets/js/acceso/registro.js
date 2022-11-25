/**
 * Lumbre - Funciones de la página de registro (registro.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si es así, se le redirige a
 * la página de visualización de campañas
 * Si no, se recupera la lista de usuarios para realizar comprobaciones a la hora
 * de crear el nuevo usuario
 */
window.onload = async () => {
    if (localStorage.getItem("token") != null)
        window.location.replace("../campanhas.html");
    else {
        let respuesta = await getListaUsuarios();
        try {
            data = await respuesta.json();
        } catch (error) {
            data = [];
        }
    }
}

//Listado de usuarios ya registrados
let data = null;

/**
 * Redirecciona al usuario según la dirección recibida
 * @param direccion 
 */
function redireccionar(direccion) {
    window.location.href = direccion;
}

/**
 * Llama a la función que hace las comprobaciones del formulario
 * antes de enviarlo
 */
function enviar(event) {
    event.preventDefault();
    checkRegistro();
}

/**
 * Comprueba si el email introducido ya está registrado
 * @param email  
 */
function checkEmailRegistrado(email) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].email == email)
            return true;
    }
    return false;
}

/**
 * Comprueba si el username introducido ya está registrado
 * @param username 
 */
function checkUsernameRegistrado(username) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].username == username)
            return true;
    }
    return false;
}

/**
 * Comprueba los datos del formulario antes de hacer el envío
 */
function checkRegistro() {
    let email = document.getElementById("email");
    let username = document.getElementById("username");
    let passwd = document.getElementById("passwd");
    let passwd2 = document.getElementById("passwd2");
    let mensaje = document.getElementById("mensaje-feedback");
    //Comprobaciones: 
    //Email no registrado
    if (checkEmailRegistrado(email.value)) {
        mensaje.innerHTML = "El email introducido ya está registrado en el sistema.";
        email.focus();
        return;
    }
    //Nombre de usuario libre
    if (checkUsernameRegistrado(username.value)) {
        mensaje.innerHTML = "El nombre de usuario introducido no está disponible.";
        username.focus();
        return;
    }
    //Contraseña de 8 o más caracteres, una mayúscula, una minúscula y un número
    let patron = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwd.value.match(patron)) {
        mensaje.innerHTML = "La contraseña debe tener 8 o más caracteres, y contener mayúsculas, minúsculas y números.";
        passwd.focus();
        return;
    }
    //Contraseñas coincidentes
    if (passwd.value != passwd2.value) {
        mensaje.innerHTML = "Las contraseñas introducidas deben coincidir.";
        passwd.focus();
        return;
    }
    hacerRegistro(email.value, username.value, passwd.value);
}

/**
 * Llama a la función que hace la petición a la API para registrar al usuario con
 * el email, username y contraseña recibidos por parámetro, y procesa el resultado
 * @param email 
 * @param username 
 * @param passwd 
 */
async function hacerRegistro(email, username, passwd) {
    let datos = {};
    datos.email = email;
    datos.username = username;
    datos.passwd = passwd;
    let respuesta = await registrar(datos);
    if (respuesta.status == "201") {
        hacerLogin();
    } else {
        document.getElementById("mensaje-feedback").innerHTML = "Error en la creación de la cuenta.";
    }
}

/**
 * Hace el login del usuario automáticamente después de completar el registro si todo
 * funcionó correctamente, llamando a la función que hace la petición de login a la API
 * y procesando el resultado
 */
async function hacerLogin() {
    let datos = {};
    datos.username = document.getElementById('username').value;
    datos.passwd = document.getElementById('passwd').value;
    let respuesta = await login(datos);
    if (respuesta.status == "200") {
        localStorage.token = await respuesta.text();
        localStorage.username = datos.username;
        window.location.replace("../campanhas.html");
    } else {
        document.getElementById("mensaje-feedback").innerHTML = "Credenciales incorrectas.";
    }
}