const express = require('express');

const apiRouter = require('./src/routes/api');
const app = express();

require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
    });
