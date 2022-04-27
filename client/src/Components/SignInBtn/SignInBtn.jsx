import { Link } from 'react-router-dom';

export default function SignInBtn() {
    return (
        <div>
            <Link to="/signin">
                <button>Iniciar sesión</button>
            </Link>
        </div>
    )
}