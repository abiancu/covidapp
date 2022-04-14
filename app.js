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

// Serve static files
app.use(express.static(path.join(__dirname, 'src/static/')));
app.use(express.static(path.join(__dirname, './src/static/img')));


// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views/pages'));

// Locals
const date = new Date();
let year = date.getFullYear();
app.locals.pageTitle = 'COVID19-HOME';
app.locals.covidGlobal = 'COVID-19';
app.locals.footerContent = `© ${year} Copyright: Biancucci`;
app.locals.pageTitleGlobalCases = 'Global Cases';


// Home page
app.use(route());


module.exports = app;

