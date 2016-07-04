/**
 * Created by T-30 on 2015-3-10.
 */
var express = require('express');
// var multer  = require('multer');
var app = express.Router();
var records= require("../../database/datasTable/personal/records");

app.post('/personal/records',function(req,res) {  //listNav点击加载列表
    records.destroy({
        where:{user_name:req.body.userName}
    }).success(function (data) {
        records.create({
            user_name:req.body.userName,
            head_png:req.body.headPng
        }).success(function(){
            records.findAll({
                order:[['id','desc']],
                limit: 10
            }).success(function (data) {
                if(data.length != 0){
                    res.send({state:true,datas:data});
                }else{
                    res.send({state:false});
                }
            }).error(function (err) {
                console.log(err);
            });
        }).error(function (err) {
            console.log(err);
        });
    }).error(function (err) {
        console.log(err);
    });
});

module.exports = app;