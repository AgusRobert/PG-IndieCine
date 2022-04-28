const router = require('express').Router();

const {getAllComents,getComment, getComentsUser, getComentsFilm, postComent, deleteComent, modifyComent} = require('../controllers/comment');

router.get('/', getAllComents);

router.get('/:id', getComment)

router.get('/user/:id', getComentsUser);

router.get('/film/:id', getComentsFilm);

router.post('/', postComent);

router.delete('/del', deleteComent);

router.put('/modif', modifyComent);

module.exports = router;