import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx"
import SearchBar from "../SearchBar/SearchBar.jsx"
import Footer from "../Footer/Footer.jsx"
import Navbar from "../Navbar/Navbar.jsx";
import { getMovies } from "../../redux/actions/index.js";

/* import Typography from '@mui/material/Typography' */

export default function Home (){

    const dispatch = useDispatch();

    const allMovies = useSelector (state => state.pelisfiltradas);

    useEffect(()=>{
        dispatch(getMovies());
    }, [dispatch])

    return (
        <div>
            <div>
            <h1>CINE INDEPENDIENTE</h1>
            </div>
                <div>
                    <Navbar/>
                    <SearchBar/>
                </div>
                <div class="pelis">
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
                                key={data.id} />
                            </div> 
                        )
                    }) :
                    <img /* src="https://i.pinimg.com/originals/3d/80/64/3d8064758e54ec662e076b6ca54aa90e.gif" */ alt="not found" />
                }
                </div>
                <div>
                    <Footer/>
                </div>
        </div>
    )
}