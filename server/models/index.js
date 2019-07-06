const mongoose = require('mongoose');


module.exports = () => {
    const db = 'mongodb://localhost/buzz-db';

    // These are the upgraded version commands of mongoose to remove deprecation warning
    mongoose.connect(db, { useNewUrlParser: true });
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
};
