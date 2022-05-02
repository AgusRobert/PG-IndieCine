import { useDispatch } from "react-redux";
import { filterDuration } from "../../redux/actions/index";
import { Cortometrajes, Mediometrajes, Largometrajes } from "./constants";
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

export default function FilterMovieByDuration() {
  let dispatch = useDispatch();

  function onSelectChange(e) {
    e.preventDefault();
    dispatch(filterDuration(e.target.value));
  }

  return (
    <Box>
      <SelectStyle
        name="select"
        onChange={onSelectChange}
        select
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
        <MenuItemStyle value={Cortometrajes}>Cortometrajes</MenuItemStyle>
        <MenuItemStyle value={Mediometrajes}>Mediometrajes</MenuItemStyle>
        <MenuItemStyle value={Largometrajes}>Largometrajes</MenuItemStyle>
      </SelectStyle>
    </Box>
  );
}
