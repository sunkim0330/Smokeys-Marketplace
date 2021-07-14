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
        _id: userAccount._id,
        isUser: true,
        firstName: userAccount.firstName,
        lastName: userAccount.lastName,
        email: userAccount.email,
        location: userAccount.location,
        createdAt: userAccount.createdAt,
        updatedAt: userAccount.updatedAt
      }
    } else {
      let newUser = await new Users({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value
      }).save()

      userData = {
        isUser: false,
        userId: newUser._id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value
      }
    }

    return done(null, userData);
  }

));