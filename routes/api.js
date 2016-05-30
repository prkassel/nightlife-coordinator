var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Yelp = require('yelp');
var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search/:city', function(req, res) {
  if (req.user) {
    User.findOneAndUpdate({'_id': req.user.id}, {location: req.params.city}).exec();
  }
    yelp.search({term: 'bars', location: req.params.city})
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
