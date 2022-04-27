const { Router } = require("express");
const router = Router();

const routerComments = require("./comment");
const routerCountries = require("./Countries");
const routerFilms = require("./film");
const routerGenres = require("./Genres");
const routerUsers = require("./user");

router.use("/comments",routerComments);
router.use("/countries",routerCountries);
router.use("/films",routerFilms);
router.use("/genres",routerGenres);
router.use("/users",routerUsers);

module.exports = router;