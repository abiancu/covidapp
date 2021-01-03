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

          //console.log(paginatedData);
          //console.log(paginationInfo);

          // Check for errors
          if (err) {
            return res.send({ err });
          } else {
            return res.render('home', {
              pageTitle: 'COVID-19 HOME',
              newConfirmed,
              totalConfirmed,
              totalDeaths,
              countryInfo,
              paginatedData,
              paginationInfo
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
