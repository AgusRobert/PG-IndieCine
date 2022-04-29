const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const {formImage, postImage} = require('../controllers/uploads');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/images')
});
const upload = multer({storage,
limits: {fileSize: 1000000},
fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if(mimetype && extname){
        return cb(null, true);
    }
    cb("Error: Archivo no válido");
}
}).single('image');

router.get('/', formImage);
router.post('/image', upload , postImage);

module.exports = router;