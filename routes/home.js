import express from 'express';
import { calculateLimitAndOffset, paginate } from 'paginate-info';

// Home route
const data = require('../utils/covid-data');
const router = express.Router();

module.exports = () => {
  router.get('/', (req, res, next) => {
    try {
      data(
        (err, { newConfirmed, totalConfirmed, totalDeaths, countryInfo }) => {
          //console.log(newConfirmed, totalConfirmed, totalDeaths);

          // Paginate
          const count = countryInfo.length;
          const initResult = countryInfo.slice(currentPage, 10);

          // Check for errors
          if (err) {
            return res.send({ err });
          } else {
            return res.render('home', {
              pageTitle: 'COVID-19 HOME',
              newConfirmed,
              totalConfirmed,
              totalDeaths,
              initResult // <- loading the first 10 results
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
