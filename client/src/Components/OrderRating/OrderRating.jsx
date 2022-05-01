import React from "react";
import { RATING_ASC, RATING_DES } from '../../redux/reducer/Ordercosntants';
import { useDispatch } from "react-redux";
import { orderByRating } from '../../redux/actions/index';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled, Box } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { InputLabel } from "@mui/material";
import { TextField } from "@mui/material";

const SelectStyle = styled(TextField)({
  borderRadius: 2,
  width: 150,
  padding: 0
});
const MenuItemStyle = styled(Select)({
  borderRadius: 2,
  width: 95
 
});
export default function OrderRating (){

    let dispatch = useDispatch()
  
  function onSelectChange(e) {
    dispatch(orderByRating(e.target.value));
  }

    return (
      <Box>
        <SelectStyle 
        select
        label="Valoracion"
        onChange={onSelectChange}
        variant= 'outlined'
        size='small'
        sx={{
          ":active": {
            color: "black",
            borderColor: deepPurple[600]
          },
          ":focused": {
            borderColor: deepPurple[600]
          }
        }}
        >
      <MenuItem  disable>
        Valoración
      </MenuItem>
      <MenuItem autoWidth value={RATING_ASC}>Menos a mas</MenuItem>
      <MenuItem autoWidth value={RATING_DES}>Más a menos</MenuItem>
    </SelectStyle>
    </Box>
    )
}



