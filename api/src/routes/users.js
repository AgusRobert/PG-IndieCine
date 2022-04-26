const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {User, Film} = require('../../db');
const {check, validationResult} = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');


router.get('/', async (req, res) => {
    const users = await User.findAll({include: [{model: Film}]});
    res.json(users);
});

router.put('/', async (req, res) => {
    const user = await User.findByPk(req.body.username);
    if (user) {   
    await user.update(req.body);
      return  res.sendStatus(200).json({message: 'Usuario actualizado correctamente'});
    } else {
      return  res.sendStatus(404).json({message: 'Usuario no encontrado'});
    }
});

router.delete('/', async (req, res) => {
    const user = await User.findByPk(req.body.username);
    if (user) {
        const password = await bcrypt.compare(req.body.password, user.password);
        if (password) {
        await user.destroy();
       return res.sendStatus(200).json({message: 'Usuario eliminado correctamente'});
        } else {
            return res.sendStatus(401).json({message: 'Contraseña incorrecta'});
    } 
 } else {
        res.sendStatus(404).json({message: 'Usuario no encontrado'});
    }
});


router.post('/register',[
    check('username').isLength({min: 3}),
    check('password').isLength({min: 3}),
    check('email').isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

   req.body.password = bcrypt.hashSync(req.body.password, 10);
    const buscar = await User.findOne({
        include: [{model: Film}],
        where: {
            username: req.body.username
        }
    });
    if (buscar) {
        return res.status(422).json({errors: [{msg: 'El usuario ya existe'}]});
    } else {
    const user = await User.create(req.body);
   return res.json(user);
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        include: [{
            model: Film,
        }],
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
    res.json(user);
});

// const createToken = (user) => {
//     const payload = {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         iat: moment().unix(),
//         exp: moment().add(14, 'minutes').unix()
//     };
//     return jwt.encode(payload, 'secret');
// }
module.exports = router;