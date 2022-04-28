import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSignOut } from '../../redux/actions';

export default function SignInBtn() {

    const { isSignIn } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleOnSign(e) {
        e.preventDefault();
        if (isSignIn) {
            //despachar la accion para desloguear
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