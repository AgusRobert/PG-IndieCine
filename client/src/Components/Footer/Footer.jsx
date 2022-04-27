import React from "react";
import About from "../About/About";
import TyC from "../T&C/T&C"
import Contact from "../Contact/Contact"
import { Link } from "react-router-dom";

export default function Footer(){ //los parametros son los que quiero que aparezcan en la card
    return (
        <div>
            <button>
                <Link to="/about">Sobre nosotros</Link>
            </button>
            <button>
                <Link to="/contact">Contacto</Link>
            </button>
            <button>
                <Link to="/terms">Terminos y condiciones</Link>
            </button>
        </div>
    )
}