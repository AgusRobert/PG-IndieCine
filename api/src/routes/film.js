const { Router } = require("express");
const router = Router();

const {
  getFilms,
  postFilms,
  updateFilm,
  getById,
  deleteFilm,
  deleteFilms,
  getHiddenFilms,
  updateFilms,
} = require("../controllers/film");

router.get("/", getFilms);
router.get("/hidden/:id", getHiddenFilms);
router.get("/:id", getById);
router.post("/", postFilms);
router.put("/", updateFilm);
router.put('/updateFilms', updateFilms);
router.delete("/", deleteFilms);
router.delete("/:id", deleteFilm);

module.exports = router;
