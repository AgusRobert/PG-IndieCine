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
import { Link } from "react-router-dom";
import logo from "../Header/LOGO.png";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "black"/* theme.palette.mode === 'dark' ? '#1A2027' : '#fff' */,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "#f1c232",
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

export default function About(){
    return (
       <>
       <div className="logoIndex">
         <Link to={'/'}><img src={logo}  alt="img not found"/></Link>
       </div>
    
<div>
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
      left={400}
      top={50}
    >
        <ThemeProvider theme={defaultTheme}>
      <div className="App" style={{ backgroundColor: "#f1c232"}}>
        <WhiteText varient="h3" text="Sobre Nosotros" />
      </div>
    </ThemeProvider> 
    </Box>
    </div>
       <h1>.</h1>
       <p style={{fontSize: '22px'}}>Somos un grupo de compañeros de estudio de distintos puntos de Latinoamérica que decidimos desarrollar esta Web como proyecto final de nuestra carrera de Full Stack-Developers.
       <p> CINDIE nace de una necesidad que sentimos por una plataforma que haga posible el acceso a material audiovisual independiente latinoamericano. El enfoque de la página está en el archivado y almacenado de proyectos de productoras o individuos pertenecientes a las artes audiovisuales y en brindarle a los usuarios la oportunidad de hacer donaciones a los artistas.</p>
        <p>  Con CINDIE nos proponemos ofrecer un amplio catálogo de largometrajes de ficción, documentales y cortometrajes realizados por artistas latinoamericanos. Nuestro objetivo a futuro es que nuestro catálogo contenga una amplia variedad de películas de todos los géneros y nacionalidades, tanto de autores consagrados como de nuevos talentos del cine independiente. </p>
        </p>

        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>DANIEL SANCHEZ</Item>
          <Item>dasmmer@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>GUSTAVO GALLESIO</Item>
          <Item>gustavogallesio@hotmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>FACUNDO RAMOS</Item>
          <Item>faq.ramos.14101999@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>KEYNA PAYANO</Item>
          <Item>keynarafaelpayano@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>XAVIER CARRILLO</Item>
          <Item>2092.rxcm@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>VALENTÍN AVALOS</Item>
          <Item>valentinnavalos@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>AGUSTÍN IABICHELLA</Item>
          <Item>iabichellarobert@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>GASTÓN DUBA</Item>
          <Item>gduba90@gmail.com</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>CONTÁCTANOS</Item>
        </Grid>
      </Grid>
    </Box>
      
       <Footer/>
       </> 
    )
}
