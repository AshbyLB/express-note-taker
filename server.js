const fs = require("fs");
const express = require('express');
const path = require("path");
const dbJson = require("./db/db.json");

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);








app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
