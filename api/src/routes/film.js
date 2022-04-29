const {Router} = require('express');
const router = Router();

const {getFilms, postFilms, updateFilm, getById} = require('../controllers/film')

router.get('/', getFilms)
router.get('/:id', getById)
router.post('/', postFilms)
router.put('/', updateFilm)

module.exports = router;
