
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesByGenre, getGenres } from "../../redux/actions/index";
import { styled, Box } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";


const MenuItemStyle = styled(MenuItem)({
  marginLeft: "auto",
  color: "black",
  backgroundColor: "#b388ff",
});


const SelectStyle = styled(TextField)({
  borderRadius: 2,
  width: 160,
  padding: 0,
});

export default function FilterMoviesByGenre() {
  const dispatch = useDispatch();


  const genres = useSelector((state) => state.genres);

  function handleChange(e) {
    dispatch(getMoviesByGenre(e.target.value));
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  let key = 1;

  return (
    <Box>
      <SelectStyle
        name="select"
        onChange={(e) => handleChange(e)}
        select
        label="Generos"
        variant="outlined"
        size="small"
        sx={{
          ":active": {
            color: "black",
            borderColor: deepPurple[600],
          },
          ":focused": {
            borderColor: deepPurple[600],
          },
        }}
      >
        {genres
          ? genres.map((e) => (
              <MenuItemStyle key={key++} value={e.name}>
                {e.name}
              </MenuItemStyle>
            ))
          : null}
      </SelectStyle>
    </Box>
  );
}

