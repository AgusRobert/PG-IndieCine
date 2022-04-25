const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {User} = require('../../db');
const {check, validationResult} = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');

router.post('/register',[
    check('username').isLength({min: 3}),
    check('password').isLength({min: 3}),
    check('email').isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    let {username, password, email} = req.body;
    password = bcrypt.hashSync(password, 10);

    const user = await User.create({
        username : username,
        password : password,
        email : email,
    });
    res.json(user);
});

router.post('login', async (req, res) => {
    const user = await User.findOne({
        where: {
            email : req.body.email
        }
    });
    if (!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    res.json({success: createToken(user)});
});

const createToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(14, 'minutes').unix()
    };
    return jwt.encode(payload, 'secret');
}
module.exports = router;