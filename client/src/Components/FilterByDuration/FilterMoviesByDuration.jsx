import { useDispatch } from "react-redux";
import { filterDuration } from "../../redux/actions/index";
import { Cortometrajes, Mediometrajes, Largometrajes } from "./constants";
import { styled, Box } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
const MenuItemStyle = styled(MenuItem)({
  marginLeft: "auto",
  color: "black",
  backgroundColor: "#b388ff",
});

const SelectStyle = styled(TextField)({
  borderRadius: 2,
  width: 110,
  padding: 0,
});

export default function FilterMovieByDuration() {
  let dispatch = useDispatch();

  const [duration, setDuration] = useState("");


  function onSelectChange(e) {
    e.preventDefault();
    setDuration(e.target.value)
    dispatch(filterDuration(e.target.value));
  }

  return (
    <Box>
      <SelectStyle
        name="select"
        onChange={onSelectChange}
        select
        value={duration}
        label="
        Duración"
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
        <MenuItemStyle key={1} value={Cortometrajes}>Cortometrajes</MenuItemStyle>
        <MenuItemStyle key={2} value={Mediometrajes}>Mediometrajes</MenuItemStyle>
        <MenuItemStyle key={3} value={Largometrajes}>Largometrajes</MenuItemStyle>
      </SelectStyle>
    </Box>
  );
}
