import { useAuth0 } from "@auth0/auth0-react"

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider  } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: "#D892FD",
      },
    },
  });

export default function SignUpBtn() {

    // ----- Auth0 -----
    const { loginWithRedirect } = useAuth0()

    function handleSignUp() {
        loginWithRedirect({
            screen_hint: "signup",
        })
    }

    return (
        <ThemeProvider theme={theme}>
        <div>
            <Button color="primary" onClick={handleSignUp} >Registrarse</Button>
        </div>
        </ThemeProvider>
    )
}