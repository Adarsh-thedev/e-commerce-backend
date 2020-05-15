const express = require('express');
const router = express.Router();
const {signout, signup, signin} = require('../controllers/auth');
const { check } = require('express-validator');

router.post('/signup', [
    check('name')
    .isLength({ min: 3 }).withMessage('First name must be at least 3 chars long'),
    check('email')
    .isEmail().withMessage('Invalid email'),
    check('password')
    .isLength({ min: 8, max : 20 }).withMessage('Password must be at least 8-20 chars long')
    .matches(/\d/).withMessage('Password must contain a number')
] , signup);

router.post('/signin', [
    check('email')
    .isEmail().withMessage('Invalid email'),
    check('password')
    .isLength({ min: 1 }).withMessage('Password field is required')
] , signin);

router.get('/signout', signout);

module.exports = router;