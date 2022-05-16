import { useAuth0 } from "@auth0/auth0-react";
import { Link as Ruta, useNavigate } from "react-router-dom";
import CreatorForm from "../SignUpForm/CreatorForm/CreatorForm";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import {
  // cameBackToBasic,
  deleteUserInformation,
  getProfileInfo,
  validateSubscription,
  updateSubscription,
  getUserInfo,
  updateUser,
  getMovies,
  getPlanInfo,
} from "../../redux/actions";
import { /*Box,*/ AppBar, Box, Container, Divider, Link, Typography } from "@mui/material";
import { color, styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import logo from "../Header/LOGO.png";
import { useEffect, useState } from "react";
import axios from "axios";
import FavList from "../FavList/FavList";
import Subs from "../Subs/Subs";
import Swal from "sweetalert2";

const StyledLink = styled(Link)({
  backgroundColor:deepPurple[500],
  justifyContent: "space-between",
  color: deepPurple[50],
  padding: 8,
  borderRadius:10,
});

const StyledBox = styled(Box)({
  display: "grid",
  gap: "1em",
  alignItems: "stretch",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridAutoRows: "minmax(100px, auto)",
});

const StyledContainer = styled(Container)({
  backgroundColor: grey[900],
  borderRadius: "10px",
  gridColumn: "1/1",
  paddingBottom:30
});

const StyledContainer2 = styled(Container)({
  backgroundColor: grey[900],
  borderRadius: "10px",
  gridColumn: "2/4",
  width: "100%",
});

const StyledContainer3 = styled(Container)({
  backgroundColor: grey[900],
  borderRadius: "10px",
  gridColumn: "1/4",
});

const BoxFav = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: grey[700],
  border: "none",
  padding: 10,
  boxShadow: 24,
  borderRadius: 5,
  color: "black",
  p: 4,
});
const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#b388ff",
  position: "fixed",
  justifyContent: "space-between",
  alignItems: "center",
});
const BoxS = styled(Box)({
  paddingTop: 100,
});
const Titulo = styled(Typography)({
  color: "white",
  fontSize: "45px",
  fontFamily: "Koulen"
});
const Subtitulo = styled(Typography)({
  color: "#FFBE0B",
  fontSize: "30px",
  fontFamily: "Koulen"
});
const BoxFavG =styled(Box)({
  border: "none",
//  justifyContent:'space-between',
 alignItems:"center",
  borderRadius:5,
  display:"flex",
paddingBottom:20,
overflow:'auto',
width:900
});
const ImgP = styled("img")({
  height: "400px",
  width:"auto"
})
export default function Profile() {
  const { user, logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [upgradeBtn, setUpgradeBtn] = useState(false);
  const [fillForm, setFillForm] = useState(false);
  const [showSubs, setShowSubs] = useState(false);
  // validación de suscripción
  const [valid, setValid] = useState(true);
  const profileInfo = useSelector((state) => state.profileInfo);
  const plans = useSelector((state) => state.plans);
  const allMovies = useSelector((state) => state.pelisfiltradas);

  const plandeluser = plans.filter((p) => p.name === profileInfo?.subcription);

  const limitedeluser = plandeluser.map((e) => e.filmsAllowed);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const pelisdeluser = allMovies.filter(
    (peli) => peli.UserId === profileInfo.id
  );

  console.log("PELIS USER", pelisdeluser);

  useEffect(() => {
    dispatch(getPlanInfo());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getProfileInfo(user.email));
      if (valid) {
        setValid(false);
        dispatch(validateSubscription(user.email));
      }
      profileInfo?.status &&
        setFillForm(profileInfo.status === "registered" ? false : true);
    }
  }, [fillForm, dispatch]);

  // Config del modal
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  const handleOnClick = () => {
    setOpen(true);
    logout({ returnTo: window.location.origin });
    dispatch(deleteUserInformation(user.email));
  };

  const handleFillForm = (payload) => {
    setFillForm(payload);
  };

  const subsToUpdate = {
    email: user.email,
    subcription: profileInfo?.subcription,
    PlanId: profileInfo?.subcription === "de Culto" ? 2 : 3,
  };

  // function handleOnDelete() {
  //   logout({ returnTo: window.location.origin });
  //   dispatch(deleteUserInformation(user.email));
  //   alert("La eliminación será efectiva en las próximas horas.");
  //   navigate("/");
  // }

  const handleCameBackToBasic = () => {
    // dispatch(
    //   cameBackToBasic({email: user.email,creator: false})
    // );
    dispatch(
      updateUser({ email: user.email, creator: false, status: "registered" })
    );
    Swal.fire({
      title: "Dejaste de ser creador... &#128549;",
      width: 600,
      timer: 3000,
      timerProgressBar: true,
      padding: "1em",
      icon: "info",
      color: "#716add",
      background: "black",
      backdrop: `
        rgba(0,0,123,0.2)0  `,
      confirmButtonText: "Entiendo",
    });
    fillForm(false);
  };

  const handleUpgradeBtn = () => {
    setUpgradeBtn(true);
  };

  return (
    <>
      <AppStyle>
        <Ruta to={"/"}>
          <img src={logo} alt="img not found" />
        </Ruta>
      </AppStyle>
      <BoxS></BoxS>
      <StyledBox>
        {/* <StyledLink
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
          </StyledLink> */}

        <StyledContainer sx={{}}>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#FFBE0B"
            color="#e0e0e0"
            fontSize={24}
            position={"relative"}
            left={10}
            top={30}
            borderRadius={5}
          >
            <Titulo variant="bold">Perfil</Titulo>
          </Box>
          <Container>
            <br></br>
            <br></br>
          <Subtitulo variant="medium">Mis datos</Subtitulo>
            <h4>{user.name}</h4>
            {/* <h4>{user.nickname}</h4> */}
            <h4>{profileInfo?.username}</h4>
            <h4>{user.email}</h4>

            {profileInfo?.status === "creator approved" &&
              pelisdeluser.length < limitedeluser[0] && (
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
                    onClick={() => navigate("/addFilm")}
                  >
                    Subir Proyecto
                  </StyledLink>
                </Container>
              )}
            <Divider color="#FFBE0B"/>
            <br></br>
            {profileInfo?.status === "creator approved" &&
              pelisdeluser.length >= limitedeluser[0] && (
                <Subtitulo variant="medium">Para aumentar la cantidad de proyectos para subir, cambia tu plan.</Subtitulo>
              )}
              <br></br>
            {profileInfo?.status === "creator approved" && (
              <Container>
                <br></br>
                <StyledLink
                  sx={{ bcolor: deepPurple[400],
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
                  Dejar de ser creador
                </StyledLink>
              </Container>
            )}

            {/* <Container>
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
                // onClick={handleOnDelete}
                onClick={handleOnClick}
              >
                Borrar cuenta
              </StyledLink>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <BoxFav>
                  La eliminación será efectiva en las próximas horas.
                </BoxFav>
              </Modal>
            </Container> */}
          </Container>
        </StyledContainer>

        <StyledContainer2>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#FFBE0B"
            color="#e0e0e0"
            fontSize={24}
            position={"relative"}
            left={10}
            top={30}
            borderRadius={5}
          >
            <Titulo variant="bold">Tus proyectos favoritos</Titulo>
          </Box>
          {profileInfo?.id && <FavList userId={profileInfo?.id} />}
        </StyledContainer2>

        <StyledContainer3>
          {profileInfo?.status === "creator approved" && (
            <>
              <Titulo variant="bold">Mis Proyectos</Titulo>
              <br></br>
              <BoxFavG>
                {pelisdeluser.map((peli) => {
                  return (
                    <Box paddingLeft={5}> 
                    <ImgP src={peli.poster} alt='Poster'/>
                          <StyledLink
                  sx={{ bcolor: deepPurple[400],
                    ":hover": {
                      bgcolor: deepPurple[200],
                      color: "black",
                    },
                  }}
                  color="textPrimary"
                  variant="button"
                  underline="none"
                  onClick={() => navigate(`/detail/${peli.id}`)}
                >{peli.title}</StyledLink>
                     
                 </Box> );
                })}
            </BoxFavG> <Divider color="#FFBE0B" width={900}/>
            </>
          )}
 
            <br></br>
          {profileInfo?.creator === true && (
            <Subs currentSub={profileInfo?.subcription} />
          )}

          {profileInfo?.status === "registered" && fillForm === false && (
            <>
              <Subtitulo variant="medium">¿Desea subir al siguiente nivel?</Subtitulo>

              <Container>
                <h4>Beneficios de convertirse en Creador.</h4>
                <ul>
                  <li>Posibilidad de publicar tu contenido.</li>
                  <li>Visibilidad a tu contenido.</li>
                  <li>Sección donde gestionar tu contenido.</li>
                </ul>
                <Box paddingBottom={1}>
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
                  onClick={handleUpgradeBtn}
                >
                  Subir de nivel
                </StyledLink></Box>
                <Divider color="#FFBE0B"/>
                <br></br>
                {upgradeBtn && fillForm === false && (
                  <CreatorForm fillFormFn={handleFillForm} />
                )}
              </Container>
            </>
          )}
          {profileInfo?.status === "pending" && (
            <>
              <Subtitulo variant="medium">Tu solicitud esta siendo evaluada</Subtitulo>
              <Subtitulo variant="medium">Pronto nos comunicaremos contigo</Subtitulo>
            </>
          )}
        </StyledContainer3>
      </StyledBox>
    </>
  );
}
