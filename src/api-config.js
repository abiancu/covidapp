import secrets from '../secrets';

const constants = {
    method: 'GET',
    url: secrets.url,
    headers: {
        'x-rapidapi-key': secrets.API_KEY,
        'x-rapidapi-host': secrets.HOST_KEY,
        'content-type': 'application/json'
    }
};

export default constants;
