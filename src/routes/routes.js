const express = require('express');
const constants = require('../api-config');
const request = require('request');

// Home route
// const data = require('../utils/covid-data');
const router = express.Router();
const app = express();

module.exports = () => {
    // Global variables
    app.locals._countryInfo = null;

    // Middleware
    let middleware = (req, res, next) => {
        req.tc = null;
        req.td = null;
        next();
    };
    // Home route
    router.get('/', (req, res, next) => {
        res.locals._totalconfirmed = 0;
        res.locals._totalDeaths = 0;
        try {
            var url = constants;
            request(url, function (error, response, body) {
                if(error) {
                    throw new Error('SOMETHING WRONG WITH API');
                } else {
                    // make sure the data is JSON      
                    var jsonData = JSON.parse(body);
                    var countries = jsonData.response;
                    
                    app.locals._countryInfo = countries;
                    countries.forEach(c => {
                        res.locals._totalconfirmed = res.locals._totalconfirmed + c.cases.total;
                        res.locals._totalDeaths = res.locals._totalDeaths + c.deaths.total;
                    });
                   
                    // Pass total count of deaths and cases to other route using a middleware that takes an array
                    middleware = [res.locals._totalconfirmed, res.locals._totalDeaths];
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
    router.get('/global-cases', middleware, (req, res, next) => {
        try {
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
                totalConfirmed: middleware[0],
                totalDeaths: middleware[1],
                countries: loadData.countries,
                pages: loadData.pages,
                current: dataSet.page
            });
        } catch (error) {
            return next(error);
        }
    });
   

    return router;
};
