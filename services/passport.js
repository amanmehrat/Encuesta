const passport = require("passport");
const gooogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const moongoose = require("mongoose");
const User = moongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new gooogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleSecretId,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log("Existing User Found");
          console.log(existingUser);
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            userName: profile.displayName
          })
            .save()
            .then(user => {
              done(null, user);
            });
          console.log("New User Found");
        }
      });
    }
  )
);
