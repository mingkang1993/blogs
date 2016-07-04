var express = require('express');
var path = require('path');
var fs = require('fs');
/*var favicon = require('serve-favicon');*/
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require("crypto");
var formidable = require('formidable');
var ccap = require('ccap')();//Instantiated ccap class
var session = require('express-session');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'app/app')));
app.use(express.static(path.join(__dirname, 'app')));


app.use(session({
    secret: '1234567890mmdapp1234567890',
    //store: new session.MemoryStore({
    //   reapInterval: 60000*10   //存到内存消失时间
    //}),
    cookie: {
        path : "/",
        maxAge : 60000 * 30
    },
    saveUninitialized:true,
    rolling:true
}));

app.use('/', require("./models/index/user"));
app.use('/', require("./models/index/articlesList"));
app.use('/', require("./models/index/fqa"));
app.use('/', require("./models/index/personal"));


app.use('/', require("./models/admin/user"));
app.use('/', require("./models/admin/fqa"));

var code = "";


/*验证码*/
app.post('/ccap/code',function(req,res) {
    var ary = ccap.get();
    var txt = ary[0];
    var buf = ary[1];
    var img = buf.toString("base64");
    res.send({
        imgPic : img,
        text : txt
    });
});


app.post('/uploadImg',function(req,res) {
    var form = new formidable.IncomingForm();

    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = path.join(__dirname, 'app/upload/images');	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {
        if(files){
            res.writeHeader(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end(JSON.stringify({ "error": 0, "url": files.imgFile.path.match(/\/upload.*$/)[0] }));
        }else{
            res.writeHeader(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end(JSON.stringify({ "error": 1, "message": '上传文件失败' }));
        }
    });

});



app.use(function(req, res, next) {
    if(req.url.indexOf('h5') > -1){
        // var viewName = req.url.substr(req.url.indexOf('h5') + 2 ,req.url.length);
        res.sendfile(path.join(__dirname, './app/app/h5/view/type.html'));
    }else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});
//
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
//

/*
app.post('/indexArticleList',function(req,res) {   //首页最新发布
    Server.indexArticleList(function(callback){
        res.send(callback);
    });
});



app.post('/articlesList',function(req,res) {
    Server.articleList(function(callback){
        res.send(callback);
    });
});
 */






module.exports = app;
