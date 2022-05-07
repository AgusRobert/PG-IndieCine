import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getCountries } from "../../redux/actions";
import { postMovie } from "../../redux/actions/index";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { validate } from "./validates";
import axios from "axios";
import {
  MenuItemStyle,
  InputStyle,
  ButtonStyle,
  LabelStyle,
  SelectStyle,
  BoxStyle,
  sxSelectStyle,
  sxButtonStyle,
} from "../StyleMUI/StyleMUI";

export function FilmForm() {
  //para validacion de errores
  const [errores, setErrores] = useState({ block: true });
  //para campo de actor y poder agregarlo al array de mainsActors
  const [actor, setActor] = useState("");
  //para campos de texto
  const [movieForm, setMovieForm] = useState({
    title: "",
    synopsis: "",
    year: "",
    duration: "",
    mainActors: [],
    url: "",
    director: "",
    associateProducer: "",
    genres: [],
    country: "",
  });
  //para la imagen de la portada
  const [multimedia, setMultimedia] = useState({ port: null, film: null });
  //constantes necesaria para el despacho de peticiones
  const dispatch = useDispatch();
  //paises y generos necesarios para el select
  const { countries, genres } = useSelector((state) => state);
  //manejo de cambios en los campos
  const handleOnChange = (e) => {
    setMovieForm({
      ...movieForm,
      [e.target.name]: e.target.value,
    });
    setErrores(
      validate({
        ...movieForm,
        [e.target.name]: e.target.value,
      })
    );
  };
  //manejo de selecciones
  const selectMultimedia = (e) => {
    e.preventDefault();
    setMultimedia({ ...multimedia, [e.target.name]: e.target.files[0] });
  };
  //manejo de seleccion de generos
  const handleGenres = (e) => {
    if (!movieForm?.genres?.includes(e.target.value))
      setMovieForm({
        ...movieForm,
        [e.target.name]: [...movieForm.genres, e.target.value],
      });
  };

  useEffect(() => {
    //Obtencion de los paises
    !countries?.length && dispatch(getCountries());
    //Obtencion de los generos
    !genres?.length && dispatch(getGenres());
  }, [countries?.length, genres?.length, dispatch]);
  //agregado de un actor a los personajes
  const handleElenco = (e) => {
    e.preventDefault();
    //comprobacion de un nombre no existente o nulo
    if (
      !actor.trim() == "" &&
      !movieForm.mainActors.includes(actor.toLowerCase())
    )
      movieForm.mainActors.push(actor.trim());
    else alert("Actor Invalido");
    setActor("");
  };
  //manejador de envio del formulario
  const onSubmit = async (e) => {
    //creacion del paquete de envio para subida de la portada
    const formPort = new FormData();
    //creacion del paquete de envio para subida de la peliculas
    const formFilm = new FormData();
    //adicion de la imagen para la subida
    formPort.append("file", multimedia.port);
    //adicion de la pelicula para la subida
    formFilm.append("file", multimedia.film);
    //despacho de la subida directamente al back
    const rPort = (
      await axios.post("http://localhost:3001/upload/inter", formPort)
    )?.data;
    //despacho de la subida directamente al back
    const rFilm = (
      await axios.post("http://localhost:3001/upload/inter", formFilm)
    )?.data;
    //lectura de una respuesta y seteo de la ruta de la imagen subida
    if (typeof rPort === "string") setMovieForm({ ...movieForm, port: rPort });
    if (typeof rFilm === "string") setMovieForm({ ...movieForm, film: rFilm });
    else alert("SE TE CORTO EL INTERNET ");
    //despacho de la accion para guardar una pelicula
    console.log("Datos actuales: ", movieForm);
    dispatch(postMovie(movieForm));
  };
  //array de anios para las peliculas
  const anios = [];
  for (let i = 2022; i > 1950; i--) anios.push(`${i}`);

  return (
    <Box
      sx={{
        backgroundColor: grey[100],
      }}
    >
      <h1>Subí tu proyecto a la red!</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <BoxStyle>
          {/* Título */}
          <LabelStyle>Título</LabelStyle>
          <InputStyle
            type="text"
            value={movieForm.title}
            placeholder="Título de la Película"
            name="title"
            onChange={(e) => handleOnChange(e)}
            required
          />
          {errores?.title && <p class="errores">{errores.title}</p>}

          {/* Póster */}
          <LabelStyle>Póster</LabelStyle>
          <InputStyle
            type="file"
            accept="image/jpg image/png image/jpeg"
            name="port"
            placeholder="Portada de la Pelicula"
            onChange={(e) => selectMultimedia(e)}
            required
          />

          {/* Sinopsis */}
          <LabelStyle>Sinopsis</LabelStyle>
          <InputStyle
            type="text"
            value={movieForm.synopsis}
            placeholder="Sinopsis"
            name="synopsis"
            onChange={(e) => handleOnChange(e)}
            required
          />
          {errores?.synopsis && <p class="errores">{errores.synopsis}</p>}

          {/* Géneros */}
          <LabelStyle>Géneros *</LabelStyle>
          <SelectStyle
            name="genres"
            onChange={(e) => handleGenres(e)}
            select
            label="Generos"
            variant="outlined"
            size="small"
            sx={sxSelectStyle}
          >
            <MenuItemStyle hidden={true}>Géneros</MenuItemStyle>
            {genres?.map((genre) => (
              <MenuItemStyle key={genre.id} value={genre.name}>
                {genre.name}
              </MenuItemStyle>
            ))}
          </SelectStyle>
          {errores?.genres && <p class="errores">{errores.genres}</p>}

          {/* País */}
          <LabelStyle>País *</LabelStyle>
          <SelectStyle
            name="country"
            onChange={(e) => handleOnChange(e)}
            select
            label="Pais"
            variant="outlined"
            size="small"
            sx={sxSelectStyle}
          >
            <MenuItemStyle hidden={true}>Países</MenuItemStyle>
            {countries?.map((country) => (
              <MenuItemStyle key={country.id} value={country.id}>
                {country.name}
              </MenuItemStyle>
            ))}
          </SelectStyle>
          {errores?.genres && <p class="errores">{errores.genres}</p>}

          {/* Año*/}
          <LabelStyle>Año *</LabelStyle>
          
          <SelectStyle
            name="year"
            value={movieForm.year ? movieForm.year : "Seleccione Año"}
            onChange={(e) => handleOnChange(e)}
            select
            label="anio"
            variant="outlined"
            size="small"
            sx={sxSelectStyle}
          >
            {anios?.map((anio) => (
              <MenuItemStyle key={anio} value={anio}>
                {anio}
              </MenuItemStyle>
            ))}
          </SelectStyle>

          {/* Duración */}
          <LabelStyle>Duración *</LabelStyle>
          <SelectStyle
            name="duration"
            onChange={(e) => handleOnChange(e)}
            select
            label="Duracion"
            variant="outlined"
            size="small"
            sx={sxSelectStyle}
          >
            <MenuItemStyle hidden={true}>Duración</MenuItemStyle>
            <MenuItemStyle key={1} value="Cortometraje">
              Cortometraje
            </MenuItemStyle>
            <MenuItemStyle key={2} value="Mediometraje">
              Mediometraje
            </MenuItemStyle>
            <MenuItemStyle key={3} value="Largometraje">
              Largometraje
            </MenuItemStyle>
          </SelectStyle>

          {/* Dirección */}
          <LabelStyle>Dirección</LabelStyle>
          <InputStyle
            type="text"
            value={movieForm.director}
            name="director"
            placeholder="Dirección"
            onChange={(e) => handleOnChange(e)}
            required
          />
          {errores?.director && <p class="errores">{errores.director}</p>}

          {/* Elenco */}
          <LabelStyle>Elenco *</LabelStyle>
          <InputStyle
            type="text"
            value={actor}
            placeholder="Actores"
            name="actor"
            onChange={(e) => setActor(e.target.value)}
          />
          <ButtonStyle
            sx={sxButtonStyle}
            type="button"
            name="elenco"
            onClick={(e) => handleElenco(e)}
          >
            Añadir
          </ButtonStyle>

          {/* Productora */}
          <LabelStyle>Productora *</LabelStyle>
          <InputStyle
            type="text"
            value={movieForm.associateProducer}
            name="associateProducer"
            placeholder="Productora"
            onChange={(e) => handleOnChange(e)}
            required
          />

          {/* Película Campo para subir una pelicula*/}
          <LabelStyle>Película Archivo*</LabelStyle>
          <InputStyle
            type="file"
            accept="video/mp4"
            name="film"
            placeholder="Subir Película"
            onChange={(e) => selectMultimedia(e)}
          />
          <LabelStyle>Pelicula Link *</LabelStyle>
          <InputStyle
            type="text"
            value={movieForm.url}
            name="url"
            placeholder="URL de la Pelicula"
            onChange={(e) => handleOnChange(e)}
            required
          />
          {errores?.url && <p class="errores">{errores.url}</p>}
          <ButtonStyle
            sx={sxButtonStyle}
            type="submit"
            disabled={errores.block}
          >
            Subir proyecto
          </ButtonStyle>
        </BoxStyle>
      </form>
    </Box>
  );
}
