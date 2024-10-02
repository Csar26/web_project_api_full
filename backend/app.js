const express = require('express')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/0212024aroundb');
const { errors } = require('celebrate');
const cors = require('cors');
const fileUpload = require("express-fileupload");
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();


const whitelist = ['https://auge25.mooo.com, https://www.auge25.mooo.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

const {PORT = 3000} = process.env;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

const userRoutes = require("./routes/users");

const cardsRoutes = require("./routes/cards");

/*app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133'
  };

  next();
});
*/

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

app.use(errors());


app.listen(PORT, () => {
  console.log('ready')
});