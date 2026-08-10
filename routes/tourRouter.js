const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController')
router.get('/getTours',tourController.getAllTours);
router
 .get('/:id',tourController.getTour)
 .post('/update/:id',tourController.updateTour)
 .post('/delete/:id',tourController.deleteTour)
 .post('',tourController.createTour)
module.exports = router