'use strict';

const { Router } = require('express');
const express = require('express');
const router = Router();
const { Genres } = require('../models/Genres');

//router.use(express.json());

//POST genres
const postGenres = async (req, res, next) => {
    try {
        const { nameGenre } = req.body;
        const genre = await Genres.create({
            nameGenre
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
        const allGenres = await Genres.findAll({
            attributes: ['nameGenre'],
            order: [['nameGenre', 'ASC']]
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