/* import React from "react";
import Footer from "../Footer/Footer.jsx"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import logo from "../Header/LOGO.png";
import "./style.css";

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function Contact(){ 
    return (
        <>
          <div className="logoIndex">
            <Link to={'/'}><img src={logo}  alt="img not found"/></Link>
          </div>

          <div class="contactMe" id="contactMe">
              <h2 class="contacto title">Contáctanos:</h2>
              <div class="formulario">
                <form class="form" id="form" action="#" onSubmit={() => alert("Tu mensaje ha sido enviado")}>
                  <input type="text" id="name" placeholder="Nombre:" name="name" required />
                  <input type="email" name="email" placeholder="Email:" required />
                  <input type="text" name="tlf" placeholder="Número de Contacto:" required />
                  <input type="text" placeholder="Mensaje" name="message" required />
                  <input type="submit" id="button" value="Enviar" />
                </form>
              </div>
          </div>


          <h1 className="contacto title">Contacto</h1>

          <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText primary="mail" />
            </ListItem>
            <Divider />
            <ListItem divider>
              <ListItemText primary="mail" />
            </ListItem>
            <ListItem>
              <ListItemText primary="mail" />
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText primary="mail" />
            </ListItem>
            <ListItem>
              <ListItemText primary="mail" />
            </ListItem>
            <Divider />
            <ListItem divider>
              <ListItemText primary="mail" />
            </ListItem>
            <ListItem>
              <ListItemText primary="mail" />
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText primary="mail" />
            </ListItem>
          </List>
    
          <Footer/>
        </> 
    )
} */

import React from "react";
import Footer from "../Footer/Footer.jsx"
import { Link } from "react-router-dom";
import logo from "../Header/LOGO.png";
import "./style.css";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { amber } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';
import Subs from "../Subs/Subs.jsx";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

export default function Contact(){ 

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    return (
        <>
          <div className="logoIndex">
            <Link to={'/'}><img src={logo}  alt="img not found"/></Link>
          </div>




    <Box
      height={100}
      width={500}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f1c232" /* {amber[900]} */
      color="white"
      fontSize={24}
      position={"relative"}
      left={400}
      top={50}
    >
        <ThemeProvider theme={defaultTheme}>
      <div className="App" style={{ backgroundColor: "#f1c232" /* amber[900] */}}>
        <WhiteText varient="h3" text="Contacto" />
      </div>
    </ThemeProvider> 
    </Box>

          <div class="contactMe" id="contactMe">
           
              <div class="formulario">
                <form class="form" id="form" action="#" onSubmit={() => alert("Tu mensaje ha sido enviado")}>
                  <input type="text" id="name" placeholder="Nombre:" name="name" required />
                  <input type="email" name="email" placeholder="Email:" required />
                  <input type="text" name="tlf" placeholder="Número de Contacto:" required />
                  <input type="text" placeholder="Mensaje" name="message" required />
                  <input type="submit" id="button" value="Enviar" />
                </form>
              </div>
          </div>

          <Card sx={{ maxWidth: 345, backgroundColor:"#00000",  }}>
  <CardMedia
    component="img"
    height="194"
    image="https://images-na.ssl-images-amazon.com/images/I/71A0Ls9QIML._RI_.jpg"
    alt="img not found"
  />
  <CardContent>
  <Rating name="read-only" value={3} readOnly />
    <Typography variant="body2" sx={{ color:"#f1c232",  }}>
   {/*   {title} */}La Ciénaga
    </Typography>
    <Typography variant="body2" color="text.secondary">
     {/* {genres} */}Drama
    </Typography>
    <Typography variant="body2" color="text.secondary">
    {/*  {country} */}Argentina
    </Typography>
  </CardContent>
  <CardActions disableSpacing>
    
    <ExpandMore
      expand={expanded}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </ExpandMore>
  </CardActions>
  <Collapse in={expanded} timeout="auto" unmountOnExit>
    <CardContent>
      <Typography paragraph>Sinopsis:</Typography>
      <Typography paragraph>
        DESCRIPCIÓN
      </Typography>
    </CardContent>
  </Collapse>
</Card>

{/* <Subs/> */}

          <Footer/>
        </> 
    )
}

