import { Link } from "react-router-dom";

export default function SignUpBtn() {
    return (
        <div>
            <Link to="/signup">
                <button>Registrarse</button>
            </Link>
        </div>
    )
}