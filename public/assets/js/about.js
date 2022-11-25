/**
 * Lumbre - Funciones de la página de información y contacto (about.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado. Si no lo está, se oculta
 * la cabecera.
 */
window.onload = () => {
  if (localStorage.getItem("token") == null) {
    document.getElementById("cabecera").style.visibility = "hidden";
    document.getElementById("cabecera").style.display = "none";
  }
  else {
    document.getElementById("username").innerHTML = localStorage.getItem("username");
  }
}