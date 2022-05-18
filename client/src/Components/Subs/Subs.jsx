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
import { deepPurple } from "@mui/material/colors";
import {  styled } from "@mui/system";

const CardActionsS = styled(CardActions)({
  display:'flex',
  justifyContent: "center",
});

export default function Subs({
  currentSub,
  plans,
  planChangeFn,
  planCanceledFn,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const plans = useSelector((state) => state.plans);
  const paymentLink = useSelector((state) => state.paymentLink);

  // useEffect(() => {
  //   dispatch(getPlanInfo());
  // }, []);

  useEffect(() => {
    if (paymentLink !== "") window.location.replace(paymentLink);
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
      dispatch(cancelSubscription(user?.email)); //--> de cualquier plan a 'Free'
      // Swal.fire("Ahora seras un simple mortal!!").then((result) => {
      //   window.location.reload();
      // });
      planChangeFn(true);
    } else {
      dispatch(paySubscription(nuestroPlan));
      planChangeFn(true);
      // dispatch(
      //   updateUser({
      //     email: user?.email,
      //     status: "pending",
      //   })
      // );
      // dispatch(upgradeSubscription(nuestroPlan)) // --> de cualquier plan a otro plan
    }
  };

  const onCancel = () => {
    dispatch(cancelSubscription(user.email));
    planCanceledFn(true);
    Swal.fire("Ahora tendrás el plan Free!!").then(() => {
      // usamos el window.location.reload() para que se actualice la pagina para que se vea el cambio de plan
      // está hardcodeado porque no se encontró la solución óptima en el useEffect.
      window.location.reload();
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} position={"relative"} left={100}>
        <Grid container spacing={3}>
          {plans?.map((esteplan) => {
            return (
              <Grid item xs={3} paddingBottom={5}>
                <Card
                  raised={true}
                  sx={{ maxWidth: 300, backgroundColor: "#673ab7" }}
                  elevation={2}
                >
                  <CardContent>
                    <h3
                      style={{
                        color: "#f3f6f4",
                        textShadow: "0 0 1px #351c75, 0 0 2px #351c75",
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
                    
                  <CardActionsS >
                    {currentSub?.toLowerCase() ===
                    esteplan.name.toLowerCase() ? (
                      <Button
                        size="small"
                        onClick={() => {
                          onCancel();
                        }}
                        disabled={esteplan.id === 1 ? true : false}
                        style={{
                          color: "#f3f6f4",
                          textShadow: "0 0 1px #351c75, 0 0 2px #351c75",
                          textAlign: "center",
                          borderRadius: 5,
                          padding:5
                        }}
                        sx={{
                          ":hover": {
                            bgcolor: deepPurple[800],
                            color: "black",
                          },
                        }}
                      >
                        <h3>CANCELAR</h3>
                      </Button>
                    ) : (
                      <Button
                        
                        size="medium"
                        onClick={() => {
                          onSubscribe(esteplan);
                        }}
                        style={{
                          color: "#f3f6f4",
                          textShadow: "0 0 1px #351c75, 0 0 2px #351c75",
                          textAlign: "center",
                          borderRadius: 5,
                          padding:5
                        }}
                        sx={{
                          ":hover": {
                            bgcolor: deepPurple[800],
                            color: "black",
                          },
                        }}
                      >
                        <h3>SELECCIONAR PLAN</h3>
                      </Button>
                    )}
                  </CardActionsS>
                  </CardContent>

                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
