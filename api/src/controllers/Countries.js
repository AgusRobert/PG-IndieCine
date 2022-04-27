'use strict';

//modulos bases para el controlador de Countries (solo necesitamos el llamado de los paises a la db 'get')

const { Router } = require('express');
const express = require('express');
const router = Router();
const { Countries } = require('../models/Countries');

//router.use(express.json());

//POST countries
const postCountries = async (req, res, next) => {
    try {
        const { nameCountry } = req.body;
        const country = await Countries.create({
            nameCountry
        });
        res.json({
            message: 'Country created',
            country
        });
    } catch (error) {
        next(error);
    }
};

//GET all countries
const getCountries = async (req, res, next) => {
    try{
        const allCountries = await Countries.findAll({
            attributes: ['nameCountry'], //Para que solo me traiga el nombre del país
            order: [['nameCountry', 'ASC']] //para que en el llamado del select aparezcan ordenados de A a Z, aunque ya estan guardados en la tabla en orden alfabético
        });

        res.status(200).json(allCountries);

    } catch(error){
        next(error);
    }
};

module.exports = {
    getCountries,
    postCountries
};