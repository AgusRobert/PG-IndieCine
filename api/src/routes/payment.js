const { Router } = require("express");
const { simple, subcription } = require("../controllers/payment");
const router = Router();

router.post("/payment", simple);
router.post("/subscription", subcription);

module.exports = router;
