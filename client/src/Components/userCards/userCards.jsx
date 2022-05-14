import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";


export default function UserCards({
  title,
  poster,
  year,
  id,
}) {

  return (
    <>
      <Card sx={{  padding:0,maxWidth: 300, backgroundColor: "#212121" }}>
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
            {year}
          </Typography>
          
        </CardContent>
        
      </Card>
    </>
  );
}
