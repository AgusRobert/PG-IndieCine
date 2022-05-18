import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import View2 from "../Reproductor/videoplayer2.js";
import {
  cleanState,
  getProfileInfo,
  renderMovieDetails,
} from "../../redux/actions/index";
import logo from "./LOGO.png";
import "./style.css";
import FavButton from "../FavButton/FavButton.jsx";
import Comments from "../Comments/Comments";
import { padding, styled, width } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import CafecitoBtn from "../CafecitoBtn/CafecitoBtn.jsx";
import { AppBar, Box, Paper, Typography } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SERVER_FRONT } from "../../paths/path";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 900,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

const ImgFav = styled("img")({
  minHeight: "343px",
  minWidth: "270px",
});

const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#682f8a",
  position: "fixed",
  justifyContent: "space-between",
  alignItems: "center",
});
const PaperStyle = styled(Paper)({
  borderRadius: 20,
  width: "30%",
  height: "auto",
  alignItems: "center",
  paddingLeft: "1.5%",
  backgroundColor: "#1f271b",
  boxShadow: "none",
});
const PaperStyle2 = styled(Paper)({
  display: "flex",
  width: "30%",
  height: "auto",
  padding: 0,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: grey[900],
  borderRadius: 20,
});
const PaperStyle3 = styled(Paper)({
  display: "flex",
  width: "100%",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#1f271b",
  borderRadius: 20,
  opacity: "90%",
  boxShadow: "none",
});
const PaperStyle4 = styled(Paper)({
  display: "flex",
  justifyContent: "flex-start",
  width: "30%",
  backgroundColor: "transparent",
  borderRadius: 20,
  opacity: "90%",
  maxHeight: 90,
  boxShadow: "none",
  alignItems: "center",
  marginRight: "10px",
});
const PaperStyle5 = styled(Paper)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: "transparent",
  borderRadius: 20,
  opacity: "90%",
  padding: 0,
  boxShadow: "none",
});
const PaperStyle6 = styled(Paper)({
  display: "flex",
  width: "100%",
  justifyContent: "flex-start",
  alignItems: "center",
  borderRadius: 20,
  backgroundColor: "transparent",
  boxShadow: "none",
});
const PaperTop = styled(Paper)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#1f271b",
  borderRadius: 20,
  margin: "0%",
  padding: "0%",
  width: "100%",
  boxShadow: "none",
});
const PaperMid = styled(Paper)({
  display: "table-column",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: 20,
  boxShadow: "none",
  width: "70%",
});
const PaperBot = styled(Paper)({
  backgroundColor: "transparent",
  boxShadow: "none",
  marginTop: "35px",
  maxWidth: "1700px",
  width: "100%",
  padding: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});
const PaperTitulo = styled(Paper)({
  backgroundColor: "transparent",
  boxShadow: "none",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
});
const Titulo = styled(Typography)({
  color: "#e0e0e0",
  fontSize: "45px",
  fontFamily: "Koulen",
});

const PaperView = styled(Paper)({
  boxShadow: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "30px",
  width: "60%",
  height: "590px",
  backgroundColor: "black",
  borderRadius: "20px",
});

const PaperComments = styled(Paper)({
  display: "flex",
  boxShadow: "none",
  width: "40%",
  backgroundColor: "transparent",
  border: "none",
});

const PaperFavs = styled(Paper)({
  boxShadow: "none",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "transparent",
  width: "100%",
  alignContent: "flex-start",
  padding: 0,
});

export default function MovieDetail() {
  let dispatch = useDispatch();
  let { id } = useParams();
  let filmId = id;
  const [loaded, setLoaded] = useState(false);

  const allMovies = useSelector((state) => state.pelisfiltradas);
  const profileInfo = useSelector((state) => state.profileInfo);

  const pelisdeluser = allMovies.filter(
    (peli) => peli.UserId === profileInfo.id
  );

  /* console.log("USER", pelisdeluser); */

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const peli = useSelector((state) => state.detalle);

  useEffect(() => {
    if (isAuthenticated) {
      if (user) {
        dispatch(getProfileInfo(user?.email));
        setLoaded(true);
      }
    }
  }, [dispatch, user, id, isAuthenticated, peli]);

  useEffect(() => {
    dispatch(renderMovieDetails(id));
    return function cleanUp() {
      dispatch(cleanState());
    };
  }, []);

  /* console.log("ELENCO", peli.mainActors.join(", ")); */
  let elenco = peli ? peli.mainActors : [];

  let key = 0;
  const handleSignUp = () => {
    loginWithRedirect({
      screen_hint: "signup",
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <AppStyle>
          <Link to={"/"}>
            <img src={logo} alt="img not found" />
          </Link>
        </AppStyle>
        {Swal.fire({
          title: "Registrate para acceder a todo nuestro contenido",
          showCancelButton: true,
          cancelButtonAriaLabel: "Volver al home",
          confirmButtonColor: "#6200ea",
          cancelButtonColor: "#ffc107",
          confirmButtonText: "Registrarse",
          footer: "<span>Al cancelar volverá a home</span>",
          width: 600,
          padding: "1em",
          icon: "info",
          color: "#716add",
          background: "black",
          backdrop: `
            rgba(0,0,123,0.2)0  `,
        }).then((result) => {
          if (result.isConfirmed) {
            handleSignUp();
          } else {
            window.location.replace(`${SERVER_FRONT}/`);
          }
        })}
      </>
    );
  }

  if (peli?.url) {
    return (
      <>
        <AppStyle>
          <Link to={"/"}>
            <img src={logo} alt="img not found" />
          </Link>
        </AppStyle>
        <>
          {loaded ? (
            <Box p={0} maxWidth={"1700px"} mx={"auto"}>
              {/* <div className="detalles"> */}
              <div className="detalle3"></div>
              <ThemeProvider theme={theme}>
                <PaperTop
                  sx={{
                    flexDirection: {
                      tablet: "column",
                      mobile: "column",
                      laptop: "row",
                    },
                    paddingTop: {
                      tablet: "15px",
                      mobile: "15px",
                    },
                  }}
                >
                  <PaperStyle
                    sx={{
                      paddingLeft: {
                        tablet: "0px",
                        mobile: "0px",
                        laptop: "1.5%",
                      },
                    }}
                  >
                    <ImgFav
                      src={peli.poster}
                      alt="Poster"
                      className="imgPoster"
                    />
                  </PaperStyle>
                  {/* </div> */}
                  <PaperMid
                    sx={{
                      padding: {
                        tablet: "0%",
                        mobile: "0%",
                      },
                    }}
                  >
                    <PaperStyle5>
                      <PaperTitulo>
                        <Box
                          height={100}
                          width={"50%"}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          bgcolor="#682f8a"
                          color="#e0e0e0"
                          fontSize={24}
                          position={"relative"}
                          left={0}
                          borderRadius={5}
                          mr={"10%"}
                        >
                          <Titulo variant="bold">{peli.title}</Titulo>
                        </Box>
                        {/* <PaperStyle4>
                          <h2 className="rating">Rating: {peli.rating}</h2>
                        </PaperStyle4> */}
                      </PaperTitulo>
                      <PaperStyle6>
                        <PaperStyle4>
                          <h3>Año:</h3>
                          <p>&nbsp;{peli.year}</p>
                        </PaperStyle4>
                        <PaperStyle4>
                          {" "}
                          <h3>Pais de origen: </h3>
                          <p>&nbsp;{peli.Country?.name}</p>
                        </PaperStyle4>
                        <PaperStyle4>
                          <h3>Género:</h3>
                          {/* <p color="#1f271b">_</p> */}
                          <p>
                            &nbsp;{peli.Genres?.map((a) => a.name).join(", ")}
                          </p>
                        </PaperStyle4>
                      </PaperStyle6>
                      <PaperStyle6>
                        <PaperStyle4>
                          <h3>Director:</h3>
                          <p>&nbsp;{peli.director}</p>
                        </PaperStyle4>
                        {peli.associateProducer && (
                          <PaperStyle4>
                            <h3>Productor Asociado:</h3>
                            <p>&nbsp; {peli.associateProducer}</p>
                          </PaperStyle4>
                        )}
                        <PaperStyle4>
                          <h3>Elenco principal:</h3>
                          &nbsp;
                          <p>{peli.mainActors.join(", ")}</p>
                        </PaperStyle4>
                      </PaperStyle6>{" "}
                    </PaperStyle5>

                    <PaperStyle3>
                      <Box paddingRight={12} opacity={"100%"}>
                        <h3>Sinopsis:</h3>
                        <div className="sinopsisP">
                          <p className="sino">{peli.synopsis}</p>
                        </div>
                      </Box>
                    </PaperStyle3>
                  </PaperMid>
                </PaperTop>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <PaperBot
                  sx={{
                    flexDirection: {
                      tablet: "column",
                      mobile: "column",
                      laptop: "row",
                    },
                  }}
                >
                  <PaperView
                    sx={{
                      width: {
                        tablet: "100%",
                        mobile: "100%",
                      },
                    }}
                  >
                    <View2 ubicacion={peli.url} />
                  </PaperView>
                  <PaperComments
                    sx={{
                      width: {
                        tablet: "100%",
                        mobile: "100%",
                      },
                    }}
                  >
                    <PaperFavs>
                      <div className="detalles4">
                        <FavButton filmId={filmId} />
                        <Link to={`/users/${peli.UserId}`}>
                          <button className="autorProfile">
                            PERFIL DEL AUTOR
                          </button>
                        </Link>
                        {peli.cafecito && (
                          <CafecitoBtn linkCafecito={profileInfo.cafecito} />
                        )}
                      </div>
                      <Comments
                        userId={profileInfo?.id}
                        filmId={Number(filmId)}
                        // username={profileInfo?.username}
                        username={user?.nickname}
                        // image={profileInfo?.image}
                        image={user?.picture}
                      />
                    </PaperFavs>
                  </PaperComments>
                </PaperBot>{" "}
              </ThemeProvider>
              <Footer />
            </Box>
          ) : (
            <div>
              <h2>Cargando...</h2>
            </div>
          )}
        </>
      </>
    );
  }
}
