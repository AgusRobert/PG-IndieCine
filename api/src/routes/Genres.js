'use strict';

const { Router } = require('express');
const router = Router();

const { getGenres, postGenres } = require('../controllers/Genres');

//ruta para obtener todos los generos
router.get('/', getGenres);
router.post('/', postGenres);

module.exports = router;