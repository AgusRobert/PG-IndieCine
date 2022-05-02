import React from "react";
import { COM_ASC, COM_DES } from '../../redux/reducer/Ordercosntants';
import { useDispatch } from "react-redux";
import { sortByComment } from '../../redux/actions/index';
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

export default function OrderComments() {
   let dispatch = useDispatch()
  
  function onSelectChange(e) {
    dispatch(sortByComment(e.target.value));
  }
  return (
    <Box> 
       <SelectStyle
          select
          label="Popularidad"
          onChange={onSelectChange}
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
      <MenuItemStyle value={COM_ASC}>Más discutido</MenuItemStyle>
      <MenuItemStyle value={COM_DES}>Menos discutido</MenuItemStyle>
      </SelectStyle>
    </Box>
  );
}
