import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx"
import Footer from "../Footer/Footer.jsx"
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
                        return (
                            <div key={data.id}>
                                <Card title={data.title}
                                poster={data.poster}
                                year={data.year}
                                country={data.country}
                                genres={"Géneros: " + data.genres?.join(", ")}
                                rating={"Rating: " + data.rating}
                                duration={"Duración: " + data.duration}
                                key={data.id} />
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