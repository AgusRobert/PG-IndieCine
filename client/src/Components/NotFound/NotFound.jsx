import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import claqueta from "./cargando.png";
import { Paper} from "@mui/material";
import { styled } from "@mui/system";
import "./notfound.css"

const PaperNotFound = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  width: "70%",
  padding: 20,
  marginLeft: "auto",
  marginRight: "auto",
  boxShadow: "none",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: 20,
});

const ImgNotFound = styled("img")({
  height: "auto",
  width: "40%",
});

export default function NotFound() {
  return (
    <PaperNotFound>
      <h1 className="cindie">CINDIE</h1>
      <ImgNotFound src={claqueta}/>
      {/* <img src={claqueta} alt="not found" /> */}
      <h2 className="cargando">Cargando...</h2>
      <Link to="/">
        <Button variant="contained" color="primary">
          Regresa al Home
        </Button>
      </Link>
    </PaperNotFound>
  );
}
