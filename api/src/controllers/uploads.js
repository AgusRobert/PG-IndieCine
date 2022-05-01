const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadService = require("../service/upload");

// -------------- ---------------- MULTER PARA VIDEOS ------------------------------

exports.uploadVideo = multer({
    dest: path.join(__dirname, '../public/videos'),
     limits: {fileSize: 4000000000},
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
    limits: {fileSize: 15000000},
    fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if(mimetype && extname){return cb(null, true);}
    cb("Error: Archivo no válido");
}
}).single('image');

// ------------------------- MULTER PARA DOCUMENTS ------------------------------

exports.uploadDocuments = multer({
    dest:path.join(__dirname, '../public/documents'), 
    limits: {fileSize: 10000000},
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
  const { path , mimetype } = req.file;
  const newName = uploadService.rename(path,"","cover",mimetype);
  fs.renameSync(path, newName);
  res.send(newName);
};

exports.postVideo = async (req, res) => {
  const { path , mimetype } = req.file;
  const newName = uploadService.rename(path,"","video",mimetype);
  fs.renameSync(path, newName);
  res.send(newName);
};

//requiere un campo userId donde vendra el Id del usuario
exports.postFrontDoc = async (req, res) => {
  const { userId } = req.body;
  const { path , mimetype } = req.file;
  const newName = uploadService.rename(path,userId,"frontDoc",mimetype);
  console.log("tamanio: ",req.file);
  fs.renameSync(path, newName);
  res.send(newName);
};

//requiere un campo userId donde vendra el Id del usuario
exports.postBackDoc = async (req, res) => {
  const { userId } = req.body;
  const { path , mimetype } = req.file;
  const newName = uploadService.rename(path,userId,"backDoc",mimetype);
  fs.renameSync(path, newName);
  res.send(newName);
};
