import React from "react";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getMovies,
  getProfileInfo,
  /* getUserInfo, */
  signUpFunction,
  /*  updateUser, */
  getUsers,
  validateSubscription,
} from "../../redux/actions/index.js";
import { Container /* Row */ } from "react-bootstrap";
import Cartas from "../Cartas/Cartas.jsx";
import ParaTi from "../paraTi/paraTi.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./style.css";
import "swiper/css/navigation";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/core";
import Twitter from "../Twitter/Twitter";
import Paper from "@mui/material/Paper";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import UserCards from "../userCards/userCards.jsx";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
const ContainerS = styled(Container)({
  paddingBottom: 20,
});
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);



const Container2 = styled(Paper)({
  display: "flex",
  width: "800px",
  justifyContent: "end",
  alignItems: "right",
  backgroundColor: "transparent",
  height: "300px",
  boxShadow: "none",
  marginRight: "auto",
});

const Container3 = styled(Paper)({
  backgroundColor: "transparent",
  boxShadow: "none",
});

/* import "swiper/components/pagination/pagination.min.css"; */

const ImgStyle = styled("img")({
  maxHeight: 500,
  width: "auto",
  color: "white",
});
// import "swiper/swiper.min.css";
export default function Home() {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const allMovies = useSelector(state => state.pelisfiltradas);
  const estrenos = allMovies?.slice(-7).reverse();
  const users = useSelector(state => state.usersfiltrados);
  const { profileInfo } = useSelector(state => state);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getMovies());
    !users?.length && dispatch(getUsers());
    if (user) {
      dispatch(getProfileInfo(user?.email));
      profileInfo?.creator && dispatch(validateSubscription(user.email));
      // acá se está intentando actualizar el subestado profileInfo despues de cambiar de plan.
      dispatch(getProfileInfo(user?.email));
      setLoaded(true);
    } else {
      setLoaded(true);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(
        signUpFunction({
          // ...user,
          name: user.given_name ? user.given_name : null,
          surname: user.family_name ? user.family_name : null,
          username: user.nickname,
          email: user.email,
          password: user.email,
          image: user.picture
            ? user.picture
            : "https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png",
        })
      );
      // La idea acá era para actualizar la imagen del usuario en la base de datos
      // por si el usuario cambia de imagen en Auth0
      // if (profileInfo?.image !== user.picture) {
      //     dispatch(updateUser({
      //         email: user.email,
      //         image: user.picture,
      //     }))
      // }
    }
  }, [user, isAuthenticated]);

  if (allMovies[0] === "No films" || users[0] === "No films") {
    return (
      <>
        <Header position="sticky" />
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ textAlign: "center" }}>
              No se ha podido encontrar la búsqueda.
            </h1>

            <button
              style={{ maxWidth: "200px", fontSize: "1rem", padding: "5px" }}
              onClick={() => window.location.reload()}
            >
              Volver al Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <div>
      {loaded ? (
        <>
          <Header position="sticky" />
          {estrenos.length && estrenos[0] !== "No films" ? (
            <>
              <h2 className="Title">Estrenos</h2>

              <Swiper
                navigation={true}
                effect={"coverflow"}
                centeredSlides={true}
                spaceBetween={20}
                slidesPerView={4}
                loop={true}
                coverflowEffect={{
                  rotate: 75,
                  stretch: 50,
                  depth: 1,
                  modifier: 1,
                  slideShadows: false,
                }}
                className="mySwiper"
              >
                {allMovies?.map(m => {
                  return (
                    <div height={600}>
                      <SwiperSlide>
                        <Link to={`/detail/${m.id}`}>
                          <ImgStyle src={m.poster} alt="img not found" />
                        </Link>
                      </SwiperSlide>
                    </div>
                  );
                })}
              </Swiper>

              {users.lenght !== 0 &&
                users?.map(user => {
                  return (
                    <div>
                      <Grid item m={3}>
                        <UserCards
                          title={user.username}
                          poster={user.image}
                          country={user.country}
                          id={user.id}
                        />
                      </Grid>
                    </div>
                  );
                })}
              {/* CARDS / TWITTER Y RECOMENDACIONES */}
              <Grid container>
                {/* CARDS */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={9}
                  lg={9}
                  xl={9}
                  marginBottom={2}
                >
                  <Box>
                    <Grid
                      container
                      spacing={8}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {allMovies ? (
                        allMovies?.map(data => {
                          let nombresGen = [];
                          let generos = data.Genres;
                          generos.forEach(a => {
                            nombresGen.push(a.name);
                          });
                          return (
                            <Grid item>
                              <Cartas
                                title={data.title}
                                poster={data.poster}
                                year={data.year}
                                country={data.Country.name}
                                genres={"Géneros: " + nombresGen.join(", ")}
                                rating={data.rating}
                                key={data.id}
                                duration={data.duration}
                                synopsis={data.synopsis}
                                director={data.director}
                                id={data.id}
                              />
                            </Grid>
                          );
                        })
                      ) : (
                        <img
                          src="https://i.pinimg.com/originals/3d/80/64/3d8064758e54ec662e076b6ca54aa90e.gif"
                          alt="not found"
                        />
                      )}
                    </Grid>
                  </Box>
                </Grid>

                {/* TWITTER */}
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <Box borderRadius={1}>
                    <Twitter />
                  </Box>
                </Grid>

                {/* RECOMENDACIONES */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box>
                    <ParaTi userId={profileInfo?.id} />
                  </Box>
                </Grid>

                {/* FOOTER */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box>
                    <Footer className="footer" />
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : (
            <div>
              <h2>Cargando...</h2>
              <Footer />
            </div>
          )}
        </>
      ) : (
        <h1>Cargando</h1>
      )}
    </div>
  );
}
