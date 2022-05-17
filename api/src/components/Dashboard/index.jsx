import React,{useEffect, useState} from 'react';
import {ApiClient} from 'adminjs';
import {Box, H2,H3, Text, Link, LinkProps, Label} from '@adminjs/design-system';
import TaskType from './cards/TaskType';
import TaskDos from './cards/TaskDos';

const api = new ApiClient();

const Dashboard = () => {

const[data, setData] = useState({});

    useEffect(() => {
        api.getDashboard().then(res => {
            setData(res.data);
        });
    }, []);

    return (
        <Box>
            <Box position='relative' overflow='hidden'>
            <Box bg="grey20" height={284} py={74} px={['default', 'lg', 250]}>
                <Text textAlign='center' color='primary100'>
                    <H2>
                        BIENVENIDO AL ADMIN PANEL DE LA PLATAFORMA
                    </H2>
                </Text>
            </Box>
            <Box mt={['xl', 'xl', '-80px']}
                mb='xl'
                mx={[0, 0, 0, 'auto']}
                px={['default', 'lg', 'xxl', '0']}
                position='relative'
                flex
                flexDirection='row'
                flexWrap='wrap'
                width={[1,1,1,1024]}
            >
                    <Box width={[1,1/2,1/2]} p='lg'>
                      <TaskType />
                    </Box>
                    <Box width={[1,1/2,1/2]} p='lg'>
                        <TaskDos />
                    </Box>
            </Box>
            <Box>
            <Box >
              <Text textAlign="center" color="primary100"> <H2 >Links de Verificación de Identidad</H2></Text> 
            </Box>
                <Box flex flexDirection="row" marginLeft='20%'>
               <Text fontSize='20px' justifyContent="center" alignItems="center" color='black'> 
               <Link  href='https://www.dateas.com/es/argentina?gclid=EAIaIQobChMI3-3w5IrU9wIVH0JIAB3Qpg3UEAMYASAAEgLHuvD_BwE'>
                   Argentina - 
                </Link>
                <Link  href='https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp'>
                  - Perú - 
                </Link>
                <Link href='https://www.registrocivil.cl/principal/servicios-en-linea/consulta-vigencia-documento-1'>
                - Chile -
                </Link>
                <Link href='https://www.gob.mx/curp/'>
                - México -
                </Link>
                <Link href=' https://wsp.registraduria.gov.co'>
                - Colombia -
                </Link>
               
                </Text>
             </Box>
             </Box>
        </Box>
        </Box>
    )

}

export default Dashboard;