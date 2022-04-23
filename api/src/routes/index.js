const { Router } = require("express");
const countriesRoute = require("./countries.js");
const activitiesRoute = require("./activities.js");

const router = Router();

router.use("/countries", countriesRoute);
router.use("/activities", activitiesRoute);

module.exports = router;
