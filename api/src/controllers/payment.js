const { User, Plans } = require("../db");
const paymentService = require("../service/payment");
const planService = require("../service/plan");
const filmService = require("../service/film");

exports.simple = async (req, res) => {
  return res.json(await paymentService.toPay(req.body));
};

exports.subcription = async (req, res) => {
  return res.json(await paymentService.subscribe(req.body));
};

exports.validate = async (req, res) => {
  try {
    const { email } = req.params;
    const validationData = await paymentService.validation(email);
    let testResult = validationData?.results?.pop();
    let respuesta = [];
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
      };
      respuesta = (await user.update(infoToUpdate))?.dataValues;
      const idToCancel = await paymentService.getIdSubscribe(email, 1);
      if (idToCancel) {
        await paymentService.cancelSuscribe(idToCancel);
      }
    } else if (testResult?.status === "pending") {
      await paymentService.cancelSuscribe(testResult.id);
      respuesta = await User.findOne({
        where: {
          email: email,
        },
      });
    } else {
      let user = await User.findOne({
        where: {
          email: req.params.email,
        },
      });
      let infoToUpdate = {
        subcription: "Free",
        PlanId: 1,
      };
      respuesta = (await user.update(infoToUpdate))?.dataValues;
    }
    const films = await filmService.filmsOfUser(respuesta.email);
    const plan = await planService.getById(respuesta.PlanId);
    if (films?.length > plan.filmsAllowed) {
      Promise.all(
        films.map(async (f) => {
          await filmService.update(f.id);
        })
      );
    }
    return res.json(respuesta);
  } catch (error) {
    res.send("validate controller catch", error);
  }
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
    return res.json(await paymentService.getIdSubscribe(email));
  } catch (error) {
    console.log("getIdSubscription controller catch", error);
  }
};
