import React from 'react';
import { Link } from "react-router-dom";

function Footer(){
    return(
    <>
        <footer>
          <p>Sara Vidal García | 2022 | <Link to="/about" title="Página de información sobre Lumbre">Lumbre</Link></p>
        </footer>
    </>
    );
}

export default Footer;