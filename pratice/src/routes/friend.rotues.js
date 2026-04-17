const express = require('express');
const identifyUser = require('../middlewares/auth.middleware');
const friendController = require('../controllers/friend.controller');
const friendRouter = express.Router();

friendRouter.post('/request/:userId', identifyUser, friendController.sendFriendRequestController);
friendRouter.post('/accept/:requestId', identifyUser, friendController.acceptFriendRequestController);
friendRouter.post('/reject/:requestId', identifyUser, friendController.rejectFriendRequestController);
friendRouter.delete('/unfriend/:userId', identifyUser, friendController.unfriendController);

module.exports = friendRouter;
