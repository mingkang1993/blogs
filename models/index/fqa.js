/**
 * Created by T-30 on 2015-3-3.
 */
var express = require('express');
var roult = express.Router();
var fqa = require("../../database/datasTable/FQA");

roult.post('/fqAdvice',function(req,res) {
    fqa.create({
        user_name:req.body.user_name,
        email:req.body.email,
        qq:req.body.qq,
        content:req.body.content,
        state:1
    }).success(function (user) {
        res.send({state : true});
    }).error(function (err) {
        console.log(err)
    })
});

module.exports = roult;