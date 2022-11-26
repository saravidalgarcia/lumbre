import React, { useEffect } from 'react';
import Cabecera from '../components/Cabecera';
import Footer from '../components/Footer';
import MenuPpal from '../components/MenuPpal';

function Calendario(){

    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "assets/js/calendario.js";
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);

    return(
    <>
        <Cabecera />
        <main className="contenido">
        <MenuPpal />
        <section className="info">
            <section className="cabecera-info">
                <h1>Mi Calendario</h1>
            </section>
            <section id="sesiones" className="cuerpo-info">
                <div className="calendario">
                    <div className="vista-calendario" id="vista-calendario">
                        <div className="mes">
                            <span className="mes-anterior" id="mes-anterior"></span>
                            <span className="mes-actual" id="mes"></span>
                            <span className="mes-siguiente" id="mes-siguiente"></span>
                        </div>
                        <div className="cal-dia">Lun</div>
                        <div className="cal-dia">Mar</div>
                        <div className="cal-dia">Mie</div>
                        <div className="cal-dia">Jue</div>
                        <div className="cal-dia">Vie</div>
                        <div className="cal-dia">Sab</div>
                        <div className="cal-dia">Dom</div>
                        <div className="vista-calendario" id="dias">
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </main>
        <Footer />
        <div id="contenedor-sesiones-dia" className="modal">
            <div id="sesiones-dia" className="sesiones-dia">
            <span className="close">&times;</span>
            <div id="info-sesiones-dia"></div>
            </div>  
        </div>
    </>
  );
}

export default Calendario;