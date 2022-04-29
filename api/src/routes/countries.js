'use strict';

//opcion 1
const { Router } = require('express');
const router = Router();

//opcion 2
//const router = require('express').Router();

const { getCountries, postCountries } = require('../controllers/countries');

//ruta para obtener todos los paises
router.get('/', getCountries);
router.post('/', postCountries);

module.exports = router;