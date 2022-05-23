const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(bodyParser.json());
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const route = (req, res) => {
  console.log(res.status);
  res.status(404).send({ message: 'Requested resource not found' });
};

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use((req, res, next) => {
  req.user = {
    _id: '5d208fe20fdbbf001ffdf72b'
  };
  next();
});
app.get('*', route);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
