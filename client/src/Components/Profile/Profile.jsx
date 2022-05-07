import { useAuth0 } from "@auth0/auth0-react";
import { /*Link,*/ useNavigate } from "react-router-dom";
import CreatorForm from "../SignUpForm/CreatorForm/CreatorForm";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { cameBackToBasic, deleteUserInformation } from "../../redux/actions";
import { Box, Container, Link } from "@mui/material";
import { color, styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import logo from '../Header/LOGO.png'
import { useState } from "react";

const StyledLink = styled(Link)({
    marginRight: 150,
    justifyContent: 'space-between',
    color: deepPurple[50],

    padding: 8,
    borderRadius: '6%'
});



export default function Profile() {

    const { user, logout } = useAuth0();
    const { isCreator } = useSelector(state => state);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [upgrade, setUpgrade] = useState(false);

    function handleOnDelete() {
        logout({ returnTo: window.location.origin });
        dispatch(deleteUserInformation(user.email))
        alert('Serás redirigido al inicio')
        navigate('/')
    }

    function handleCameBackToBasic() {
        dispatch(cameBackToBasic({
            email: user.email,
            creator: false,
        }))
    }

    function handleUpgradeUser() {
        setUpgrade(true)
    }

    function handleUploadProject() {
        navigate('/addFilm')
    }

    return (
        <Box>
            <Container >
                <StyledLink
                    sx={{
                        ":hover": {
                            bgcolor: deepPurple[200],
                            color: "black",
                        },
                    }}
                    color="textPrimary"
                    variant="button"
                    underline="none"
                    href={`/`}
                >
                    <img src={logo} alt="Img not found" />
                </StyledLink>
            </Container>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h1>PROFILE</h1>
                <Container>
                    <h2>Mis datos</h2>
                    <h4>{user.name}</h4>
                    <h4>{user.nickname}</h4>
                    <h4>{user.email}</h4>

                    {isCreator && (
                        <Container>
                            <StyledLink
                                sx={{
                                    ":hover": {
                                        bgcolor: deepPurple[200],
                                        color: "black",
                                    }
                                }}
                                color="textPrimary"
                                variant="button"
                                underline="none"
                                onClick={handleUploadProject}
                            >
                                Subir Proyecto
                            </StyledLink>
                        </Container>
                    )}

                    {isCreator ? (
                        <Container>
                            <StyledLink
                                sx={{
                                    ":hover": {
                                        bgcolor: deepPurple[200],
                                        color: "black",
                                    },
                                }}
                                color="textPrimary"
                                variant="button"
                                underline="none"
                                onClick={handleCameBackToBasic}
                            >Volver a básico</StyledLink>
                        </Container>
                    ) : (null)}
                    <Container>
                        <StyledLink
                            sx={{
                                ":hover": {
                                    bgcolor: deepPurple[200],
                                    color: "black",
                                }
                            }}
                            color="textPrimary"
                            variant="button"
                            underline="none"
                            onClick={handleOnDelete}
                        >Borrar cuenta</StyledLink>
                    </Container>
                </Container>
            </Container>
            <Container>
                <h2>Lista de peliculas favoritas.</h2>
            </Container>
            <Container>
                {isCreator ? (
                    <>
                        <h2>Mis Proyectos</h2>
                        <ul>
                            <li>Proyecto 1</li>
                            <li>Proyecto 2</li>
                            <li>Proyecto 3</li>
                        </ul>
                    </>
                ) : (
                    <>
                        <h2>¿Desea subir al siguiente nivel?</h2>
                        <Container>
                            <h4>Beneficios de convertirse en Creador.</h4>
                            <ul>
                                <li>Posibilidad de publicar tu contenido.</li>
                                <li>Visibilidad a tu contenido.</li>
                                <li>Sección donde gestionar tu contenido.</li>
                            </ul>
                            <StyledLink
                                sx={{
                                    ":hover": {
                                        bgcolor: deepPurple[200],
                                        color: "black",
                                    },
                                }}
                                color="textPrimary"
                                variant="button"
                                underline="none"
                                onClick={handleUpgradeUser}
                            >
                                Subir de nivel
                            </StyledLink>
                            {upgrade && <CreatorForm />}
                        </Container>
                    </>
                )}
            </Container>


            {/* {user.isCreator && <Subs3/>}

            {user.pelissubidas<user.plan.movieQuantity && <Link to = '/MovieForm'><button>SUBIR PELÍCULA</button></Link> }*/}



        </Box>
    )
}