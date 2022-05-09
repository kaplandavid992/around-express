const express = require('express');
const app = express();
const { PORT = 3000, BASE_PATH } = process.env;
const path = require('path');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})



// app.use('/', routes);

// app.listen(PORT, () => {
//   console.log('Link to the server:');
//   console.log(BASE_PATH);
// });

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));