var express = require('express'),
  router = express.Router(),
  moment = require('moment'),
  db = require('../config/mongoose'),
  Visit = db().model('Visit');

router.get('/', function(req, res, next) {
    var visitorIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    Visit.findByIp(visitorIp, function(err, visits) {
        if (err) res.render('error', err);

        if (visits.length > 0) {
            var returningVisitor = visits[0],
                previousDate = "[" + moment(returningVisitor.updatedAt).toISOString() + "]",
                previousHits = returningVisitor.hits;

            Visit.incrementHits(visitorIp, function(err) {
                if (err) res.render('error', err);

                res.render('index', {
                    hits: previousHits+1,
                    lastVisit: previousDate
                });
            });
        } else {
            //New visitor -> Create & Save
            var newVisitor = Visit({
                ip: visitorIp,
                hits: 1
            });

            newVisitor.save(function(err) {
                var currentDate = "[" + moment().toISOString() + "]";

                res.render('index', {
                    hits: 1,
                    lastVisit: currentDate
                });
            });
        }
    });

});

module.exports = router;
