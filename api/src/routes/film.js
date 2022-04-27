const {Router} = require('express');
const router = Router();

const {getFilms} = require('../controllers/film')

router.get('/', getFilms)

module.exports = router;
