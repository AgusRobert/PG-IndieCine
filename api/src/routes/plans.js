'use strict';

const { Router } = require('express');
const router = Router();

const { getPlans, getPlan, postPlans } = require('../controllers/plans');

//ruta para obtener todos los generos
router.get('/', getPlans);
router.get('/:id', getPlan);
router.post('/', postPlans);

module.exports = router;