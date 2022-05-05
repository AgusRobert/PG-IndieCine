import React from "react";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';

const style = {
    width: "100vw",
    position:"absolute",
    top: "0",
    bottom: "0",
    backgroundColor: "#24243e",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "Roboto, sans-serif",
    textAlign: "center",
    padding: "1rem",
    margin: "0",
    border: "0",
};
export default function NotFound() {
    return (
        <div style={style}>
            <h1 style={{color: "#9974da"}}>CINDIE</h1>
            <h1> UPPPS!! ERROR 404 - NOT FOUND</h1>
            <p>
                La página que estas buscando no existe.
            </p>
            <Link to="/">
            <Button variant="contained" color="primary" >
                Seguir navegando 
            </Button>
            </Link>
        </div>
    );
}
