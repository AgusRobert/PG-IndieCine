import Autosuggest from "react-autosuggest"; //instalarlaaa
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchPelicula_Actor,
  getMovies,
  getGenres,
  getCountries,
  getUsers,
} from "../../redux/actions/index";
import { useEffect } from "react";
import "./AutoSearch.css"
import { Button, TextField } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { styled, Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";

const MenuItemStyle = styled(MenuItem)({
  marginLeft: "auto",
  color: "black",
  backgroundColor: "#b388ff",
});

const SelectStyle = styled(TextField)({
  borderRadius: 2,
  width: 160,
  padding: 0,
});

const ButtonStyle = styled(Button)({
  color: "black",
  borderColor: deepPurple[500],
  backgroundColor: deepPurple[700],
  padding: 8,
});

export default function AutoSearch(/* genres, allMovies, countries */ ) {
  let key = 1;
  const [value, setValue] = useState("");
  const [presidenteSeleccionado, setPresidenteSeleccionado] = useState({});

  const genres = useSelector((state) => state.genres);
  const allMovies = useSelector((state) => state.peliculas);
  const countries = useSelector((state) => state.countries);
  const users = useSelector((state) => state.users);


  genres?.forEach(g => {
    return delete g.id;
  });
  countries?.forEach(g => {
    return delete g.id;
  });

  let nombres = allMovies?.map(p => {
    return { name: p.title };
  });

  let usuarios = users?.map((u) => {
    return { name: u.username};
  });

  let dires = allMovies?.map((p) => {
    return { name: p.director };
  });

  let elenco = [];

  let actores = allMovies?.map(p => {
    p.mainActors?.map(a => {
      elenco.push(a);
    });
  });

  let elenco2 = elenco?.map(p => {
    return { name: p };
  });

  let data = genres?.concat(nombres, dires, elenco2, countries, usuarios);

  const [presidentes, setPresidentes] = useState(data);
  /* console.log("SIRVEE", data); */

  let dispatch = useDispatch();

  useEffect(() => {
    !allMovies?.length && dispatch(getMovies());

    !genres?.length && dispatch(getGenres());

    !countries?.length && dispatch(getCountries());

    !users?.length && dispatch(getUsers())
  }, [allMovies?.length, genres?.length, dispatch]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setPresidentes(filtrarPresidentes(value));
  };

  const filtrarPresidentes = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    var filtrado = data.filter(presidente => {
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

  const getSuggestionValue = suggestion => {
    return `${suggestion.name}`;
  };

  const renderSuggestion = suggestion => (
    <div
     onClick={() => seleccionarPresidente(suggestion)}
    >
     

<Box>
       
       <MenuItemStyle key={key++} value={`${suggestion.name}`}>
            {`${suggestion.name}`}
          </MenuItemStyle>
    </Box>
    </div>
  );

  const seleccionarPresidente = presidente => {
    setPresidenteSeleccionado(presidente);
  };

  const [search, setSearch] = useState('')

  const onChange = (e, { newValue }) => {
    setValue(newValue);
    setSearch(e.target.value)
  };

  const inputProps = {
    placeholder: "Título, actor, género",
    value,
    onChange,
  };

  const eventEnter = e => {
    if (e.key == "Enter") {
      var split = e.target.value.split("-");
      var presidente = {
        name: split[0].trim(),
      };
      seleccionarPresidente(presidente);
    }
  };

  function handleSearch(presidenteSeleccionado) {
   /* console.log("QUE MANDA", presidenteSeleccionado, search) */
   if (presidenteSeleccionado !==undefined) {dispatch(searchPelicula_Actor(presidenteSeleccionado.toString())); setPresidenteSeleccionado({});}
   else {dispatch(searchPelicula_Actor(search));setSearch("");};
    setSearch("");
    setPresidenteSeleccionado({})


  }

  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <Autosuggest
        suggestions={presidentes}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={eventEnter}
      />
      <ButtonStyle 
        sx={{
          color: "white",
          ":hover": {
            bgcolor: "#ffc107",
            color: "black",
            borderBlockColor: deepPurple[200],
            borderInlineStartColor: deepPurple[900],
            borderInlineEndColor: deepPurple[900],
          },
        }}
        onClick={() => handleSearch(presidenteSeleccionado.name)}
      >
        Buscar
      </ButtonStyle>
    </div>
  );
}
