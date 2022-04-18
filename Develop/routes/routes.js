const router = require('express').Router();
const fs = require('fs');
const path = require('path');
let { notes } = require('../db/db.json');

// API Routes
// get notes api route
router.get("/api/notes", (req, res) => {
    // return saved notes in db.json file
    res.json(notes);
});

// post notes api route & allow note retrieval
router.post("/api/notes", (req, res) => {
    // new note = note input body
    let newNotes = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let notelength = (noteList.length).toString();

    // add ID to new notes in the list
    newNotes.id = notelength;

    // add updated note to db.json file
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);

    // check if there is an array, if not, create one
    if (!Array.isArray(notes)) {
        notes =[];
    }
    // then push the new notes to the array
    notes.push(newNotes);
    return console.log(`Added new note: ${newNotes.title}`);
});

// get note by ID
router.get("/api/notes/:id", (req, res) => {
    // display json for note array for given ID
    res.json(notes[req.params.id])
});

// Delete notes by ID
router.delete("/api/notes/:id", (req, res) => {
    notes.splice(req.params.id, 1);
    console.log(`Note id: ${req.params.id} deleted.`)
});


// HTML Routes
// pull up notes.hmtl when get started is clicked
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// wildcard route
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;



