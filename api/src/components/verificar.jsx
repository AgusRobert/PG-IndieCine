import React, { useEffect, useState } from "react";
import { ApiClient } from "adminjs";
import { Box, H2, Text, Button, Link} from "@adminjs/design-system";
import axios from "axios";

const api = new ApiClient();

const Dashboard =  (props) => {

let {frontDocument, backDocument, country}= props.record.params;
country = country.toLowerCase().trim();

const [data, setData] = useState({});
let pais = "";
  
useEffect(async() => {
  
  api.getDashboard().then((res) => {
    setData(res.data);
  });

}, []);

if (country === "argentina") {
  pais=  "https://www.dateas.com/es/argentina?gclid=EAIaIQobChMI3-3w5IrU9wIVH0JIAB3Qpg3UEAMYASAAEgLHuvD_BwE";

 } else if (country === "peru") {
   pais ="https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp";
  
 } else if (country === "chile") {
   pais ="https://www.registrocivil.cl/principal/servicios-en-linea/consulta-vigencia-documento-1";
} else {
 pais = "";
}


  
  return (

    <Box justifyContent="center">
       <img src={frontDocument} alt="frontDocument" style={{width:"300px",height:"200px"}} /> 
        <img src={backDocument} alt="backDocument" style={{width:"300px",height:"200px"}} />
        <Text>
       {(pais !== "") ? ( <Link href={pais}>
          <H2>Ir al Centro de Verificación</H2>
          </Link>):(<H2>No hay Centro de Verificación</H2>)}
          </Text>
    </Box>
  );
} 


export default Dashboard;