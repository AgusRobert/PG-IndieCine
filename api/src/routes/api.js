const router = require('express').Router();
const middlewares = require('./middlewares');

const apiFilmsRouter = require('./films');
const apiUsersRouter = require('./users');

router.use('/films', apiFilmsRouter);
router.use('/users', apiUsersRouter);

module.exports = router;
