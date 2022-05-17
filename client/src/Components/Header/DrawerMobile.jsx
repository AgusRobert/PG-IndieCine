import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { styled } from "@mui/system";
import { amber } from "@mui/material/colors";
import { IconButton, Paper } from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import OrderAZ from "../OrderAZ/OrderAZ";
import OrderDate from "../OrderDate/OrderDate";
import OrderRating from "../OrderRating/OrderRating";
import FilterMoviesByGenre from "../FilterByGenre/FilterMovieByGenre";
import FilterMovieByCountry from "../FilterByCountry/FilterMoviesByCountry";
import FilterMovieByDuration from "../FilterByDuration/FilterMoviesByDuration";
import SearchBar from "../SearchBar/SearchBar";
import AutoSearch from "../AutoSearch/AutoSearch.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { SERVER_BACK } from "../../paths/path.js";
const BoxS = styled(Box)({
  marginLeft: "auto",
  color: amber[200],
});
const BoxA = styled(Box)({
  marginLeft: "auto",
  color: "black",
  backgroundColor: "#ffc107",
  opacity: "80%",
});

export default function DrawerMobile(infoUser) {
  const [state, setState] = React.useState({
    left: false,
  });
  const navigate = useNavigate();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { user, isAuthenticated, logout } = useAuth0();
  function handleLogout() {
    logout({ returnTo: window.location.origin });
  }
  function handleOnClick() {
    if (infoUser?.status === "admin")
      window.location.href = `${SERVER_BACK}/admin`;
    else navigate("/profile");
  }
  const list = (anchor) => (
    <BoxA
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 400,
        color: "black",
      }}
      role="presentation"
    >
      <List>
        {/* ACABO DE BORRAR ESTO QUE NO SIRVE :3 ,<OrderRating /> */}
        {[
          <OrderAZ />,
          <OrderDate />,
          <FilterMoviesByGenre />,
          <FilterMovieByCountry />,
          <FilterMovieByDuration />,
        ].map((comp, index) => (
          <ListItem key={{ index }} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ArrowRightIcon fontSize="medium" />
              </ListItemIcon>
              {comp}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem style={{ justifyContent: "center" }}>
          {/* <SearchBar /> */}
          <AutoSearch />
        </ListItem>
      </List>
    </BoxA>
  );

  return (
    <BoxS>
      <React.Fragment key={"left"}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </BoxS>
  );
}
