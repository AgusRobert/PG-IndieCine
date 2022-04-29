const router = require('express').Router();

const {allUsers, putUser, deleteUser, registerUser, loginUser, getUser} = require('../controllers/user');

router.get('/', allUsers);

router.get('/:id', getUser);

router.put('/modif', putUser);

router.delete('/del', deleteUser);

router.post('/register', registerUser );

router.post('/login', loginUser);


module.exports = router;