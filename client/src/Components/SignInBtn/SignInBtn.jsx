import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

const ButtonStyle = styled(Button)({
  whiteSpace: "nowrap",
  color: "#1F271B",
  borderBlockColor: amber[900],
  borderInlineStartColor: amber[200],
  borderInlineEndColor: amber[200],
  backgroundColor: "#ffc107",
});
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
    return <></>;
  }

  return (
    <>
      {isAuthenticated && (
        <div>
          <div>
            <h6>Welcome {user.name}!</h6>
            {console.log(user)}
          </div>
          <div>
            <ButtonStyle
              variant="outlined"
              size="small"
              disableElevation
              onClick={handleLogout}
              sx={{
                ":hover": {
                  bgcolor: deepPurple[200],
                  color: "white",
                  borderBlockColor: amber[200],
                  borderInlineStartColor: amber[900],
                  borderInlineEndColor: amber[900],
                },
              }}
            >
              Cerrar sesión
            </ButtonStyle>
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <div>
          <ButtonStyle
            variant="outlined"
            size="small"
            disableElevation
            onClick={handleLogin}
            sx={{
              ":hover": {
                bgcolor: deepPurple[700],
                color: "black",
                borderBlockColor: deepPurple[200],
                borderInlineStartColor: deepPurple[900],
                borderInlineEndColor: deepPurple[900],
              },
            }}
          >
            Iniciar sesión
          </ButtonStyle>
        </div>
      )}
    </>
  );
}
