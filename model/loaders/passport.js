const passport = require("passport");
const { getUser, getUserById } = require("../../controller/userService");
const { registerWithGoogle } = require("../../controller/auth");
const localStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.use(passport.initialize(), passport.session());

  // Configure passport local strategy
  passport.use(
    new localStrategy(async function (username, password, done) {
      try {
        const user = await getUser(username);
        if (!user) return done(null, false);

        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) return done(null, false);

        return done(null, { id: user.id, username: user.username });
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          done(null, {
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
