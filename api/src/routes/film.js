const {Router} = require('express');
const router = Router();

const {getFilms, postFilms, updateFilm, getById, deleteFilm, deleteFilms} = require('../controllers/film')

router.get('/', getFilms)
router.get('/:id', getById)
router.post('/', postFilms)
router.put('/', updateFilm)
router.delete('/', deleteFilms)
router.delete('/:id', deleteFilm)

module.exports = router;
