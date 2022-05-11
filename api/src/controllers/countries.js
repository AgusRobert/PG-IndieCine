"use strict";
const { Country } = require("../db.js");

//POST countries
const postCountries = async (req, res, next) => {
  try {
    const { name } = req.body;
    const [country, created] = await Country.findOrCreate({
      where: { name },
    });
    if (created) {
      res.json({
        message: "Country created",
        country,
      });
    } else {
      res.json({
        message: "Country already exists",
        country,
      });
    }
  } catch (error) {
    next(error);
  }
};

//GET all countries
const getCountries = async (req, res, next) => {
  try {
    const allCountries = await Country.findAll({
      order: [["name", "ASC"]], //para que en el llamado del select aparezcan ordenados de A a Z, aunque ya estan guardados en la tabla en orden alfabético
    });
    console.log('allCountries back', allCountries)
    res.status(200).json(allCountries);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCountries,
  postCountries,
};
