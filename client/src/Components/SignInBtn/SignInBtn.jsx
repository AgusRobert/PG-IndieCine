import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSignOut } from '../../redux/actions';

export default function SignInBtn() {

    const { isSignIn } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ----- Auth0 logout -----
    const { logout } = useAuth0();

    function handleOnSign(e) {
        e.preventDefault();
        if (isSignIn) {
            //despachar la accion para desloguear
            logout({ returnTo: window.location.origin });
            dispatch(signInSignOut(false));
        } else {
            //redirecciona al formulario
            navigate('/signin');
        }
    }

    return (
        <div>
            <button onClick={handleOnSign}>{isSignIn ? ('Cerrar sesión') : ('Iniciar sesión')}</button>
        </div>
    )
}