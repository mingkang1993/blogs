/**
 * Created by T-30 on 2015-2-11.
 */

var express = require('express');
var crypto = require("crypto");
var multer  = require('multer');
var nodemailer = require("nodemailer");
var roult = express.Router();
var users = require("../../database/datasTable/user");


/*邮箱配置*/
var smtpTransport = nodemailer.createTransport({
    service: "QQ",
    auth: {
        user: "2269555204@qq.com",      //填写QQ号
        pass: "1987530a"
    }
});


roult.post('/add_user',function(req,res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.passname).digest('base64');
    users.find({
        where: {user_name: req.body.username }
    }).success(function (user) {
        if (!user) {
            users.create({
                user_name: req.body.username,
                password: password,
                head_png : req.files.headPng.name,
                email:req.body.email
            }).success(function (user) {
                req.session.sessName = req.body.username;
                res.send({state : true,user : user.user_name});
            }).error(function (err) {
                console.log(err);
            });
        }else{
            res.send({state : false,user : user.user_name});
        }
    }).error(function (err) {
        console.log(err)
    })
});


roult.post('/log',function(req,res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.passname).digest('base64');
    users.find({
        where: {user_name: req.body.username }
    }).success(function (user) {
        if(req.body.username === user.user_name && password === user.password){
            req.session.sessName = req.body.username;
            console.log(req.session)
            res.send({state : true,user : user.user_name});
        }else{
            res.send({state : false})
        }
    }).error(function (err) {
        console.log(err)
    })
});



roult.post('/uppass',function(req,res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.pass).digest('base64');
    var newPassword = crypto.createHash('md5').update(req.body.newPassword).digest('base64');

    users.find({
        where: {user_name: req.body.username }
    }).success(function (user) {
        if(req.body.username === user.user_name && password === user.password){
            users.update( {password:newPassword},
                {where : {user_name:req.body.username}}
            ).success(function (data) {
                    res.send({state : true});
                }).error(function (err) {
                    console.log(err);
                });
        }else{
            res.send({state : false})
        }
    }).error(function (err) {
        console.log(err)
    })
});


roult.post('/findPass',function(req,res) {
    var password = crypto.createHash('md5').update(req.body.pass).digest('base64');

    users.update( {password:password},
        {where : {user_name:req.body.username}}
    ).success(function (data) {
            code = "";
            res.send({state : true})
        }).error(function (err) {
            console.log(err);
        });
});


roult.post('/PassEmailCode',function(req,res) {    //找回密码返回code
    res.send(code);
});



roult.post('/user_data',function(req,res) {
    users.find({
        where: {user_name: req.body.username }
    }).success(function (user) {
        res.send({
            state : true,
            user : user.user_name,
            headPng : user.head_png,
            email : user.email,
            information:user.information
        })
    }).error(function (err) {
        console.log(err)
    })
});



roult.post('/upUserData',function(req,res) {
    users.update(
        {
            head_png:req.files.headPng.name,
            information:req.body.information
        },
        {where: {user_name: req.body.username }}
    ).success(function (user) {
        res.send({state : true})
    }).error(function (err) {
        console.log(err)
    })
});



roult.post('/opinion',function(req,res) {
    var email = "";
    var codeLength = 6;
    code = "";
    if(code.length === 0){
        var selectChar = new Array(0,1,2,3,4,6,7,8,9);
        for(var i=0;i<codeLength;i++){
            var charIndex = Math.floor(Math.random()*8);
            code +=selectChar[charIndex];
        }
    }
    code = crypto.createHash('md5').update(code).digest('base64');
    users.find({
        where: {user_name: req.body.username }
    }).success(function (data) {
        email = data.email;
        var textLay = "<p>请点击此链接修改密码<a href='http://192.168.10.241:250/index/#/retrievePassEmail&"+ req.body.username +"&"+ code +"'>192.168.10.241:250/retrievePassEmail&"+ req.body.username +"&"+ code +"</a></p>"+
            "<div style='text-align: center'><img src='cid:00000001'/></div>"+
            "<p style='text-align: right;'>签名:<strong style='font-size:16px;'>爱你的康</strong></p>";
        var mailOptions = {
            from: "Fred Foo <1163205507@qq.com>", //发件人地址
            to: email, //名单接收器的
            subject: "Hello"+ req.body.username +"来信",
            /*text: "Hello world", // plaintext body*/
            html: textLay,
            attachments: [{  //附件
                filename: '01.png',
                path: 'http://192.168.10.241:250/images/myPic.jpg',
                cid: '00000001'
            }]
        }

        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
                res.send({opinion:flase})
            }else{
                res.send({opinion:true})
            }

        });
    }).error(function (err) {
        console.log(err)
    })
});



roult.post('/httpSession',function(req,res) {
    if(!!req.session.sessName){
        res.send({sess:true,session:req.session})
    }else{
        res.send({sess:false})
    }

})


roult.post('/quitout',function(req,res) {
    req.session.destroy();
    res.send("1111")
})


module.exports = roult;