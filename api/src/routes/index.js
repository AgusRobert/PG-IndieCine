const { Router } = require("express");
const router = Router();

//Aqui tus Router -- No subir este archivo Plis! :)

const apiFilmsRouter = require("./film");
const apiUsersRouter = require("./user");
const apiComentsRouter = require("./comment");
const apiUploadRouter = require("./upload");

router.use("/films", apiFilmsRouter);
router.use("/users", apiUsersRouter);
router.use("/comments", apiComentsRouter);
router.use("/upload", apiUploadRouter);

module.exports = router;
