const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// get notes route
router.get("/api/notes", (req, res) => {
    // return saved notes in db.json file
    res.json(notes);
});

// post notes route
router.post("/api/notes", (req, res) => {
    // new note = note input body
    let newNotes = req.body;
    notes.push(newNotes);
    // call add to db function to add new notes to db.json
    editDb();
    return console.info(`Added new note: ${newNotes.title}`);
});

// get note by ID
router.get("/api/notes/:id", (req, res) => {
    // display json for note array for given ID
    res.json(notes[req.params.id])
});

// Delete notes by ID
router.delete("/api/notes/:id", (req, res) => {
    notes.splice(req.params.id, 1);
    editDb();
    console.log(`Note id: ${req.params.id} deleted.`)
});

module.exports = router;



