const express = require('express');
const router = express.Router();

const {getProductById, createProduct, getProduct, photo} = require('../controllers/product');
const {getUserById} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');

//params
router.param('productId',getProductById);
router.param('userId',getUserById);

//actual routes
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct);
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);

module.exports = router;