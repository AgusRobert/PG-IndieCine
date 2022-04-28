import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { /* AddMovie, getGenres, getCountries */ } from "../actions/index";

function validate(input) {
  let errors = {};
  if (!input.title) {
    errors.title = "Campo obligatorio";
  }

  if (!input.poster) {
    errors.poster = "Campo obligatorio";
  }

  if (!input.synopsis) {
    errors.synopsis = "Campo obligatorio";
  }

  if (!input.year) {
    errors.year = "Campo obligatorio";
  }

  if (!input.duration) {
    errors.duration = "Campo obligatorio";
  }

  if (!input.director) {
    errors.director = "Campo obligatorio";
  }

  if (input.genres.length === 0) {
    errors.genres = "Campo obligatorio";
  }

  if (input.mainActors.length === 0) {
    errors.mainActors = "Campo obligatorio";
  }

  if (!input.country.length === 0) {
    errors.country = "Campo obligatorio";
  }

  if (!input.url) {
    errors.url = "Campo obligatorio";
  }

  if (!input.associateProducer) {
    errors.associateProducer = "Campo obligatorio";
  }

  return errors;
}

export function AddMovie() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});
  const [input, setinput] = useState({
    title: "",
    poster: "",
    synopsis: "",
    year: "",
    duration: "",
    director: "",
    genres: [],
    mainActors: [],
    country: [],
    associateProducer: "",
    url: "",
  });

  function handleChange(e) {
    setinput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.value]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setinput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handleSelectC(e) {
    setinput({
      ...input,
      country: [...input.country, e.target.value],
    });
  }

  function handleSelectD(e) {
    setinput({
      ...input,
      duration: [...input.duration, e.target.value],
    });
  }

  function handlemainActors(e) {
    setinput({
      ...input,
      mainActors: [...input.mainActors, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.title) {
      return alert("La película debe tener un título");
    }
    if (!input.poster) {
      return alert("Debe incluirse una imagen de la película");
    }
    if (!input.year) {
      return alert("Debe indicarse el año de estreno");
    }
    if (!input.synopsis) {
      return alert("Debe incluirse una sinopsis de la película");
    }
    if (!input.director) {
      return alert("Debe indicarse el director/a de la película");
    }
    if (!input.country) {
      return alert("Debe indicarse el país de origen de la película");
    }
    if (input.genres.length === 0) {
      return alert("La película debe tener al menos un género");
    }
    if (input.mainActors.length === 0) {
      return alert("La película debe tener al menos un actor");
    }
    /* dispatch(postMovie(input)); */
    alert("Formulario enviado");
    setinput({
      title: "",
      poster: "",
      synopsis: "",
      year: "",
      duration: "",
      director: "",
      genres: [],
      mainActors: [],
      country: [],
      associateProducer: "",
      url: "",
    });
  }

  function handleDeleteG(g) {
    setinput({ ...input, genres: input.genres.filter((gen) => gen !== g) });
  }

  /* useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    dispatch(getCountries());
  }, []); */

  return (
    <div>
      <h1>Subir Película</h1>
      <form class="formulario" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <div>
              <label>Título</label>
              <input
                type="text"
                value={input.title}
                placeholder="Título de la Película"
                name="title"
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.title && <p class="errores">{errors.title}</p>}
            </div>

            <div>
              <label>Póster</label>
              <input
                type="text"
                value={input.poster}
                name="poster"
                placeholder="URL de póster"
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.poster && <p class="errores">{errors.poster}</p>}
            </div>

            <div>
              <label>Sinopsis</label>
              <input
                type="text"
                value={input.synopsis}
                placeholder="Sinopsis"
                name="synopsis"
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.synopsis && <p class="errores">{errors.synopsis}</p>}
            </div>

            <div>
              <label>Fecha de Estreno</label>
              <input
                type="date"
                value={input.year}
                name="year"
                placeholder="Año de Lanzamiento"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div class="content-select">
              <label>Duración</label>
              <select onChange={(e) => handleSelectD(e)}>
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
                value={input.director}
                name="director"
                placeholder="Dirección"
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.director && (
                <p p class="errores">
                  {errors.director}
                </p>
              )}
            </div>

            <div>
              {
                <div class="content-select">
                  <label>Géneros</label>
                  <select onChange={(e) => handleSelect(e)}>
                    <option hidden={true}>Géneros</option>
                    {genres.map((e) => (
                      <option value={e.name}>{e.name}</option>
                    ))}
                  </select>
                  {errors.genres && (
                    <p p class="errores">
                      {errors.genres}
                    </p>
                  )}
                </div>
              }
            </div>

            <div class="deleteadores">
              {input.genres.map((g) => (
                <div>
                  <button
                    type="button"
                    class="elegidos"
                    onClick={() => handleDeleteG(g)}
                  >
                    {g}
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label>Elenco</label>
              <input
                type="text"
                value={input.mainActors}
                name="mainActors"
                placeholder="Elenco"
                onChange={(e) => handleChange(e)}
                required
              />
              <button type="button" onClick={(e) => handlemainActors(e)}>
                Agregar
              </button>
              {errors.mainActors && (
                <p p class="errores">
                  {errors.mainActors}
                </p>
              )}
            </div>


            <div>
              <label>País</label>
              <select onChange={(e) => handleSelectC(e)}>
                    <option hidden={true}>Países</option>
                    {countries.map((c) => (
                      <option value={c.name}>{c.name}</option>
                    ))}
                  </select>
              
              {errors.country && (
                <p p class="errores">
                  {errors.country}
                </p>
              )}
            </div>

            <div>
              <label>Productora</label>
              <input
                type="text"
                value={input.associateProducer}
                name="associateProducer"
                placeholder="Productora"
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.associateProducer && (
                <p p class="errores">
                  {errors.associateProducer}
                </p>
              )}
            </div>

            <div>
              <label>URL</label>
              <input
                type="text"
                value={input.url}
                name="url"
                placeholder="URL del archivo"
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.url && (
                <p p class="errores">
                  {errors.url}
                </p>
              )}
            </div>
          </div>
          <button type="submit" class="botoncrear">
            ENVIAR FORMULARIO
          </button>
        </div>
      </form>
    </div>
  );
}
