const mongoose = require('mongoose');

const {DB_NAME} = require('../constants');

module.exports = (req, res, next) => {
    const db = `mongodb://localhost/${DB_NAME}`;

    // These are the upgraded version commands of mongoose to remove deprecation warning
    mongoose.connect(db, {useNewUrlParser: true});
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    // Move to Next middleware
    next();
};