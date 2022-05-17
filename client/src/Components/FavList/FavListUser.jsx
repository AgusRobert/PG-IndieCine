import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import {
  deleteFavFilm,
  getFavorites,
  getProfileInfo,
} from "../../redux/actions";
import Swal from "sweetalert2";
import { Modal } from "@mui/material";
import Cartas from "../Cartas/Cartas.jsx";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import "./FavListUser.modules.css";

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

export default function FavListUser({ userId }) {
  const { user } = useAuth0();
  let dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const profileInfo = useSelector((state) => state.profileInfoUser);
  let favs = useSelector((state) => state.favorites);

  // console.log("FAVORITOS", favs);

  //  console.log("PROFILE", profileInfo);
  let idFavs = userId;
  // console.log("IDFAVSSS", idFavs);

  // useEffect(() => {
  //   dispatch(getFavorites(idFavs));
  // }, [dispatch]);

  function handleOnClick(payload) {
    dispatch(deleteFavFilm(payload));
    Swal.fire({
      title: "Este proyecto ya no es de tus favoritos &#128552;",
      width: 600,
      timer: 3000,
      timerProgressBar: true,
      padding: "1em",
      icon: "warning",
      color: "#716add",
      background: "black",
      backdrop: `
        rgba(0,0,123,0.2)0  `,
      confirmButtonText: "OK",
    });
  }

  /* console.log("DATOS", profileInfo); */

  return (
    <PaperPelis>
      {favs.length ? (
        favs?.map((data) => {
          let nombresGen = [];
          let generos = data.Genres;
          generos.forEach((a) => {
            nombresGen.push(a.name);
          });
          return (
            <>
              <div className="contenedor">
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
              </div>
            </>
          );
        })
      ) : (
        <>
          <Typography>Este usuario no tiene peliculas favoritas!</Typography>
        </>
      )}
    </PaperPelis>
  );
}
