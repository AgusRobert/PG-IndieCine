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
  getPlanInfo
} from "../../redux/actions";
import { /*Box,*/ Container, Link } from "@mui/material";
import { color, styled } from "@mui/system";
import { Modal, Box } from '@material-ui/core';
import { deepPurple, grey, amber } from "@mui/material/colors";
import logo from "../Header/LOGO.png";
import { useEffect, useState } from "react";
import axios from "axios";
import FavList from "../FavList/FavList";
import Subs from "../Subs/Subs";
import Swal from 'sweetalert2'

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

export default function Profile() {
  const { user, logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [upgradeBtn, setUpgradeBtn] = useState(false);
  const [fillForm, setFillForm] = useState(false);
  // validación de suscripción

  const profileInfo = useSelector((state) => state.profileInfo);
  const plans = useSelector((state) => state.plans);
  const allMovies = useSelector(state => state.pelisfiltradas);

  const plandeluser = plans.filter(p => p.name === profileInfo?.subcription)

  const limitedeluser = plandeluser.map(e => e.filmsAllowed)

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch])

  const pelisdeluser = allMovies.filter(peli => peli.UserId === profileInfo.id)

  useEffect(() => {
    dispatch(getPlanInfo());
  }, []);

  useEffect(() => {
    if (user?.email !== undefined) {
      dispatch(getProfileInfo(user.email));
      dispatch(validateSubscription(user.email));
      profileInfo?.status && setFillForm(profileInfo.status === 'registered' ? false : true)
    }
  }, [fillForm, dispatch]);

  // Config del modal
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false)
    navigate("/");
  };
  const handleOnClick = () => {
    setOpen(true)
    logout({ returnTo: window.location.origin });
    dispatch(deleteUserInformation(user.email));
  }

  const handleFillForm = (payload) => {
    setFillForm(payload);
  }

  const subsToUpdate = {
    email: user.email,
    subcription: profileInfo?.subcription,
    PlanId: profileInfo?.subcription === "de Culto" ? 2 : 3
  }

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
    dispatch(updateUser({ email: user.email, creator: false, status: "registered" }));
    alert('Se ha cancelado la suscripción');
  }

  const handleUpgradeBtn = () => {
    setUpgradeBtn(true);
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

            {profileInfo?.status === 'creator approved' && pelisdeluser.length < limitedeluser[0] ?
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
              : <h1>LLEGASTE AL LÍMITE DE SUBIDAS DE TU PLAN</h1>
            }

            {profileInfo?.status === 'creator approved' ? (
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
          <h2>Lista de peliculas favoritas.</h2>
          {profileInfo?.id && <FavList userId={profileInfo?.id} />}
        </StyledContainer2>

        <StyledContainer3>
          {profileInfo?.status === 'creator approved' && (
            <>
              <h2>Mis Proyectos</h2>
              <ul>
                {pelisdeluser.map(peli => {

                  return (<div>
                    <li>
                      <Ruta to={`/detail/${peli.id}`}>
                        <button>{peli.title}</button>
                      </Ruta>
                    </li>
                  </div>)

                })}
              </ul>
            </>
          )}

          {profileInfo?.status === 'registered' && fillForm === false && (
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
                  onClick={handleUpgradeBtn}
                >
                  Subir de nivel
                </StyledLink>
                {/* <Subs currentSub={profileInfo?.subcription} /> */}
                {upgradeBtn && fillForm === false && <CreatorForm
                  fillFormFn={handleFillForm}
                />}
              </Container>
            </>
          )}
          {profileInfo?.status === 'pending' && (
            <>
              <h2>En los próximos minutos se definirá su situación.</h2>
            </>
          )}
        </StyledContainer3>
      </StyledBox>
    </>
  );
}
