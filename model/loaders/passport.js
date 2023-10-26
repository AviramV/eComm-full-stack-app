const passport = require("passport");
const { getUser, getUserById } = require("../../controller/userService");
const localStrategy = require("passport-local");
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

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, {
      id: user.id,
      username: user.username,
    });
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
