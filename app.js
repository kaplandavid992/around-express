const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
