import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getGenres, postMovie } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { validate } from "./validates";
import axios from "axios";


import {ButtonStyle,sxButtonStyle} from "../StyleMUI/StyleMUI";

export function PruebaFacu() {
  const [port, setPort] = useState();
  const [info, setInfo] = useState({ title: "" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const selectPort = (e) => {
    e.preventDefault();
    setPort(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(postMovie({ ...info, port }));
    const formData = new FormData();
    formData.append("image", port);
    const respuesta = await axios.post(
      "http://localhost:3001/upload/inter",
      formData
    );
    if (respuesta) {
      alert("Peli posteada");
      setInfo({ ...info, port: respuesta.data });
    } else {
      alert("SE TE CORTO EL INTERNET ");
    }
    console.log("Datos del FormData: ", respuesta.data);
  };
  return (
    <>
      <h1>Prueba de subida de Archivos</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="title"
          placeholder="Titulo"
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type="file"
          name="port"
          placeholder="Portada"
          onChange={(e) => selectPort(e)}
          required
        />
        <ButtonStyle
          sx={sxButtonStyle}
          type="submit"
        >
          GuardarFilms
        </ButtonStyle>
      </form>
    </>
  );
}
