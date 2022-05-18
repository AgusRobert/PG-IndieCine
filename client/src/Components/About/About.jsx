
import React from "react";
import Footer from "../Footer/Footer.jsx";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Header/LOGO.png";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { AppBar } from "@mui/material";
import { amber, grey } from "@mui/material/colors";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@material-ui/core/IconButton";
import deco from "./deco.png";
import deco2 from "./deco2.png";
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    "black" /* theme.palette.mode === 'dark' ? '#1A2027' : '#fff' */,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  borderRadius: 6,
}));

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
    },
  },
});

const WhiteText = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant={props.varient} align="center" color="textPrimary">
        {props.text}
      </Typography>
    </ThemeProvider>
  );
};

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};
const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#682F8A",
  position: "fixed",
  justifyContent: "space-between",
  alignItems: "center",
});
const BoxStyle = styled(Box)({
  paddingTop: 50,
  justifyContent: "space-evenly",
  alignItems: "center",
  paddingBottom: 0,
  alignContent: "center",
  justifyItems: "flex-end",
});
const Titulo = styled(Typography)({
  color: "#1F271B",
  fontSize: "45px",
  fontFamily: "Koulen"
});
const PaperStyle = styled(Paper)({
  display: "flex",
  maxWidth: "inline-block",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#1F271B",
  borderRadius: 20,
  opacity: "80%"
});
const ImgStyle = styled("img")({
  maxHeight: 200,
  width: "auto",
  color:"white"
});
const ItemStyle = styled(Item)({
  backgroundColor: "#1F271B",
  fontWeight: 'bold'
});

const DivStyle = styled(Divider)({
 marginRight:75,
  marginLeft:75
});
export default function About() {
  let navigate = useNavigate();
  function handleonClick() {
    navigate("/contact");
  }

  return (
    <>
      <AppStyle>
        <Link to={"/"}>
          <img src={logo} alt="img not found" />
        </Link>
      </AppStyle>

      <BoxStyle>
        <Box style={{ display: "flex", justifyContent: "space-between", padding:0,  }}>
          <ImgStyle src={deco2} alt="deco" />
          <Box
            height={100}
            width={500}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#FFBE0B"
            color="#e0e0e0"
            fontSize={24}
            position={"relative"}
            left={0}
            top={50}
            borderRadius={5}
           
          >
            <Titulo variant="bold">SOBRE NOSOTROS</Titulo>
          </Box>
          <ImgStyle src={deco} alt="deco" />
        </Box>
        <BoxStyle style={{ display: "flex", justifyContent: "space-evenly"  }}>
          <PaperStyle style={{ display: "flex", paddingTop:50, paddingRight:70,paddingLeft:70, justifyContent: "space-evenly"  }}>
            <Typography
              style={{
                color: "white",
                fontSize: "22px",
                display: "inline-block",
                whiteSpace: "pre-line",
                maxWidth: "400px",
                textAlign:"justify"
              }}
            > CONOCENOS:
               <br></br>
               <br></br>
              Somos un grupo de compañeros de estudio de distintos puntos de
              Latinoamérica que decidimos desarrollar esta Web como proyecto
              final de nuestra carrera de Full Stack-Developers.
            </Typography>
            <DivStyle orientation="vertical" variant="middle" flexItem  color="white" />
            <Typography
              style={{
                color: "white",
                fontSize: "22px",
                display: "inline-block",
                whiteSpace: "pre-line",
                maxWidth: "550px",
                textAlign:"justify"
              }}
            >
              {" "}NUESTRA MISIÓN:

              <br></br>
              <br></br>
              Con CINDIE nos proponemos ofrecer un amplio catálogo de
              largometrajes de ficción, documentales y cortometrajes realizados
              por artistas latinoamericanos. Nuestro objetivo a futuro es que
              nuestro catálogo contenga una amplia variedad de películas de
              todos los géneros y nacionalidades, tanto de autores consagrados
              como de nuevos talentos del cine independiente.{" "}
            </Typography>
          </PaperStyle>
        </BoxStyle>

        <Box sx={{ paddingTop: 15, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ItemStyle ><IconButton
                  onClick={() => {
                   window.open('https://github.com/keyn4','_blank');
                  }}
                >
                  <GitHubIcon
                    sx={{
                      color: grey[200],
                      ":hover": {
                        color: "#FFBE0B",
                      },
                    }}
                    fontSize="large"
                  />
                </IconButton> Key</ItemStyle>
              <ItemStyle>keynarafaelp@gmail.com</ItemStyle>
             
            </Grid>
            <Grid item xs={4}>
              <ItemStyle><IconButton
                  onClick={() => {
                   window.open('https://github.com/valentinnavalos','_blank');
                  }}
                >
                  <GitHubIcon
                    sx={{
                      color: grey[200],
                      ":hover": {
                        color: "#FFBE0B",
                      },
                    }}
                    fontSize="large"
                  />
                </IconButton>Valen</ItemStyle>
              <ItemStyle>valentinnavalos@gmail.com</ItemStyle>
            </Grid>
            <Grid item xs={4}>
              <ItemStyle><IconButton
                  onClick={() => {
                   window.open('https://github.com/AgusRobert','_blank');
                  }}
                >
                  <GitHubIcon
                    sx={{
                      color: grey[200],
                      ":hover": {
                        color: "#FFBE0B",
                      },
                    }}
                    fontSize="large"
                  />
                </IconButton>Agus</ItemStyle>
              <ItemStyle>iabichellarobert@gmail.com</ItemStyle>
            </Grid>
            <Grid item xs={4}>
              <ItemStyle><IconButton
                  onClick={() => {
                   window.open('https://github.com/Xavier2092','_blank');
                  }}
                >
                  <GitHubIcon
                    sx={{
                      color: grey[200],
                      ":hover": {
                        color: "#FFBE0B",
                      },
                    }}
                    fontSize="large"
                  />
                </IconButton>Xavi</ItemStyle>
              <ItemStyle>2092.rxcm@gmail.com</ItemStyle>
            </Grid>
            <Grid item xs={4}>
              <ItemStyle><IconButton
                  onClick={() => {
                   window.open('https://github.com/fsr1410','_blank');
                  }}
                >
                  <GitHubIcon
                    sx={{
                      color: grey[200],
                      ":hover": {
                        color: "#FFBE0B",
                      },
                    }}
                    fontSize="large"
                  />
                </IconButton>Facu</ItemStyle>
              <ItemStyle>faq.ramos.14101999@gmail.com</ItemStyle>
            </Grid>
            <Grid item xs={4}>
              <ItemStyle><IconButton
                  onClick={() => {
                   window.open('https://github.com/guenga1968','_blank');
                  }}
                >
                  <GitHubIcon
                    sx={{
                      color: grey[200],
                      ":hover": {
                        color: "#FFBE0B",
                      },
                    }}
                    fontSize="large"
                  />
                </IconButton>Gus</ItemStyle>
              <ItemStyle>gustavogallesio@hotmail.com</ItemStyle>
            </Grid>
            <Grid item xs={4}>
              <ItemStyle><IconButton
                  onClick={() => {
                   window.open('https://github.com/Aterael','_blank');
                  }}
                >
                  <GitHubIcon
                    sx={{
                      color: grey[200],
                      ":hover": {
                        color: "#FFBE0B",
                      },
                    }}
                    fontSize="large"
                  />
                </IconButton>Dani</ItemStyle>
              <ItemStyle>dasmmer@gmail.com</ItemStyle>
            </Grid>
            <Grid item xs={4}>
              <ItemStyle><IconButton
                  onClick={() => {
                   window.open('https://github.com/gastond90','_blank');
                  }}
                >
                  <GitHubIcon
                    sx={{
                      color: grey[200],
                      ":hover": {
                        color: "#FFBE0B",
                      },
                    }}
                    fontSize="large"
                  />
                </IconButton>Ton</ItemStyle>
              <ItemStyle>gduba90@gmail.com</ItemStyle>
            </Grid>
            <Grid item xs={4}>
              <ItemStyle sx={{
                      paddingBottom:3.7,
                      paddingTop:2.8
                    }}>
                CONTÁCTANOS
                <IconButton
                  onClick={() => {
                    handleonClick();
                  }}
                >
                  <EmailIcon
                    sx={{
                      color: grey[200],
                      ":hover": {
                        color: "#FFBE0B",
                      },
                    }}
                    fontSize="large"
                  />
                </IconButton>
              </ItemStyle>
            </Grid>
          </Grid>
        </Box>
      </BoxStyle>
      <Footer />
    </>
  );
}
