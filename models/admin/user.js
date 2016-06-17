/**
 * Created by T-30 on 2015-2-12.
 */
var express = require('express');
var multer  = require('multer');
var app = express.Router();
var users = require("../../database/datasTable/user");
var db = require("../../database/settings");
var article= require("../../database/datasTable/articles/article").article;

app.post('/admin/user_datas',function(req,res) {
    var offset = 0;
    users.findAll({
        limit: 12,order: [['id', 'DESC' ]],offset : offset * 12
    }).success(function (data) {
        res.send({state:true,data:data})
    }).error(function (err) {
        console.log(err)
    })
});


app.post('/admin/user_detail',function(req,res) {
    db.query("SELECT " +
                "a.id, a.user_name," +
                "a.head_png," +
                "a.email," +
                "a.createdAt," +
                "a.updatedAt," +
                "b.user_name AS 'articleUser_name'," +
                "b.title AS 'articleTitle'," +
                "b.content AS 'articleContent'," +
                "b.createdAt AS 'articleCreatedAt'" +
            "FROM users AS a " +
                "LEFT JOIN articles AS b ON (a.user_name = b.user_name) " +
            "WHERE "+ req.body.id +" = a.id GROUP BY b.id ORDER BY b.id DESC LIMIT 3"
    ).success(function(data){
        res.send(data)
    })
});


app.post('/admin/user_delete',function(req,res) {
    users.destroy({
        where: {id: req.body.id}
    }).success(function (data) {
        article.destroy({
             where: {user_name: req.body.user_name}
         }).success(function () {
            res.send({state:true})
         }).error(function (err) {
            console.log(err);
         });
    }).error(function (err) {
        console.log(err);
    });
});




module.exports = app;
