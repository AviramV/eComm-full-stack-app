const bcrypt = require("bcrypt");

module.exports = {
  // Hash and salt a password
  async passwordHash(password, saltRounds) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      console.log(err);
    }
    return null;
  },
};
