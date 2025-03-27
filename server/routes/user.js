// routes/users.js
const express = require('express');
const argon2 = require('argon2');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', (req, res) => {
    User.findAll()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// POST create new user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await argon2.hash(password);
        const user = await User.create({ username, email, password: hashedPassword });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;