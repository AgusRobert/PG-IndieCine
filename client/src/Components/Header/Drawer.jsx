import * as React from "react";
import ReactDOM from "react-dom";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme
} from "@mui/material/styles";
import DrawerMobile from "./DrawerMobile";
const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#ffb300"
        }
      }
    }
  }
});
export default function DrawerM(infoUser){
    return(
 <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <DrawerMobile infoUser={infoUser}/>
    </ThemeProvider>
  </StyledEngineProvider>
)};
 
