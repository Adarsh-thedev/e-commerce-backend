const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.signup = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }

    const user = new User(req.body);
    user.save((err,user) => {
        if(err) {
            return res.status(400).json({
                err : "Unable to save user"
            })
        }
        res.json({
            id : user.id,
            name : user.name,
            email : user.email
        });
    })
}

exports.signout = (req,res)=>{
    res.json({
        message : "User Signed Out",
        Time : Date.now()
    });
}