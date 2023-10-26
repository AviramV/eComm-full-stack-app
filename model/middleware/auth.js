const { insertUserDetails } = require("../../controller/auth");
const { getUser } = require("../../controller/userService");
const db = require("../db");

module.exports = {
  isLoggedIn(req, res, next) {
    const message =
      req.path === "/logout" ? "Nothing to do here" : "Please log in first";
    if (!req.isAuthenticated()) return res.status(401).send({ message });
    next();
  },

  async checkUserExists(req, res, next) {
    const { username, email } = req.body;
    try {
      const userExists = await getUser(username, email);
      if (userExists)
        return res
          .status(409)
          .send({ message: `Username or email already in use` });
      next();
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal error");
    }
  },
};
