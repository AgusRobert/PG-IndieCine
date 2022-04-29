const {Film, Genre, Country} = require('../db.js');

exports.getFilms = async(req, res) => {
    try{
        const allFilms = await Film.findAll();
        res.json(allFilms)
    }
    catch(err){
        res.send("No se pudo acceder a las películas")
    }
};

exports.postFilms = async(req, res, next) => {
    try{
        const {title, genres, poster, synopsis, year, director, duration, mainActors, country, url, associateProducer, rating, UserId} = req.body
        let filmCreated = await Film.create({
            title, poster, synopsis, year, director, duration, mainActors, url, associateProducer, rating,
        })

        if(genres){
            let genresStored = await Genre.findAll( {
                where: {name: genres}
            })
            filmCreated.addGenres(genresStored)
        }

        if(country){
            let countriesStored = await Country.findAll( {
                where: {name: country}
            })
            filmCreated.addCountry(countriesStored)
        }

        res.send("Film creado exitosamente")
    }
    catch(err){
        res.send("No se pudo crear el film")
    }
}

exports.updateFilm = async (req, res) => {
    try{
        const {title, genres, poster, synopsis, year, director, duration, mainActors, country, url, associateProducer, rating, id} = req.body;
        await Film.update(
            {title, genres, poster, synopsis, year, director, duration, mainActors, country, url, associateProducer, rating},
            {where: {
                id: id,
                }
            }
        )
        res.send("La información del film se actualizó con éxito")
    }
    catch (err){
        res.send("Ocurrió un error, trate de actualizar la información nuevamente")
    }
}

