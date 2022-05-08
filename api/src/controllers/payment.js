const { User, Plans } = require("../db");
const paymentService = require("../service/payment");
exports.simple = async (req, res) => {
  return res.json(await paymentService.toPay(req.body));
};

exports.subcription = async(req, res) => {
  return res.json(await paymentService.subscribe(req.body));
};

exports.validate = async(req, res) =>{
  console.log("EMAIL AL VALIDATE", req.params.email)
  const validationData = await paymentService.validation(req.params.email)
  if(validationData.results[0].status = "pending"){   
    let user = await User.findOne({
      where: {
        email: req.params.email,
      },
    });
     validationData.results[2].reason
    let plan = await Plans.findOne({
      where: {name: user.subcription}
    })

    let infoToUpdate = {
      subcription: validationData.results[2].reason,
      PlanId: plan.id
    }

    await user.update(infoToUpdate)
    console.log("dhsdjg")
  } 
  return res.json(validationData)
}