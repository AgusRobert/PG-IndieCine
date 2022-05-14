import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import View from "../Reproductor/videoplayer.js";
import {
  getMovies,
  getProfileInfo,
  renderMovieDetails,
  getProfileInfoById,
} from "../../redux/actions/index";
import FavButton from "../FavButton/FavButton.jsx";
import Comments from "../Comments/Comments";
import { styled } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import CafecitoBtn from "../CafecitoBtn/CafecitoBtn.jsx";
import Cartas from "../Cartas/Cartas.jsx";
import { AppBar, Box } from "@mui/material";
import logo from "../Header/LOGO.png";

const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#b388ff",
  position: "fixed",
  justifyContent: "space-between",
  alignItems: "center",
});

const BoxStyle = styled(Box)({
  paddingTop: 50,
  justifyContent: "space-evenly",
  alignItems: "center",
  paddingBottom: 0,
  alignContent: "center",
  justifyItems: "flex-end",
});

export default function UserProfile() {
  let dispatch = useDispatch();

  let { id } = useParams();
  let filmId = id;

  const allMovies = useSelector((state) => state.pelisfiltradas);
  const profileInfo = useSelector((state) => state.profileInfo);

  /* console.log(profileInfo); */ //PROPIEDADES USUARIO DEL PERFIL

  const pelisdeluser = allMovies.filter(
    (peli) => peli.UserId === profileInfo.id
  );

  let idPeli = pelisdeluser.map((a) => a.id);

  /* console.log(pelisdeluser); */ //PELICULAS DEL USUARIO DEL PERFIL

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getProfileInfoById(filmId));
  }, [dispatch]);

  return (
    <>
      <AppStyle>
        <Link to={"/"}>
          <img src={logo} alt="img not found" />
        </Link>
      </AppStyle>
      <BoxStyle>
        <div>
          <h1>{profileInfo?.name + " " + profileInfo?.surname}</h1>
        </div>
        <div>
          <img src={profileInfo?.image} />
        </div>
        <div>
          <h1>{profileInfo?.country}</h1>
        </div>
        <div>
          <h1>{profileInfo?.cafecito}</h1>
        </div>
        <div>
          <h1>{profileInfo?.rol}</h1>
        </div>
        <div>
          <h1>{profileInfo?.username + " <- USERNAME"}</h1>
        </div>

        <div>
          {pelisdeluser ? (
            pelisdeluser?.map((data) => {
              console.log(data);
              return (
                <div>
                  <Cartas
                    id={data.id}
                    title={data.title}
                    poster={data.poster}
                  />
                </div>
              );
            })
          ) : (
            <img
              src="https://i.pinimg.com/originals/3d/80/64/3d8064758e54ec662e076b6ca54aa90e.gif"
              alt="not found"
            />
          )}
        </div>
      </BoxStyle>
    </>
  );
}
