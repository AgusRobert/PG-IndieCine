import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";

const ButtonStyle = styled(Button)({
    whiteSpace: "nowrap",
    color: deepPurple[200],
    borderBlockColor: deepPurple[200],
    borderInlineStartColor: deepPurple[900],
    borderInlineEndColor: deepPurple[900],

    backgroundColor:deepPurple[400]
  });



export default function SignUpBtn() {

    // ----- Auth0 -----
    const { loginWithRedirect, isLoading } = useAuth0()

    function handleSignUp() {
        loginWithRedirect({
            screen_hint: "signup",
        })
    }

    if (isLoading) {
        return <></>;
    }

    return (
       
        <div>
            <ButtonStyle
                onClick={handleSignUp}
                variant="outlined"
                size="small"
                disableElevation
                sx={{
                    ":hover": {
                        bgcolor: amber[200],
                        color: "black",
                        borderBlockColor: amber[900],
                        borderInlineStartColor: amber[200],
                        borderInlineEndColor: amber[200],
                    },
                }}>Registrarse</ButtonStyle>
        </div>
     
    )
}