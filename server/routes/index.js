const Express = require('express');
const router = Express.Router();
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = require('../constants').JWT_KEY;

router.get('/', (req, res) => {
    res.send(`Hello World`);
});

router.post('/authenticate', (req, res) => {
    if(req.body.token){
        jwt.verify(req.body.token, PRIVATE_KEY, function(err, decoded) {
            res.send(decoded);
        });
    } else {
        console.log("error");
        res.send('error while verifying in authenticate.js');
    }
});

module.exports = router;