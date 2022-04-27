const {Router} = require('express');
const router = Router();

const {getFilms, postFilms, updateFilm} = require('../controllers/film')

router.get('/', getFilms)
router.post('/', postFilms)
router.put('/', updateFilm)

module.exports = router;
