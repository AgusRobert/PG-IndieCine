import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getPlanInfo,
  subscribe,
  paySubscription,
  cancelSubscription,
  upgradeSubscription,
  updateUser,
} from "../../redux/actions";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

export default function Subs(currentSub) {
  console.log("currentSub", currentSub.currentSub);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const plans = useSelector((state) => state.plans);
  const paymentLink = useSelector((state) => state.paymentLink);

  useEffect(() => {
    dispatch(getPlanInfo());
  }, []);

  useEffect(() => {
    // console.log("LO QUE SEA", paymentLink);
    if (paymentLink !== "") {
      console.log("ya no soy un array vacio", paymentLink);
      window.location.replace(paymentLink);
    }
  }, [paymentLink]);

  const { user } = useAuth0();

  const onSubscribe = (plan) => {
    let nuestroPlan = {
      reason: plan.name,
      transaction_amount: plan.price,
      currency_id: "ARS",
      payer_email: user?.email,
    };
    if (plan.name.toLowerCase() === "free") {
      dispatch(cancelSubscription(user?.email));
      Swal.fire("Ahora seras un simple mortal!!").then((result) => {
        window.location.reload();
      });
      // dispatch(paySubscription(nuestroPlan)); //--> de cualquier plan a 'Free'
    } else {
      dispatch(paySubscription(nuestroPlan));
      // dispatch(
      //   updateUser({
      //     email: user?.email,
      //     status: "pending",
      //   })
      // );
      // dispatch(upgradeSubscription(nuestroPlan)) // --> de cualquier plan a otro plan
    }
  };

  const onCancel = (e) => {
    
    dispatch(cancelSubscription(user.email));
    Swal.fire("Ahora seras un simple mortal!!").then((result) => {
      window.location.reload();
    });
  };

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
                      {/* {console.log("ESTE PLAN", esteplan.name)} */}
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
                    {currentSub?.currentSub.toLowerCase() ===
                    esteplan.name.toLowerCase() ? (
                      <Button
                        size="small"
                        onClick={(e) => {
                          onCancel(e);
                        }}
                        disabled={esteplan.id === 1 ? true : false}
                      >
                        <h3>CANCELAR</h3>
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        onClick={() => {
                          onSubscribe(esteplan);
                        }}
                      >
                        <h3>SELECCIONAR PLAN</h3>
                      </Button>
                    )}
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
