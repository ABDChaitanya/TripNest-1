const express = require('express');
const flightController = require('./../controllers/flightController');
const router = express.Router();
router.post('/search',flightController.searchFlight);
module.exports = router;