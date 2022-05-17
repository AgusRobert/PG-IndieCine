import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import {
  getMovies,
  getProfileInfoById,
  getFavorites,
} from "../../redux/actions/index";
import { styled } from "@mui/system";
import Cartas from "../Cartas/Cartas.jsx";
import CafecitoBtn from "../CafecitoBtn/CafecitoBtn.jsx";
import { AppBar, Box, Paper, Typography, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import logo from "../Header/LOGO.png";
import "./style.css";
import FavListUser from "../FavList/FavListUser";

const ImgFav = styled("img")({
  height: "auto",
  width: "auto",
});

const PaperStyle = styled(Paper)({
  display: "flex",
  width: "550px",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: grey[900],
  borderRadius: 20,
  opacity: "90%",
});

const PaperStyle5 = styled(Paper)({
  display: "flex",
  flexWrap: "wrap",
  padding: 45,
  justifyContent: "space-between",
  alignItems: "left",
  width: 500,
  backgroundColor: grey[900],
  borderRadius: 20,
  opacity: "90%",
});

const PaperTop = styled(Paper)({
  display: "flex",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: 20,
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
});
const PaperBot = styled(Paper)({
  display: "flex",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: 20,
  boxShadow: "none",
});
const PaperTitulo = styled(Paper)({
  paddingBottom: 100,
  backgroundColor: "transparent",
  boxShadow: "none",
  alignItems: "left",
  width: "200",
  height: "auto",
});

const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#b388ff",
  position: "fixed",
  justifyContent: "space-between",
  alignItems: "center",
});

export default function UserProfile() {
  let dispatch = useDispatch();

  let { id } = useParams();

  const allMovies = useSelector(state => state.pelisfiltradas);
  const profileInfo = useSelector(state => state.profileInfo);
  let favs = useSelector(state => state.favorites);

  /* console.log("LOSFAVS", favs); */
  /*  console.log("ELIDELPERFILQUEESTOYMIRANDO", id); */

  const pelisdeluser = profileInfo?.Films;

  console.log("FILTRO", pelisdeluser);

  console.log("PELICULAS USER", profileInfo); //PELICULAS DEL USUARIO DEL PERFIL

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getProfileInfoById(id));
    dispatch(getFavorites(id));
  }, [dispatch]);

  return (
    <>
      <>
        <AppStyle>
          <Link to={"/"}>
            <img src={logo} alt="img not found" />
          </Link>
        </AppStyle>

        <Box>
          {/* <div className="detalles"> */}
          <div className="detalle3"></div>
          <PaperTop>
            <PaperStyle>
              <ImgFav
                src={profileInfo?.image}
                alt="Poster"
                className="imgPoster"
                height="300px"
              />
            </PaperStyle>
            {/* </div> */}
            <PaperMid>
              <PaperStyle5>
                <PaperTitulo>
                  <h5 className="Title">Nombre completo</h5>
                  <h2>
                    {profileInfo?.name} {profileInfo?.surname}
                  </h2>

                  <h5 className="Title">Nombre de usuario</h5>
                  <h2>{profileInfo?.username}</h2>

                  <h5 className="Title">Pais de origen</h5>
                  <h2>{profileInfo?.country}</h2>
                </PaperTitulo>
              </PaperStyle5>
            </PaperMid>
          </PaperTop>
          <PaperBot></PaperBot>{" "}
          <div className="detalles4">
            {profileInfo?.cafecito && (
              <CafecitoBtn linkCafecito={profileInfo.cafecito} />
            )}

            <h5 className="Title">Proyectos</h5>
            <div>
              <Grid container spacing={15}>
                {pelisdeluser ? (
                  pelisdeluser?.map(data => {
                    console.log(data);
                    return (
                      <Grid item m={3}>
                        <Cartas
                          id={data.id}
                          title={data.title}
                          poster={data.poster}
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
            </div>
          </div>
          <div>
            <div>
              <h5 className="Title">
                Peliculas favoritas de {profileInfo?.name}
              </h5>
            </div>
            <div>
              <h2>Lista de peliculas favoritas.</h2>
              {profileInfo?.id && <FavListUser userId={id} />}
            </div>
          </div>
          <Footer />
        </Box>
      </>
    </>
  );
}
