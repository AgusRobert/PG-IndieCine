import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import CreatorForm from "../SignUpForm/CreatorForm/CreatorForm";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { cameBackToBasic, deleteUserInformation } from "../../redux/actions";

export default function Profile() {

    const { user, logout } = useAuth0();
    const { isCreator } = useSelector(state => state);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    function handleOnDelete() {
        logout({ returnTo: window.location.origin });
        dispatch(deleteUserInformation(user.email))
        alert('Serás redirigido al inicio')
        navigate('/')
    }

    function handleCameBackToBasic(){
        dispatch(cameBackToBasic({
            email: user.email,
            creator: false,
        }))
    }

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
            {isCreator ? (
                <div>
                    <span>Nos enorgullece decirte que ya estás disfrutando de los beneficios de ser Creador.</span>
                    {/* <h4>Para cambiar a Creador, por favor complete el siguiente formulario.</h4>
                    <span>Ya ha completado el formulario. Gracias!</span> */}
                </div>
            ) : (
                <div>
                    <h4>Para cambiar a Creador, por favor complete el siguiente formulario.</h4>
                    <CreatorForm />
                </div>
            )}
            {isCreator ? (
                <div>
                    <h4>Para dejar el paraíso y volver a ser un Usuario básico, presione el siguiente botón:</h4>
                    <button onClick={handleCameBackToBasic} >Volver a básico</button>
                </div>
            ) : (null)}
            <div>
                <h4>Si desea borrar su cuenta y todos sus datos de la plataforma: </h4>
                <button onClick={handleOnDelete}>Borrar todo</button>
            </div>
        </div>
    )
}