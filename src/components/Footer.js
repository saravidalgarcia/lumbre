import React from 'react';
import { Link } from "react-router-dom";

/**
 * Componente que representa el pie de página - Lumbre
 * 
 * @author Sara Vidal García
 */
function Footer() {

    /**
     * Contenido del pie de página
     */
    return (
        <footer>
            <p>Sara Vidal García | 2022 | <Link to="/about" title="Página de información sobre Lumbre">Lumbre</Link></p>
        </footer>
    );
}

export default Footer;