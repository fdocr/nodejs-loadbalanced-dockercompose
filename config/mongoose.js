var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db, function(err){
        if (err) console.log(err);
    });

    require('../models/visits');

    return db;
};
