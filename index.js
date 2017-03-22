const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const port = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(session({secret: 'some-rando-string'}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy({
  clientID: '1778103345851123',
  clientSecret: '781119260cd710b05df70ea964842612',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done){
  return done(null, profile)
}))

app.get('/auth/facebook', passport.authenticate('facebook'))
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/me',                   //   '/!#/me' <--- use with ui-router pound sign and exclamation point might need to be swtiched around
  failureRedirect: '/auth/facebook'         //   '/!#/auth/facebook' <--- use with ui-router pound sign and exclamation point might need to be swtiched around
}), function(req, res){
  console.log(req.session)
})

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res){
  res.send(req.user);
})


app.listen(port, () => {
  console.log(`connected on port: ${port}`);
})
