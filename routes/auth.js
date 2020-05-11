const express = require('express');
const router = express.Router();

const {signOut} = require('../controllers/auth');

router.get('/signout', signOut);

module.exports = router;