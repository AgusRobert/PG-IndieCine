import React from "react";

export default function Card({title, poster, genres, rating, year, country, duration}){ //los parametros son los que quiero que aparezcan en la card
    return (
  <div>
      <div className="cardgrid2">
        <img src={poster} alt="img not found" className="image"/>
        <h3 className="Title">{title}</h3>
        <div>
        <h5>{genres}</h5>
        <h5>{rating}</h5>
        <h5>{year}</h5>
        <h5>{country}</h5>
        <h5>{duration}</h5>
        </div>
      </div>
  </div>
    )
  }
  
