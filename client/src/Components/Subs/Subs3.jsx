import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPlanInfo, subscribe, getProfileInfo } from "../../redux/actions";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { useAuth0 } from "@auth0/auth0-react";

export default function Subs3() {
  const dispatch = useDispatch();


  const { user } = useAuth0();
 
   console.log("UserEnSubs", user)
   user && console.log("elmail", user.email)
  /* const email= user.email  */

  const plans = useSelector((state) => state.plans);
  const paymentLink = useSelector((state) => state.link);
 
 
    
  useEffect(() => {
    dispatch(getPlanInfo());
  }, [paymentLink]);

  console.log("PLANEEEEEEES", plans);


  const [subscriptionData, setSubscriptionData] = useState({
    title: "",
    description: "",
    picture_url: "",
    category_id: "",
    price: 20,
  });

  useEffect(() => {
    console.log(" SUSCRIPCIPOOOOON", subscriptionData);
  }, [subscriptionData]);

  const onSubscribe = async (planId) => {
    setSubscriptionData( 
      {
        title: plans[planId].name,
        description: plans[planId].description,
        category_id: plans[planId].id,
        price: plans[planId].price,
      },
      () => {}
    );
    console.log({
      title: plans[planId].name,
      description: plans[planId].description,
      category_id: plans[planId].id,
      price: plans[planId].price,
    });
    const link = await dispatch(subscribe({ ...subscriptionData }));
    console.log(link.payload.init_point);
    window.location.replace(link.payload.init_point);

  };


  useEffect(() => {
    user && dispatch(getProfileInfo(user.email));
  }, [dispatch]);

  const usuario = useSelector((state) => state.profileInfo);
  usuario && console.log("USUARIO", usuario)


  return (
    <>
      <Box sx={{ flexGrow: 1 }} position={"relative"} left={100}>
        <Grid container spacing={2}>
          

            {plans?.map((esteplan) => {
              return (
                <Grid item xs={4}>
                <Card
                  raised={true}
                  sx={{ maxWidth: 345, backgroundColor: "#000000" }}
                  elevation={24}
                >
                  <CardContent>
                    <h3
                      style={{
                        color: "#f3f6f4",
                        textShadow: "0 0 3px #351c75, 0 0 5px #351c75",
                        textAlign: "center",
                      }}
                    >
                      <MovieCreationIcon />
                      Plan "{esteplan.name}"
                    </h3>
                    <h2
                      style={{
                        color: "#f3f6f4",
                        textShadow: " 0 0 3px #351c75, 0 0 5px #351c75",
                        textAlign: "center",
                      }}
                    >
                      Sé Usuario Creador y sube tu contenido a CINDIE

                      {esteplan.description}
                    </h2>
                    <h3
                      style={{
                        color: "#f3f6f4",
                        textShadow: " 0 0 3px #351c75, 0 0 5px #351c75",
                        textAlign: "center",
                      }}
                    >
                      SUSCRIPCIÓN POR {esteplan.period} MESES
                    </h3>
                    <h3
                      style={{
                        color: "#f3f6f4",
                        textShadow: " 0 0 3px #351c75, 0 0 5px #351c75",
                        textAlign: "center",
                      }}
                    >
                      Precio ${esteplan.price}
                      {esteplan.currency}/mes
                      <br />
                    </h3>
                  </CardContent>

                  <CardActions>

                {
 
                    /* usuario && usuario.subcription===esteplan.name? 


                    <h3> Éste es tu plan actual</h3>:  */
  
                    <Button
                      size="small"
                      onClick={() => {
                        onSubscribe(esteplan.id);
                      }}
                    >
                      MEJORA TU PLAN
                    </Button>

                                        }

                  </CardActions>
                </Card>
                </Grid>
              );
            })}

          </Grid>
       
      </Box>
    </>
  );
}



{/* {isCreator && <Subs3/>}
     {user.pelissubidas<plan.filmsAllowed && <Link to = '/MovieForm'><button>SUBIR PELÍCULA</button></Link> }*/}



           
      