import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import {
  deleteFavFilm,
  getFavorites,
  getProfileInfo,
} from "../../redux/actions";
import { Paper } from "material-ui";
import Swal from "sweetalert2";
import { Box, Modal } from "@mui/material";
const ImgFav = styled("img")({
  height: "400px",
  width: "auto",
});
const BoxFav = styled(Box)({
  backgroundColor: "#682f8a",
  border: "none",
  justifyContent: "space-around",
  alignItems: "center",
  boxShadow: 24,
  borderRadius: 5,
  display: "flex",
  width: "fit-content",
  paddingRight: 10,
});
const BoxFavG = styled(Box)({
  border: "none",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: 5,
  display: "flex",
  overflow: "auto",
  padding: 50,
});
export default function FavList(userId) {
  const { user } = useAuth0();
  let dispatch = useDispatch();
  let favs = useSelector((state) => state.favorites);
  const [faves, setFaves] = useState(favs);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const profileInfo = useSelector((state) => state.profileInfo);

  // console.log("USERIDDD", userId)
  let idFavs = userId?.userId;
  // console.log("IDFAVSSS", idFavs)

  useEffect(() => {
    dispatch(getFavorites(idFavs));
  }, []);

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

  console.log("DATOS", profileInfo);

  return (
    <BoxFavG>
      {favs.length ? (
        favs.map((peli) => {
          let favDispatch = {
            idPeli: peli.id,
            email: user.email,
          };
          return (
            <>
              <Box paddingRight={5}>
                <ImgFav src={peli.poster} alt="Poster" />
                <br></br>
                <BoxFav>
                  <IconButton
                    onClick={() => {
                      handleOnClick({ favDispatch });
                      handleOpen();
                    }}
                    value={favDispatch}
                  >
                    <HeartBrokenIcon
                      sx={{
                        color: amber[400],
                        ":hover": {
                          color: grey[800],
                        },
                      }}
                      fontSize="large"
                    />{" "}
                  </IconButton>
                  <Typography variant="h6" fontWeight="medium">
                    {peli.title}
                  </Typography>
                </BoxFav>
              </Box>
            </>
          );
        })
      ) : (
        <>
          <Typography variant="h6" fontWeight="medium">
            No tienes peliculas favoritas
          </Typography>
          <Typography variant="h6" fontWeight="medium">
            Te invitamos a recorrer todo nuestro contenido :)
          </Typography>
        </>
      )}
    </BoxFavG>
  );
}
