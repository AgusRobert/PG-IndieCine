const router = require('express').Router();

const { getFilms } = require('../controllers/film');
const {allUsers, putUser, deleteUser, registerUser, loginUser, getUser, getFilmsById,addFav,delFav, getFavs, getUserByEmail} = require('../controllers/user')

router.get('/', allUsers);

router.get('/byemail/:email', getUserByEmail);

router.get('/byemail/:email', getUserByEmail);

router.get('/:id', getUser);

router.put('/modif', putUser);

router.delete('/del', deleteUser);

router.post('/register', registerUser );

router.post('/login', loginUser);

// trae los films que subió el usuario
router.get('/getFilmsBy/:id', getFilmsById);

router.post('/addFav', addFav)

router.delete('/delFav', delFav)

// trae los favoritos de un usuario
router.get('/getFavs/:id', getFavs)

module.exports = router;