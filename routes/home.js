import express from 'express';

// Home route
const data = require('../utils/covid-data');
const router = express.Router();

module.exports = () => {
  router.get('/', (req, res, next) => {
    try {
      const address = req.query.address;
      data(
        address,
        (err, { newConfirmed, totalConfirmed, totalDeaths, countryInfo }) => {
          //console.log(newConfirmed, totalConfirmed, totalDeaths);
          console.log(countryInfo);

          // Check for errors
          if (err) {
            return res.send({ err });
          } else {
            return res.render('home', {
              pageTitle: 'COVID-19 HOME',
              newConfirmed,
              totalConfirmed,
              totalDeaths,
              countryInfo
            });
          }
        }
      );
    } catch (error) {
      return next(error);
    }
  });
  return router;
};
