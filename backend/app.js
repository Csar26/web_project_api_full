const express = require('express')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/0212024aroundb');
const { errors } = require('celebrate');
const cors = require('cors');
const fileUpload = require("express-fileupload");
require('dotenv').config()
const bodyParser = require('body-parser');
const gotError = require("./middleware/gotError");
const { requestLogger, errorLogger } = require('./middleware/looger');
const app = express();


const whitelist = ['https://auge25.mooo.com', 'https://www.auge25.mooo.com', "http://localhost"]
const corsOptions = {
origin: whitelist,
}

app.use(cors('*'));
//app.options("*", cors(corsOptions));

const {PORT = 3000} = process.env;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

app.use(requestLogger);

const userRoutes = require("./routes/users");

const cardsRoutes = require("./routes/cards");

app.use(userRoutes);
app.use(cardsRoutes);


app.get('/*', (req, res) => {

  res.status(404).send({
    message:'NOT FOUND'
  })
})


app.post('/*', (req, res)=> {
  res.status(404).send({message:'NOT FOUND'})
})

app.use(errorLogger);

app.use(errors());

app.use(gotError);


app.listen(PORT, () => {
  console.log('ready')
});