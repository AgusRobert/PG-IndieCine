const { Film, Genre, Country } = require("../db.js");

exports.getFilms = async (req, res, next) => {
  try {
    const allFilms = await Film.findAll({
      include: [
        {
          model: Genre,
          through: {
            attributes: [],
          },
        },
        {
          model: Country,
        },
      ],
    });
    res.json(allFilms);
  } catch (err) {
    // res.send("No se pudo acceder a las películas");
    next(err);
  }
};
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const film = await Film.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Genre,
          through: {
            attributes: [],
          },
        },
        {
          model: Country,
        },
      ],
    });

    res.send(film);
  } catch (err) {
    next(err);
  }
};
exports.postFilms = async (req, res, next) => {
  try {
    const {
      title,
      genres,
      poster,
      synopsis,
      year,
      director,
      duration,
      mainActors,
      country,
      url,
      associateProducer,
      rating,
      UserId,
    } = req.body;
    console.log("form film:", req.body);
    const CountryFound = await Country.findOne({
      where: {
        name: country,
      },
    });
    console.log("CountryFound", CountryFound);

    const CountryId = CountryFound.dataValues.id;

    let filmCreated = await Film.create({
      title,
      poster,
      synopsis,
      year,
      director,
      duration,
      mainActors,
      url,
      associateProducer,
      rating,
      CountryId,
      status: "to be checked",
    });

    if (genres) {
      let genresStored = await Genre.findAll({
        where: {
          name: genres,
        },
      });
      filmCreated.addGenres(genresStored);
    }

    res.send(filmCreated);
  } catch (err) {
    next(err);
  }
};

exports.updateFilm = async (req, res, next) => {
  try {
    const {
      title,
      genres,
      poster,
      synopsis,
      year,
      director,
      duration,
      mainActors,
      country,
      url,
      associateProducer,
      rating,
      id,
    } = req.body;
    await Film.update(
      {
        title,
        genres,
        poster,
        synopsis,
        year,
        director,
        duration,
        mainActors,
        country,
        url,
        associateProducer,
        rating,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.send("La información del film se actualizó con éxito");
  } catch (err) {
    next(err);
  }
};
