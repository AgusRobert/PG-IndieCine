/* import React from "react";
import Footer from "../Footer/Footer.jsx"
import { Link } from "react-router-dom";
import logo from "../Header/LOGO.png";

export default function About(){
    return (
       <>
       <div className="logoIndex">
         <Link to={'/'}><img src={logo}  alt="img not found"/></Link>
       </div>
       <h1>Sobre nosotros</h1>
       <p style={{fontSize: '22px'}}>Somos un grupo de compañeros de estudio de distintos puntos de Latinoamérica que decidimos desarrollar esta Web como proyecto final de nuestra carrera de Full Stack-Developers.
       <p> CINDIE nace de una necesidad que sentimos por una plataforma que haga posible el acceso a material audiovisual independiente latinoamericano. El enfoque de la página está en el archivado y almacenado de proyectos de productoras o individuos pertenecientes a las artes audiovisuales y en brindarle a los usuarios la oportunidad de hacer donaciones a los artistas.</p>
        <p>  Con CINDIE nos proponemos ofrecer un amplio catálogo de largometrajes de ficción, documentales y cortometrajes realizados por artistas latinoamericanos. Nuestro objetivo a futuro es que nuestro catálogo contenga una amplia variedad de películas de todos los géneros y nacionalidades, tanto de autores consagrados como de nuevos talentos del cine independiente. </p>
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
       <Footer/>
       </> 
    )
} */

import React from "react";
import Footer from "../Footer/Footer.jsx"
import { Link, useNavigate } from "react-router-dom";
import logo from "../Header/LOGO.png";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { AppBar } from "@mui/material";
import { amber, grey } from "@mui/material/colors";
import EmailIcon from '@mui/icons-material/Email';
import IconButton from "@material-ui/core/IconButton";
import deco from './deco.png'
import deco2 from './deco2.png'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "black"/* theme.palette.mode === 'dark' ? '#1A2027' : '#fff' */,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "#f1c232",
  borderRadius:6
}))

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF"
    }
  }
});

const WhiteText = props => {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant={props.varient} align="center" color="textPrimary">
        {props.text}
      </Typography>
    </ThemeProvider>
  );
};

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};
const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#b388ff",
  position: "fixed",
  justifyContent: "space-between",
  alignItems: "center"
});
const BoxStyle = styled(Box)({

  paddingTop:150,
  justifyContent: "space-evenly",
  alignItems: "center",
  paddingBottom:0,
  alignContent:"center",
  justifyItems:"flex-end"
});
const Titulo = styled(Typography)({
 color:"white",
 fontSize:"45px"
  
});
const PaperStyle = styled(Paper)({
  display:"flex",
  maxWidth:"inline-block",
   padding:25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: grey[900]
  
});
const ImgStyle = styled("img")({
  maxHeight:200,
  width:"auto"
})
export default function About(){
    let navigate = useNavigate()
  function handleonClick(){
     navigate('/contact')
  }
  
  
  return (
       <>
       <AppStyle>
         <Link to={'/'}><img src={logo}  alt="img not found"/></Link>
       </AppStyle>
    
<BoxStyle> 
  <Box style={{display:"flex", justifyContent:"space-between"}}>
    
    <ImgStyle src={deco2} alt="deco"/>
   <Box
      height={100}
      width={500}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f1c232"
      color="white"
      fontSize={24}
      position={"relative"}
      left={0}
      top={50}
      borderRadius={5}
    >
       <Titulo variant="bold">SOBRE NOSOTROS</Titulo>  
    </Box>
   <ImgStyle src={deco} alt="deco"/>
      </Box>
      <BoxStyle>
        <PaperStyle>
       <Typography style={{color:"white",fontSize: '22px', display: "inline-block", whiteSpace: "pre-line",maxWidth:"550px"}}>Somos un grupo de compañeros de estudio de distintos puntos de Latinoamérica que decidimos desarrollar esta Web como proyecto final de nuestra carrera de Full Stack-Developers.</Typography>
        <Typography style={{color:"white",fontSize: '22px',display: "inline-block", whiteSpace: "pre-line",maxWidth:"550px"}}> Con CINDIE nos proponemos ofrecer un amplio catálogo de largometrajes de ficción, documentales y cortometrajes realizados por artistas latinoamericanos. Nuestro objetivo a futuro es que nuestro catálogo contenga una amplia variedad de películas de todos los géneros y nacionalidades, tanto de autores consagrados como de nuevos talentos del cine independiente. </Typography>
        </PaperStyle>
       </BoxStyle>

        <Box sx={{ paddingTop:15,flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <Item>Key</Item>
          <Item>keynarafaelp@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Valen</Item>
          <Item>valentinnavalos@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Agus</Item>
          <Item>iabichellarobert@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Xavi</Item>
          <Item>2092.rxcm@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
        <Item>Facu</Item>
          <Item>faq.ramos.14101999@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Gus</Item>
          <Item>gustavogallesio@hotmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Dani</Item>
          <Item>dasmmer@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Ton</Item>
          <Item>gduba90@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>CONTÁCTANOS 
          <IconButton onClick={ () =>{handleonClick()}} >
      <EmailIcon
        sx={{
          color: grey[800],
          ":hover": {
            color: amber[400],
          },
        }}
        fontSize="large"
      />
      </IconButton>
          </Item>
         
        </Grid>
      </Grid>
    </Box>
    </BoxStyle>
       <Footer/>
       </> 
    )
}
