import express from 'express';
import path from 'path';

// Using express
const app = express();

// Port number
const PORT = 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Locals
app.locals.pageTitle = 'COVID19-HOME';
app.locals.covid_global = 'COVID-19 Global Cases';
// Serve static files
app.use(express.static(path.join(__dirname, '/static')));
app.use(express.static(path.join(__dirname, '/static/img')));

// Home page
app.get('/', (req, res) => {
  res.render('home', { title: 'COVID19 Tracker' });
});

// Listening
app.listen(PORT, console.log(`Running on port: ${PORT}`));
