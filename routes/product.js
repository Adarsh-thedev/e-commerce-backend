const express = require('express');
const router = express.Router();

const {getProductById, 
        createProduct, 
        getProduct, 
        photo,
        deleteProduct,
        updateProduct
    } = require('../controllers/product');
const {getUserById} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');

//params
router.param('productId',getProductById);
router.param('userId',getUserById);

//actual routes
//create route
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct);

//read routes
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);

//delete route
router.delete('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct);

//update
router.put('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct);

module.exports = router;