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
  deleteExcededFilms,
} from "../../redux/actions";
import { /*Box,*/ Container, Link } from "@mui/material";
import { color, styled } from "@mui/system";
import { Modal, Box } from "@material-ui/core";
import { deepPurple, grey, amber } from "@mui/material/colors";
import logo from "../Header/LOGO.png";
import { useEffect, useState } from "react";
import axios from "axios";
import FavList from "../FavList/FavList";
import Subs from "../Subs/Subs";
import Swal from "sweetalert2";

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
  // estado que controla cuando el CreatorForm fue llenado.
  const [fillForm, setFillForm] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // planChanged y planCanceled intentan solucionar el problema del renderizado cuando se cambia de plan.
  const [planChanged, setPlanChanged] = useState(false);
  const [planCanceled, setPlanCanceled] = useState(false);
  // con el render intentamos que se vuelva a ejecutar el useEffect para que actualize el renderizado
  const [render, setRender] = useState(false);
  // estado que controla cuando el usuario está excedido de su plan.
  const [outLimit, setOutLimit] = useState(false);
  const [filmsToDelete, setFilmsToDelete] = useState([]);

  const profileInfo = useSelector((state) => state.profileInfo);
  const plans = useSelector((state) => state.plans);
  const allMovies = useSelector((state) => state.pelisfiltradas);

  const plandeluser = plans.filter((p) => p.name === profileInfo?.subcription);
  const limitedeluser = plandeluser.map((e) => e.filmsAllowed);
  const pelisdeluser = allMovies.filter(
    (peli) => peli.UserId === profileInfo.id
  );

  // var cont = 0;
  useEffect(() => {
    dispatch(getPlanInfo());
    dispatch(getMovies());
    if (user) {
      dispatch(getProfileInfo(user.email));
      // setRender(true);
      // if (cont === 0) {
      profileInfo?.creator && dispatch(validateSubscription(user.email));
      // cont++;
      // }
      profileInfo?.status &&
        setFillForm(profileInfo.status === "registered" ? false : true);
      setLoaded(true);
      limitedeluser[0] > pelisdeluser.length && setOutLimit(true);
      limitedeluser[0] <= pelisdeluser.length && setOutLimit(false);
    }
  }, [fillForm, dispatch, planChanged, planCanceled, render]);

  // funcion para que vuelva a ejecutar el useEffect cuando se cambie el plan
  const handlePlanChange = (payload) => {
    setPlanChanged(payload);
  }
  // funcion para que vuelva a ejecutar el useEffect cuando se cancele el plan para volver a Free
  const handlePlanCancel = (payload) => {
    setPlanCanceled(payload);
  }

  // -- Feature para que el usuario pueda eliminar sus proyectos excedentes al limite permitido -- //
  const addProjectToDelete = (e) => {
    filmsToDelete.push(e.target.id);
  }

  const handleProjectsToDelete = () => {
    setFilmsToDelete(
      filmsToDelete.filter((film) => film.id !== peli.id)
    )
  }

  const deleteProjects = () => {
    //en el estado local filmsToDelete tengo un array con los id 
    // de los proyectos que quiero borrar
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez borrados no podrás recuperarlos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteExcededFilms(filmsToDelete, profileInfo.id));
        setFilmsToDelete([]);
      }
    })
  }
  // -------------------------------------------------------------------------------------------- //

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
      {loaded ? (
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

              {profileInfo?.status === "creator approved" &&
                pelisdeluser.length >= limitedeluser[0] && (
                  <h1>Para subir más proyectos, cambia tu plan.</h1>
                )}

              {profileInfo?.status === "creator approved" && (
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
            <h2>Lista de peliculas favoritas.</h2>
            {profileInfo?.id && <FavList userId={profileInfo?.id} />}
          </StyledContainer2>

          <StyledContainer3>
            {/* Los proyectos del usuario, mientras la cantidad de proyectos sea menos o igual a su limite */}
            {profileInfo?.status === "creator approved" && profileInfo?.creator === true && !outLimit && (
              <>
                <h2>Mis Proyectos</h2>
                <ul>
                  {pelisdeluser.map((peli) => {
                    return (
                      <div>
                        <li>
                          <Ruta to={`/detail/${peli.id}`}>
                            <button>{peli.title}</button>
                          </Ruta>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </>
            )}

            {/* Caso en que el usuario supere su limite de proyectos */}
            {profileInfo?.status === "creator approved" && profileInfo?.creator === true && outLimit && (
              <>
                {Swal.fire({
                  title: "¡Atención!",
                  text: "Tienes más peliculas que las permitidas para tu plan.",
                  icon: "warning",
                })}
                <h2>Mis Proyectos</h2>
                <h4>Para continuar, debe elegir los proyectos que desea eliminar</h4>
                <ul>
                  {pelisdeluser.map((peli) => {
                    return (
                      <li key={peli.id}>
                        <button onClick={addProjectToDelete}>{peli.title}</button>
                      </li>
                    );
                  })}
                </ul>
                <div>
                  <p>Proyectos a borrar:</p>
                  {
                    filmsToDelete.map((peli) => {
                      return (
                        <>
                          <p>{peli.title}</p>
                          <button onClick={handleProjectsToDelete}>x</button>
                        </>
                      )
                    })
                  }
                </div>
                <button onClick={deleteProjects}>Listo</button>
              </>
            )}

            {/* {console.log("profileInfo", profileInfo)} */}
            {profileInfo?.creator === true && profileInfo.status !== "pending" && (
              <>
                {/* <h2>{profileInfo?.subcription}</h2> */}
                <Subs currentSub={profileInfo?.subcription} plans={plans} planChangeFn={handlePlanChange} planCanceledFn={handlePlanCancel} />
              </>
            )}

            {profileInfo?.status === "registered" && fillForm === false && (
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
                  {upgradeBtn && fillForm === false && (
                    <CreatorForm fillFormFn={handleFillForm} />
                  )}
                </Container>
              </>
            )}
            {profileInfo?.status === "pending" && (
              <>
                <h2>Tu solicitud esta siendo evaluada</h2>
                <h3>Pronto nos comunicaremos contigo</h3>
              </>
            )}
          </StyledContainer3>
        </StyledBox>
      ) : (
        <h1>CARGANDO...</h1>
      )}
    </>
  );
}
