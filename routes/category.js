const express = require('express');
const router = express.Router();

const {getCategoryById, createCatagory, getAllCategories, getCategory} = require('../controllers/category');
const {getUserById} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');

//params
router.param('userId',getUserById);
router.param('categroyId',getCategoryById);

//actual routes

router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCatagory);

router.get('/category/:categroyId', getCategory);
router.get('/categories', getAllCategories);


module.exports = router;