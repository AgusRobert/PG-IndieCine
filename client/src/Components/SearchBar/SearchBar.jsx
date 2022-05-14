import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPelicula_Actor } from "../../redux/actions/index"
import { AppBar, Button, InputBase, Toolbar } from "@mui/material";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { styled } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
const SearchStyle = styled(InputBase)({
  backgroundColor: amber[50],
  borderRadius: 5,
  width: "250px",
  padding: 4
});
const ButtonStyle = styled(Button)({
  color: "black",
  borderColor: deepPurple[500],
  backgroundColor: deepPurple[700],
  padding: 8
});

export default function SearchBar() {

  const [search, setSearch] = useState('')

  let dispatch = useDispatch()

  function onSubmit(e) {
    e.preventDefault();
    dispatch(searchPelicula_Actor(search))
    setSearch("")
  }

  function onInputChange(e) {
    e.preventDefault()
    setSearch(e.target.value)
  }

  return (


    <form onSubmit={onSubmit}>
      <Toolbar>
        <SearchStyle
          sx={{
            ":hover": {
              color: "black",
              backgroundColor: amber[100],
            },
            ":focus": {
              color: "black",
              backgroundColor: amber[100],
            }
          }}
          size='medium'
          id="standard-full-width"
          label="Buscar..."
          placeholder="Buscar..."
          type="text"
          onChange={(e) => onInputChange(e)} value={search} />
        <ButtonStyle
          sx={{
            ":hover": {
              bgcolor: deepPurple[200],
              color: "black",
              borderBlockColor: deepPurple[200],
              borderInlineStartColor: deepPurple[900],
              borderInlineEndColor: deepPurple[900],
            },
          }} type="submit" value="Search" startIcon={<SearchIcon/>}>Buscar</ButtonStyle>
      </Toolbar>
    </form>


  )
}