const {SERVER_PORT} = require("./constants");
const Express = require('express');
const passport = require("passport");
const app = Express();
const router = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const initiateMongo = require('./models');
const {cloudinaryConfig} = require('./config/cloudinary.config');
const cors = require('cors');

app.use('*', cloudinaryConfig);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

initiateMongo();

app.use(passport.initialize());
app.use(passport.session());
require('./auth/google.auth');

app.use('/', router);

app.listen(SERVER_PORT, () => {
    console.log(`Listening into http://localhost:${SERVER_PORT}/`)
});