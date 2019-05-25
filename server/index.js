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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cookieSession({
    maxAge: 7*24*60*60*1000,
    keys: [COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

initiateMongo();

app.use('/', router);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    console.log("Hello world");
    res.send();
});

app.listen(SERVER_PORT, () => {
    console.log(`Listening into http://localhost:${SERVER_PORT}/`)
});