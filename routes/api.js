var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Bar = require('../models/bar');
var Yelp = require('yelp');
var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search/:city', function(req, res) {
  var barsArray = [];
  var barFunction = function(bars, doneCallback) {
    Bar.findOne({barId: bars.id}, function(err, bar) {
      if (err) {
        throw err;
      }
      if (bar) {
        barsArray.push(bar);
        console.log('bar exists');
        return doneCallback(null);
      }
      else {
        var newBar = new Bar();
        newBar.barId = bars.id;
        newBar.name = bars.name;
        newBar.url = bars.url;
        newBar.img = bars.image_url;
        newBar.rating = bars.rating_img_url;
        newBar.snippet = bars.snippet_text;
        newBar.save(function(err, res) {
          if (err) {
            throw err;
          }
          barsArray.push(res);
          console.log('bar inserted');
          return doneCallback(null);
        });
      }
  });
  }

  if (req.user) {
    User.findOneAndUpdate({'_id': req.user.id}, {location: req.params.city}).exec();
  }
    yelp.search({term: 'bars', location: req.params.city})
    .then(function(data) {
      var results = data.businesses;
      async.each(results, barFunction, function(err) {
        if (err) {
          throw err;
        }
        res.json(barsArray);
      })
    .catch(function(err) {
      console.log(err);
    });
});
});

module.exports = router;
