import { useAuth0 } from "@auth0/auth0-react"

export default function SignUpBtn() {

    // ----- Auth0 -----
    const { loginWithRedirect } = useAuth0()

    function handleSignUp() {
        loginWithRedirect({
            screen_hint: "signup",
        })
    }

    return (
        <div>
            <button onClick={handleSignUp} >Registrarse</button>
        </div>
    )
}