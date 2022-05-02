import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getCountries } from "../../redux/actions";
import { postMovie } from "../../redux/actions/index";


export function FilmForm() {
    let dispatch = useDispatch();
    let countries = useSelector((state) => state.countries);
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
        película: "",
        poster: "",
    });

    useEffect(() => {
        dispatch(getGenres())
        console.log("GENRES 1", genres)
        dispatch(getCountries())
        console.log("PAISES 1", countries)
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
        movieForm.mainActors.push(actor.actorname)
        console.log("movieForm mainactors", movieForm.mainActors)
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
        <div>
            <form >
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
                        type="file"
                        accept="image/jpg image/png image/jpeg"
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
                    {/* <select className={s.select} name="select" id="paises"  >
                        <option value="">Choose a Country</option>
                        {paises.map((pais) => (
                            <option key={pais.id} value={pais.id} onClick={handleChange}>
                                {pais.name}
                            </option>
                        ))}
                    </select> */}
                    <div className="content-select">
                        <label>Géneros</label>
                        <select name="genres"  onChange={(e) =>handleGenres(e)}>
                            <option hidden={true}>Géneros</option>
                            {genres?.map((e) => (
                                <option key={e.id} value={e.name}>{e.name}</option>
                            ))}
                        </select>
                        {errores.genres && (
                            <p class="errores">
                                {errores.genres}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <div className="content-select">
                        <label>País</label>
                        <select name="country" onChange={(e) => handleChange(e)} >
                            <option hidden={true}>Países</option>
                            {countries?.map((e) => (
                                <option value={e.id}>{e.name}</option>
                            ))}
                        </select>
                        {errores.genres && (
                            <p class="errores">
                                {errores.genres}
                            </p>
                        )}
                    </div>
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
                        <p class="errores">
                            {errores.director}
                        </p>
                    )}
                </div>

                <div>
                    <label>Elenco</label>
                    <input
                        type="text"
                        value={actor.actorname}
                        placeholder="Actores"
                        name="actorname"
                        onChange={(e) => handleActor(e)}
                        required
                    />
                    <button type="button" name="elenco" onClick={(e) => handleElenco(e)}>
                        Añadir
                    </button>
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
                        <p class="errores">
                            {errores.associateProducer}
                        </p>
                    )}
                </div>
                <div>
                    <label>Película</label>
                    <input
                        type="file"
                        accept="video/mp4"
                        value={movieForm.url}
                        name="película"
                        placeholder="sube la película"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errores.url && (
                        <p class="errores">
                            {errores.url}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
