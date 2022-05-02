import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrderAZ from "../OrderAZ/OrderAZ.jsx";
import OrderRating from "../OrderRating/OrderRating.jsx";
import FilterMoviesByGenre from "../FilterByGenre/FilterMovieByGenre.jsx";
import SignInBtn from "../SignInBtn/SignInBtn.jsx";
import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";
import OrderDate from "../OrderDate/OrderDate.jsx";
import FilterMovieByCountry from "../FilterByCountry/FilterMoviesByCountry.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileBtn from "../ProfileBtn/ProfileBtn.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import logo from './LOGO.png'


const ToolStyle = styled(Toolbar)({
  marginLeft: 50,
  position: "sticky",
  justifyContent: "space-between",
});
const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#b388ff",
  position: "sticky",
  justifyContent: "space-between",
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
const BoxStyle = styled(Box)({
  marginLeft: 20,
  paddingLeft: "9px",
  justifyContent: "space-between",
});

const DivStyle = styled("div")({
  marginLeft: 40,
  justifyContent: "space-between",
});
const BoxSign = styled(Box)({
  direction: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  spacing: 3,
});
export default function Header() {


    const { isAuthenticated , logout } = useAuth0();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  function handleOnClick() {
    navigate("/profile");
  }

  
  function handleLogout (){
    logout({ returnTo: window.location.origin });
  }


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
   <Box>
   <AppStyle position="sticky">
      <ToolStyle>
          <img src={logo} alt="Cindie"/>
        <OrderAZ />
        <OrderDate />
        <OrderRating />
        <FilterMoviesByGenre />
        <FilterMovieByCountry />
        <SearchBar />

        {!isAuthenticated && <SignInBtn />}

        {!isAuthenticated && <SignUpBtn />}

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
              <AvatarStyle>IC</AvatarStyle>
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
                Profile
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
                Cerrar sesion
              </MenuItemStyle>
            </Menu>
          </>
        )}
      </ToolStyle>
    </AppStyle>
    </Box>
  );
}
