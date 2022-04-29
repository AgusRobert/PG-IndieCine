
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// -------------- ---------------- MULTER PARA VIDEOS ------------------------------
exports.uploadVideo = multer({
    dest: path.join(__dirname, '../public/videos'),
     limits: {fileSize: 40000000000},
    fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mov/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if(mimetype && extname){return cb(null, true);}
    cb("Error: Archivo no válido");
}
}).single('video');

// ------------------------- MULTER PARA PORTADAS ------------------------------

exports.uploadImage = multer({
    dest: path.join(__dirname, '../public/images'),
    limits: {fileSize: 10000000},
    fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if(mimetype && extname){return cb(null, true);}
    cb("Error: Archivo no válido");
}
}).single('image');

// ------------------------- MULTER PARA FRONT DOCUMENT ------------------------------

exports.uploadFrontDoc= multer({
    dest:path.join(__dirname, '../public/documents'), 
    limits: {fileSize: 4000000},
    fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if(mimetype && extname){return cb(null, true);}
    cb("Error: Archivo no válido");
}
}).single('document');

// ------------------------- MULTER PARA BACK DOCUMENT ------------------------------

exports.uploadBackDoc= multer({
    dest:path.join(__dirname, '../public/documents'), 
    limits: {fileSize: 4000000},
    fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if(mimetype && extname){return cb(null, true);}
    cb("Error: Archivo no válido");
}
}).single('document');

// ------------------------- LOGICA DE SUBIDA DE ARCHIVOS ------------------------------

exports.formImage = async (req, res) => {
  res.render("index");
};

exports.postImage = async (req, res) => {
   
   fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
  res.send(req.file.path + '.' + req.file.mimetype.split('/')[1]);
};

exports.postVideo = async (req, res) => {
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
    res.send(req.file.path + '.' + req.file.mimetype.split('/')[1]);
};

exports.postFrontDoc = async (req, res) => {
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
    res.send(req.file.path + '.' + req.file.mimetype.split('/')[1]);
};

exports.postBackDoc = async (req, res) => {
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
    res.send(req.file.path + '.' + req.file.mimetype.split('/')[1]);
};
