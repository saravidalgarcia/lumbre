import React, { useState, useEffect } from 'react';
import Cabecera from '../components/Cabecera';
import Footer from '../components/Footer';
import MenuPpal from '../components/MenuPpal';
import TarjetaC from '../components/TarjetaC';
import { getCampanhas } from '../peticiones';

function Campanhas(){

  const [campanhas, setCampanhas] = useState([]); 

  /**
   * Se comprueba que el usuario esté autenticado y, si no es así, se le redirige a
   * la página de login
   * Si lo está, se recuperan las campañas de la API
   */
  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token") == null)
        window.location.replace("../index.html");
      else {
          document.getElementById("username").innerHTML = localStorage.getItem("username");
          localStorage.removeItem("id_campanha");
          document.getElementById("menu-ppal-campanhas").classList.add("actual");
          let data = await getCampanhas();
          if (data.length > 0)
            setCampanhas(data);
      }
    }
    fetchData().catch(console.error);
  },[]);

  useEffect(() => {
    if(campanhas.length > 0)
      document.getElementById("vacio").innerHTML = "";
    else
      document.getElementById("vacio").innerHTML = "No hay nada que mostrar aquí todavía.";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[campanhas]);

  /**
  * Redirecciona al usuario a la página de creación de campaña
  */
  function crearCampanha() {
    window.location.href = "/campanha/crear";
  }

  /**
   * Redirecciona al usuario a la página de visualización de campaña
   * con el id recibido
   * @param id
   */
  function verCampanha(id) {
    localStorage.id_campanha = id;
    window.location.href = "/campanha/ver-campanha";
  }

  /* --- FUNCIONES DE ORDENACIÓN DE CAMPAÑAS --- */

  /**
  * Ordena por título ascendente
  */
  function orderTituloAsc() {
    for (let i = 0; i < campanhas.length; i++) {
        for (let j = 0; j < campanhas.length; j++) {
            if (campanhas[i].titulo < campanhas[j].titulo) {
                let temp = campanhas[i];
                campanhas[i] = campanhas[j];
                campanhas[j] = temp;
            }
        }
    }
  }

  /**
  * Ordena por título descendente
  */
  function orderTituloDesc() {
    for (let i = 0; i < campanhas.length; i++) {
        for (let j = 0; j < campanhas.length; j++) {
            if (campanhas[i].titulo > campanhas[j].titulo) {
                let temp = campanhas[i];
                campanhas[i] = campanhas[j];
                campanhas[j] = temp;
            }
        }
    }
  }

  /**
  * Ordena por fecha de creación ascendente
  */
  function orderCreacionAsc() {
    for (let i = 0; i < campanhas.length; i++) {
        for (let j = 0; j < campanhas.length; j++) {
            if (campanhas[i].creacion < campanhas[j].creacion) {
                let temp = campanhas[i];
                campanhas[i] = campanhas[j];
                campanhas[j] = temp;
            }
        }
    }
  }

  /**
  * Ordena por fecha de creación descendente
  */
  function orderCreacionDesc() {
    for (let i = 0; i < campanhas.length; i++) {
        for (let j = 0; j < campanhas.length; j++) {
            if (campanhas[i].creacion > campanhas[j].creacion) {
                let temp = campanhas[i];
                campanhas[i] = campanhas[j];
                campanhas[j] = temp;
            }
        }
    }
  }

  /**
  * Ordena por fecha de modificación (más reciente a más antiguo)
  */
  function orderModificacion() {
    for (let i = 0; i < campanhas.length; i++) {
        for (let j = 0; j < campanhas.length; j++) {
            if (campanhas[i].modificacion > campanhas[j].modificacion) {
                let temp = campanhas[i];
                campanhas[i] = campanhas[j];
                campanhas[j] = temp;
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
    if (x != null){
      switch (campo) {
          case "titulo-asc": orderTituloAsc(); break;
          case "titulo-desc": orderTituloDesc(); break;
          case "creacion-asc": orderCreacionAsc(); break;
          case "creacion-desc": orderCreacionDesc(); break;
          case "modificacion": orderModificacion(); break;
          default: return;
      }
      x.innerHTML = "";
      for (let i = 0; i < campanhas.length; i++) {
          let c = document.createElement("div");
          c.classList.add("campanha");
          c.title = "Ver campanha";
          c.onClick = function () { verCampanha(campanhas[i].id); };
          c.innerHTML = `
              <h4 id="titulo">${campanhas[i].titulo}</h4>
              <p>${campanhas[i].resumen}</p>
              <br>
              <p className="small">Creado: ${campanhas[i].creacion}</p>
              <p className="small">Modificado: ${campanhas[i].modificacion}</p>
          `;
          x.appendChild(c);
      }
    } 
  }

  return(
    <>
        <Cabecera />
        <main className="contenido">
        <MenuPpal />
        <section className="info">
          <section className="cabecera-info">
            <h1>Mis campañas</h1>
            <button title="Crear campaña" onClick={crearCampanha}>Nueva</button>
          </section>
          <section id="campanhas" className="cuerpo-info">
            <div className="menu-dropdown">
              <button className="boton-dropdown">Ordenar por</button>
              <div className="menu-dropdown-opciones">
                  <button onClick={orderCampanhas('titulo-asc')}>Nombre</button>
                  <button onClick={orderCampanhas('titulo-desc')}>Nombre (inverso)</button>
                  <button onClick={orderCampanhas('modificacion')}>Última modificación</button>
                  <button onClick={orderCampanhas('creacion-asc')}>Fecha de creación (más antiguo)</button>
                  <button onClick={orderCampanhas('creacion-desc')}>Fecha de creación (más reciente)</button> 
              </div>
            </div>
            <p id="vacio" className="mensaje-noinfo">No hay nada que mostrar aquí todavía.</p>
            <div className="campanhas" id="contenedor-campanhas">
            {
              campanhas.map((c) => <TarjetaC key={c.id} id={c.id} titulo={c.titulo} resumen={c.resumen} creacion={c.creacion} modificacion={c.modificacion}/>)
            }
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Campanhas;