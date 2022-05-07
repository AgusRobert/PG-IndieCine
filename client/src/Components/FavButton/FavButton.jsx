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
const BoxFav =styled(Box)({
 position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: grey[600],
  border: "none",
  padding:10,
  boxShadow: 24,
  borderRadius:5,
  color: "black",
  p: 4,
});
 

export default function FavButton({ filmId }) {
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [faved, setFaved] = useState(false); //hace un map por los id's de favoritos si está, es falso : es true
  const {user} = useAuth0()
 
 let favDispatch = {
     idPeli:filmId,
     email:user.email,
 }
  function handleOnClick(payload) {
     console.log(payload)
    setOpen(true);
   setFaved(!faved);
   dispatch(addFavFilm(payload))
   //    if(faved === false){
//     dispatch(deleteFavFilm(favDispatch))
//    }else
//    { dispatch(addFavFilm(favDispatch));} 
  }
  return (
    <Box onClick={ e =>(handleOnClick({favDispatch}))}>
    <IconButton  value={favDispatch} >
      <FavoriteIcon
        sx={{
          color: grey[800],
          ":hover": {
            color: amber[400],
          },
        }}
        fontSize="large"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><div>
        <BoxFav>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pelicula añadida con exito
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Encuentra todas tus peliculas favoritas en tu perfil!
          </Typography>
        </BoxFav></div>
      </Modal>
    </IconButton></Box>
  );
}
