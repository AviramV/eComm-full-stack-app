const db = require("../model/db");
const { passwordHash } = require("../model/utils");

module.exports = {
  async createUser(username, email) {
    const newLocalUser = await db.query(
      `insert into users(email, username) values ($1, $2) RETURNING id, email, username`,
      [email, username]
    );
    return newLocalUser.rows[0];
  },

  // Get user from database by username or email
  async getUser(usernameOrEmail) {
    const user = await db.query(
      "SELECT * FROM users WHERE username = $1 OR email = $1",
      [usernameOrEmail]
    );
    return user.rows[0];
  },

  async getUserById(id) {
    const user = await db.query(
      "SELECT id, email, username FROM users WHERE id = $1",
      [id]
    );
    return user.rows[0];
  },

  async getOAuthUser(providerUserId, provider) {
    const user = await db.query(
      "SELECT * FROM oauth_credentials WHERE provider_user_id = $1 AND provider = $2",
      [providerUserId, provider]
    );
    return user.rows[0];
  },

  async addCredentialsForUser(localUserId, provider, providerUserId) {
    await db.query(
      `insert into oauth_credentials(user_id, provider, provider_user_id) values ($1, $2, $3)`,
      [localUserId, provider, providerUserId]
    );
  },

  async updateUser(id, data) {
    // if changing the password, it should be hashed and salted
    const isPassword = Object.keys(data).includes("password");
    if (isPassword) {
      const hashedPassword = await passwordHash(data.password.toString(), 10);
      data.password = hashedPassword;
    }

    const columns = Object.keys(data).map(
      (key, index) => `${key} = $${index + 1}`
    );
    const values = Object.values(data);
    const user = await db.query(
      `UPDATE users SET ${columns} WHERE id = $${
        columns.length + 1
      } RETURNING *`,
      [...values, id]
    );

    return user.rows[0];
  },

  async deleteUser(id) {
    return db.query("DELETE FROM users WHERE id = $1", [id]);
  },
};
