import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import { Paper } from "material-ui";
import { Box, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Modal } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { useAuth0 } from "@auth0/auth0-react";
import {
  deleteFavFilm,
  getFavorites,
  getProfileInfo,
} from "../../redux/actions";

const ImgFav = styled("img")({
  height: "400px",
  width: "auto"
})

const BoxFav = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: grey[700],
  border: "none",
  padding: 10,
  boxShadow: 24,
  borderRadius: 5,
  color: "black",
  p: 4,
});

export default function FavList() {
  const { user } = useAuth0();
  let dispatch = useDispatch();
  let favs = useSelector((state) => state.favorites);
  const [faves, setFaves] = useState(favs);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const state = useSelector((state) => state);
  const profileInfo = useSelector((state) => state.profileInfo);
  const { id } = useSelector((state) => state.profileInfo);

  function handleOnClick(payload) {
    console.log('FavList handleOnClick 1', payload);
    dispatch(deleteFavFilm(payload));
    console.log("FavList handleOnClick 2", payload)
    let final = payload.favDispatch
    favs = favs.filter(P => P.id !== final.idPeli)
    dispatch(getFavorites(profileInfo.id)) //le saqué el ? a profileInfo
  }

  useEffect(() => {
    // console.log('state pre: ', state)
    // console.log('favs substate', favs)
    dispatch(getProfileInfo(user.email));
    // console.log('state post: ', state)
    // console.log("FavList profileInfo", profileInfo);
    id && dispatch(getFavorites(profileInfo.id));
    // console.log('profileInfo', profileInfo)
  }, []);

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
                    onClick={() => { handleOnClick({ favDispatch }); (handleOpen()) }}
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
