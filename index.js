require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const twilioRouter = require('./src/routes/otp-reset');
const app = express();

const {PORT} = process.env
const port = 8060 || PORT
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(
  cors({
    origin: '*'
  })
);

app.use('/otp-reset/', twilioRouter);

app.get('/', function (req, res) {
    res.send('App Demo');
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})
