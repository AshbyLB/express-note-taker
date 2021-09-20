const router = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require("fs");
const dbJson = require("../db/db.json");
const userNotes = dbJson && dbJson.length ? dbJson : [];


router.get('/api/notes', (req, res) => {
    res.json(userNotes)
  });
  
  router.post('/api/notes', (req, res) => {
  
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
  
      fs.writeFile('./db/db.json', notesString, (err) =>
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
  
  
  router.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );
  
  router.delete('/api/notes/:id', function(req, res) {
    userNotes.splice(req.params.id, 1);
    
    fs.writeFile(`./db/db.json`, JSON.stringify(userNotes), (err) =>
        err ? console.error(err) : console.log(`Note has been deleted`));
        return res.json(userNotes);
  });

  module.exports = router;