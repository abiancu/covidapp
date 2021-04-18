const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const route = require('./src/routes/routes');

// Using express express engine
const app = express();

// Request Body Parsers
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());


// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views/pages'));

// Locals
app.locals.pageTitle = 'COVID19-HOME';
app.locals.covidGlobal = 'COVID-19';
app.locals.footerContent = '© 2020 Copyright: Biancucci\'s Designed';
app.locals.pageTitleGlobalCases = 'Global Cases';

// Serve static files
app.use(express.static(path.join(__dirname, './src/static')));
app.use(express.static(path.join(__dirname, './src/static/img')));

// Home page
app.use(route());


module.exports = app;

