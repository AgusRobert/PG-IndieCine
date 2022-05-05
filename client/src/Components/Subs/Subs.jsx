import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { getPlanInfo, subscribe } from "../../redux/actions";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';

export default function Subs() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const planInfo = useSelector((state) => state.planInfo)
  const paymentLink = useSelector((state) => state.link)

  const [subscriptionData, setSubscriptionData] = useState({
    title: "",
    description: "",
    picture_url: "",
    category_id: "",
    price: 20,
  })

  const onSubscribe = (planId) => {
    dispatch(getPlanInfo(planId))
    console.log(planInfo)
    setSubscriptionData(() => ({
      title: planInfo?.name,
      description: planInfo?.description,
      category_id: planInfo?.id,
      price: 20
      }
    ))
    console.log({...subscriptionData})
    dispatch(subscribe(subscriptionData))
    window.location.replace(paymentLink)
  }
  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345, backgroundColor: "#000000" }} >
              <CardContent>
                <h3 style={{ color: "#f1c232", textShadow: "0 0 3px #351c75, 0 0 5px #351c75" }}>
                  Plan "Under"
                </h3>
                <h2 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
                  Sé Usuario Creador y sube tu contenido a CINDIE
                </h2>
                <h3 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
                  SUSCRIPCIÓN POR 3 MESES
                </h3>
                <h3 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
                  Precio $X/mes
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
            <Card sx={{ maxWidth: 345, backgroundColor: "#b388ff" }}>
              <CardContent>
                <h3 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
                  Plan "De Culto"
                </h3>
                <h2 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
                  Sé Usuario Creador y sube tu contenido a CINDIE
                </h2>
                <h3 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
                  SUSCRIPCIÓN POR 6 MESES
                </h3>
                <h3 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
                  Precio $Y/mes
                  <br />
                </h3>
              </CardContent>

              <CardActions>
                <Button size="small" onClick={() => {
                  onSubscribe(2);
                }} >SUSCRÍBETE AHORA</Button>
              </CardActions>

            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345, backgroundColor: "#b388ff" }}>
              <CardContent>
                <h3 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
                  Plan "De Autor"
                </h3>
                <h2 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
                  Sé Usuario Creador y sube tu contenido a CINDIE
                </h2>
                <h3 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
                  SUSCRIPCIÓN POR 12 MESES
                </h3>
                <h3 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
                  Precio $Z/mes
                  <br />
                </h3>
              </CardContent>

              <CardActions>
                <Button size="small" onClick={() => {
                  onSubscribe(3);
                }}>SUSCRÍBETE AHORA</Button>
              </CardActions>

            </Card>
          </Grid>

        </Grid>
      </Box>

    </>
  )
}
