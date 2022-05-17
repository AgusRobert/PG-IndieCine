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
import cargando from "../NotFound/cargando.png";

const ImgFav = styled("img")({
  height: "auto",
  width: "auto",
});

const PaperStyle = styled(Paper)({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  padding: 20,
  boxShadow: "none",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#1f271b",
  borderRadius: 20,
  opacity: "90%",
});

const PaperStyle5 = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  backgroundColor: "#1f271b",
  borderRadius: 20,
  opacity: "90%",
  marginBottom: "20px",
  paddingTop: "0px",
});

const PaperProyectos = styled(Paper)({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  width: "100%",
  backgroundColor: "transparent",
  border: "none",
});

const PaperFavoritos = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: "transparent",
  border: "none",
});

const PaperPelis = styled(Paper)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  maxWidth: "100%",
  backgroundColor: "transparent",
  border: "none",
  overflowX: "scroll",
  maxHeight: "600px",
  overflow: "auto",
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
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: 20,
  boxShadow: "none",
  width: "90%",
  maxWidth: "1150px",
});
const PaperTitulo = styled(Paper)({
  display: "flex",
  flex: "wrap",
  flexDirection: "row",
  backgroundColor: "transparent",
  boxShadow: "none",
  alignItems: "center",
  justifyContent: "space-evenly",
  width: "100%",
  paddingBottom: "10px",
  marginTop: "0px",
});
const PaperName = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "transparent",
  boxShadow: "none",
  alignItems: "center",
});
const PaperCafecito = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "transparent",
  boxShadow: "none",
  alignItems: "center",
});
const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#682f8a",
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

  const pelisdeluser = profileInfo?.Films;

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
            <PaperMid>
              <PaperStyle5>
                <PaperTitulo>
                  <PaperName>
                    <h5 className="Title">Nombre completo</h5>
                    <h2 className="Nombre">
                      {profileInfo?.name} {profileInfo?.surname}
                    </h2>
                  </PaperName>
                  <PaperName>
                    <ImgFav
                      src={profileInfo?.image}
                      alt="Poster"
                      className="imgPoster"
                      height="300px"
                    />
                  </PaperName>
                </PaperTitulo>
                <PaperStyle>
                  <PaperName>
                    <h5 className="Title">Nombre de usuario</h5>
                    <h2 className="Datos">{profileInfo?.username}</h2>
                  </PaperName>
                  <PaperName>
                    <h5 className="Title">Rol</h5>
                    <h2 className="Datos">{profileInfo?.rol}</h2>
                  </PaperName>
                  <PaperName>
                    <h5 className="Title">Lugar de origen</h5>
                    <h2 className="Datos">{profileInfo?.country}</h2>
                  </PaperName>
                </PaperStyle>
                {profileInfo?.cafecito && (
                  <PaperCafecito>
                    <h5 className="Cafecito">
                      ¿Te gustan los proyectos de este autor?
                    </h5>
                    <CafecitoBtn linkCafecito={profileInfo.cafecito} />
                    <p className="Pcafecito">
                      Apoya su trabajo con un cafecito
                    </p>
                  </PaperCafecito>
                )}
              </PaperStyle5>
              <PaperProyectos>
                <PaperTitulo>
                  <h5 className="Proyectos">Proyectos</h5>
                </PaperTitulo>
                <PaperPelis>
                  {pelisdeluser ? (
                    pelisdeluser?.map(data => {
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
                    <img src={cargando} alt="not found" />
                  )}
                </PaperPelis>
              </PaperProyectos>
              <PaperFavoritos>
                <PaperTitulo>
                  <h5 className="Proyectos">
                    Peliculas favoritas de {profileInfo?.name}
                  </h5>
                </PaperTitulo>
                {profileInfo?.id && <FavListUser userId={id} />}
              </PaperFavoritos>
            </PaperMid>
          </PaperTop>
          <Footer />
        </Box>
      </>
    </>
  );
}
