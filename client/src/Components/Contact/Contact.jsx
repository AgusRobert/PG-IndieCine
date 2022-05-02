import React from "react";
import Footer from "../Footer/Footer.jsx"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function Contact(){ 
    return (
        <>
        <h1>Contacto</h1>
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
}
