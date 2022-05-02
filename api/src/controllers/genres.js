"use strict";
const { Genre } = require("../db.js");

//POST genres
const postGenres = async (req, res, next) => {
  try {
    const { name } = req.body;
    const [genre, created] = await Genre.findOrCreate({
      where: { name: name },
    });
    if (created) {
      res.json({
        message: "Genre created",
        genre,
      });
    } else {
      res.json({
        message: "Genre already exists",
        genre,
      });
    }
  } catch (error) {
    next(error);
  }
};

//GET all genres
const getGenres = async (req, res, next) => {
  try {
    const allGenres = await Genre.findAll({
      order: [["name", "ASC"]],
    });

    res.status(200).json(allGenres);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGenres,
  postGenres,
};
