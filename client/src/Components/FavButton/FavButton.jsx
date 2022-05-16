import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addFavFilm } from "../../redux/actions";
import { Box } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteFavFilm } from "../../redux/actions";
import { Button } from "@mui/material";
import Swal from 'sweetalert2'


export default function FavButton({ filmId }) {
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [faved, setFaved] = useState(false); //hace un map por los id's de favoritos si está, es falso : es true
  const {user} = useAuth0()
 
 let favDispatch = {
     idPeli:filmId,
     email:user?.email,
 }
  function handleOnClick(payload) {
     console.log(payload)
    setOpen(true);
   setFaved(!faved);
   dispatch(addFavFilm(payload))
   Swal.fire({
    title: " &#129321; Añadido a favoritos, todos tus proyectos favoritos estan en tu perfil!",
    width: 600,
    timer: 3000,
    timerProgressBar: true,
    padding: '1em',
    icon: "success",
    color: '#716add',
    background: 'black',
    backdrop: `
      rgba(0,0,123,0.2)0  `,
    confirmButtonText: 'Entiendo',
  });
  }
  return (
    
    <Box>
    <IconButton onClick={ () =>{(handleOnClick({favDispatch}));(handleOpen())}} >
      <FavoriteIcon
        sx={{
          color: "#93a8ac",
          ":hover": {
            color: amber[400],
          },
        }}
        fontSize="large"
      /></IconButton>
    </Box>
  );
}
