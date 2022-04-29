import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import CreatorForm from "../SignUpForm/CreatorForm/CreatorForm";

export default function Profile() {

    const {user} = useAuth0();

    return (
        <div>
            <div>
                {/* div provisorio */}
                <Link to={'/'}>Home (link provisorio)</Link>
            </div>
            <div>
                <h1>PROFILE</h1>
            </div>
            <div>
                <h2>Mis datos</h2>
                <span>Todos los datos del usuario...</span>
                <h4>{user.name}</h4>
                <h4>{user.nickname}</h4>
                <h4>{user.email}</h4>
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
            <div>
                <h4>Para cambiar a Creador, por favor complete el siguiente formulario.</h4>
                <CreatorForm />
            </div>
        </div>
    )
}