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
const MenuItemStyle = styled(MenuItem)({
  marginLeft: "auto",
  color: "white",
  backgroundColor: "#b388ff",
});

const InputStyle = styled(InputBase)({
    backgroundColor: amber[50],
    borderRadius: 5,
    width:"250px",
    padding: 4
  });

const ButtonStyle = styled(Button)({
    color: "white",
    borderColor: deepPurple[500],
    backgroundColor: deepPurple[700],
    padding:8
  });

const LabelStyle = styled("label")({
//   color: "white",
    color: "black"
});

const SelectStyle = styled(TextField)({
  borderRadius: 2,
  width: 160,
  padding: 0,
});

const BoxStyle = styled(Box)({
    display: 'flex',   
    justifyContent: 'space-evenly',
    flexDirection: 'column'
})

export function FilmForm() {
    let dispatch = useDispatch();
    // let countries = useSelector((state) => state.countries);
    const countries = [
        { id: '01', name: 'Argentina' },
        { id: '02', name: 'Bolivia' },
        { id: '03', name: 'Chile' },
        { id: '04', name: 'Colombia' },
        { id: '05', name: 'Costa Rica' },
        { id: '06', name: 'Cuba' },
        { id: '07', name: 'Ecuador' },
        { id: '08', name: 'El Salvador' },
        { id: '09', name: 'Guatemala' },
        { id: '10', name: 'Honduras' },
        { id: '11', name: 'México' },
        { id: '12', name: 'Nicaragua' },
        { id: '13', name: 'Panamá' },
        { id: '14', name: 'Paraguay' },
        { id: '15', name: 'Perú' },
        { id: '16', name: 'Puerto Rico' },
        { id: '17', name: 'República Dominicana' },
        { id: '18', name: 'Uruguay' },
        { id: '19', name: 'Venezuela' }
    ];
    let genres = useSelector((state) => state.genres);

    const [submit, setSubmit] = useState(false);
    const [errores, setErrores] = useState({});
    const [actor, setActor] = useState({
        actorname: ""
    })
    const [movieForm, setmovieForm] = useState({
        title: "",
        poster: "",
        synopsis: "",
        year: "",
        duration: "",
        director: "",
        genres: [],
        mainActors: [],
        actor: "",
        country: "",
        associateProducer: "",
        url: "",
        poster: "",
        rating: "",
    });

    useEffect(() => {
        dispatch(getGenres())
        console.log("GENRES 1", genres)
        // dispatch(getCountries())
        // console.log("PAISES 1", countries)
    }, [dispatch]
    );

    // useEffect(() => {
    //     if (Object.keys(errores).length === 0 && setSubmit) {
    //     }
    // }, [errores]);

    const validate = (values) => {
        const errores = {};
        const RegExAlfa = /^[A-Za-z]+$/;
        const RegExNum = /^[0-9]*$/;
        const RegExInt = /^[-+]?[1-9]\d*$/;
        //ACA VAN LAS VALIDACIONES POR CADA CAMPO
        return errores;
    };

    // Función de modificación de los inputs con contenido string
    function handleChange(e) {
        setmovieForm({
            ...movieForm,
            [e.target.name]: e.target.value,
        });

        console.log(movieForm);
    }

    // Función de modificación de los inputs que van a ser arrays


    function handleActor(e) {
        setActor({
            [e.target.name]: e.target.value
        })
        console.log(actor.actorname)
    }

    function handleElenco(e) {
        e.preventDefault()
        if(movieForm.mainActors.includes(actor.actorname)){
            console.log('movieForm mainactors', movieForm.mainActors)
            alert("El actor ya está en el elenco")
        } else {
            movieForm.mainActors.push(actor.actorname)
            console.log("movieForm mainactors", movieForm.mainActors)
            setActor({
                actorname: ""
            })
        }
    }

    //
    function onSelectChange(e) {
        setmovieForm({
            ...movieForm,
            duration: e.target.value,
        });
    }

    function handleGenres(e){
        if(!movieForm.genres.includes(e.target.value)){
            setmovieForm({
                ...movieForm,
                [e.target.name]: [...movieForm.genres ,e.target.value],
            });
        } else{
            return
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        setErrores(validate(movieForm));
        setSubmit(true);
        if (Object.keys(errores).length === 0 && setSubmit) {
            dispatch(postMovie(movieForm));
        }
    }


    return (
        <Box sx={{
            backgroundColor: grey[100],
        }}>
            <h1>Subí tu proyecto a la red!</h1>
            <form onSubmit={()=> ("Tu película fue subida")}>
                <BoxStyle>
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
                            <option key={pais.id} value={pais.id} onClick={handleChange}>
                                {pais.name}
                            </option>
                        ))}
                    </select> */}
                    
                        <LabelStyle>Géneros</LabelStyle>
                        <SelectStyle
                                name="genres"  
                                onChange={(e) =>handleGenres(e)}
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
                            <MenuItemStyle hidden={true}>Géneros</MenuItemStyle>
                            {genres?.map((e) => (
                                <MenuItemStyle key={e.id} value={e.name}>{e.name}</MenuItemStyle>
                            ))}
                        </SelectStyle>
                        {errores.genres && (
                            <p class="errores">
                                {errores.genres}
                            </p>
                        )}
                  
                        <LabelStyle>País</LabelStyle>
                        <SelectStyle
                            name="country" 
                            onChange={(e) => handleChange(e)} 
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
                        {errores.genres && (
                            <p class="errores">
                                {errores.genres}
                            </p>
                        )}
                   
                    <LabelStyle>Fecha de Estreno</LabelStyle>
                    <InputStyle
                        type="date"
                        value={movieForm.year}
                        name="year"
                        placeholder="Año de Lanzamiento"
                        onChange={(e) => handleChange(e)}
                        required
                    />
              
                    <LabelStyle>Duración</LabelStyle>
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
             
               
                    <LabelStyle>Dirección</LabelStyle>
                    <InputStyle
                        type="text"
                        value={movieForm.director}
                        name="director"
                        placeholder="Dirección"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errores.director && (
                        <p class="errores">
                            {errores.director}
                        </p>
                    )}
                

               
                    <LabelStyle>Elenco</LabelStyle>
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
          }} type="button" name="elenco" onClick={(e) => handleElenco(e)}>
                        Añadir
                    </ButtonStyle>
                
               
                    <LabelStyle>Productora</LabelStyle>
                    <InputStyle
                        type="text"
                        value={movieForm.associateProducer}
                        name="associateProducer"
                        placeholder="Productora"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errores.associateProducer && (
                        <p class="errores">
                            {errores.associateProducer}
                        </p>
                    )}
               
                    <LabelStyle>Película</LabelStyle>
                    <InputStyle
                        type="file"
                        accept="video/mp4"
                        value={movieForm.url}
                        name="url"
                        placeholder="sube la película"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errores.url && (
                        <p class="errores">
                            {errores.url}
                        </p>
                    )}
                
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
          type="submit">Subir proyecto</ButtonStyle>
            </BoxStyle>
            </form>
        </Box>
    );
}

