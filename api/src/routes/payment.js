const { Router } = require("express");
const {
  simple,
  subcription,
  notification,
  validate,
  getIdSubscription,
  cancelSubcription,
} = require("../controllers/payment");
const router = Router();

router.post("/payment", simple);
router.post("/subscription", subcription);
router.get("/validate/:email", validate);
router.get("/:email", getIdSubscription);
router.put("/cancel/:id", cancelSubcription);

module.exports = router;
