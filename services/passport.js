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
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id,
        userName: profile.displayName
      }).save();
      done(null, user);
    }
  )
);
