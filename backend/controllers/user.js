const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.signup_user = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(result => {
        if(result.length >= 1){
            return res.status(422).json({
                message: "User with the same email exists already."
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User created successfully!"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    })
}

exports.login_user = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: "Auth failed."
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            if(result){
                const token = jwt.sign({
                    id: user[0]._id,
                    email: user[0].email
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    message: "Auth successful",
                    user: user[0].email,
                    token: token
                });
            }
            res.status(401).json({
                message: "Auth failed"
            });

        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.delete_user =  (req, res, next) => {
    User.remove({_id: req.params.userId}).exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "User successfully deleted."
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}