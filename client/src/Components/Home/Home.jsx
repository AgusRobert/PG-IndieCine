import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx"
import Paginated from "../Paginated/Paginated.jsx"
import SearchBar from "../SearchBar/SearchBar.jsx"
import SearchRating from "../SearchRating/SearchRating.jsx"

export default function Home (){

    return (
        <div>
            <div>
            <h1>CINE INDEPENDIENTE</h1>
            </div>
                <div>
                <select>
                    <option value="asc">Orden alfabético  de A hasta Z</option>
                    <option value="desc">Orden alfabético  de Z hasta A</option>
                </select>
                <select>
                    <option value="peor">Rating del Peor al Mejor</option>
                    <option value="mejor">Rating del Mejor al Peor</option>
                </select>
                <select>
                    <option value="All">Todos los Géneros</option>
                    {/* {genres?.map(data => (
                        <option value={data.name} key={data.id}>{data.name}</option>
                    ))} */}
                </select>
                <select>
                    <option value="All">Otro Select</option>
                    <option value="created">Info</option>
                    <option value="api">Mas info</option>
                </select>
                    <SearchBar/>
                    <SearchRating/>
                </div>
                <div>
                      <Card />
                </div>
        </div>
    )
}