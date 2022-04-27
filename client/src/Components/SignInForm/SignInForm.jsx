import CreatorForm from "./CreatorForm/CreatorForm";
import UserForm from "./UserForm/UserForm";

export default function SignInForm() {

    const [user, setUser] = useState(false);
    const [creator, setCreator] = useState(false);
    const [typeOfUser, setTypeOfUser] = useState(false);

    function handleOnClick(e) {
        // Esta función se ejecuta cuando el cliente decide cómo registrarse:
        // si decide registrarse como usuario, se cambia el estado de user a true
        // , el estado de creator a false y se renderiza <UserForm/>
        // si decide registrarse como creador, se cambia el estado de creator a true
        // , el estado de user a false y se renderiza <CreatorForm/>
        if (e.target.name === 'user') {
            setUser(true);
            if (creator) {
                setCreator(false);
            }
            setTypeOfUser(true);
        }
        if (e.target.name === 'creator') {
            setCreator(true);
            if (user) {
                setUser(false);
            }
            setTypeOfUser(true);
        }
    }

    function handleLogInGoogle(e) {
        e.preventDefault();
        alert('Google login');
        // Acá se va a disparar el login de google 
    }

    return (
        <div>
            {/* {!typeOfUser ? ( */}
                <div>
                    <h2>Si desea loguearse con Google, presione el siguiente botón.</h2>
                    <button onClick={handleLogInGoogle}>Google</button>
                </div>
            {/* // ) : (null)} */}
            <div>
                <h2>¿Desea registrarse como Usuario o como Creador?</h2>
                <div >
                    <div >
                        <button name='user' onClick={handleOnClick}>Usuario</button>
                    </div>
                    <div >
                        <button name='creator' onClick={handleOnClick}>Creador</button>
                    </div>
                </div>
            </div>
            <div>
                {typeOfUser ? user ? <UserForm /> : <CreatorForm /> : <span>Por favor elija con qué perfil desea registrarse.</span>}
            </div>
        </div>
    )
}