import React from "react";
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


          {/* <h1 className="contacto title">Contacto</h1> */}

          {/* <List sx={style} component="nav" aria-label="mailbox folders">
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
          </List> */}
    
          <Footer/>
        </> 
    )
}
