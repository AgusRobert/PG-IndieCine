const jwt = require('jwt-simple');
const moment = require('moment');


checkToken = (req, res, next) => {
   if(!req.headers['user-token']) {
       return res.status(401).send({message: 'No token provided'});
   }

   const userToken = req.headers['user-token'];
   let payload = null;
   try {
       payload = jwt.decode(userToken, 'secret');
   } catch (err) {
         return res.status(401).send({message: 'Invalid token'});
   }
   if(payload.exp <= moment().unix()) {
         return res.status(401).send({message: 'Token has expired'});
    }
    req.user = payload.user; // ver esta linea

   next();
}

module.exports ={checkToken: checkToken};
