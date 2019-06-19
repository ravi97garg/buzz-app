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
            if(err){
                console.error(err);
                res.send({message: 'error while verifying in authenticate.js', status: 0})
            }
        });
    } else {
        res.send({message: 'error while verifying in authenticate.js', status: 0});
    }
});

module.exports = router;