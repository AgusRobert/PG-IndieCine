const { Router } = require("express");
const router = Router();

const routerComments = require("./comment");
const routerCountries = require("./countries");
const routerFilms = require("./film");
const routerGenres = require("./genres");
const routerUsers = require("./user");

router.use("/comments",routerComments);
router.use("/countries",routerCountries);
router.use("/films",routerFilms);
router.use("/genres",routerGenres);
router.use("/users",routerUsers);

module.exports = router;