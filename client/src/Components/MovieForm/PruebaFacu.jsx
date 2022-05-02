import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getGenres, postMovie } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { validate } from "./validates";

export function MovieForm(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genres);
  const countries = useSelector((state) => state.countries);
  
  const [errs,setErrs] = useState({title: "",synopsis: "",year: "",duration: "",director: "",genres: [],
    mainActors: [],actor: "",country: "",associateProducer: "",block:true});
  const [movieForm, setMovieForm] = useState({title: "",synopsis: "",year: 0,duration: "",director: "",genres: [],
    mainActors: [],actor: "",country: "",associateProducer: "",});

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getCountries());
  },[dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(movieForm);
    dispatch(postMovie(movieForm));
    alert("pelicula enviada\nverificar");
    setMovieForm({title: "",synopsis: "",year: 0,duration: "",director: "",genres: [],
      mainActors: [],actor: "",country: "",associateProducer: "",
    });
    navigate('/add');
  };

  const handleChange = (e) => {
    setMovieForm({
      ...movieForm,
      [e.target.name]: e.target.value,
    });
    setErrs(validate(movieForm,e.target.name));
  };

  return(
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
              required/>
            {errs.title && <p class="errores">{errs.title}</p>}
        </div>
        <div>
          <label>Póster</label>
          <input
            type="file"
            name="poster"
            value={movieForm.poster}
            accept="image/jpg image/png image/jpeg"         
            placeholder="URL de póster"
            onChange={(e) => handleChange(e)}
            required/>
          {errs.poster && <p class="errores">{errs.poster}</p>}
        </div>
        <button type="submit" disabled={errs?.block}>Enviar</button>
      </form>
    </>
  )
}