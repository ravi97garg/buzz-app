const axios = require('axios');

const authenticateToken = (token) => {
    return axios.post('http://localhost:8080/authenticate', {
        token: token
    })

};

module.exports = {
    authenticateToken
};