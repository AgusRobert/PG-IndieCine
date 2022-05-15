const { User, Plans } = require("../db");
const paymentService = require("../service/payment");
exports.simple = async (req, res) => {
  return res.json(await paymentService.toPay(req.body));
};

exports.subcription = async (req, res) => {
  return res.json(await paymentService.subscribe(req.body));
};

exports.validate = async (req, res) => {
  // try {
  const { email } = req.params;
  // console.log("CONTROLADOR : ", email);
  const validationData = await paymentService.validation(email);
  // console.log("validationData", validationData);
  let testResult = validationData?.results?.pop();
  // console.log("testResult", testResult);
  if (testResult?.status === "authorized") {
    let user = await User.findOne({
      where: {
        email: email,
      },
    });

    let plan = await Plans.findOne({
      where: { name: testResult.reason },
    });

    let infoToUpdate = {
      subcription: testResult.reason,
      PlanId: plan.id,
      status: "creator approved",
    };

    const result = await user.update(infoToUpdate);
    //_----------------------------------
    const idToCancel = await paymentService.getIdSubscribe(email, 1);
    if (idToCancel) {
      await paymentService.cancelSuscribe(idToCancel);
    }

    return res.json(result.dataValues);
  } else if (testResult?.status === "pending") {
    // let user = await User.findOne({
    //   where: {
    //     email: email,
    //   },
    // });
    // let infoToUpdate = {
    //   status: "pending",
    // };
    // const result = await user.update(infoToUpdate);
    // console.log("Result", result);
    // return res.json(result.dataValues);
    return await paymentService.cancelSuscribe(testResult.id);
  } else {
    let user = await User.findOne({
      where: {
        email: req.params.email,
      },
    });

    let infoToUpdate = {
      subcription: "Free",
      PlanId: 1,
      status: "creator approved",
    };
    const result = await user.update(infoToUpdate);

    return res.json(result.dataValues);
  }
  // } catch (error) {
  //   res.send("validate controller catch", error);
  // }
};

exports.cancelSubcription = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json((await paymentService.cancelSuscribe(id))?.status);
  } catch (error) {
    console.log("cancelSubcription controller catch", error);
  }
};

exports.getIdSubscription = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(
      "\n\n--------------------------------------------------------\n\nEMAIL QUE LLEGO: ",
      email
    );
    return res.json(await paymentService.getIdSubscribe(email));
  } catch (error) {
    console.log("getIdSubscription controller catch", error);
  }
};
