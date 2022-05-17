import React, { useState, useEffect } from "react";
import { getMovies, sortName } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { NAME_ASC, NAME_DES } from "../../redux/reducer/Ordercosntants";
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

export default function OrderAZ() {
  const dispatch = useDispatch();

  const [ordenAlfabetico, setOrdenAlfabetico] = useState("");

  function handleSort(e) {
    e.preventDefault();
    setOrdenAlfabetico(e.target.value);
    dispatch(sortName(e.target.value));
   
  }

  return (
    <Box>
        <SelectStyle
          select
          label="Orden alfabético"
          value={ordenAlfabetico} 
          //value=""
          onChange={handleSort}
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
          <MenuItemStyle key={1} value={NAME_ASC}>A hasta Z</MenuItemStyle>
          <MenuItemStyle key={2} value={NAME_DES}>Z hasta A</MenuItemStyle>
        </SelectStyle>
    </Box>
  );
}
