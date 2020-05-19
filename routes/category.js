const express = require('express');
const router = express.Router();

const {getCategoryById, 
       createCatagory, 
       getAllCategories, 
       getCategory,
       updateCategory,
       removeCategory
        } = require('../controllers/category');
const {getUserById} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');

//params
router.param('userId',getUserById);
router.param('categoryId',getCategoryById);

//actual routes

//create
router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCatagory);

//read
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategories);

//update
router.put('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCategory);

//delete
router.delete('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, removeCategory);


module.exports = router;