const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('../database');


passport.serializeUser(function (user, done) {

  done(null, user);
});

passport.deserializeUser(function (user, done) {

  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: "957843573038-1r1kc99r1cc8jboeqnq0g3lt6hcoeqjs.apps.googleusercontent.com",
  clientSecret: "30fe4QTzQOFcbsXuqn7eBR0E",
  callbackURL: "http://localhost:4000/google/callback"
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
    return done(null, userData);
  }

));