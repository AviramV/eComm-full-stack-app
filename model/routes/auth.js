const express = require("express");
const router = express.Router();
const db = require("../db");
const { isLoggedIn, checkUserExists } = require("../middleware/auth");
const { register } = require("../../controller/auth");

module.exports = (app, passport) => {
  app.use(router);

  router.post("/register", checkUserExists, register);

  router.get("/login", (req, res) => {
    if (!req.user) return res.status(404).send("not logged in");
    res.send(`Hello ${req.user.username}`);
  });

  router.post(
    "/login",
    passport.authenticate("local", { failureMessage: true }),
    (req, res) => {
      res.send(`Logged in as ${req.body.username}`);
    }
  );

  router.post("/logout", isLoggedIn, (req, res) => {
    req.logout((err) => {
      if (err) return res.send(err);
      res.send(`Logged out successfully`);
    });
  });
};
