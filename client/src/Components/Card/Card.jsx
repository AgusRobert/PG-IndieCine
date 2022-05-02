import React from "react";

export default function Card({title, poster, Genres, rating, year, country, duration}){

  return (
<div>
    <div>
    <h3>{title}</h3>
          <img src={poster} alt="img not found"/>
          <div>
          <h5>{Genres}</h5>
          <h5>{rating}</h5>
          <h5>{year}</h5>
          <h5>{country}</h5>
          <h5>{duration}</h5>
          </div>
    </div>
</div>
  )
}