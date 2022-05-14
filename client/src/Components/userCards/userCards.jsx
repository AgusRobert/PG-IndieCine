import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CardMedia from "@mui/material/CardMedia";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

export default function userCards(picture, name, username, ) {
  return (
    <Card sx={{ minWidth: 275 }}>
        <CardMedia
          component="img"
          height="100"
          image={picture}
          alt="img not found"
        />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" component="div">
          {username}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">ver perfil</Button>
      </CardActions>
    </Card>
  );
}
 


/* import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';


const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  )

export default function userCards({
  title,
  poster,
  username,
  id,
}) {
  

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
      <Link variant="button" underline="none" to={`/users/${id}`}>
        <CardMedia
          component="img"
          height="400"
          image={poster}
          alt="img not found"
        />
        </Link>
        <CardContent>
          <Link variant="button"  text-decoration="none" underline="none" to={`/users/${id}`}>
            <Typography variant="h6" style={{ color: "#f1c232" }}>
              {title}
            </Typography>{" "}
          </Link>
          <Typography variant="h6" style={{ color: "#f1c232" }}>
            {username}
          </Typography>
         
        </CardContent>
        
      </Card>
    </>
  );
} */
