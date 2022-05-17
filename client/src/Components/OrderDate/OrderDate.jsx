import React, { useState, useEffect } from "react";
import { DATE_ASC, DATE_DES } from "../../redux/reducer/Ordercosntants";
import { useDispatch } from "react-redux";
import { sortDate } from "../../redux/actions/index";
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
  width: 130,
  padding: 0,
});

export default function OrderDate() {
  let dispatch = useDispatch();

  const [date, setDate] = useState("");

  function onSelectChange(e) {
    e.preventDefault();
    setDate(e.target.value);
    dispatch(sortDate(e.target.value));
  }

  return (
    <Box>
      {" "}
      <SelectStyle
        name="select"
        onChange={onSelectChange}
        select
        label="
  Antigüedad"
        variant="outlined"
        size="small"
        value={date}
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
        <MenuItemStyle key={1} value={DATE_ASC}>Lo nuevo</MenuItemStyle>
        <MenuItemStyle key={2} value={DATE_DES}>Lo clásico</MenuItemStyle>
      </SelectStyle>
    </Box>
  );
}
