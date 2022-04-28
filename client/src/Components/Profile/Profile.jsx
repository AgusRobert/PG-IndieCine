import { useState } from "react";
import { Link } from "react-router-dom";
import CreatorForm from "../SignUpForm/CreatorForm/CreatorForm";

export default function Profile() {

    // const [isCreatorClick, setIsCreatorClick] = useState(false);

    // function handleOnClick() {
    //     setIsCreatorClick(!isCreatorClick);
    // }

    return (
        <div>
            <div>
                {/* div provisorio */}
                <Link to={'/'}>Home (link provisorio)</Link>
            </div>
            <div>
                <h1>Profile</h1>
            </div>
            <div>
                <h2>Mis datos</h2>
                <span>Todos los datos del usuario</span>
            </div>
            <div>
                <h2>¿Desea subir al siguiente nivel?</h2>
                <div>
                    <h4>Beneficios de convertirse en Creador.</h4>
                    <ul>
                        <li>Posibilidad de publicar tu contenido.</li>
                        <li>Visibilidad a tu contenido.</li>
                        <li>Sección donde gestionar tu contenido.</li>
                    </ul>
                </div>
            </div> <br />
            {/* <button onClick={handleOnClick}>Subir a Creador</button> */}
            <div>
                <h4>Para cambiar a Creador, por favor complete el siguiente formulario.</h4>
                <CreatorForm />
            </div>
        </div>
    )
}