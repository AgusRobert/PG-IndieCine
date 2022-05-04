const router = require('express').Router();

const {allUsers, putUser, deleteUser, registerUser, loginUser, getUser, getfavById,addFav} = require('../controllers/user');

router.get('/', allUsers);

router.get('/:id', getUser);

router.put('/modif', putUser);

router.delete('/del', deleteUser);

router.post('/register', registerUser );

router.post('/login', loginUser);

router.get('/fav/:id', getfavById);

router.post('/addFav', addFav)
module.exports = router;