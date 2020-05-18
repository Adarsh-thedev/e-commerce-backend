const express = require('express');
const router = express.Router();

const {getCategoryById, 
       createCatagory, 
       getAllCategories, 
       getCategory,
       updateCategory
        } = require('../controllers/category');
const {getUserById} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');

//params
router.param('userId',getUserById);
router.param('categroyId',getCategoryById);

//actual routes

//create
router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCatagory);

//read
router.get('/category/:categroyId', getCategory);
router.get('/categories', getAllCategories);

//update
router.put('category/:categroyId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCategory);


module.exports = router;