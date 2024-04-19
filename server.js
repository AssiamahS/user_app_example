const express = require('express');
const path = require('path');
const app = express();
const api_routes = require('./routes/api_routes'); // Correct path to api_routes.js
const PORT = 3333;
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, './public')));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api', api_routes);

app.listen(PORT, () => {
    console.log('App listening on port', PORT);
});

module.exports = app;
