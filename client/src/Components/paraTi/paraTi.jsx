import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "material-ui";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites, getMovies, getProfileInfo } from "../../redux/actions";
import { useState } from "react";
import Cartas from "../Cartas/Cartas";
import { Grid } from "@material-ui/core";

export default function ParaTi({ userId }) {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const allMovies = useSelector((state) => state.peliculas);
  // const profileInfo = useSelector(state => state.profileInfo)

  const [loaded, setLoaded] = useState(false);

  console.log("USEEEER", userId);
  // dispatch(getFavorites(userId))
  useEffect(() => {
    if (userId) {
      dispatch(getFavorites(userId));
    }
  }, []);

  console.log("allMovies", allMovies);

  let genres = favorites.map((p) => p.Genres.map((g) => g.name)).flat();
  let genres2 = new Set(genres);
  let genres3 = [...genres2];
  let recomendados = [];

  genres3.forEach((g) =>
    allMovies?.forEach((p) => {
      if (p.Genres.includes(g)) recomendados.push(g);
    })
  );
  let recomendados2 = genres3
    .map((g) =>
      allMovies.filter((m) => m.Genres.map((ge) => ge.name.includes(g)))
    )
    .flat();
  let recomendados3 = new Set(recomendados2);
  let recomendados4 = [...recomendados3];

  let recomendadosClean = [];

  for (var i = 0; i < recomendados4.length; i++) {
    var igual = false;
    for (var j = 0; (j < favorites.length) & !igual; j++) {
      if (recomendados4[i]["id"] == favorites[j]["id"]) igual = true;
    }
    if (!igual) recomendadosClean.push(recomendados4[i]);
  }

  console.log("GENEROOOOS", recomendadosClean);

  return (
    <div>
      {recomendadosClean?.map((data) => {

        let nombresGen = [];
        let generos = data.Genres;
        generos.forEach((a) => {
          nombresGen.push(a.name);
        });

        return (
          <Grid item m={3}>
            <Cartas
              title={data.title}
              poster={data.poster}
              year={data.year}
              country={data.Country.name}
              genres={"Géneros: " + nombresGen.join(", ")}
              rating={data.rating}
              key={data.id}
              duration={data.duration}
              synopsis={data.synopsis}
              director={data.director}
              id={data.id}
            />
          </Grid>
        );
      })}
    </div>
  );
}
