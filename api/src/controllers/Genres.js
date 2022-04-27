'use strict';

const { Router } = require('express');
const express = require('express');
const router = Router();
const { Genre } = require('../models/Genre');

//router.use(express.json());

//POST genres
const postGenres = async (req, res, next) => {
    try {
        const { name } = req.body;
        const genre = await Genre.create({
            name
        });
        res.json({
            message: 'Genre created',
            genre
        });
    } catch (error) {
        next(error);
    }
};

//GET all genres
const getGenres = async (req, res, next) => {
    try{
        const allGenres = await Genre.findAll({
            attributes: ['name'],
            order: [['name', 'ASC']]
        });

        res.status(200).json(allGenres);

    } catch(error){
        next(error);
    }
};

module.exports = {
    getGenres,
    postGenres
}