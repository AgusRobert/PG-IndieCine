'use strict';

const { Router } = require('express');
const router = Router();

const { getPlans, getPlan, getPlanByName, postPlans } = require('../controllers/plans');

//ruta para obtener todos los generos
router.get('/', getPlans);
router.get('/byId/:id', getPlan);
router.get('/byName/:name', getPlanByName);
router.post('/', postPlans);

module.exports = router;