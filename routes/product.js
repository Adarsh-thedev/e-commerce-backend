const express = require('express');
const router = express.Router();

const {getProductById} = require('../controllers/product');
const {getUserById} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');

//params
router.param('productId',getProductById);
router.param('productId',getUserById);

//actual routes
router.get('/product/:productId', getProductById);

module.exports = router;