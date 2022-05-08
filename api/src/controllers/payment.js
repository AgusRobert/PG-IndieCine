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
    // console.log("validate controller", req.query); //--> LLEGA BIEN
    const { userEmail } = req.query;

    const validationData = await paymentService.validation(req.params.email);
    console.log("validationData", validationData); //--> LLEGA BIEN
    if ((validationData.results[0].status = "pending")) {
      let user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      // console.log("user subscription", user.subcription); //--> LLEGA BIEN
      // validationData.results[2].reason; //--> no entiendo esta linea
      if (user) {
        let plan = await Plans.findOne({
          where: { name: user.subcription },
        });

        let infoToUpdate = {
          subcription: validationData.results[2].reason,
          // Acá tira error porque hay una reason que es 'Suscripción de ejemplo'
          // y es demasiado larga para el atributo de la db.
          // estaba puesto así...> subcription: validationData.results[2].reason,
          PlanId: plan.id,
        };

        await user.update(infoToUpdate);
        // console.log("dhsdjg")
        return res.json(validationData);
      } else {
        console.log("Usuario no encontrado en validate");
        res.json({ msg: "No se encontró el usuario." });
      }
    }
  } catch (error) {
    console.log("validate controller catch", error);
  }
};
