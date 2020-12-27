// Home route
import express from 'express';

const app = express();
const data = require('../utils/covid-data');

module.exports = (req, res) => {
  const address = req.query.address;
  data(address, (err, { newConfirmed, totalConfirmed, totalDeaths }) => {
    //console.log(newConfirmed, totalConfirmed, totaldeaths);

    // Check for errors
    if (err) {
      return res.send({ err });
    } else {
      res.send({ newConfirmed, totalConfirmed, totalDeaths });
    }
  });
  res.render('home', { title: 'COVID19 Tracker', data });
};
