const express = require('express');
const userController = require('./../controllers/userController');
const Router = express.Router();
Router.param('id', userController.checkID);
Router.route('/')
  .get(userController.getAllUsers)
  .post(userController.checkBody, userController.createUser);
Router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = Router;
