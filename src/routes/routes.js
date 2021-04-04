import express from 'express';
import constants from '../api-config';
import request from 'request';

// Home route
// const data = require('../utils/covid-data');
const router = express.Router();
const app = express();

module.exports = () => {
    // Global variables    
    app.locals._totalconfirmed = 0;
    app.locals._totalDeaths = 0;
    app.locals._countryInfo = null;
    // Home route
    router.get('/', (req, res, next) => {
        try {
            var url = constants;
            request(url, function (error, response, body) {
                if(response.statusCode !== 200) {
                    console.log(error);
                } else {
                    // make sure the data is JSON      
                    var jsonData = JSON.parse(body);
                    var countries = jsonData.response;
                    
                    app.locals._countryInfo = countries;
                    countries.forEach(c => {
                        app.locals._totalconfirmed = app.locals._totalconfirmed + c.cases.total;
                        app.locals._totalDeaths = app.locals._totalDeaths + c.deaths.total;
                    });

                    // TODO: fix app.local variable. It holds the value so every refresh increments the counter -- inaccurate total caounts
                }
            });

            return res.render('index', {
                pageTitle: app.locals.pageTitle
            });
        } catch (error) {
            return next(error);
        }
    });

    // Global Route
    router.get('/global-cases', (req, res) => {

        console.log(app.locals._countryInfo);
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
