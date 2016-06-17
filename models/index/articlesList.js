/**
 * Created by T-30 on 2015-2-12.
 */

var express = require('express');
var multer  = require('multer');
var app = express.Router();
var db = require("../../database/settings");
/*articles*/
var labelSort= require("../../database/datasTable/articles/labelSort");
var articleWj= require("../../database/datasTable/articles/article");
var commentsWj= require("../../database/datasTable/articles/comments");
var praise= require("../../database/datasTable/articles/praise");
var article = articleWj.article;
var sortConnect= articleWj.sort_connect;

var comments= commentsWj.comments;
var comments2= commentsWj.comments2;


app.post('/datumList/navname',function(req,res) {               //标签分类
    if(req.body.model == "screening"){
        labelSort.findAll().success(function (data) {
            res.send(data);
        }).error(function (err) {
            console.log(err);
        });
    }else{
        labelSort.findAll().success(function (data) {
            res.send(data);
        }).error(function (err) {
            console.log(err);
        });
    }
});



app.post('/addArticle',function(req,res) {                //文章新增
    article.create({
        user_name : req.body.username,
        title : req.body.title,
        content : req.body.content
    }).success(function (data) {
        for(i=0;i<=req.body.selecttype.length-1;i++){
            console.log(req.body.selecttype[i])
            sortConnect.create({
                labelSortId: req.body.selecttype[i],
                articleId: data.id
            }).success(function (data) {
                res.send(data);
            }).error(function (err) {
                console.log(err); //重复炒作 以后优化
            })
        }
    }).error(function (err) {
        console.log(err);
    });
});



app.post('/upArticle',function(req,res) {                //修改新增
    article.update({
            title: req.body.title,
            content: req.body.content
        },
        {where:{id:req.body.id}}
    ).success(function (data) {
        sortConnect.destroy({ where: {articleId: req.body.id}}).success(function () {
            for(i=0;i<=req.body.selecttype.length-1;i++){
                sortConnect.create({
                    labelSortId: req.body.selecttype[i],
                    articleId: req.body.id
                }).success(function (data) {
                    res.send(data);
                }).error(function (err) {
                    console.log(err); //重复炒作 以后优化
                })
            }
        }).error(function (err) {
            console.log(err);
        });
        res.send(data)
    })
});


app.post('/articlesList/artPraiseCx',function(req,res) {
    article.findAll({
        limit: 7,order: [['praise_num', 'DESC' ]]
    }).success(function(data){
        res.send(data);
    }).error(function(err){
        console.log(err)
    })
});



app.post('/addArticle/praise',function(req,res) {        //点赞
    praise.find({
        where: {user_name : req.body.username,articleId: req.body.id}
    }).success(function (data) {
        if(!data){
            praise.create({
                user_name : req.body.username,
                articleId: req.body.id,
                praise_num: req.body.praiseNum
            }).success(function (data) {
                article.update(
                    {praise_num : req.body.praiseNum},
                    {where : {id : data.articleId}}
                ).success(function () {
                        res.send({state : true});
                    }).error(function (err) {
                        console.log(err);
                    });
            }).error(function (err) {
                console.log(err);
            });
        }else{
            res.send({state : false});
        }
    }).error(function (err) {
        console.log(err)
    })
});


app.post('/addArticle/listNavClick',function(req,res) {  //listNav点击加载列表
    var offset = req.body.offsetNum;
    if(req.body.id == 0){
        article.findAll({
            limit: 10,order: [['id', 'DESC' ]],offset : offset * 10,
            include: [
                {model: labelSort},
                {model:comments,include:[{model:comments2}]}
            ]
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
        article.findAll({
            include: [
                {model:labelSort,where:{id:req.body.id}},
                {model:comments,include:[{model:comments2}]}
            ],
            order: "article.id desc limit "+offset * 10+",10"
        }).success(function (data) {
            if(data.length != 0){
                res.send({state:true,datas:data});
            }else{
                res.send({state:false});
            }
        }).error(function (err) {
            console.log(err);
        });
        /*
         labelSort.findAll({
         where:{id:datas.id},
         include: [
         {model:article,offset : 0 * 10,limit: 10,include:[{model:comments,include:[{model:comments2}]}]}
         ],
         order: [[ {model: article}, 'id', 'DESC' ]]
         }).success(function(data){
         var attr = [];
         if(data.length != 0){
         for(i=0;i<=data[0].articles.length-1;i++){
         attr[i] = data[0].articles[i];
         if(data[0].articles.length-1 == i){
         callback({state:true,datas:attr,dataLength:dataLength});
         }
         }
         }else{
         callback({state:false});
         }
         }).error(function(err){
         console.log(err)
         })
         */
    }
});


app.post('/addArticle/personalListData',function(req,res) {  //listNav点击加载列表
    article.findAll({
        include: [
            {model:labelSort},
            {model:comments,include:[{model:comments2}]}
        ],
        where:{user_name:req.body.userName},
        order: "article.id desc limit "+ req.body.offsetNum * 10+",10"
    }).success(function (data) {
        if(data.length != 0){
            res.send({state:true,datas:data});
        }else{
            res.send({state:false});
        }
    }).error(function (err) {
        console.log(err);
    });
});


app.post('/addArticle/articleListLength',function(req,res) {  //文章长度
    if(req.body.model == 'select'){
        article.findAll({
            include: [
                {model: labelSort},
                {model:comments,include:[{model:comments2}]}
            ],
            where: "title LIKE'%"+ req.body.val +"%'"
        }).success(function (data) {
            res.send({state:true,dataLength:data.length});
        }).error(function (err) {
            console.log(err);
        });
        return
    }

    if(req.body.id == 0){
        article.findAll().success(function (data) {
            res.send({state:true,dataLength:data.length});
        })
    }else{
        article.findAll({
            include: [
                {model: labelSort,where:{id:req.body.id}}
            ]
        }).success(function (data) {
            res.send({state:true,dataLength:data.length});
        })
    }
});



app.post('/articlesList/content',function(req,res) {  //获取数据
    article.find({
        where: {id:req.body.id},
        include: [
            { model: labelSort},
            { model: comments,
                include: [
                    { model: comments2}
                ]
            }
        ]
    }).success(function (data) {
        res.send({state : true,datas:data});
    }).error(function (err) {
        console.log(err)
    })
});



app.post('/articlesList/comments',function(req,res) {  //点击回复
    if(req.files.file === undefined){
        comments.create({
            user_name: req.body.username,
            content: req.body.content,
            head_pnd:req.body.headPnd,
            articleId: req.body.atrId
        }).success(function (data) {
            res.send(req.body.username);
        }).error(function (err) {
            console.log(err)
        })
    }else{
        comments.create({
            user_name: req.body.username,
            file:req.files.file.name,
            content: req.body.content,
            head_pnd:req.body.headPnd,
            articleId: req.body.atrId
        }).success(function (data) {
            res.send(req.body.username);
        }).error(function (err) {
            console.log(err)
        })
    }
});



app.post('/articlesList/commentsCx',function(req,res) {  //回复查询
    comments.findAll({
        where:{atr_id: req.body.id},limit: 5,
        include: [
            { model: comments2}
        ]
    }).success(function(data){
        res.send(data);
    }).error(function(err){
        console.log(err)
    })
});


app.post('/articlesList/commentsToCreat',function(req,res) {  //点击回复的回复
    comments2.create({
        commentId:req.body.commentId,
        user_name:req.body.username,
        content:req.body.content,
        head_pnd:req.body.headPnd
    }).success(function(data){
        res.send(data);
    }).error(function(err){
        console.log(err)
    })
});

app.post('/articlesList/addNav',function(req,res) {  //添加标签
    labelSort.create({
        sortName:req.body.sortName
    }).success(function(data){
        res.send({state:true});
    }).error(function(err){
        console.log(err)
    })
});

app.post('/articles/destroy',function(req,res) {  //删除
    article .destroy({
        where:{id:req.body.id}
    }).success(function(data){
        res.send({state:true});
    }).error(function(err){
        console.log(err)
    })
});


app.post('/selectName',function(req,res) {  //模糊搜索文章

    var offset = req.body.offsetNum;
    article.findAll({
        include: [
            {model: labelSort},
            {model:comments,include:[{model:comments2}]}
        ],
        where: "title LIKE'%"+ req.body.val +"%'",
        order:[['id','desc']],
        offset:offset * 10
    }).success(function (data) {
        if(data.length != 0){
            res.send({state:true,datas:data});
        }else{
            res.send({state:false});
        }
    }).error(function (err) {
        console.log(err);
    });

    /*
     db.query("SELECT * FROM (SELECT * FROM articles a WHERE a.title LIKE '%11%' ORDER BY id DESC LIMIT 0,10) b " +
     "LEFT JOIN sort_connects c ON b.id = c.articleId LEFT JOIN label_sorts d ON c.labelSortId = d.id " +
     "LEFT JOIN comments e ON b.id = e.articleId " +
     "LEFT JOIN comments2s f ON e.id = f.commentId " +
     "ORDER BY b.id").success(function(data){
     callback({state:true,datas:data});
     });
     */
})


module.exports = app;

