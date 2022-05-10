const { User, Plans } = require("../db");
const paymentService = require("../service/payment");
exports.simple = async (req, res) => {
  return res.json(await paymentService.toPay(req.body));
};

exports.subcription = async (req, res) => {
  return res.json(await paymentService.subscribe(req.body));
};

exports.validate = async (req, res) => {
  try {
    // console.log("EMAIL AL VALIDATE", req.params.email);
    const validationData = await paymentService.validation(req.params.email);

    // console.log("validationData", validationData);

    let testResult = validationData.results?.pop();

    if (testResult?.status === "authorized") {
      let user = await User.findOne({
        where: {
          email: req.params.email,
        },
      });

      let plan = await Plans.findOne({
        where: { name: testResult.reason },
      });

      let infoToUpdate = {
        subcription: testResult.reason,
        PlanId: plan.id,
      };

      await user.update(infoToUpdate);
      console.log("USER UPDATEADO", user);
    }
    return res.json(validationData);
  } catch (error) {
    res.json('validate controller catch', error);
  }
};
