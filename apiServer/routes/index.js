var express = require('express');
var router = express.Router();
var Event = require('../models/Event.js');

/* GET home page. */
router.get('/', function(req, res) {
    var everyEvent = null;
    //mongo db query
    Event.find(function (err, events) {
        if (err) return next(err);
        console.log(events);
        everyEvent = events;
        res.render('index', { title: 'Express', everyEvent: everyEvent });
    });

});

module.exports = router;
