const router = require('express').Router();

const {sendMail} = require('../controllers/mailer');

router.post('/', sendMail);

module.exports = router;