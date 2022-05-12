const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const route = (req, res) => {
  console.log(res.status);
  res.status(404).send({ message: 'Requested resource not found' });
};

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.get('*', route);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
