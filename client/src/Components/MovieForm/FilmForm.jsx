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
    width: "250px",
    padding: 4
});

const ButtonStyle = styled(Button)({
    color: "white",
    borderColor: deepPurple[500],
    backgroundColor: deepPurple[700],
    padding: 8
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

    // const [submit, setSubmit] = useState(false);
    const [errores, setErrores] = useState({});
    const [actor, setActor] = useState({
        actorname: ""
    })
    const [input, setInput] = useState({
        title: "",
        poster: "",
        synopsis: "",
        genres: [],
        country: "",
        year: "",
        duration: "",
        director: "",
        mainActors: [],
        actor: "",
        associateProducer: "",
        url: "",
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

    const validate = (state) => {
        const errors = {};
        const RegExAlfa = /^[A-Za-z]+$/;
        const RegExNum = /^[0-9]*$/;
        const RegExInt = /^[-+]?[1-9]\d*$/;
        //ACA VAN LAS VALIDACIONES POR CADA CAMPO
        
        // title
        if(!state.title){
            errors.title = "El campo titulo es obligatorio";
        } else if(!RegExAlfa.test(state.title)){
            errors.title = "El campo titulo debe contener solo letras";
        }

        // poster
        if(!state.poster){
            errors.poster = "El campo poster es obligatorio";
        }

        // synopsis
        if(!state.synopsis){
            errors.synopsis = "El campo sinopsis es obligatorio";
        }

        // genre
        if(!state.genres){
            errors.genres = "El campo genero es obligatorio";
        }

        // country
        if(!state.country){
            errors.country = "El campo país es obligatorio";
        }

        // year
        if(!state.year){
            errors.year = "El campo año es obligatorio";
        } 

        // duration
        if(!state.duration){
            errors.duration = "El campo duración es obligatorio";
        }

        // director
        if(!state.director){
            errors.director = "El campo director es obligatorio";
        }

        // mainActors
        if(!state.mainActors.length){
            errors.mainActors = "Elenco debe tener al menos un actor";
        }

        // url
        if(!state.url){
            errors.url = "El campo url es obligatorio";
        }

        return errors;
    };

    // Función de modificación de los inputs con contenido string
    function handleOnChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        console.log(input);
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
        if (input.mainActors.includes(actor.actorname)) {
            console.log('input mainactors', input.mainActors)
            alert("El actor ya está en el elenco")
        } else {
            input.mainActors.push(actor.actorname)
            console.log("input mainactors", input.mainActors)
            setActor({
                actorname: ""
            })
        }
    }

    //
    function onSelectChange(e) {
        setInput({
            ...input,
            duration: e.target.value,
        });
    }

    function handleGenres(e) {
        if (!input.genres.includes(e.target.value)) {
            setInput({
                ...input,
                [e.target.name]: [...input.genres, e.target.value],
            });
        } else {
            return
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        setErrores(validate(input));
        // setSubmit(true);
        if (!Object.keys(errores).length /*&& setSubmit*/) {
            dispatch(postMovie(input));
        }
    }


    return (
        <Box sx={{
            backgroundColor: grey[100],
        }}>
            <h1>Subí tu proyecto a la red!</h1>
            <form onSubmit={() => ("Tu película fue subida")}>
                <BoxStyle>

                    {/* Título */}
                    <LabelStyle>Título *</LabelStyle>
                    <InputStyle
                        type="text"
                        value={input.title}
                        placeholder="Título de la Película"
                        name="title"
                        onChange={handleOnChange}
                        required
                    />
                    {errores.title && <p class="errores">{errores.title}</p>}

                    {/* Póster */}
                    <LabelStyle>Póster *</LabelStyle>
                    <InputStyle
                        type="file"
                        accept="image/jpg image/png image/jpeg"
                        value={input.poster}
                        name="poster"
                        placeholder="URL de póster"
                        onChange={handleOnChange}
                        required
                    />
                    {errores.poster && <p class="errores">{errores.poster}</p>}

                    {/* Sinopsis */}
                    <LabelStyle>Sinopsis *</LabelStyle>
                    <InputStyle
                        type="text"
                        value={input.synopsis}
                        placeholder="Sinopsis"
                        name="synopsis"
                        onChange={handleOnChange}
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
                            <MenuItemStyle key={e.id} value={e.name}>{e.name}</MenuItemStyle>
                        ))}
                    </SelectStyle>
                    {errores.genres && (
                        <p class="errores">
                            {errores.genres}
                        </p>
                    )}

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
                    {errores.genres && (
                        <p class="errores">
                            {errores.genres}
                        </p>
                    )}

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
                    {errores.director && (
                        <p class="errores">
                            {errores.director}
                        </p>
                    )}


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
                        }} type="button" name="elenco" onClick={(e) => handleElenco(e)}>
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
                        <p class="errores">
                            {errores.associateProducer}
                        </p>
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

