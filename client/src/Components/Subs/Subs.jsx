import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPlanInfo, subscribe, paySubscription } from "../../redux/actions";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { useAuth0 } from "@auth0/auth0-react";

export default function Subs(currentSub) {
  const dispatch = useDispatch();

  const plans = useSelector(state => state.plans);
  const paymentLink = useSelector(state => state.paymentLink);

  useEffect(() => {
    dispatch(getPlanInfo());
  }, []);

  useEffect(() => {
    console.log("LO QUE SEA", paymentLink);
    if (paymentLink !== "") {
      console.log("ya no soy un array vacio", paymentLink);
      window.location.replace(paymentLink);
    }
  }, [paymentLink]);

  const { user } = useAuth0();

  const onSubscribe = id => {
    let plan = {
      reason: plans[id - 1]?.name,
      transaction_amount: plans[id - 1]?.price,
      currency_id: "ARS",
      payer_email: user?.email,
    };
    dispatch(paySubscription(plan));
    console.log("ONSUBSCRIBE");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} position={"relative"} left={100}>
        <Grid container spacing={2}>
          {plans?.map(esteplan => {
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
                      {console.log("ESTE PLAN", esteplan.name)}
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
                    {currentSub?.currentSub === esteplan.name ? (
                      <h3> Éste es tu plan actual</h3>
                    ) : (
                      <Button
                        size="small"
                        onClick={() => {
                          onSubscribe(esteplan.id);
                        }}
                      >
                        MEJORA TU PLAN
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
