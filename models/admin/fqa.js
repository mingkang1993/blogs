/**
 * Created by T-30 on 2015-3-3.
 */
var express = require('express');
var app = express.Router();
var fqa = require("../../database/datasTable/FQA");


app.post('/admin/FQA/unreadFQA',function(req,res) {
    fqa.findAll({
        where:{state:1},
        order: [['id', 'DESC' ]]
    }).success(function (data) {
        var forData = [];
        if(data.length > 5){
           for(i=0;i<=5;i++){
               if(i == 5){
                   res.send({state:true,data:forData,dataLength:data.length})
                   return
               }
               forData.push(data[i])
           }
        }else{
           res.send({state:true,data:data,dataLength:data.length})
        }
    }).error(function (err) {
        console.log(err)
    })
});


app.post('/admin/FQA/list',function(req,res) {
    var offset = req.body.offsetNum;
    if(req.body.id == 0){
        fqa.findAll({
            limit: 10,order: [['id', 'DESC' ]],offset : offset * 10
        }).success(function (data) {
            if(data.length != 0){
                res.send({state:true,datas:data});
            }else{
                res.send({state:false});
            }
        }).error(function (err) {
            console.log(err);
        });
    }else{
        fqa.findAll({
            where:{state:req.body.id},
            limit: 10,order: [['id', 'DESC' ]],offset : offset * 10
        }).success(function (data) {
            if(data.length != 0){
                res.send({state:true,datas:data});
            }else{
                res.send({state:false});
            }
        }).error(function (err) {
            console.log(err);
        });
    }
});

app.post('/admin/FQA/listLength',function(req,res) {
    if(req.body.id == 0){
        fqa.findAll().success(function (data) {
            res.send({state:true,dataLength:data.length});
        }).error(function (err) {
            console.log(err);
        });
    }else{
        fqa.findAll({
            where:{state:req.body.id}
        }).success(function (data) {
            res.send({state:true,dataLength:data.length});
        }).error(function (err) {
            console.log(err);
        });
    }
});


app.post('/admin/FQA/viewFQAData',function(req,res) {
    fqa.update(
      {state : 2},
      {where:{id:req.body.id}}
    ).success(function (data) {
        fqa.find(
            {where:{id:req.body.id}}
        ).success(function (data) {
            res.send({state:true,datas:data});
        }).error(function (err) {
            console.log(err);
        });
    }).error(function (err) {
        console.log(err);
    });
});


app.post('/admin/FQA/delete',function(req,res) {
    fqa.destroy({
        where: {id:req.body.id}
    }).success(function(){
        res.send({state:true})
    })
});

app.post('/admin/FQA/selete',function(req,res) {
    fqa.findAll({
        where: "content LIKE'%"+ req.body.val +"%'"
    }).success(function(data){
        res.send({state:true,datas:data})
    })
});




module.exports = app;