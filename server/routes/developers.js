// routes/developers.js
const express = require('express');
const router = express.Router();
const PapopbotDev = require('../models/PapopbotDev');
const DevDetails = require('../models/DevDetails');
const DevImage = require('../models/DevImage');
const DevPosition = require('../models/DevPosition');

// GET all developers
router.get('/', (req, res) => {
    PapopbotDev.findAll({
        include: [
            { model: DevDetails, as: 'details' },
            { model: DevImage, as: 'images' },
            { model: DevPosition, as: 'positions' }
        ]
    })
        .then(devs => res.json(devs))
        .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:id', async (req, res) => {
    try {
        const developer = await PapopbotDev.findByPk(req.params.id, {
            include: [
                { model: DevDetails, as: 'details' },
                { model: DevImage, as: 'images' }, 
                { model: DevPosition, as: 'positions' }
            ]
        });
      
        if (!developer) {
            return res.status(404).json({ message: 'Developer not found' });
        }
      
        res.json(developer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;