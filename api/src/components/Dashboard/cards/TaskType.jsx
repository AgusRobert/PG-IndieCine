import React, {useState, useEffect} from 'react';
import { ApiClient } from 'adminjs';
import {Text, H5} from '@adminjs/design-system';
import {Chart} from 'react-google-charts';
import {Card} from '../styles';
import _ from 'lodash';


const api = new ApiClient();

const makeChartData = (records) => {
    const subcription= {
        'Free': 'Gratis',
        'De creador': 'De Creador',
        'De culto': 'De Culto',
    };
    const values =_.groupBy(records, (record) => record.params.subcription);
   
    const data = _.map(subcription,(value, key) => [value, values[key]?.length || 0]);
    return [['Usuarios', 'Estado'], ...data];

}

const TaskType = () => {
const [chartData, setChartData] = useState([]);
const [loading, setLoading] = useState(true);
const [isEmpty, setIsEmpty] = useState(false);
useEffect(() => {
(async () => {
    const response = await api.resourceAction({
        resourceId:'user',
        actionName: 'list',
    });
   
    setChartData(makeChartData(response.data.records));
    setIsEmpty(response.data.records.length === 0);
    setLoading(false);
})();
}, []);

    return (

        <Card as= "a" href="#">
            <Text textAlign='center'>
                <H5>Gráfico de Usuarios</H5>
                { isEmpty ? (<Text> Sin registros</Text>): (<Chart
                     chartType='PieChart'
                        data={chartData}
                        width={'100%'}
                        height={'100%'}
                        />) }
            </Text>
        </Card>
    )
};

export default TaskType;