const paymentService = require("../service/payment");
exports.simple = async (req, res) => {
  return res.json(await paymentService.toPay(req.body));
};

exports.subcription = async(req, res) => {
  return res.json(await paymentService.subscribe(req.body));
};
