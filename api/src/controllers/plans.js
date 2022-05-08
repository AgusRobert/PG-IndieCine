"use strict";
const { Plans } = require("../db.js");

//POST plans
const postPlans = async (req, res, next) => {
  try {
    const { name, price, currency, period, description, filmsAllowed } = req.body;
    const [plan, created] = await Plans.findOrCreate({
      where: { name: name },
      defaults:{
          price: price,
          currency: currency,
          period: period,
          description: description,
          filmsAllowed: filmsAllowed
      }
    });
    if (created) {
      res.json({
        message: "Plan created",
        plan,
      });
    } else {
      res.json({
        message: "Plan already exists",
        plan,
      });
    }
  } catch (error) {
    next(error);
  }
};

//GET all plans
const getPlans = async (req, res, next) => {
  try {
    const allPlans = await Plans.findAll({
      order: [["id", "ASC"]],
    });

    res.status(200).json(allPlans);
  } catch (error) {
    next(error);
  }
};

const getPlan = async (req, res, next) => {
  try {
    const {id} = req.params 
    
    const plan = await Plans.findOne({
      where:{
        id: id
      }
    });
    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
};

const getPlanByName = async (req, res, next) => {
  try {
    const {name} = req.params 
    
    const plan = await Plans.findOne({
      where:{
        name: name
      }
    });
    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getPlans,
  postPlans,
  getPlan,
  getPlanByName
};