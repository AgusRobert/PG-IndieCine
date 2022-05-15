import React,{useEffect, useState} from 'react';
import {ApiClient} from 'adminjs';
import {Box, H2, Text} from '@adminjs/design-system';
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
                    <Text opacity='0.8'>Subtítulo</Text>
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
        </Box>
        </Box>
    )

}

export default Dashboard;