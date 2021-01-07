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
          const { currentPage, pageSize } = countryInfo;
          const { limit, offset } = calculateLimitAndOffset(
            currentPage,
            pageSize
          );
          const count = countryInfo.length;
          const paginatedData = countryInfo.slice(offset, offset + limit);
          const paginationInfo = paginate(currentPage, count, paginatedData);

          console.log(paginationInfo);

          const page = paginationInfo.currentPage;

          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;

          // Load initial resutls (20 per page)
          const initResult = countryInfo.slice(startIndex, endIndex);

          // Store more results
          const moreResults = {};

          // Load next results
          moreResults.next = {
            page: page + 1,
            limit: limit
          };

          // Load previous results
          moreResults.previous = {
            page: page - 1,
            limit: limit
          };

          moreResults.results = initResult;
          console.log(moreResults);

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
