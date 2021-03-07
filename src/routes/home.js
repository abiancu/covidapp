import express from 'express';

// Home route
const data = require('../utils/covid-data');
const router = express.Router();
const app = express();

module.exports = () => {
    // Global variables    
    app.locals._totalconfirmed = '';
    app.locals._totalDeaths = '';
    app.locals._countryInfo = '';
    // Home route
    router.get('/', (req, res, next) => {
        try {
            data(
                (err, {
                    totalConfirmed,
                    totalDeaths,
                    countryInfo
                }) => {
                    app.locals._totalconfirmed = totalConfirmed;
                    app.locals._totalDeaths = totalDeaths;
                    app.locals._countryInfo = countryInfo;
                    
                    // // Check for errors
                    if (err) {
                        return res.send(err);
                    } else {
                        return res.send('<h1>Home page</h1>');
                    }
                }
            );
        } catch (error) {
            return next(error);
        }
    });

    // Global Route
    router.get('/global-cases', (req, res) => {
        // Pagination
        let dataSet = {
            countries: app.locals._countryInfo,
            page: req.query ? (req.query.page ? req.query.page : 1) : 1,
            rows: 20
        };

        let pagination = (countries, page, rows) => {
            var startIndex = (page - 1) * rows;
            var endIndex = startIndex + rows;

            var restuls = app.locals._countryInfo.slice(startIndex, endIndex);

            var pages = Math.ceil(countries.length / rows);

            return {
                countries: restuls,
                pages: pages
            };
        };

        let loadData = pagination(dataSet.countries, dataSet.page, dataSet.rows);
        
      
        return res.render('global-cases', {
            pageTitle: 'COVID-19 Global Cases',
            totalConfirmed: app.locals._totalconfirmed,
            totalDeaths: app.locals._totalDeaths,
            countries: loadData.countries,
            pages: loadData.pages,
            current: dataSet.page
        });
    });
   

    return router;
};
