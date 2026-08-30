const express = require('express');
const profileController = require('./../controllers/profileController');
const router = express.Router();
router.get('/profile-stats/:id',profileController.profile_stats);
module.exports = router;