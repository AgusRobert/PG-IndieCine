import Autosuggest from "react-autosuggest"; //instalarlaaa
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchPelicula_Actor,
  getMovies,
  getGenres,
  getCountries,
} from "../../redux/actions/index";
import { useEffect } from "react";

export default function AutoSearch() {
  const [value, setValue] = useState("");
  const [presidenteSeleccionado, setPresidenteSeleccionado] = useState({});

  const genres = useSelector((state) => state.genres);
  const allMovies = useSelector((state) => state.peliculas);
  const countries = useSelector((state) => state.countries);

  genres?.forEach((g) => {
    return delete g.id;
  });
  countries?.forEach((g) => {
    return delete g.id;
  });

  let nombres = allMovies?.map((p) => {
    return { name: p.title };
  });

  let dires = allMovies?.map((p) => {
    return { name: p.director };
  });

  let elenco = [];

  let actores = allMovies?.map((p) => {
    p.mainActors?.map((a) => {
      elenco.push(a);
    });
  });

  let elenco2 = elenco?.map((p) => {
    return { name: p };
  });

  let data = genres?.concat(nombres, dires, elenco2, countries);

  const [presidentes, setPresidentes] = useState(data);
  console.log("SIRVEE", data);

  let dispatch = useDispatch();

  useEffect(() => {
    !allMovies?.length && dispatch(getMovies());

    !genres?.length && dispatch(getGenres());

    !countries?.length && dispatch(getCountries());
  }, [allMovies?.length, genres?.length, dispatch]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setPresidentes(filtrarPresidentes(value));
  };

  const filtrarPresidentes = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    var filtrado = data.filter((presidente) => {
      var textoCompleto = presidente.name;

      if (
        textoCompleto
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(inputValue)
      ) {
        return presidente;
      }
    });

    return inputLength === 0 ? [] : filtrado;
  };

  const onSuggestionsClearRequested = () => {
    setPresidentes([]);
  };

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.name}`;
  };

  const renderSuggestion = (suggestion) => (
    <div
      className="sugerencia"
      onClick={() => seleccionarPresidente(suggestion)}
    >
      {`${suggestion.name}`}
    </div>
  );

  const seleccionarPresidente = (presidente) => {
    setPresidenteSeleccionado(presidente);
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Título, actor, género",
    value,
    onChange,
  };

  const eventEnter = (e) => {
    if (e.key == "Enter") {
      var split = e.target.value.split("-");
      var presidente = {
        name: split[0].trim(),
      };
      seleccionarPresidente(presidente);
    }
  };

  function handleSearch(presidenteSeleccionado) {
    dispatch(searchPelicula_Actor(presidenteSeleccionado));
  }

  return (
    <div>
      <Autosuggest
        suggestions={presidentes}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={eventEnter}
      />
      <br />
      <button onClick={() => handleSearch(presidenteSeleccionado.name)}>
        Buscar
      </button>
    </div>
  );
}