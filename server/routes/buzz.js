
const Express = require('express');
const {createBuzzService, getBuzzService, getCommentService, getReactionService} = require("../services/buzz.service");
const router = Express.Router();

router.post('/createBuzz', (req, res) => {
    try{
        console.log(`lalala  ${JSON.stringify(req.body)}`);
        req.body.postedBy = req.userId;
        createBuzzService(req.body).then(() => {
            res.send({message: 'OK', status: 1});
        }).catch(() => {
            res.send({message: 'DBError', status: 2});
        })
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});

router.post('/getBuzz', (req, res) => {
    const {limit, skip} = req.body;
    var extractedBuzzs = [];
    getBuzzService(limit, skip).then((buzzs) => {
        extractedBuzzs = buzzs;
        buzzs.forEach((buzz, index) => {
            getReactionService(buzz._id).then((res) => {
                extractedBuzzs[index].reactions = res;
            });
            getCommentService(buzz._id).then((res) => {
                extractedBuzzs[index].comments = res;
            });
        });
        console.log(`extracted buzzs ${extractedBuzzs}`);
        res.send({extractedBuzzs, status: 1});
    }).catch((err) => {
        console.log(err);
        res.send({message: 'DBError', status: 2});
    });
});

module.exports = router;