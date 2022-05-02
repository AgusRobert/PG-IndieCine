import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx"
import SearchBar from "../SearchBar/SearchBar.jsx"
import Footer from "../Footer/Footer.jsx"
import Navbar from "../Navbar/Navbar.jsx";
import Header from '../Header/Header'
import { getMovies } from "../../redux/actions/index.js";

export default function Home (){

    const dispatch = useDispatch();

    const allMovies = useSelector (state => state.pelisfiltradas);

    useEffect(()=>{
        dispatch(getMovies());
    }, [dispatch])

    return (
        <div>
            <div>
            <Header/>
            </div>
                <div className="pelis">
                {
                    allMovies ? allMovies?.map(data => {
                        let nombresGen = [];

                        let generos = data.Genres
                        generos.forEach(a => {
                            nombresGen.push(a.name)
                        })

                        console.log(nombresGen)

                        let nombresCountry = [];

                        let country = data.Countries
                        country?.forEach(a => {
                            nombresCountry.push(a.name)
                        })
                        return (
                            <div key={data.id}>
                                <Link key={data.id} to={"/detail/" + data.id}>
                                <Card title={data.title}
                                poster={data.poster}
                                year={data.year}
                                country={nombresCountry}
                                Genres={"Géneros: " + nombresGen.join(", ")}
                                rating={"Rating: " + data.rating}
                                key={data.id} />
                                </Link>
                            </div> 
                        )
                    }) :
                    <img src="https://m.media-amazon.com/images/M/MV5BMDBjMmNkMDMtN2ZiYS00MDJiLTk5YWUtOTdhZjFmMjdmM2NhXkEyXkFqcGdeQXVyMjY4MzQzNDk@._V1_FMjpg_UX1000_.jpg" alt="not found" />
                }
                </div>
                <div>
                    <Footer/>
                </div>
        </div>
    )
}