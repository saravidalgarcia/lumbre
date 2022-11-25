/**
 * Lumbre - Funciones de la página de visualización de campañas (campanhas.html)
 * 
 * @author Sara Vidal García
 */

/**
 * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
 * la página de login
 * Si lo está, se recuperan las campañas de la API
 */
window.onload = async () => {
    if (localStorage.getItem("token") == null)
        window.location.replace("../index.html");
    else {
        document.getElementById("username").innerHTML = localStorage.getItem("username");
        localStorage.removeItem("id_campanha");
        let data = await getCampanhas();
        if (data.length > 0)
            setCampanhas(data);
    }
}

//Variable para guardar todas las campañas recuperadas de la API
let campanhascargadas = null;

/**
 * Establece la información de las campañas a partir de los datos recibidos de la API
 * @param campanhas
 */
function setCampanhas(campanhas) {
    let contenedor = document.getElementById("campanhas");
    campanhascargadas = campanhas;
    contenedor.innerHTML = `
    <div class="menu-dropdown">
        <button class="boton-dropdown">Ordenar por</button>
        <div class="menu-dropdown-opciones">
            <a onclick="orderCampanhas('titulo-asc')">Nombre</a>
            <a onclick="orderCampanhas('titulo-desc')">Nombre (inverso)</a>
            <a onclick="orderCampanhas('modificacion')">Última modificación</a>
            <a onclick="orderCampanhas('creacion-asc')">Fecha de creación (más antiguo)</a>
            <a onclick="orderCampanhas('creacion-desc')">Fecha de creación (más reciente)</a> 
        </div>
    </div>
    `;
    let cc = document.createElement("div");
    cc.classList.add("campanhas");
    cc.id = "contenedor-campanhas";
    for (let i = 0; i < campanhas.length; i++) {
        let c = document.createElement("div");
        c.classList.add("campanha");
        c.title = "Ver campanha";
        c.onclick = function () { verCampanha(campanhas[i].id); };
        c.innerHTML = `
            <h4 id="titulo">${campanhas[i].titulo}</h4>
            <p>${campanhas[i].resumen}</p>
            <br>
            <p class="small">Creado: ${campanhas[i].creacion}</p>
            <p class="small">Modificado: ${campanhas[i].modificacion}</p>
        `;
        cc.appendChild(c);
    }
    contenedor.appendChild(cc);
}

/**
 * Redirecciona al usuario a la página de visualización de campaña
 * con el id recibido
 * @param id
 */
function verCampanha(id) {
    localStorage.id_campanha = id;
    window.location.href = "./campanha/ver-campanha.html";
}

/**
 * Redirecciona al usuario a la página de creación de campaña
 */
function crearCampanha() {
    window.location.href = "../campanha/crear.html";
}

/* --- FUNCIONES DE ORDENACIÓN DE CAMPAÑAS --- */

/**
 * Ordena por título ascendente
 */
function orderTituloAsc() {
    for (let i = 0; i < campanhascargadas.length; i++) {
        for (let j = 0; j < campanhascargadas.length; j++) {
            if (campanhascargadas[i].titulo < campanhascargadas[j].titulo) {
                let temp = campanhascargadas[i];
                campanhascargadas[i] = campanhascargadas[j];
                campanhascargadas[j] = temp;
            }
        }
    }
}

/**
 * Ordena por título descendente
 */
function orderTituloDesc() {
    for (let i = 0; i < campanhascargadas.length; i++) {
        for (let j = 0; j < campanhascargadas.length; j++) {
            if (campanhascargadas[i].titulo > campanhascargadas[j].titulo) {
                let temp = campanhascargadas[i];
                campanhascargadas[i] = campanhascargadas[j];
                campanhascargadas[j] = temp;
            }
        }
    }
}

/**
 * Ordena por fecha de creación ascendente
 */
function orderCreacionAsc() {
    for (let i = 0; i < campanhascargadas.length; i++) {
        for (let j = 0; j < campanhascargadas.length; j++) {
            if (campanhascargadas[i].creacion < campanhascargadas[j].creacion) {
                let temp = campanhascargadas[i];
                campanhascargadas[i] = campanhascargadas[j];
                campanhascargadas[j] = temp;
            }
        }
    }
}

/**
 * Ordena por fecha de creación descendente
 */
function orderCreacionDesc() {
    for (let i = 0; i < campanhascargadas.length; i++) {
        for (let j = 0; j < campanhascargadas.length; j++) {
            if (campanhascargadas[i].creacion > campanhascargadas[j].creacion) {
                let temp = campanhascargadas[i];
                campanhascargadas[i] = campanhascargadas[j];
                campanhascargadas[j] = temp;
            }
        }
    }
}

/**
 * Ordena por fecha de modificación (más reciente a más antiguo)
 */
function orderModificacion() {
    for (let i = 0; i < campanhascargadas.length; i++) {
        for (let j = 0; j < campanhascargadas.length; j++) {
            if (campanhascargadas[i].modificacion > campanhascargadas[j].modificacion) {
                let temp = campanhascargadas[i];
                campanhascargadas[i] = campanhascargadas[j];
                campanhascargadas[j] = temp;
            }
        }
    }
}

/**
 * Recibe el criterio de ordenación y muestra las campañas ordenadas
 * @param campo - Criterio de ordenación
 */
function orderCampanhas(campo) {
    let x = document.getElementById("contenedor-campanhas");
    switch (campo) {
        case "titulo-asc": orderTituloAsc(); break;
        case "titulo-desc": orderTituloDesc(); break;
        case "creacion-asc": orderCreacionAsc(); break;
        case "creacion-desc": orderCreacionDesc(); break;
        case "modificacion": orderModificacion(); break;
        default: return;
    }
    x.innerHTML = "";
    for (let i = 0; i < campanhascargadas.length; i++) {
        let c = document.createElement("div");
        c.classList.add("campanha");
        c.title = "Ver campanha";
        c.onclick = function () { verCampanha(campanhascargadas[i].id); };
        c.innerHTML = `
            <h4 id="titulo">${campanhascargadas[i].titulo}</h4>
            <p>${campanhascargadas[i].resumen}</p>
            <br>
            <p class="small">Creado: ${campanhascargadas[i].creacion}</p>
            <p class="small">Modificado: ${campanhascargadas[i].modificacion}</p>
        `;
        x.appendChild(c);
    }
}