const db = require("../model/db");
const { passwordHash } = require("../model/utils");

exports.register = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = await passwordHash(password.toString(), 10);
    const dbRes = await db.query(
      `insert into users(email, username, password) values ($1, $2, $3) RETURNING username`,
      [email, username, hashedPassword]
    );
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
};
