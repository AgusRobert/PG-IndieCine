const { Film, Genre, Country } = require("../db.js");
const userService = require("../service/user");

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
      synopsis,
      year,
      duration,
      mainActors,
      url,
      director,
      associateProducer,
      genres,
      country,
      film,
      port,
      email,
    } = req.body;
    const CountryFound = await Country.findOne({
      where: {
        id: country,
      },
    });
    const CountryId = CountryFound.dataValues.id;
    const user = await userService.findByEmail(email);
    let filmCreated = await Film.create({
      title,
      poster: port,
      synopsis,
      year: Number(year),
      director,
      duration,
      mainActors,
      url: film ? film : url,
      associateProducer,
      rating: 5,
      CountryId,
      status: "to be checked",
      UserId: user.id,
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
