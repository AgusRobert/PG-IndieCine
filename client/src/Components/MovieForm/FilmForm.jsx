import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getCountries } from "../../redux/actions";
import { postMovie } from "../../redux/actions/index";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { validate } from "./validates";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
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
import { SERVER_BACK } from "../../paths/path";

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
    film: "a",
    port: "a",
  });
  //para la imagen de la portada
  const [multimedia, setMultimedia] = useState({ port: null, film: null });
  //constantes necesaria para el despacho de peticiones
  const dispatch = useDispatch();
  //paises y generos necesarios para el select
  const { countries, genres } = useSelector((state) => state);
  const { user } = useAuth0();
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

  function handleDeleteGenre(e) {
    setMovieForm({
      ...movieForm,
      genres: movieForm.genres.filter((data) => data !== e),
    });
  }

  function handleDeleteActors(e) {
    setMovieForm({
      ...movieForm,
      mainActors: movieForm.mainActors.filter((data) => data !== e),
    });
  }

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
    let comparacion = movieForm.mainActors.map((p) => {
      return p.toLowerCase();
    });
    console.log("COMPARACION", comparacion);
    if (!actor.trim() == "" && !comparacion.includes(actor.toLowerCase()))
      movieForm.mainActors.push(actor.trim());
    /* alert("Actor Invalido"); */ else
      Swal.fire({
        title: "Actor Inválido",
        width: 600,
        timer: 3000,
        timerProgressBar: true,
        padding: '1em',
        icon: 'error',
        color: '#716add',
        background: 'black',
        backdrop: `
          rgba(0,0,123,0.2)0  `,
        confirmButtonText: 'Entiendo',
      })
    setActor("");
  };
  //manejador de envio del formulario
  const onSubmit = async (e) => {
    e.preventDefault();
    const objResponse = {};
    console.log("DATOS FRONT: ", multimedia);
    if (multimedia?.port) {
      //creacion del paquete de envio para subida de la portada
      const formPort = new FormData();
      //autor de la pelicula
      formPort.append("email", user.email);
      //tipo de la archivo
      formPort.append("tipo", "poster");
      //aclaracion de archivo subido
      formPort.append("extra", movieForm.title);
      //adicion de la imagen para la subida
      formPort.append("file", multimedia.port);
      //despacho de la subida directamente al back
      const rPort = (await axios.post(`${SERVER_BACK}/upload/inter`, formPort))
        ?.data;
      console.log("RESPUESTA IMAGEN: ", rPort);
      //lectura de una respuesta y seteo de la ruta de la imagen subida
      if (typeof rPort === "string") objResponse.port = rPort;
    }
    if (multimedia?.film) {
      //creacion del paquete de envio para subida de la peliculas
      const formFilm = new FormData();
      //autor de la pelicula
      formFilm.append("email", user.email);
      //tipo de la archivo
      formFilm.append("tipo", "poster");
      //aclaracion de archivo subido
      formFilm.append("extra", movieForm.title);
      //adicion de la pelicula para la subida
      formFilm.append("file", multimedia.film);
      //despacho de la subida directamente al back
      const rFilm = (await axios.post(`${SERVER_BACK}/upload/inter`, formFilm))
        ?.data;
      console.log("RESPUESTA Pelicula: ", rFilm);
      //lectura de una respuesta y seteo de la ruta de la imagen subida
      if (typeof rFilm === "string") objResponse.film = rFilm;
    }
    /* alert("Pelicula agregada correctamente."); */
    // Swal.fire(
    //  "Formulario enviado correctamente" ,
    //   "Gracias por publicar tu contenido en CINDIE",
    //   "Su pelicula esta en proceso de evaluacion",
    //   "success"
    // );
    Swal.fire({
      title: "Formulario enviado correctamente. Gracias por publicar tu contenido en CINDIE. Su pelicula esta en proceso de evaluacion",
      width: 600,
      timer: 4000,
      timerProgressBar: true,
      padding: '1em',
      icon: "success",
      color: '#716add',
      background: 'black',
      backdrop: `
        rgba(0,0,123,0.2)0  `,
      confirmButtonText: 'Entiendo',
    })
    //despacho de la accion para guardar una pelicula
    console.log("Datos actuales: ", movieForm);
    dispatch(postMovie({ ...movieForm, ...objResponse, email: user.email }));
  };
  //array de años para las peliculas
  const años = [];
  for (let i = 2022; i > 1950; i--) años.push(`${i}`);

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
            value={movieForm.year}
            onChange={(e) => handleOnChange(e)}
            select
            label="año"
            variant="outlined"
            size="small"
            sx={sxSelectStyle}
          >
            {años?.map((anio) => (
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
          <LabelStyle>Productora Asociada</LabelStyle>
          <InputStyle
            type="text"
            value={movieForm.associateProducer}
            name="associateProducer"
            placeholder="Productora"
            onChange={(e) => handleOnChange(e)}
            // required
          />

          {/* Película Campo para subir una pelicula*/}
          <LabelStyle>Película Archivo*</LabelStyle>
          <InputStyle
            type="file"
            accept="video/mp4"
            name="film"
            placeholder="Subir Película.mp4"
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
      <div>
        {movieForm.genres.map((data) => (
          <div>
            <button key={data.id} onClick={() => handleDeleteGenre(data)}>
              {data}
            </button>
          </div>
        ))}
        {movieForm.mainActors.map((data) => (
          <div>
            <button key={data} onClick={() => handleDeleteActors(data)}>
              {data}
            </button>
          </div>
        ))}
      </div>
    </Box>
  );
}
