const { Router } = require("express");
const { Activity, Country } = require("../db");
const router = Router();
const { Op } = require("sequelize");
// router.get("/", (req, res) => {
//   res.send("Soy el get ;)");
// });
// Si esto no funciona intenta un try catch

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  const { id } = req.query;
 let result = null
  try {
    if (name) {
     
       result = await Activity.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%"
          },
          
        },
        include:[{
          model: Country,
          attributes:['id','name','continent'],
          through:'ActivitiesCountries'
        }],
        order:[
            ['name','ASC']
          ]
      });
     res.json(result);
      if (!result) {
        return res.send({ error: `La actividad ${name} no existe.` });
      }
    }
    if (id) {
     
      result = await Activity.findByPk(
        id,{
       include:[{
         model: Country,
         attributes:['id','img','name','continent','population'],
         through:[]
       }],
       order:[
           ['name','ASC']
         ]
     });
      if(result){
        res.json(result);
      }
     else {
       return res.send({ error: `La actividad ${name} no existe.` });
     }
   }
    else{
      const response= await Activity.findAll({
        order:[
          ['name','ASC']
        ],
      })
     
      res.json(response)
    }
  } catch(error) {
    next(error)
  }
});



router.post("/addActivity", async (req, res, next) => {
 try{ const { countries, name, difficulty, duration, season } = req.body;
  if(countries && name && difficulty && duration && season){ 
    const [activity, created] = await Activity.findOrCreate({
    //findorcreate aca
    where: { name, difficulty, duration, season },
    //form
  });
  countries.forEach(async (name)=>{
    const pais = await Country.findOne({
    where: {
      name: name,
    },
  })
  await pais.addActivity(activity);
  })
  return res.send("Actividad creada con exito");
}
 else{
   res.json({error:'Falta un elemento del form'})
 }
  
  } catch(error){
    next(error)
  }
});

module.exports = router;
