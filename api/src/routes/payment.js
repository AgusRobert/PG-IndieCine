const { Router } = require("express");
const { simple, subcription, notification, validate } = require("../controllers/payment");
const router = Router();

router.post("/payment", simple);
router.post("/subscription", subcription);
router.get("/validate/:email", validate)

module.exports = router;
