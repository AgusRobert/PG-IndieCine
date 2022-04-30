const router = require('express').Router();


const {formImage, uploadImage, postImage, uploadVideo, 
    postVideo, uploadDocuments, postFrontDoc, postBackDoc,
} = require('../controllers/uploads');


// ----------------------------   RUTAS      --------------------------------------------

router.get('/', formImage);

router.post('/image', uploadImage, postImage);

router.post('/video', uploadVideo, postVideo);

router.post('/frontdoc', uploadDocuments, postFrontDoc);

router.post('/backdoc', uploadDocuments, postBackDoc);



module.exports = router;