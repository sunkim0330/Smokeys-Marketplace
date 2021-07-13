const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('../database');
require('dotenv').config();


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ACCESS_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `/google/callback`
},
  async function (accessToken, refreshToken, profile, done) {

    let userAccount = await Users.find({ email: profile.emails[0].value })

    let userData;
    if (userAccount.length) {
      userData = {
        isUser: true,
        ...userAccount
      }
    } else {
      userData = {
        isUser: false,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      }
    }
    console.log(userData)
    return done(null, userData);
  }

));