const paymentService = require("../service/payment");
exports.simple = async (req, res) => {
  return res.json(await paymentService.toPay());
};

exports.subcription = async(req, res) => {
  return res.json(await paymentService.subscribe());
};
