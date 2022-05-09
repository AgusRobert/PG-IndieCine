import React, { useEffect, useState } from "react";
import { ApiClient } from "adminjs";
import { Box, H2, Text, Button } from "@adminjs/design-system";
import axios from "axios";

const api = new ApiClient();

const Dashboard = (props) => {
  console.log(props.record.params);
  const mail = {
    type: "creator",
    name: props.record.params.name,
    email: props.record.params.email,
  };
  const [data, setData] = useState({});
  const [aceptar, setAceptar] = useState(false);
  const [rechazar, setRechazar] = useState(false);

  useEffect(() => {
    api.getDashboard().then((res) => {
      setData(res.data);
    });
  }, []);
  async function handleAceptar() {
     axios.post("http://localhost:3001/mail", mail);
    setAceptar(true);
  }
  async function handleRechazar() {
    mail.type = "creatorR";
     axios.post("http://localhost:3001/mail", mail);
    setRechazar(true);
  }

  return (
    <Box justifyItems="center">
      <Text my="20px">
        <H2 color="dark"> Enviar Mensaje al Usuario </H2>
      </Text>
      {rechazar === false ? (
        <Text my="20px" color="primary">
          Si los datos son correctos
          {aceptar === false ? (
            <Button ml="default" onClick={handleAceptar}>
              Aceptar
            </Button>
          ) : (
            "     Mensaje enviado con éxito"
          )}
        </Text>
      ) : null}

      {aceptar === false ? (
        <Text color="danger">
          Si hubo algun problema
          {rechazar === false ? (
            <Button ml="default" variant="danger" onClick={handleRechazar}>
              Rechazar
            </Button>
          ) : (
            "     Mensaje enviado con éxito"
          )}
        </Text>
      ) : null}
    </Box>
  );
};


export default Dashboard;