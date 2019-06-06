const {SERVER_PORT, COOKIE_KEY} = require("./constants");
const Express = require('express');
const passport = require("passport");
const app = Express();
const router = require('./routes');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const initiateMongo = require('./models');
const cookieSession = require('cookie-session');
const dataRouter = require('./routes/data');
const verifyToken = require('./utilities').verifyToken;
const axios = require('axios');
const multer = require('multer');
const upload = multer();


const dataRouteMiddleware = (req, res, next) => {
    console.log(`hadd hai yar ${JSON.stringify(req.body)}`);
    console.log(req.headers);
    let user = verifyToken(req.headers.authorization);
    if(user){
        req.userId = user._id;
        next();
    } else {
        res.send(`{message: 'Not authenticated', status: 0}`);
    }
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

initiateMongo();

app.use(passport.initialize());
app.use(passport.session());
require('./auth/google.auth');

app.use('/', router);
app.use('/auth', authRouter);
app.use('/data',dataRouteMiddleware, upload.none(), dataRouter);

app.get('/', (req, res) => {
    console.log("Hello world");
    res.send("Hello world");
});

app.listen(SERVER_PORT, () => {
    console.log(`Listening into http://localhost:${SERVER_PORT}/`)
});