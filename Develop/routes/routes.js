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
    // create variable to store db.json data stored as json object
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    // create variable to store most recently added note on the list into a string
    let noteLength = (noteList.length).toString();

    // add ID to the most recent note
    newNotes.id = noteLength;

    // add updated note to db.json file
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);

    // check if there is an array, if not, create one
    if (!Array.isArray(notes)) {
        notes =[];
    }
    // then push the new notes to the array
    notes.push(newNotes);
    editDb();
    return console.log(`Added new note: ${newNotes.title}`);
});

// get note by ID
router.get("/api/notes/:id", (req, res) => {
    // display json for note array for given ID
    res.json(notes[req.params.id])
});

// Delete notes by ID
router.delete("/api/notes/:id", (req, res) => {
    // grab the current notes listed in db.json and store as currentNotesList variable
    let currentNotesList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    //convert note id's into string
    let note = (req.params.id).toString();

    // filter current notes list by the selected id when the trash button is clicked
    currentNotesList = currentNotesList.filter(selected => {
        // return all the notes except the selected one to delete it
        return selected.id != note;
    });

    // add writeFile to re-write db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(currentNotesList));
    // repond to user delete request with note list
    res.json(currentNotesList);
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

// Functionality
// adds or deletes json objects when a note is added or deleted
function editDb() {
    fs.writeFile("db/db.json", JSON.stringify(notes,'\t'), err => {
        if (err) throw err;
        return true;
    });
};

module.exports = router;



