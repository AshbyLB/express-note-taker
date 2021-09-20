const fs = require("fs");
const util = require('util');
const express = require('express');
const path = require("path");
const dbJson = require("./db/db.json");
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userNotes = dbJson && dbJson.length ? dbJson : [];


app.get('/api/notes', (req, res) => {
  res.json(userNotes)
});

app.post('/api/notes', (req, res) => {

  console.log(req.body);

  console.info(`${req.method} request received to add a note`);

  const { text, title } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    userNotes.push(newNote)
    const notesString = JSON.stringify(userNotes, null, 2);

    fs.writeFile(`./db/db.json`, notesString, (err) =>
      err ? console.error(err) : console.log(`Note for ${newNote.title} has been written to JSON file`));

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting new note');
  }
});


app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.delete('/api/notes/:id', function(req, res) {
  userNotes.splice(req.params.id, 1);
  
  fs.writeFile(`./db/db.json`, JSON.stringify(userNotes), (err) =>
      err ? console.error(err) : console.log(`Note has been deleted`));
      return res.json(userNotes);
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
