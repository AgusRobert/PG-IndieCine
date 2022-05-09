import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPlanInfo, subscribe } from "../../redux/actions";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

export default function Subs2() {
  const dispatch = useDispatch();

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

  /* useEffect(() => {
    console.log(" SUSCRIPCIPOOOOON", subscriptionData);
  }, [subscriptionData]);
 */
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

  return (
    <>
      <Box sx={{ flexGrow: 1 }} position={"relative"} left={100}>
        <Grid container spacing={2}>
          

            {plans?.map((data) => {
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
                      Plan "{data.name}"
                    </h3>
                    <h2
                      style={{
                        color: "#f3f6f4",
                        textShadow: " 0 0 3px #351c75, 0 0 5px #351c75",
                        textAlign: "center",
                      }}
                    >
                      Sé Usuario Creador y sube tu contenido a CINDIE

                      {data.description}
                    </h2>
                    <h3
                      style={{
                        color: "#f3f6f4",
                        textShadow: " 0 0 3px #351c75, 0 0 5px #351c75",
                        textAlign: "center",
                      }}
                    >
                      SUSCRIPCIÓN POR {data.period} MESES
                    </h3>
                    <h3
                      style={{
                        color: "#f3f6f4",
                        textShadow: " 0 0 3px #351c75, 0 0 5px #351c75",
                        textAlign: "center",
                      }}
                    >
                      Precio ${data.price}
                      {data.currency}/mes
                      <br />
                    </h3>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        onSubscribe(data.id);
                      }}
                    >
                      SUSCRÍBETE AHORA
                    </Button>
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

{
  /* <CardActions>
                <Button size="small" onClick={() => {
                  onSubscribe(1);
                }} >SUSCRÍBETE AHORA</Button>
              </CardActions> */
}

/* {isCreator && (usuario.subcription==="A" && usuario.pelissubidas<A.filmsAllowed) ||
                (usuario.subcription==="B" && usuario.pelissubidas<Y.filmsAllowed)||
                (usuario.subcription==="C" && usuario.pelissubidas<Z.filmsAllowed) ||
                <Link to = '/MovieForm'><button>SUBIR PELÍCULA</button></Link>} */