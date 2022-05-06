"use strict";

const getAdmin = async (req, res, next) => {
  try {
      res.send('Ruta del DashBoard');
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getAdmin
};