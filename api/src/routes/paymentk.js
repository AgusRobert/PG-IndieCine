const { Router } = require('express');
const router = Router();

const PaymentController = require("../controllers/PaymentControllerk");
const PaymentService = require("../service/PaymentServicek");

const PaymentInstance = new PaymentController(new PaymentService());


router.get("/", function (req, res, next) {
    return res.json({
      "/payment": "generates a payment link",
      "/subscription": "generates a subscription link"
    });
  });
  
//este funciona
router.post("/payment", function (req, res, next) {
    PaymentInstance.getPaymentLink(req, res);
  });
// este np
router.post("/subscription", function (req, res, next) {
    PaymentInstance.getSubscriptionLink(req, res);
  });

module.exports = router;