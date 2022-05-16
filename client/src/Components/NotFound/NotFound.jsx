import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import claqueta from "./cargando.png";

const style = {
  width: "100vw",
  position: "absolute",
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
      <h1 style={{ color: "#9974da" }}>CINDIE</h1>
      <img src={claqueta} alt="not found" />
      <h2>Cargando...</h2>
      <Link to="/">
        <Button variant="contained" color="primary">
          Regresa al Home
        </Button>
      </Link>
    </div>
  );
}
