const db = require("../model/db");
const { passwordHash } = require("../model/utils");

exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = await passwordHash(password.toString(), 10);
    const dbRes = await db.query(
      `insert into users(email, user_name, password) values ($1, $2, $3) RETURNING user_name`,
      [email, username, hashedPassword]
    );
    res.status(201).send(`Successfully registered ${dbRes.rows[0].user_name}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
};
