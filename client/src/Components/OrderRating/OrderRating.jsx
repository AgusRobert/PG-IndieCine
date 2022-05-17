import React from "react";
import { RATING_ASC, RATING_DES } from '../../redux/reducer/Ordercosntants';
import { useDispatch } from "react-redux";
import { orderByRating } from '../../redux/actions/index';
import MenuItem from '@mui/material/MenuItem';
import { styled, Box } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { TextField } from "@mui/material";
import { useState } from "react";
const MenuItemStyle = styled(MenuItem)({
  marginLeft: "auto",
  color: 'black',
  backgroundColor: "#b388ff",
  '&:focus':{
    backgroundColor:'#b388ff'
  }
});

const SelectStyle = styled(TextField)({
  borderRadius: 2,
  width: 120,
  padding: 0
});
export default function OrderRating (){

  let dispatch = useDispatch()

  const [rating, setRating] = useState("");

  function onSelectChange(e) {
    e.preventDefault();
    setRating(e.target.value);
    dispatch(orderByRating(e.target.value));
  }
  
  // function onSelectChange(e) {
  //   dispatch(orderByRating(e.target.value));
  // }

    return (
      <Box>
        <SelectStyle 
        select
        value={rating}
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

      <MenuItemStyle key={2} value={RATING_ASC} selected
     >Menos a mas</MenuItemStyle>
      <MenuItemStyle key={3} value={RATING_DES}
    >Más a menos</MenuItemStyle>
    </SelectStyle>
    </Box>
    )
}



