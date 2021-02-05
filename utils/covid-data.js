// Get the api info from api-config
import constants from '../api-config';
import request from 'request';

/*
 * Address = uri
 * callback = is a function that returns the data
 */
const data = (callback) => {
    // Api URL
    const url = constants.covidData.BASE_URL;
    // Console.log(url);

    request(
        {
            url,
            json: true
        },
        (err, {body}) => {
            // console.log(body);
            err
                ? callback('Error fetch data', undefined)
                : callback(undefined, {
                    newConfirmed: body.Global.NewConfirmed,
                    totalConfirmed: body.Global.TotalConfirmed,
                    totalDeaths: body.Global.TotalDeaths,
                    countryInfo: body.Countries
                });
        }
    );
};

module.exports = data;
