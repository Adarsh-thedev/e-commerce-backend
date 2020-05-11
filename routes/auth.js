const express = require('express');
const router = express.Router();

router.get('/signout', (req,res)=>{
    res.json('Signout');
})

module.exports = router;