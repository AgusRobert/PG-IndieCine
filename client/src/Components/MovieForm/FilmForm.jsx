import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getCountries } from "../../redux/actions";
import { postMovie } from "../../redux/actions/index";
import { styled, Box } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { TextField, Toolbar } from "@mui/material";
import { Button } from "@mui/material";
import { InputBase } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import validate from "./validates";

const MenuItemStyle = styled(MenuItem)({
  marginLeft: "auto",
  color: "white",
  backgroundColor: "#b388ff",
});

const InputStyle = styled(InputBase)({
  backgroundColor: amber[50],
  borderRadius: 5,
  width: "250px",
  padding: 4,
});

const ButtonStyle = styled(Button)({
  color: "white",
  borderColor: deepPurple[500],
  backgroundColor: deepPurple[700],
  padding: 8,
});

const LabelStyle = styled("label")({
  //   color: "white",
  color: "black",
});

const SelectStyle = styled(TextField)({
  borderRadius: 2,
  width: 160,
  padding: 0,
});

const BoxStyle = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "column",
});

export function FilmForm() {
  //para validacion de errores
  const [errores, setErrores] = useState({});
  //para campo de actor y poder agregarlo al array de mainsActors
  const [actor, setActor] = useState("");
  //para campos de texto
  const [movieForm, setmovieForm] = useState({
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
  //constantes necesaria para el despacho de peticiones
  const dispatch = useDispatch();
  //paises necesarios para el select
  const countries = useSelector((state) => state.countries);
  //generos necesario para el select
  const genres = useSelector((state) => state.genres);

  function handleActor(e) {
    setActor({
      [e.target.name]: e.target.value,
    });
    console.log(actor.actorname);
  }

  function handleElenco(e) {
    e.preventDefault();
    if (movieForm.mainActors.includes(actor.actorname)) {
      console.log("movieForm mainactors", movieForm.mainActors);
      alert("El actor ya está en el elenco");
    } else {
      movieForm.mainActors.push(actor.actorname);
      console.log("movieForm mainactors", movieForm.mainActors);
      setActor({
        actorname: "",
      });

      // Función de modificación de los inputs con contenido string
      function handleOnChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
        console.log(input);
      }
    }

    //
    function onSelectChange(e) {
      setmovieForm({
        ...movieForm,
        duration: e.target.value,
      });
    }

    function handleGenres(e) {
      if (!movieForm.genres.includes(e.target.value)) {
        setmovieForm({
          ...movieForm,
          [e.target.name]: [...movieForm.genres, e.target.value],
        });
      } else {
        return;
      }
    }

    function onSubmit(e) {
      e.preventDefault();
      setErrores(validate(movieForm));
      setSubmit(true);
      // if (Object.keys(errores).length === 0 && setSubmit) {
      //     dispatch(postMovie(movieForm));
      // }
    }

    return (
      <Box
        sx={{
          backgroundColor: grey[100],
        }}
      >
        <h1>Subí tu proyecto a la red!</h1>
        <form onSubmit={() => "Tu película fue subida"}>
          <BoxStyle>
            {/* Título */}
            <LabelStyle>Título</LabelStyle>
            <InputStyle
              type="text"
              value={movieForm.title}
              placeholder="Título de la Película"
              name="title"
              onChange={(e) => handleChange(e)}
              required
            />
            {errores.title && <p class="errores">{errores.title}</p>}

            {/* Póster */}
            <LabelStyle>Póster</LabelStyle>
            <InputStyle
              type="file"
              accept="image/jpg image/png image/jpeg"
              value={movieForm.poster}
              name="poster"
              placeholder="URL de póster"
              onChange={(e) => handleChange(e)}
              required
            />
            {errores.poster && <p class="errores">{errores.poster}</p>}

            {/* Sinopsis */}
            <LabelStyle>Sinopsis</LabelStyle>
            <InputStyle
              type="text"
              value={movieForm.synopsis}
              placeholder="Sinopsis"
              name="synopsis"
              onChange={(e) => handleChange(e)}
              required
            />
            {errores.synopsis && <p class="errores">{errores.synopsis}</p>}

            {/* <select className={s.select} name="select" id="paises"  >
                        <option value="">Choose a Country</option>
                        {paises.map((pais) => (
                            <option key={pais.id} value={pais.id} onClick={handleOnChange}>
                                {pais.name}
                            </option>
                        ))}
                    </select> */}

            {/* Géneros */}
            <LabelStyle>Géneros *</LabelStyle>
            <SelectStyle
              name="genres"
              onChange={(e) => handleGenres(e)}
              select
              label="Generos"
              variant="outlined"
              size="small"
              sx={{
                ":active": {
                  color: "white",
                  borderColor: deepPurple[600],
                },
                ":focused": {
                  borderColor: deepPurple[600],
                },
              }}
            >
              <MenuItemStyle hidden={true}>Géneros </MenuItemStyle>
              {genres?.map((e) => (
                <MenuItemStyle key={e.id} value={e.name}>
                  {e.name}
                </MenuItemStyle>
              ))}
            </SelectStyle>
            {errores.genres && <p class="errores">{errores.genres}</p>}

            {/* País */}
            <LabelStyle>País *</LabelStyle>
            <SelectStyle
              name="country"
              onChange={handleOnChange}
              select
              label="Pais"
              variant="outlined"
              size="small"
              sx={{
                ":active": {
                  color: "black",
                  borderColor: deepPurple[600],
                },
                ":focused": {
                  borderColor: deepPurple[600],
                },
              }}
            >
              <MenuItemStyle hidden={true}>Países</MenuItemStyle>
              {countries?.map((e) => (
                <MenuItemStyle value={e.id}>{e.name}</MenuItemStyle>
              ))}
            </SelectStyle>
            {errores.genres && <p class="errores">{errores.genres}</p>}

            {/* Fecha de Estreno */}
            <LabelStyle>Fecha de Estreno *</LabelStyle>
            <InputStyle
              type="date"
              value={input.year}
              name="year"
              placeholder="Año de Lanzamiento"
              onChange={handleOnChange}
              required
            />

            {/* Duración */}
            <LabelStyle>Duración *</LabelStyle>
            <SelectStyle
              name="durationt"
              onChange={onSelectChange}
              select
              label="Duracion"
              variant="outlined"
              size="small"
              sx={{
                ":active": {
                  color: "white",
                  borderColor: deepPurple[600],
                },
                ":focused": {
                  borderColor: deepPurple[600],
                },
              }}
            >
              <MenuItemStyle hidden={true}>Duración</MenuItemStyle>
              <MenuItemStyle value="Cortometraje">Cortometraje</MenuItemStyle>
              <MenuItemStyle value="Mediometraje">Mediometraje</MenuItemStyle>
              <MenuItemStyle value="Largometraje">Largometraje</MenuItemStyle>
            </SelectStyle>

            {/* Dirección */}
            <LabelStyle>Dirección *</LabelStyle>
            <InputStyle
              type="text"
              value={input.director}
              name="director"
              placeholder="Dirección"
              onChange={handleOnChange}
              required
            />
            {errores.director && <p class="errores">{errores.director}</p>}

            {/* Dirección */}
            <LabelStyle>Dirección</LabelStyle>
            <InputStyle
              type="text"
              value={movieForm.director}
              name="director"
              placeholder="Dirección"
              onChange={(e) => handleChange(e)}
              required
            />
            {errores.director && <p class="errores">{errores.director}</p>}

            {/* Elenco */}
            <LabelStyle>Elenco *</LabelStyle>
            <InputStyle
              type="text"
              value={actor.actorname}
              placeholder="Actores"
              name="actorname"
              onChange={(e) => handleActor(e)}
              required
            />
            <ButtonStyle
              sx={{
                ":hover": {
                  bgcolor: deepPurple[200],
                  color: "black",
                  borderBlockColor: deepPurple[200],
                  borderInlineStartColor: deepPurple[900],
                  borderInlineEndColor: deepPurple[900],
                },
              }}
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
              value={input.associateProducer}
              name="associateProducer"
              placeholder="Productora"
              onChange={handleOnChange}
              required
            />
            {errores.associateProducer && (
              <p class="errores">{errores.associateProducer}</p>
            )}

            {/* Película */}
            <LabelStyle>Película *</LabelStyle>
            <InputStyle
              type="file"
              accept="video/mp4"
              value={input.url}
              name="url"
              placeholder="sube la película"
              onChange={handleOnChange}
              required
            />
            {errores.url && <p class="errores">{errores.url}</p>}

            <ButtonStyle
              sx={{
                ":hover": {
                  bgcolor: deepPurple[200],
                  color: "black",
                  borderBlockColor: deepPurple[200],
                  borderInlineStartColor: deepPurple[900],
                  borderInlineEndColor: deepPurple[900],
                },
              }}
              type="submit"
            >
              Subir proyecto
            </ButtonStyle>
          </BoxStyle>
        </form>
      </Box>
    );
  }
}
