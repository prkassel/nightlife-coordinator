var express = require('express');

module.exports = function(router, passport) {

/* GET home page. */
router.get('/', function(req, res) {
  var name = "";
  console.log(req.user);
  if (req.user) {
    var name = req.user.local.name || req.user.facebook.name;
    var id = req.user.id;
    var location = req.user.location;
  }
  res.render('index', { title: 'Home', user: name, id: id, location: location});
});


router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', {user: req.user});
});

router.get('/signup', function(req, res) {
  res.render('signup', {title: 'Sign Up', message: req.flash('signUpMessage'), user: req.user});
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));

//LOCAL AUTH
router.get('/login', function(req, res) {
  res.render('login', {title: 'Log In', message: req.flash('loginMessage'), user: req.user});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect: '/login',
  failureFlash: true
}));

//FACEBOOK AUTH
router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

}
