import { useAuth0 } from "@auth0/auth0-react";
import { Link as Ruta, useNavigate } from "react-router-dom";
import CreatorForm from "../SignUpForm/CreatorForm/CreatorForm";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import {
  deleteUserInformation,
  getProfileInfo,
  validateSubscription,
  updateSubscription,
  getUserInfo,
  updateUser,
  getMovies,
  getPlanInfo,
  deleteExcededFilms,
  deleteFilm,
  keepFilm,
  getUserHiddenFilms,
  keepFilmsArray,
  deleteFilmsUser,
} from "../../redux/actions";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import {  styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import logo from "../Header/LOGO.png";
import { useEffect, useState } from "react";
import axios from "axios";
import FavList from "../FavList/FavList";
import Subs from "../Subs/Subs";
import Swal from "sweetalert2";

const StyledLink = styled(Link)({
  backgroundColor: "#682f8a",
  justifyContent: "space-between",
  color: deepPurple[50],
  padding: 8,
  borderRadius: 10,
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
  paddingBottom: 30,
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
  backgroundColor: "#682f8a",
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
  fontFamily: "Koulen",
});
const Subtitulo = styled(Typography)({
  color: "#FFBE0B",
  fontSize: "30px",
  fontFamily: "Koulen",
});
const BoxFavG = styled(Box)({
  border: "none",
  //  justifyContent:'space-between',
  alignItems: "center",
  borderRadius: 5,
  display: "flex",
  paddingBottom: 20,
  overflow: "auto",
  width: 900,
});
const ImgP = styled("img")({
  height: "400px",
  width: "auto",
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
  const [filmsToKeep, setFilmsToKeep] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const profileInfo = useSelector((state) => state.profileInfo);
  const plans = useSelector((state) => state.plans);
  const allMovies = useSelector((state) => state.pelisfiltradas);

  const plandeluser = plans.filter((p) => p.name === profileInfo?.subcription);
  const limitedeluser = plandeluser.map((e) => e.filmsAllowed);
  const pelisdeluser = allMovies.filter(
    (peli) => peli.UserId === profileInfo.id
  );
  // si el usuario tenía un exceso de peliculas para su plan, éstas
  // van a estar en userHiddenFilms.
  const { userHiddenFilms } = useSelector((state) => state);

  const [showSubs, setShowSubs] = useState(false);
  // validación de suscripción
  const [valid, setValid] = useState(true);

  useEffect(() => {
    dispatch(getPlanInfo());
    dispatch(getMovies());
    if (user) {
      dispatch(getProfileInfo(user.email));
      profileInfo?.creator && dispatch(validateSubscription(user.email));
      profileInfo?.status &&
        setFillForm(profileInfo.status === "registered" ? false : true);
      setLoaded(true);
    }
  }, [
    dispatch,
    fillForm,
    planChanged,
    planCanceled,
    render,
    user,
    filmsToKeep,
    deleted,
  ]);

  useEffect(() => {
    if (user) {
      dispatch(getUserHiddenFilms(user.email));
    }
    if (userHiddenFilms.length) {
      Swal.fire({
        title:
          "Estas excediendo el límite de proyectos disponibles para tu plan.",
        icon: "warning",
        text: "Por favor, selecciona los proyectos que desea continuar",
        footer:
          "Los que no sean seleccionados quedarán ocultos hasta que cambie el plan.",
      });
    }
  }, [dispatch]);

  // funcion para que vuelva a ejecutar el useEffect cuando se cambie el plan
  const handlePlanChange = (payload) => {
    setPlanChanged(payload);
  };
  // funcion para que vuelva a ejecutar el useEffect cuando se cancele el plan para volver a Free
  const handlePlanCancel = (payload) => {
    setPlanCanceled(payload);
  };

  // -- Feature para que el usuario pueda eliminar sus proyectos excedentes al limite permitido -- //
  const addProjectToDelete = (e) => {
    setFilmsToDelete([
      ...filmsToDelete,
      { id: e.target.id, title: e.target.name },
    ]);
    // filmsToDelete.push(e.target.id);
  };

  const handleKeepProject = (film) => {
    dispatch(keepFilm({ id: film.id, status: "approved" }));
  };

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
    });
  };

  const handleOnCheckbox = (e) => {
    if (e.target.checked) {
      if (!filmsToKeep.includes(e.target.id))
        setFilmsToKeep([...filmsToKeep, e.target.id]);
    } else setFilmsToKeep(filmsToKeep.filter((film) => film !== e.target.id));
  };

  const handleOnListo = () => {
    //despachar la accion con el array de peliculas a modificar.
    if (filmsToKeep.length === limitedeluser[0]) {
      dispatch(keepFilmsArray([user?.email, ...filmsToKeep]));
      setFilmsToKeep([]);
    } else {
      Swal.fire({
        title: "¡Atención!",
        text: `Por favor selecciona ${limitedeluser[0]} de proyectos para continuar.`,
      });
    }
  };
  // -------------------------------------------------------------------------------------------- //

  const handleNavigateBtn = (id) => {
    navigate(`/detail/${id}`);
  };

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

  const handleDeleteProject = (peli) => {
    Swal.fire({
    
      width: 600,
      timer: 3000,
      padding: "1em",
      color: "#716add",
      background: "black",
      backdrop: `
        rgba(0,0,123,0.2)0  `,
        title: "¿Estás seguro?",
        text: "Una vez borrado no podrás recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFilm(peli.id));
        setDeleted(!deleted);
      }
    });

    // dispatch(deleteFilm(peli.id));
    // setDeleted(!deleted);
  };

  const handleCameBackToBasic = () => {
    Swal.fire({
      width: 600,
      timer: 3000,
      padding: "1em",
      color: "#716add",
      background: "black",
      backdrop: `
        rgba(0,0,123,0.2)0  `,
      title: "¿Estás seguro que deseas dejar de ser creador?",
      text: "Una vez confirmado, se borraran todos tus proyectos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updateUser({
            email: user.email,
            creator: false,
            status: "registered",
          })
        );
        dispatch(deleteFilmsUser({ email: user.email }));
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
        }).then(() => {
          navigate("/");
        });
      }
    });
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
      {loaded ? (
        <StyledBox>
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
              href={`/`}
            >
              <img src={logo} alt="Img not found" />
            </StyledLink>
          </Container> */}
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
                          cursor:"pointer"
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
              <br></br>
              {profileInfo?.status === "creator approved" &&
                pelisdeluser.length > limitedeluser[0] && (
                  <>
                    <h1>Para subir más proyectos, cambia tu plan.</h1>
                    <h2>
                      O elimina {pelisdeluser.length - limitedeluser[0]}{" "}
                      proyecto
                      {pelisdeluser.length - limitedeluser[0] === 1
                        ? null
                        : "s"}{" "}
                      para continuar.
                    </h2>
                  </>
                )}

              {/* {profileInfo?.status === "creator approved" && userHiddenFilms.length && (
                <>
                  <h3>Usted tiene los siguientes proyectos en espera.</h3>
                  <h3>Teniendo en cuenta su plan, puede rehabilitar hasta </h3>
                  <h3>{limitedeluser[0] - pelisdeluser.length} proyectos. </h3>
                  {userHiddenFilms.map((film) => {
                    return (
                      <>
                        <Link to={`/detail/${film.id}`}>
                          <h4>{film.title}</h4>
                        </Link>
                        <button onClick={handleKeepProject}>Rehabilitar</button>
                      </>
                    )
                  })}
                </> PARA ELIMINAR
              )} */}
              <br></br>
              {profileInfo?.status === "creator approved" && (
                <Container>
                  <StyledLink
                    sx={{
                      ":hover": {
                        bgcolor: deepPurple[200],
                        color: "black",
                        cursor:"pointer"
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
            {/* Los proyectos del usuario, mientras la cantidad de proyectos sea menos o igual a su limite */}
            {profileInfo?.status === "creator approved" &&
              profileInfo?.creator === true && (
                <>
                  <h2>Mis Proyectos</h2>
                  <BoxFavG>
                    {pelisdeluser?.length ? (
                      pelisdeluser.map((peli) => {
                        let idpeli = peli.id;
                        return (
                          <Box paddingRight={20}>
                            <ImgP src={peli.poster} alt="Poster" />
                            <br></br>
                            <StyledLink
                              sx={{
                                bcolor: deepPurple[400],
                                ":hover": {
                                  bgcolor: deepPurple[200],
                                  color: "black",
                                  cursor:"pointer"
                                },
                              }}
                              color="textPrimary"
                              variant="button"
                              underline="none"
                              onClick={() => handleNavigateBtn(idpeli)}
                            >
                              {peli.title}
                            </StyledLink>

                            <StyledLink
                              sx={{
                                bcolor: amber[500],
                                ":hover": {
                                  bgcolor: deepPurple[400],
                                  color: "black",
                                  cursor:"pointer"
                                },
                              }}
                              color="textPrimary"
                              variant="button"
                              underline="none"
                              
                              onClick={() => handleDeleteProject(peli)}
                            >
                              x
                            </StyledLink>
                          </Box>
                        );
                      })
                    ) : (
                      <Container>
                        {/* <p>
                          Aun no tienes Proyectos ¿Qué esperas para subir uno?
                        </p> */}

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
                          Aun no tienes Proyectos ¿Qué esperas para subir uno?
                        </StyledLink>
                      </Container>
                    )}
                  </BoxFavG>
                </>
              )}
            {/*----------------------------------*/}
            {profileInfo?.status === "creator approved" &&
            userHiddenFilms.length &&
            pelisdeluser.length - limitedeluser[0] ? (
              <>
                <h3>Usted tiene los siguientes proyectos en espera.</h3>
                <h3>
                  Teniendo en cuenta su plan, debe seleccionar
                  {` ${limitedeluser[0]} ${
                    limitedeluser[0] === 1
                      ? "proyecto con el"
                      : "proyectos con los"
                  } que desea continuar`}
                </h3>
                <>
                  {userHiddenFilms.map((film) => {
                    return (
                      <>
                        <Link to={`/detail/${film.id}`}>
                          <h4>{film.title}</h4>
                        </Link>
                        <input
                          type="checkbox"
                          id={film.id}
                          name={film.title}
                          onChange={handleOnCheckbox}
                        />
                        {/* <button onClick={() => handleKeepProject(film)}>
                          Recomponer
                        </button> */}
                      </>
                    );
                  })}
                  <button onClick={handleOnListo}>Listo</button>
                </>
              </>
            ) : null}

            {/* {Swal.fire({
              title: "¡Atención!",
              text: "Tienes más peliculas que las permitidas para tu plan.",
              icon: "warning",
            }).then(() => navigate('/profile'))} */}
            {/* Caso en que el usuario supere su limite de proyectos */}
            {/* {profileInfo?.status === "creator approved" && profileInfo?.creator === true && outLimit && (
              <>
                <h2>Mis Proyectos</h2>
                {console.log("Peliculas del usuario", pelisdeluser)}
                <h4>Para continuar, debe elegir los proyectos que desea eliminar</h4>
                <ul>
                  {pelisdeluser.map((peli) => {
                    return (
                      <li key={peli.id}>
                        <button onClick={addProjectToDelete} id={peli.id} name={peli.title}>{peli.title}</button>
                      </li>
                    );
                  })}
                </ul>
                <div>
                  <p>Proyectos a borrar:</p>
                  {
                    filmsToDelete.forEach((peli) => {
                      return (
                        <>
                          <h1>ENTRA AL RETURN</h1>
                          <p>{peli.title}</p>
                          <button onClick={(peli) => handleProjectsToDelete(peli)}>x</button>
                        </>
                      )
                    }

                    )
                  }
                </div>
                <button onClick={deleteProjects}>Listo</button>
              </>
            )} */}

            <Divider color="#FFBE0B" width={900} />
            <br></br>

            {/* {console.log("profileInfo", profileInfo)} */}
            {profileInfo?.creator === true && profileInfo.status !== "pending" && (
              <>
                {/* <h2>{profileInfo?.subcription}</h2> */}
                <Subs
                  currentSub={profileInfo?.subcription}
                  plans={plans}
                  planChangeFn={handlePlanChange}
                  planCanceledFn={handlePlanCancel}
                />
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
