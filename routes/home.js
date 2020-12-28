import express from 'express';

// Home route
const data = require('../utils/covid-data');
const router = express.Router();

module.exports = () => {
  router.get('/', (req, res, next) => {
    try {
      const address = req.query.address;
      data(address, (err, { newConfirmed, totalConfirmed, totalDeaths }) => {
        //console.log(newConfirmed, totalConfirmed, totalDeaths);

        // Check for errors
        if (err) {
          return res.send({ err });
        } else {
          return res.render('home', {
            pageTitle: 'COVID-19 HOME',
            newConfirmed,
            totalConfirmed,
            totalDeaths
          });
        }
      });
    } catch (error) {
      return next(error);
    }
  });
  return router;
};
