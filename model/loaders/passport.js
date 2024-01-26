const passport = require("passport");
const {
  getUser,
  getUserById,
  getOAuthUser,
  addCredentialsForUser,
  createUser,
} = require("../../controller/userService");
const localStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcrypt");

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;

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

        return done(null, {
          id: user.id,
          email: user.email,
          username: user.username,
        });
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
        const { displayName, provider } = profile;
        const googleId = profile.id;
        const email = profile.emails[0].value;

        try {
          // check if user already exists
          const oAuthUser = await getOAuthUser(googleId, provider);
          if (oAuthUser) {
            const user = await getUserById(oAuthUser.user_id);
            return done(null, user);
          }

          // local user exists but first time logging in with google
          const localUser = await getUser(email);
          if (localUser) {
            await addCredentialsForUser(localUser.id, provider, googleId);
            return done(null, {
              id: localUser.id,
              username: localUser.username,
              email: localUser.email,
            });
          }

          // user doesnt exist, create a user
          const user = await createUser(displayName, email);
          await addCredentialsForUser(user.id, provider, googleId);

          // return the user to be serialized
          done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: facebookClientId,
        clientSecret: facebookClientSecret,
        callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
        profileFields: ["id", "displayName", "email"],
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        const { displayName, provider } = profile;
        const facebookId = profile.id;
        const email = profile.emails[0].value;

        try {
          // check if user already exists
          const oAuthUser = await getOAuthUser(facebookId, provider);
          if (oAuthUser) {
            const user = await getUserById(oAuthUser.user_id);
            return done(null, user);
          }

          // local user exists but first time logging in with facebook
          const localUser = await getUser(email);
          if (localUser) {
            await addCredentialsForUser(localUser.id, provider, facebookId);
            return done(null, {
              id: localUser.id,
              username: localUser.username,
              email: localUser.email,
            });
          }

          // user doesnt exist, create a user
          const user = await createUser(displayName, email);
          await addCredentialsForUser(user.id, provider, facebookId);

          // return the user to be serialized
          done(null, user);
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
