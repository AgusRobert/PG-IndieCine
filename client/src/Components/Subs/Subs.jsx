import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { getPlanInfo, subscribe, paySubscription } from "../../redux/actions";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

export default function Subs() {

  const dispatch = useDispatch();

  const plans = useSelector((state) => state.plans)
  const paymentLink = useSelector((state) => state.paymentLink)

  useEffect(() => {
    dispatch(getPlanInfo())
  }, [])

  useEffect(() => {
    console.log(paymentLink)
    if(paymentLink !== undefined){
        window.location.replace(paymentLink)
    }
  }, [paymentLink])

  const onSubscribe = (id) => {
    let plan = {
      reason: plans[id]?.name,
      transaction_amount: plans[id]?.price,
      currency_id: "PEN",
      payer_email: "test_user_54987522@testuser.com"
    }  
    dispatch(paySubscription(plan))
  }


  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card raised={true} sx={{ maxWidth: 345, backgroundColor: "#000000" }} elevation={24} >
              <CardContent>
                <h2 style={{ color: "#f3f6f4", textShadow: "0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  <MovieCreationIcon />Plan "Under"
                </h2>
                <h3 style={{ color: "#f3f6f4", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  Sé Usuario Creador y sube tu contenido a CINDIE
                </h3>
                <h3 style={{ color: "#f3f6f4", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  SUSCRIPCIÓN POR 3 MESES
                </h3>
                <h3 style={{ color: "#f3f6f4", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  Precio $300/mes
                  <br />
                </h3>
              </CardContent>

              <CardActions>
                {/* <Button size="large">SUSCRÍBETE AHORA</Button> */}
                <Chip label="Clickable Link" component="a" href="#basic-chip" clickable />

              </CardActions>

            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card raised={true} sx={{ maxWidth: 345, backgroundColor: "#000000" }} elevation={24}>
              <CardContent>
                <h2 style={{ color: "#f3f6f4", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  <MovieCreationIcon />Plan "De Culto"
                </h2>
                <h3 style={{ color: "#f3f6f4", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  Sé Usuario Creador y sube tu contenido a CINDIE
                </h3>
                <h3 style={{ color: "#f3f6f4", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  SUSCRIPCIÓN POR 6 MESES
                </h3>
                <h3 style={{ color: "#f3f6f4", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  Precio $200/mes
                  <br />
                </h3>
              </CardContent>

              <CardActions>
                <Button size="small" onClick={() => {
                  onSubscribe(1);
                }} >SUSCRÍBETE AHORA</Button>
              </CardActions>

            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card raised={true} sx={{ maxWidth: 345, backgroundColor: "#000000" }} elevation={24} >
              <CardContent>
                <h2 style={{ color: "#f3f6f4", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  <MovieCreationIcon />Plan "De Autor"
                </h2>
                <h3 style={{ color: "#f3f6f4", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  Sé Usuario Creador y sube tu contenido a CINDIE
                </h3>
                <h3 style={{ color: "#f3f6f4", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  SUSCRIPCIÓN POR 12 MESES
                </h3>
                <h3 style={{ color: "#f3f6f4", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75", textAlign: "center" }}>
                  Precio $150/mes
                  <br />
                </h3>
              </CardContent>

              <CardActions>
                <Button size="small" onClick={() => {
                  onSubscribe(2);
                }}>SUSCRÍBETE AHORA</Button>
              </CardActions>

            </Card>
          </Grid>

        </Grid>
      </Box>

    </>
  )
}
