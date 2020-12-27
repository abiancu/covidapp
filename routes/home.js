// Home route
import express from 'express';

const app = express();

module.exports = (req, res) => {
  //console.log(req);
  res.render('home', { title: 'COVID19 Tracker' });
};
