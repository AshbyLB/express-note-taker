const util = require('util');
const express = require('express');
const apiPage = require('./routes/api');
const htmlPage = require('./routes/html');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(apiPage);
app.use(htmlPage);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
