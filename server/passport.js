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
  callbackURL: `https://www.rfe3isthebest.com/google/callback`
},
  async function (accessToken, refreshToken, profile, done) {

    let userAccount = await Users.find({ email: profile.emails[0].value })

    let userData;
    if (userAccount.length) {
      userData = {
        _id: userAccount[0]._id,
        isUser: true,
        firstName: userAccount[0].firstName,
        lastName: userAccount[0].lastName,
        email: userAccount[0].email,
        location: userAccount[0].location,
        createdAt: userAccount[0].createdAt,
        updatedAt: userAccount[0].updatedAt
      }
    } else {
      let newUser = await new Users({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value
      }).save()

      userData = {
        isUser: false,
	_id: newUser._id,
        userId: newUser._id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value
      }
    }

    return done(null, userData);
  }

));
