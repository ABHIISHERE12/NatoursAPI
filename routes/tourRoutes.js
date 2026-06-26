const express = require('express');
const fs = require('fs');
const tourController = require('./../controllers/tourController');
Router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
Router.route('/:id')
  .get(tourController.getTour)
  .patch(tourCOntroller.updateTour)
  .delete(tourController.deleteTour);
module.exports = Router;
