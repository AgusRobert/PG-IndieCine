import React from "react";
import About from "../About/About";
import TyC from "../T&C/T&C"
import Contact from "../Contact/Contact"

export default function Footer(){ //los parametros son los que quiero que aparezcan en la card
    return (
        <div>
            <About/>
            <TyC/>
            <Contact/>
        </div>
    )
}