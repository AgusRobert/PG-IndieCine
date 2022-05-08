import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getGenres, postMovie } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { validate } from "./validates";

export function PruebaFacu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genres);
  const countries = useSelector((state) => state.countries);

  const [errs, setErrs] = useState({
    title: "",
    synopsis: "",
    year: "",
    duration: "",
    director: "",
    genres: [],
    mainActors: [],
    actor: "",
    country: "",
    associateProducer: "",
    block: true,
  });
  const [movieForm, setMovieForm] = useState({
    title: "",
    synopsis: "NI IDEA QUE SEA UNA SIPNOSIS",
    year: 2022,
    duration: "Largometraje",
    director: "FaQ1499",
    genres: ["horror"],
    mainActors: ["Geovana", "Brenda", "Milagros", "Camila", "Tatiana"],
    country: "Argentina",
    associateProducer: "Productor asociado cualquiera!",
  });

  const [archivos, setArchivos] = useState(null);
  const subirArchivos = (e) => {
    console.log("Datos que llegan del form: ", e.target.files[0]);
    setArchivos(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getCountries());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(archivos);
    dispatch(postMovie(archivos));
    alert("pelicula enviada\nverificar");
    setMovieForm({
      title: "",
      synopsis: "NI IDEA QUE SEA UNA SIPNOSIS",
      year: 2022,
      duration: "Largometraje",
      director: "FaQ1499",
      genres: ["horror"],
      mainActors: ["Geovana", "Brenda", "Milagros", "Camila", "Tatiana"],
      country: "Argentina",
      associateProducer: "Productor asociado cualquiera!",
    });
    navigate("/add");
  };

  const handleChange = (e) => {
    setMovieForm({
      ...movieForm,
      [e.target.name]: e.target.value,
    });
    setErrs(validate(movieForm, e.target.name));
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} enctype="multipart/form-data">
        <div>
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={movieForm.title}
            placeholder="Título de la Película"
            onChange={(e) => handleChange(e)}
            required
          />
          {errs.title && <p class="errores">{errs.title}</p>}
        </div>
        <div>
          <label>Póster</label>
          <input
            type="file"
            name="poster"
            accept="image/jpg image/png image/jpeg"
            placeholder="URL de póster"
            onChange={(e) => subirArchivos(e)}
            required
          />
          {errs.poster && <p class="errores">{errs.poster}</p>}
        </div>
        <button type="submit" disabled={errs?.block}>
          Enviar
        </button>
      </form>
    </>
  );
}
