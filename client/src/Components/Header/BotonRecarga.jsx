import * as React from "react";
import { getMovies, getUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CachedIcon from "@mui/icons-material/Cached";
import { deepPurple, yellow } from "@mui/material/colors";

export default function BotonRecarga() {
  const dispatch = useDispatch();

  function handleClick(e) {
    //funcion para volver a cargar todos los personajes
    e.preventDefault();
    dispatch(getUsers());
    dispatch(getMovies());
  }

  return (
    <div>
      <CachedIcon
        sx={{
          color: "#ffc107",
          "&:hover": { color: deepPurple[500] },
          cursor: "pointer",
        }}
        fontSize="large"
        onClick={(e) => {
          handleClick(e);
        }}
      />
      {/* <img
        width={"50px"}
        height={"50px"}
        src="https://images.vexels.com/media/users/3/131903/isolated/preview/dc1162fe4ecfe2abaccb5f7dad552d46-recargar-icono-plano.png"
        onClick={e => {
          handleClick(e);
        }}
      /> */}
    </div>
  );
}
