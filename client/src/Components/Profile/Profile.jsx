import { useAuth0 } from "@auth0/auth0-react";
import { /*Link,*/ useNavigate } from "react-router-dom";
import CreatorForm from "../SignUpForm/CreatorForm/CreatorForm";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { cameBackToBasic, deleteUserInformation, getProfileInfo, validateSubscription, updateSubscription, getUserInfo } from "../../redux/actions";
import { Box, Container, Link } from "@mui/material";
import { color, styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import logo from '../Header/LOGO.png'
import { useEffect, useState } from "react";
import axios from "axios"
import FavList from '../FavList/FavList';


const StyledLink = styled(Link)({
  marginRight: 150,
  justifyContent: "space-between",
  color: deepPurple[50],

  padding: 8,
  borderRadius: "6%",
});

const StyledBox = styled(Box)({
  display: "grid",
  gap: "1em",
  alignItems: "stretch",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridAutoRows: "minmax(100px, auto)",
});

const StyledContainer = styled(Container)({
  border: "1px solid #ced4da",
  borderRadius: "10px",
  gridColumn: "1/1",
});

const StyledContainer2 = styled(Container)({
  border: "1px solid #ced4da",
  borderRadius: "10px",
  gridColumn: "2/4",
  width: "100%",
});

const StyledContainer3 = styled(Container)({
  border: "1px solid #ced4da",
  borderRadius: "10px",
  gridColumn: "1/4",
});

export default function Profile() {
  const { user, logout } = useAuth0();
  const { isCreator } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [upgrade, setUpgrade] = useState(false);

  // validación de suscripción

  const profileInfo = useSelector((state) => state.profileInfo)

  const payer_email = "test_user_54987522@testuser.com"

  useEffect(() => {
    dispatch(getProfileInfo(user.email))
    dispatch(validateSubscription(payer_email))
  }, [])

  const subsToUpdate = {
    email: user.email,
    subcription: profileInfo?.subcription,
    PlanId: profileInfo?.subcription === "de Culto" ? 2 : 3
  }



  function handleOnDelete() {
    logout({ returnTo: window.location.origin });
    dispatch(deleteUserInformation(user.email))
    alert('Serás redirigido al inicio')
    navigate('/')
  }


  function handleCameBackToBasic() {
    dispatch(
      cameBackToBasic({
        email: user.email,
        creator: false,
      })
    );
  }


  function handleUpgradeUser() {
    setUpgrade(true);
  }

  function handleUploadProject() {
    navigate("/addFilm");
  }

  return (
    <>
      <StyledBox>
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
            href={`/`}
          >
            <img src={logo} alt="Img not found" />
          </StyledLink>
        </Container>
        <StyledContainer sx={{}}>
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
                    },
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

            {isCreator && (
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
                >
                  Volver a básico
                </StyledLink>
              </Container>
            ) : null}
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
                onClick={handleOnDelete}
              >
                Borrar cuenta
              </StyledLink>
            </Container>

            <Container>
              <h2>Mis favoritas</h2>
              <FavList />
            </Container>

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
                >
                  Volver a básico
                </StyledLink>
              </Container>
            ) : null}

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
                onClick={handleOnDelete}
              >
                Borrar cuenta
              </StyledLink>
            </Container>
          </Container>
        </StyledContainer>
        <StyledContainer2>
          <h2>Lista de peliculas favoritas.</h2>
        </StyledContainer2>
        <StyledContainer3>
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
        </StyledContainer3>
      </StyledBox >
    </>
  );
}
