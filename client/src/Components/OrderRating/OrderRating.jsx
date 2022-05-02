import React from "react";
import { RATING_ASC, RATING_DES } from '../../redux/reducer/Ordercosntants';
import { useDispatch } from "react-redux";
import { orderByRating } from '../../redux/actions/index';
import MenuItem from '@mui/material/MenuItem';
import { styled, Box } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { TextField } from "@mui/material";
const MenuItemStyle = styled(MenuItem)({
  marginLeft: "auto",
  color: 'black',
  backgroundColor: "#b388ff",
});

const SelectStyle = styled(TextField)({
  borderRadius: 2,
  width: 150,
  padding: 0
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
      <MenuItemStyle  value={RATING_ASC}
     >Menos a mas</MenuItemStyle>
      <MenuItemStyle  value={RATING_DES}
       sx={{
        ":hover": {
          bgcolor: deepPurple[200], 
          color: "black",
        },
      }}>Más a menos</MenuItemStyle>
    </SelectStyle>
    </Box>
    )
}



