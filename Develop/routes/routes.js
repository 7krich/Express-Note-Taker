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
    addDb();
    return console.info(`Added new note: ${newNotes.title}`);
});



