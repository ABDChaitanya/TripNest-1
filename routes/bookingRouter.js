const bookingController = require('./../controllers/bookingController');
const express = require('express');
const router = express.Router();
router.post('/createBooking',bookingController.createBooking);
router.get('/getAll',bookingController.getallbookings);
router.get('/checkout/:id',bookingController.getCheckout);
router.post('/:id/create-payment-intent',bookingController.createPaymentIntent);
router.post('/booking-success/:id',bookingController.bookingsuccess);
module.exports = router;