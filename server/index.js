const Express = require('express');
const passport = require("passport");
const cors = require('cors');

const bodyParser = require('body-parser');
const initiateMongo = require('./models');
const router = require('./routes');
const { cloudinaryConfig } = require('./config/cloudinary.config');
// const {cors} = require("./middlewares");

const {SERVER_PORT} = require("./constants");
const app = Express();

app.use(cloudinaryConfig);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

initiateMongo();

app.use(passport.initialize());
app.use(passport.session());
require('./auth/google.auth');

app.use('/', router);

app.listen(SERVER_PORT, () => {
    console.log(`Listening into http://localhost:${SERVER_PORT}/`)
});