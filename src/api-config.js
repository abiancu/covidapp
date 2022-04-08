// read from (dotenv) file
require('dotenv').config();

const constants = {
    method: 'GET',
    url: process.env.APPURL,
    headers: {
        'x-rapidapi-key': process.env.APIKEY,
        'x-rapidapi-host': process.env.APPHOSTKEY,
        'content-type': 'application/json'
    }
};

module.exports = constants;
