const express = require('express');
const router = express.Router();

const {getOrderById} = require('../controllers/order');
const {getUserById} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const {updateStock} = require('../controllers/product');

//param
router.param('/:userId', getUserById);
router.param('/:orderId', getOrderById);

//actual routes
//create

//read

module.exports = router;