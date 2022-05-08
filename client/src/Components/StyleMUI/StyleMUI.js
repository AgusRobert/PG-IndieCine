import { deepPurple, grey, amber } from "@mui/material/colors";
import { Button, InputBase, TextField, Toolbar, MenuItem } from "@mui/material";
import { styled, Box } from "@mui/system";

export const MenuItemStyle = styled(MenuItem)({
  marginLeft: "auto",
  color: "white",
  backgroundColor: "#b388ff",
});

export const InputStyle = styled(InputBase)({
  backgroundColor: amber[50],
  borderRadius: 5,
  width: "250px",
  padding: 4,
});

export const ButtonStyle = styled(Button)({
  color: "white",
  borderColor: deepPurple[500],
  backgroundColor: deepPurple[700],
  padding: 8,
});

export const ButtonStyle2 = styled(Button)({
  whiteSpace: "nowrap",
  color: amber[400],
  borderBlockColor: amber[900],
  borderInlineStartColor: amber[200],
  borderInlineEndColor: amber[200],
  backgroundColor:amber[800]
});

export const LabelStyle = styled("label")({
  //   color: "white",
  color: "black",
});

export const SelectStyle = styled(TextField)({
  borderRadius: 2,
  width: 160,
  padding: 0,
});

export const BoxStyle = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "column",
});

//---------------------------------









export const sxSelectStyle = {
  ":active": {
    color: "white",
    borderColor: deepPurple[600],
  },
  ":focused": {
    borderColor: deepPurple[600],
  },
};

export const sxButtonStyle = {
  ":hover": {
    bgcolor: deepPurple[200],
    color: "black",
    borderBlockColor: deepPurple[200],
    borderInlineStartColor: deepPurple[900],
    borderInlineEndColor: deepPurple[900],
  },
};

