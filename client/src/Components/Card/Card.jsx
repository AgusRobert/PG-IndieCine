import React from "react";
import style from "./Card.module.css"

export default function Card({name, image, genres, rating}){ //los parametros son los que quiero que aparezcan en la card
    return (
        <div className={style.container_videogame}>
            <h3 className={style.text}>{name}</h3>
            <img className={style.img_videogame} src={image} alt="img not found"/>
            <div className={style.text}>
            <h5>{genres}</h5>
            <h5>{rating}</h5>
            </div>
        </div>
    )
}