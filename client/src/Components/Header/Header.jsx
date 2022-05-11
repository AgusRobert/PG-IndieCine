import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { useNavigate, Link } from "react-router-dom";
import OrderAZ from "../OrderAZ/OrderAZ.jsx";
import OrderRating from "../OrderRating/OrderRating.jsx";
import FilterMoviesByGenre from "../FilterByGenre/FilterMovieByGenre.jsx";
import SignInBtn from "../SignInBtn/SignInBtn.jsx";
import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";
import OrderDate from "../OrderDate/OrderDate.jsx";
import FilterMovieByCountry from "../FilterByCountry/FilterMoviesByCountry.jsx";
import FilterMovieByDuration from "../FilterByDuration/FilterMoviesByDuration";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import logo from "./LOGO.png";
import "./style.css";

const ToolStyle = styled(Toolbar)({
  marginLeft: 50,
  position: "sticky",
  justifyContent: "space-between",
});
const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#b388ff",
  position: "fixed",
  justifyContent: "space-between",
  display: 'flex',
  flexWrap: 'wrap',
});

const AvatarStyle = styled(Avatar)({
  marginLeft: "auto",
  color: amber[200],
  backgroundColor: deepPurple[900],
  height: 30,
  borderRadius: 20,
  border: `2px solid ${amber[500]}`,
  borderRight: "4px solid transparent",
});
const MenuItemStyle = styled(MenuItem)({
  marginLeft: "auto",
  color: amber[200],
  backgroundColor: grey[900],
});

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth0();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  function handleOnClick() {
    navigate("/profile");
  }

  function handleLogout() {
    logout({ returnTo: window.location.origin });
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppStyle position="sticky">
      <ToolStyle>
        <Link to={"/"}>
          <img src={logo} alt="Cindie" />
        </Link>
        <OrderAZ />
        <OrderDate />
        <OrderRating />
        <FilterMoviesByGenre />
        <FilterMovieByCountry />
        <FilterMovieByDuration />
        <SearchBar />
        {isAuthenticated && (
          <>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AvatarStyle src={user.picture} alt={user.name} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItemStyle
                sx={{
                  ":hover": {
                    bgcolor: deepPurple[200],
                    color: "black",
                  },
                }}
                onClick={handleOnClick}
              >
                Mi Perfil
              </MenuItemStyle>
              <MenuItemStyle
                sx={{
                  ":hover": {
                    bgcolor: deepPurple[200], // theme.palette.primary.main
                    color: "black",
                  },
                }}
                onClick={handleLogout}
              >
                Cerrar sesión
              </MenuItemStyle>
            </Menu>
          </>
        )}
        {!isAuthenticated && <SignInBtn />}

        {!isAuthenticated && <SignUpBtn />}
      </ToolStyle>
    </AppStyle>
  );
}
