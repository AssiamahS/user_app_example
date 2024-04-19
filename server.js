import express from 'express';
const app = express();
const api_routes = require('./routes/api_routes');
const PORT = 3333;
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/', api_routes);

app.listen(PORT, () => {
    console.log('App listening on port', PORT);
});

module.exports = app;
