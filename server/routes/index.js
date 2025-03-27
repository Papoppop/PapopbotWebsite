const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
    res.send('This is the main page');
});

// Mount resource routers
router.use('/users', require('./user'));
router.use('/developers', require('./developers'));

module.exports = router;