import express from 'express';

// Home route
const data = require('../utils/covid-data');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, res, next) => {
        try {
            data(
                (err, {
                    newConfirmed,
                    totalConfirmed,
                    totalDeaths,
                    countryInfo
                }) => {
                    console.log(req);
                    // Pagination
                    let dataSet = {
                        countries: countryInfo,
                        page: req.query ? (req.query.page ? req.query.page : 1) : 1,
                        rows: 10
                    };

                    let pagination = (countries, page, rows) => {
                        var startIndex = (page - 1) * rows;
                        var endIndex = startIndex + rows;

                        var restuls = countryInfo.slice(startIndex, endIndex);

                        var pages = Math.ceil(countries.length / rows);

                        return {
                            countries: restuls,
                            pages: pages
                        };
                    };

                    let loadData = pagination(dataSet.countries, dataSet.page, dataSet.rows);
                    

                    // Check for errors
                    if (err) {
                        return res.send(err);
                    }

                    return res.render('home', {
                        pageTitle: 'COVID-19 HOME',
                        newConfirmed,
                        totalConfirmed,
                        totalDeaths,
                        countries: loadData.countries,
                        pages: loadData.pages
                    });
                }
            );
        } catch (error) {
            return next(error);
        }
    });

    // Route for rendering data?

    return router;
};
