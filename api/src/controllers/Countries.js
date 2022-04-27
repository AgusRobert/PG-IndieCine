'use strict';

//modulos bases para el controlador de Countries (solo necesitamos el llamado de los paises a la db 'get')

const { Router } = require('express');
const express = require('express');
const router = Router();
const { Country } = require('../models/Country');

//router.use(express.json());

//POST countries
const postCountries = async (req, res, next) => {
    try {
        const { name } = req.body;
        const country = await Country.create({
            name
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
        const allCountries = await Country.findAll({
            attributes: ['name'], //Para que solo me traiga el nombre del país
            order: [['name', 'ASC']] //para que en el llamado del select aparezcan ordenados de A a Z, aunque ya estan guardados en la tabla en orden alfabético
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