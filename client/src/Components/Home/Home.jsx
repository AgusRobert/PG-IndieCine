import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx"
import SearchBar from "../SearchBar/SearchBar.jsx"
import SearchRating from "../SearchRating/SearchRating.jsx"
import Footer from "../Footer/Footer.jsx"
import Navbar from "../Navbar/Navbar.jsx";

export default function Home (){

    return (
        <div>
            <div>
            <h1>CINE INDEPENDIENTE</h1>
            </div>
                <div>
                    <Navbar/>
                    <SearchBar/>
                    <SearchRating/>
                </div>
                <div>
                      <Card />
                </div>
                <div>
                    <Footer/>
                </div>
        </div>
    )
}