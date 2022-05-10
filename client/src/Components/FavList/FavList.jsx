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
import { Paper } from "material-ui";
import { Modal } from "@mui/material";
const ImgFav = styled("img")({
    height: "400px",
    width:"auto"
})
const BoxFav =styled(Box)({
    position: "absolute",
     top: "50%",
     left: "50%",
     transform: "translate(-50%, -50%)",
     width: 400,
     backgroundColor: grey[700],
     border: "none",
     padding:10,
     boxShadow: 24,
     borderRadius:5,
     color: "black",
     p: 4,
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

  console.log("USERIDDD", userId)
  let idFavs = userId?.userId
  console.log("IDFAVSSS", idFavs)

  useEffect(()=>{
    dispatch(getFavorites(idFavs))
  }, [])
 
  function handleOnClick(payload) {
    dispatch(deleteFavFilm(payload));
  }

  console.log("DATOS",profileInfo);
 
  return (
    <Box>
      <div>
        {favs &&
          favs.map((peli) => {
            let favDispatch = {
              idPeli: peli.id,
              email: user.email,
            };
            return (
                <>
                <Box>
                  <ImgFav src={peli.poster} alt="Poster" />
                  <IconButton
                    onClick={() => {handleOnClick({ favDispatch });(handleOpen())}}
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
                </Box>
                <Typography>{peli.title}</Typography>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <BoxFav>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Pelicula eliminada con exito
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Este film yan o aparecera en tu lista :(
                    </Typography>
                  </BoxFav>
                </Modal>
             </>
            );
          })}
      </div>
    </Box>
  );
}
