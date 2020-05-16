const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

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

exports.signin = (req,res) => {
    const {email, password} = req.body;
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }

    User.findOne({email}, (err,user)=> {
        if(err || !user) {
            return res.status(400).json({
                error : "Invalid email or user does not exists"
            })
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error : "Email and password do not match"
            })
        }

        //create token
        const token = jwt.sign({_id : user._id}, process.env.SECRET);
        //put token in cookie
        res.cookie("token", token, {expires : new Date(Date.now + 9000)});

        //send response to frontend
        const {_id, name, email, role} = user;
        return res.json({token, user : {_id, name, email, role}});
    })
}

exports.signout = (req,res)=>{
    res.clearCookie("token");
    res.json({
        message : "User Signed Out Successfully",
    });
}

//authenticated routes
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"
});

//custom middlewares
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker) {
        return res.status(403).json({
            error : "Access denied"
        });
    }
    next();
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error : "Access denied for admin role"
        })
    }
    next();
}