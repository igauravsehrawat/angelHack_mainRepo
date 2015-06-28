var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require('../models/Event.js');
var EventGif = require('../models/EventGif.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Event.find(function (err, outputs) {
    if (err) return next(err);
    res.json(outputs);
  });
});

/* POST /todos */
router.post('/', function(req, res, next) {
  Event.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  Event.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  Event.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// gif
router.get('/gifs', function(req, res, next) {
  EventGif.find(function (err, outputs) {
    if (err) return next(err);
    res.json(outputs);
  });
});

router.post('/gifs', function(req, res, next) {
  EventGif.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/gifs/:gif_id', function(req, res, next) {
    var id = req.params('gif_id');
    var url = req.params('gifImageUrl')
    var update = {$push: {"gifImagesUrl": url}};
    EventGif.findOneAndUpdate(id, update, function(err, response){
        if (err) return err;
        return res.json(response);
    });
});

module.exports = router;
