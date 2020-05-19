const express = require('express');
const router = express.Router();

const {getProductById, createProduct} = require('../controllers/product');
const {getUserById} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');

//params
router.param('productId',getProductById);
router.param('userId',getUserById);

//actual routes
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct);

module.exports = router;