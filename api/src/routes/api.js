const router = require('express').Router();
const middlewares = require('./middlewares');

const apiFilmsRouter = require('./api/films');
const apiUsersRouter = require('./api/users');

router.use('/films', middlewares.checkToken, apiFilmsRouter);
router.use('/users', apiUsersRouter);

module.exports = router;