import '@babel/polyfill';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';


const route = require('./routes/routes');

// Using express express engine
const app = express();

// Port number
const PORT = process.env.POR || 8080;

// Request Body Parsers
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());


// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views/pages'));

// Locals
app.locals.pageTitle = 'COVID19-HOME';
app.locals.covidGlobal = 'COVID-19';
app.locals.footerContent = '© 2020 Copyright: Biancucci\'s Designed';
app.locals.pageTitleGlobalCases = 'Global Cases';

// Serve static files
app.use(express.static(path.join(__dirname, '/static')));
app.use(express.static(path.join(__dirname, '/static/img')));

// Home page
app.use(route());

// Listening
app.listen(PORT, console.log(`Running on port: ${PORT}`));

