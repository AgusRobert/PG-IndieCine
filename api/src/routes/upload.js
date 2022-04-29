const router = require('express').Router();


const {formImage, uploadImage, postImage, uploadVideo, 
    postVideo, uploadFrontDoc, postFrontDoc, uploadBackDoc, postBackDoc,
} = require('../controllers/uploads');


// ----------------------------   RUTAS      --------------------------------------------

router.get('/', formImage);

router.post('/image', uploadImage , postImage);

router.post('/video', uploadVideo , postVideo);

router.post('/frontdoc', uploadFrontDoc, postFrontDoc);

router.post('/backdoc', uploadBackDoc, postBackDoc);



module.exports = router;