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
const {verifyToken} = require('./utilities');
const axios = require('axios');
const { cloudinaryConfig } = require('./config/cloudinary.config');

app.use('*', cloudinaryConfig);

const dataRouteMiddleware = (req, res, next) => {
    let user = verifyToken(req.headers.authorization);
    if(user){
        req.userId = user._id;
        req.user = user;
        next();
    } else {
        res.send({message: 'Not authenticated', status: 0});
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
app.use('/data',dataRouteMiddleware, dataRouter);

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(SERVER_PORT, () => {
    console.log(`Listening into http://localhost:${SERVER_PORT}/`)
});