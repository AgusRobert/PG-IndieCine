import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
    
  export default function Subs(){ 
  
      return (
          <>
          
<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
         <Card sx={{ maxWidth: 345, backgroundColor:"#000000" }} >
    <CardContent>
    <h3 style={{color:"#f1c232", textShadow: "0 0 3px #351c75, 0 0 5px #351c75"}}>
        Plan "Under"
        </h3>
        <h2 style={{color:"#f1c232",  textShadow:" 0 0 3px #351c75, 0 0 5px #351c75"}}>
          Sé Usuario Creador y sube tu contenido a CINDIE
        </h2>
        <h3 style={{color:"#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75"}}>
          SUSCRIPCIÓN POR 3 MESES
        </h3>
        <h3 style={{color:"#f1c232",textShadow: " 0 0 3px #351c75, 0 0 5px #351c75"}}>
          Precio $X/mes
          <br />
        </h3>
    </CardContent>

    <CardActions>
        {/* <Button size="large">SUSCRÍBETE AHORA</Button> */}
        <Chip label="Clickable Link" component="a" href="#basic-chip" clickable />

    </CardActions>
    
  </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345, backgroundColor:"#b388ff" }}>
    <CardContent>
    <h3 style={{color:"#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75"}}>
        Plan "De Culto"
        </h3>
        <h2 style={{color:"#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75"}}>
          Sé Usuario Creador y sube tu contenido a CINDIE
        </h2>
        <h3 style={{color:"#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75"}}>
          SUSCRIPCIÓN POR 6 MESES
        </h3>
        <h3 style={{color:"#f1c232",textShadow: " 0 0 3px #351c75, 0 0 5px #351c75"}}>
          Precio $Y/mes
          <br />
        </h3>
    </CardContent>

    <CardActions>
        <Button size="small">SUSCRÍBETE AHORA</Button>
    </CardActions>
    
  </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345, backgroundColor:"#b388ff" }}>
    <CardContent>
    <h3 style={{color:"#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
        Plan "De Autor"
        </h3>
        <h2 style={{color:"#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75"}}>
          Sé Usuario Creador y sube tu contenido a CINDIE
        </h2>
        <h3 style={{color:"#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75"}}>
          SUSCRIPCIÓN POR 12 MESES
        </h3>
        <h3 style={{color:"#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75"}}>
          Precio $Z/mes
          <br />
        </h3>
    </CardContent>

    <CardActions>
        <Button size="small">SUSCRÍBETE AHORA</Button>
    </CardActions>
    
  </Card>
        </Grid>
        
      </Grid>
    </Box>
  
          </> 
      )
  }
