const Express = require('express');
const {findUserByID} = require('../services/user.service');
const router = Express.Router();

router.get('/:id', (req, res) => {
    findUserByID(req.params.id).then((user) => {
        res.send(user);
    }).catch((err) => {
        console.error(err);
        res.send({message: 'DBError', status: 2})
    });
});

module.exports = router;