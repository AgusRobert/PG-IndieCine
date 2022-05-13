import React from "react";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getMovies,
  getProfileInfo,
  getUserInfo,
  signUpFunction,
  updateUser,
} from "../../redux/actions/index.js";
import { Container, Row } from "react-bootstrap";
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
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
const ContainerS = styled(Container)({
  paddingBottom: 20,
});
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

// import "swiper/swiper.min.css";
export default function Home() {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const allMovies = useSelector((state) => state.pelisfiltradas);
  const { profileInfo } = useSelector((state) => state);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getMovies());
    if (user) {
      dispatch(getProfileInfo(user?.email));
      setLoaded(true);
    }
  }, [user]);

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

  if (allMovies[0] === "No films") {
    return (
      <>
        <Header position="sticky" />
        <div className="container">
          <div>
            <h1>No se ha podido encontrar la búsqueda.</h1>
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
          {allMovies.length && allMovies[0] !== "No films" ? (
            <>
              <h2 className="Title">Estrenos</h2>
              <Swiper
                navigation={true}
                effect={"coverflow"}
                centeredSlides={true}
                slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
                loop={true}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                className="mySwiper"
              >
                {allMovies?.map((m) => {
                  return (
                    <div>
                      <SwiperSlide>
                        <Link to={`/detail/${m.id}`}>
                          <img src={m.poster} alt="img not found" />
                        </Link>
                      </SwiperSlide>
                    </div>
                  );
                })}
              </Swiper>

              <ContainerS>
                <Grid container spacing={15}>
                  {/* <Row md={6} lg={6} className="newdiv" > */}
                  {allMovies ? (
                    allMovies?.map((data) => {
                      // console.log("HOME", data)

                      let nombresGen = [];
                      let generos = data.Genres;
                      generos.forEach((a) => {
                        nombresGen.push(a.name);
                      });

                      return (
                        <Grid item m={3}>
                          {/* <div className="cardgrid" key={data.id}> */}
                          {/* <Link to={`/detail/${data.id}`}> */}
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
                          {/* </Link> */}
                          {/* </div> */}
                        </Grid>
                      );
                    })
                  ) : (
                    <img
                      src="https://i.pinimg.com/originals/3d/80/64/3d8064758e54ec662e076b6ca54aa90e.gif"
                      alt="not found"
                    />
                  )}
                  {/* </Row> */}
                </Grid>
                <Footer />
              </ContainerS>
              <ParaTi userId={profileInfo?.id} />
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
