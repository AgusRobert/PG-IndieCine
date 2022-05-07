'use strict';

//opcion 1
const { Router } = require('express');
const router = Router();

const { getAdmin } = require('../controllers/admin');

router.get('/', getAdmin);

module.exports = router;