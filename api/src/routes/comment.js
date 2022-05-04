const router = require("express").Router();

const {
  getAllComments,
  getComment,
  getComentsUser,
  getComentsFilm,
  postComment,
  deleteComent,
  modifyComent,
} = require("../controllers/comment");

router.get("/", getAllComments);
router.post("/", postComment);

router.get("/:id", getComment);

router.get("/user/:id", getComentsUser);

router.get("/film/:id", getComentsFilm);

router.delete("/del", deleteComent);

router.put("/modif", modifyComent);

module.exports = router;
