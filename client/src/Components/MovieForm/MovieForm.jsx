import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getCountries } from "../../redux/actions/index";
import { postMovie } from "../../redux/actions/index";
export function MovieForm() {
  let dispatch = useDispatch;
  let countries = useSelector((state) => state.countries);
  let genres = useSelector((state) => state.genres);
  const [submit, setSubmit] = useState(false);
  const [errores, setErrores] = useState({});
  const [movieForm, setmovieForm] = useState({
    title: "",
    poster: "",
    synopsis: "",
    year: "",
    duration: "",
    director: "",
    genres: [],
    mainActors: [],
    actor:"",
    country: [],
    associateProducer: "",
    url: "",
    poster: "",
  });
  useEffect(() => {
    getGenres();
    getCountries();
  }, []);

  useEffect(() => {
    if (Object.keys(errores).length === 0 && setSubmit) {
    }
  }, [errores]);

  const validate = (values) => {
    const errores = {};
    const RegExAlfa = /^[A-Za-z]+$/;
    const RegExNum = /^[0-9]*$/;
    const RegExInt = /^[-+]?[1-9]\d*$/;
    //ACA VAN LAS VALIDACIONES POR CADA CAMPO
    return errores;
  };
  function onInputChange(e) {
    e.preventDefault();
    setmovieForm({
      ...movieForm,
      [e.target.name]: e.target.value,
    });
  }
  function onInputChangeN(e) {
    e.preventDefault();
    setmovieForm({
      ...movieForm,
      [e.target.name]: Number(e.target.value),
    });
  }
  function onSubmit(e) {
    e.preventDefault();
    setErrores(validate(movieForm));
    setSubmit(true);
    if (Object.keys(errores).length === 0 && setSubmit) {
      dispatch(postMovie(movieForm));
    }
  }
  function handleChange(e) {
    setmovieForm({
      ...movieForm,
      [e.target.name]: e.target.value,
    });

    console.log(movieForm);
  }
  function handleActores(e) {
    e.preventDefault();
    setmovieForm({
      ...movieForm,
      mainActors: [...movieForm.mainActors, movieForm.actor],
      actor: ""
    });
  }
  function onSelectChange(e) {
    setmovieForm({
      ...movieForm,
      duration: e.target.value,
    });
  }
  let elencoList = movieForm.mainActors;

  return (
    <div>
      <form>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={movieForm.title}
            placeholder="Título de la Película"
            name="title"
            onChange={(e) => handleChange(e)}
            required
          />
          {errores.title && <p class="errores">{errores.title}</p>}
        </div>
        <div>
          <label>Póster</label>
          <input
            type="text"
            value={movieForm.poster}
            name="poster"
            placeholder="URL de póster"
            onChange={(e) => handleChange(e)}
            required
          />
          {errores.poster && <p class="errores">{errores.poster}</p>}
        </div>
        <div>
          <label>Sinopsis</label>
          <input
            type="text"
            value={movieForm.synopsis}
            placeholder="Sinopsis"
            name="synopsis"
            onChange={(e) => handleChange(e)}
            required
          />
          {errores.synopsis && <p class="errores">{errores.synopsis}</p>}
        </div>
        <div>
          <label>Fecha de Estreno</label>
          <input
            type="date"
            value={movieForm.year}
            name="year"
            placeholder="Año de Lanzamiento"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="content-select">
          <label>Duración</label>
          <select name="duration" onChange={onSelectChange}>
            <option hidden={true}>Duración</option>
            <option value="Cortometraje">Cortometraje</option>
            <option value="Mediometraje">Mediometraje</option>
            <option value="Largometraje">Largometraje</option>
          </select>
        </div>
        <div>
          <label>Dirección</label>
          <input
            type="text"
            value={movieForm.director}
            name="director"
            placeholder="Dirección"
            onChange={(e) => handleChange(e)}
            required
          />
          {errores.director && (
            <p p class="errores">
              {errores.director}
            </p>
          )}
        </div>
        <div>
          
        <form onSubmit={(e)=>handleActores(e)}> 
          <label>Elenco</label>
           <input
            type="text"
            value={movieForm.actor}
            name="actor"
            placeholder="Elenco"
            onChange={(e) => handleChange(e)}
            required
          />
         <input  type="submit" value="Agregar"/>
         </form>
          {() =>
            elencoList.map((actor) => {
              return (
                <>
                  <p>{actor}</p>
                </>
              );
            })
          }
          {errores.mainActors && (
            <p p class="errores">
              {errores.mainActors}
            </p>
          )}
        </div>
        <div>
              <label>Productora</label>
              <input
                type="text"
                value={movieForm.associateProducer}
                name="associateProducer"
                placeholder="Productora"
                onChange={(e) => handleChange(e)}
                required
              />
              {errores.associateProducer && (
                <p p class="errores">
                  {errores.associateProducer}
                </p>
              )}
            </div>
            <div>
              <label>Poster</label>
              <input
                type="text"
                value={movieForm.poster}
                name="poster"
                placeholder="URL del poster"
                onChange={(e) => handleChange(e)}
                required
              />
              {errores.poster && (
                <p p class="errores">
                  {errores.poster}
                </p>
              )} 
             </div>
            <div>
              <label>URL</label>
              <input
                type="text"
                value={movieForm.url}
                name="url"
                placeholder="URL del archivo"
                onChange={(e) => handleChange(e)}
                required
              />
              {errores.url && (
                <p p class="errores">
                  {errores.url}
                </p>
              )} 
             </div>
      </form>
    </div>
  );
}
