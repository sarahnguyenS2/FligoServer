require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const twilioRouter = require('./src/routes/otp-reset');
const app = express();

const {PORT} = process.env
const port = 8060 || PORT
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use('/otp-reset/', twilioRouter);

app.get('/', () => {
    console.log('App Demo');
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})
