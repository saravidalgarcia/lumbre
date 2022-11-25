/**
 * Lumbre - Funciones comunes a todas las páginas
 * 
 * @author Sara Vidal García
 */


/**
 * Devuelve al usuario a la página de inicio (gestión de campañas)
 */
function inicio() {
  window.location.href = "../campanhas.html";
}

/**
 * Obtiene un número aleatorio entre 1 y 20 lo muestra en el dado
 */
function tirarDado() {
  let resultado = document.getElementById("resultado-dado");
  let tirada = Math.floor(Math.random() * 20) + 1;
  if (tirada == 1 || tirada == 20)
    resultado.classList.add("critico");
  else
    resultado.classList.remove("critico");
  resultado.innerHTML = tirada;
}

/**
 * Cierra la sesión del usuario
 */
function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.replace("../index.html");
}

/**
 * Filtra los resultados de la tabla por el texto introducido
 * por el usuario en el buscador y las columnas indicadas en el
 * parámetro columnas
 * @param columnas - Array con los números de columna filtrables
 */
 function buscarEnTabla(columnas) {
  var busqueda, filtro, tabla, tr, td, i, texto;
  busqueda = document.getElementById("buscador");
  filtro = busqueda.value.toUpperCase();
  tabla = document.getElementById("tabla");
  tr = tabla.getElementsByTagName("tr");
  //Recorre las filas de la tabla
  let contador = 0;
  for (i = 0; i < tr.length; i++) {
    //Para cada fila, toma el valor de las columnas filtrables
    for(j = 0; j < columnas.length; j++){
      td = tr[i].getElementsByTagName("td")[columnas[j]];
          if (td) {
              texto = td.textContent || td.innerText;
              //Oculta las filas en las que el valor de columna no coindica con el filtro
              if (texto.toUpperCase().indexOf(filtro) > -1) {
                  tr[i].style.display = "";
                  if (contador % 2 == 0)
                      tr[i].style.backgroundColor = "var(--font-color-soft)";
                  else
                      tr[i].style.backgroundColor = "transparent";
                  contador++;
                  break;
              } else {
                  tr[i].style.display = "none";
                  tr[i].style.backgroundColor = "";
              }
          }
      } 
  }
}

/**
 * Ordena las filas de la tabla alfabéticamente por la columna
 * que se indique en el parámetro n.
 * @param n - La columna por la que se ordena
 */
function ordenarTabla(n) {
  var tabla, filas, cambiar, i, x, y, hacerCambio, dir, contador = 0;
  tabla = document.getElementById("tabla");
  cambiar = true;
  //La ordenación por defecto es ascendente
  dir = "asc";
  //Bucle que se repite mientras queden filas por ordenar
  while (cambiar) {
    cambiar = false;
    filas = tabla.rows;
    //Se recorren las filas
    for (i = 1; i < (filas.length - 1); i++) {
      hacerCambio = false;
      //Se toma el valor de la columna n de dos filas consecutivas
      x = filas[i].getElementsByTagName("td")[n];
      y = filas[i + 1].getElementsByTagName("td")[n];
      //Se comprueba si hay que intercambiar las filas
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          hacerCambio = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          hacerCambio = true;
          break;
        }
      }
    }
    //Se intercambian las filas si es necesario
    if (hacerCambio) {
      filas[i].parentNode.insertBefore(filas[i + 1], filas[i]);
      cambiar = true;
      //Se aumenta el contador para saber cuántos cambios se han realizado
      contador++;
    } else {
      //Si la tabla ya estaba ordenada ascendentemente, entonces se
      //reordena descendentemente
      if (contador == 0 && dir == "asc") {
        dir = "desc";
        cambiar = true;
      }
    }
  }
}

/**
 * Redirige al usuario a la página de cambio de contraseña
 */
function cambiarContrasenha() {
  window.location.href = "../contrasenha.html";
}