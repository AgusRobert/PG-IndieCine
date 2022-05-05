const router = require('express').Router();

const {allUsers, putUser, deleteUser, registerUser, loginUser, getUser, getUserByEmail} = require('../controllers/user');

router.get('/', allUsers);

router.get('/byemail', getUserByEmail);

router.get('/:id', getUser);

router.put('/modif', putUser);

router.delete('/del', deleteUser);

router.post('/register', registerUser );

router.post('/login', loginUser);


module.exports = router;