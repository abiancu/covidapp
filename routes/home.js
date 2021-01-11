import express from 'express';

// Home route
const data = require('../utils/covid-data');
const router = express.Router();

module.exports = () => {
  router.get('/', (req, res, next) => {
    try {
      data(
        (err, { newConfirmed, totalConfirmed, totalDeaths, countryInfo }) => {
          //console.log(newConfirmed, totalConfirmed, totalDeaths);

          // Pagination
          const firstPage = 1;
          const limit = 10;
          const startIndex = (firstPage - 1) * limit; //pages are  1 index while start index is zero based; so we need to subract one to get index[0]
          const endIndex = firstPage * limit;

          // Loading only few results
          const initResult = countryInfo.slice(startIndex, endIndex);

          // More results
          const pageNumbers = [];
          const totalResults = countryInfo.length;

          // Determining how many pages based on the limit
          for (var i = firstPage; i <= Math.ceil(totalResults / limit); i++) {
            pageNumbers.push(i);
          }
          //console.log(pageNumbers);

          // Check for errors
          if (err) {
            return res.send({ err });
          } else {
            return res.render('home', {
              pageTitle: 'COVID-19 HOME',
              newConfirmed,
              totalConfirmed,
              totalDeaths,
              initResult, // <- loading the first 10 results
              pageNumbers
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
