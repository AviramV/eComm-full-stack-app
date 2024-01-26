const express = require("express");
const router = express.Router();
const db = require("../db");
require("dotenv").config();
const { isLoggedIn, checkUserExists } = require("../middleware/auth");
const { register } = require("../../controller/auth");
const { passport } = require("passport");

module.exports = (app, passport) => {
  app.use(router);

  router.post(
    "/register",
    checkUserExists,
    register,
    passport.authenticate("local"),
    (req, res) => {
      const { username } = req.user;
      res
        .status(201)
        .send({ message: "Successfully registered", user: username });
    }
  );

  router.get("/login", (req, res) => {
    if (req.isUnauthenticated())
      return res.status(401).send({ message: "not logged in" });
    res.send(req.user);
  });

  router.post(
    "/login",
    passport.authenticate("local", {
      failureMessage: "Incorrect username or password.",
    }),
    (req, res) => {
      const { username, id } = req.user;
      res.status(200).send({ username, id });
    }
  );

  router.post("/logout", isLoggedIn, (req, res) => {
    req.logout((err) => {
      if (err) return res.send(err);
      res.send(`Logged out successfully`);
    });
  });

  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: `${process.env.CLIENT_URL}`,
      failureMessage: "Failed to login with google",
      failureRedirect: `${process.env.CLIENT_URL}/login`,
    })
  );

  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );

  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: `${process.env.CLIENT_URL}`,
      failureMessage: "Failed to login with facebook",
      failureRedirect: `${process.env.CLIENT_URL}/login`,
    })
  );
};
