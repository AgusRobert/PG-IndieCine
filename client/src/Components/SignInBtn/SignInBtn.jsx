import { useAuth0 } from '@auth0/auth0-react';

// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

export default function SignInBtn() {

    // const dispatch = useDispatch();

    // ----- Auth0 -----
    const { logout, loginWithRedirect } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();

    // Estoy probando cómo hacer una fn que ejecute el POST de la info del usuario.
    // useEffect(()=> {
    //     dispatch()
    // } , [isAuthenticated]);

    function handleLogout() {
        logout({ returnTo: window.location.origin });
    }

    function handleLogin() {
        loginWithRedirect();
    }

    if (isLoading) {
        return <div>Cargando...</div>
    }

    return (
        <>
            {isAuthenticated && (
                <div>
                    <div>
                        <h3>Welcome {user.name}!</h3>
                        {console.log(user)}
                    </div>
                    <div>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                </div>
            )}
            {!isAuthenticated && (
                <div>
                    <button onClick={handleLogin}>Iniciar sesión</button>
                </div>
            )}
        </>
    )
}