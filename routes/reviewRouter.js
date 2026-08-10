const reviewController = require('./../controllers/reviewController');

const express = require('express');
const router = express.Router();

router
 .get('/',reviewController.getAll)
 .get('/:id',reviewController.getReview)
 .patch('/update/:id',reviewController.updateReview)
 .delete('/delete/:id',reviewController.deleteReview)
 .post('/',reviewController.createReview) 

module.exports = router;