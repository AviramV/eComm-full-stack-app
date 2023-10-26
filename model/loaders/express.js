require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const secret = process.env.SECRET;
const clientURL = process.env.CLIENT_URL;

module.exports = (app) => {
  app.use(express.json());
  app.use(cors({ origin: clientURL, credentials: true }));

  app.use(
    session({
      secret,
      cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false, sameSite: "Lax" },
      resave: false,
      saveUninitialized: false,
    })
  );
};
