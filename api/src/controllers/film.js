const {Film} = require('../db.js');

exports.getFilms = async(req, res) => {
    try{
        const allFilms = await Film.findAll();
        res.json(allFilms)
    }
    catch(err){
        res.send("No se pudo acceder a las películas")
    }
}
