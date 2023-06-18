const express = require('express');
const router = express.Router();
const { isLoggedIn, passwordHash } = require('../services/authService');
const { getUser } = require('../services/userService');
const db = require('../db')

module.exports = (app, passport) => {
    app.use(router);

    router.post('/register', async (req, res) => {
        const { email, username, password } = req.body;
        try {
            const userExists = await getUser(username)
            if(userExists) return res.status(409).send(`User "${username}" already exists`)

            const hashedPassword = await passwordHash(password.toString(), 10);
            const dbRes = await db.query(`insert into users(email, user_name, password) values ($1, $2, $3) RETURNING user_name`,
                [email, username, hashedPassword]);
            res.status(201).send(`Successfully registered ${dbRes.rows[0].user_name}`)
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal error');
        }
    });
    
    router.get('/login', (req, res) => {
        if (!req.user) return res.status(404).send('not logged in')
        res.send(`Hello ${req.user.username}`)
    })
    
    router.post('/login', passport.authenticate('local', { failureMessage: true }), (req, res) => {
        res.send(`Logged in as ${req.body.username}`);
    })
    
    router.post('/logout', isLoggedIn, (req, res) => {
        req.logout(err => {
            if (err) return res.send(err)
            res.send(`Logged out successfully`)
        });
    })
}