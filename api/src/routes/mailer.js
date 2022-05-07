const router = require('express').Router();

const {mailing} = require('../controllers/mailer');

router.post('/', mailing);

module.exports = router;