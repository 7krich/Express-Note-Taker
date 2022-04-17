const fs = require('fs');
const path = require('path');
const express = require('express');
const htmlRoutes = require('./routes/routes');

// init express application
const app = express();
const PORT = process.env.PORT || 3001;


// include css & javascript files when HTML file loads in get send file route below
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// require the route.js file
require('./routes/routes');

// if / is the endpoint router weill serve back HTML routes
app.use('/', htmlRoutes);

// route listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});