import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer.jsx"
import View from "../Reproductor/videoplayer.js";
import { renderMovieDetails } from "../../redux/actions/index";
import logo from "./LOGO.png";
import "./style.css";

import Comments from "../Comments/Comments";

export default function MovieDetail() {

  let dispatch = useDispatch();

  let { id } = useParams();

  const [load, setLoad] = useState(false)

  useEffect(() => {
    dispatch(renderMovieDetails(id));
    setLoad(true)
  }, []);

  const peli = useSelector((state) => state.detalle);

  let elenco = peli ? peli.mainActors : [];

  let key = 0;

  if (peli) {
    return (
      <div>
        <div className="logoIndex">
          <Link to={'/'}><img src={logo}  alt="img not found"/></Link>
        </div>
        <>
          <div>
            <div className="detalles">
              <h2>{peli.title}</h2>
              <img src={peli.poster} alt="Poster" className="imgPoster" />
            </div>
            <div className="detalles2">
              <h2>Rating: {peli.rating}</h2>
              <h3>Sinopsis:</h3>
              <p>{peli.synopsis}</p>
              <h3>Director:</h3>
              <p>{peli.director}</p>
              <h3>Año</h3>
              <p>{peli.year}</p>
              <h3>Elenco principal:</h3>
              {elenco?.map((e, i) => {
                return (
                  <p key={key++}>{e}</p>
                );
              })}
              <h2>Genero: {peli.Genres.map(a => a.name).join(", ")}</h2>
              <h2>Pais de origen: {peli.Country?.name}</h2>
              <h3>Productor Asociado</h3>
              <p>{peli.associateProducer}</p>
            </div>
          </div>

          <div>
            <View
              ubicacion={peli.url}
            />
          </div>
          <div>
          <Comments
        currentUserId="1"
        id={peli.id}
      />
          </div>
          <div>
            <Footer />
          </div>
        </>
      </div>
    );
  }

}
