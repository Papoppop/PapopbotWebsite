const express = require('express');
const argon2 = require('argon2');
const router = express.Router();
const User = require('../models/User');
const PapopbotDev = require('../models/PapopbotDev');
const DevDetails = require('../models/DevDetails');

router.get('/', (req, res) => {
    res.send('This is the main page');
});

router.get('/api', (req, res) => {
    res.send('API Home');
});

router.get('/api/users', (req, res) => {
    User.findAll()
    .then(users => res.json(users))
});

router.post('/api/users', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await argon2.hash(password);

        // Create the user with the hashed password
        const user = await User.create({ username, email, password: hashedPassword });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;