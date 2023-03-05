const Googler = require("../models/googler");

const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },

    (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      Googler.findOrCreate({
        where: {
          googleId: profile.id,
          username: profile.displayName,
          thumbnail: profile._json.picture,
        },
      }).then((user) => {
        if (user) {
          return done(null, user);
        } else {
          Googler.save().then((newUser) => {
            done(null, newUser);
          });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
