var express = require('express');
var path = require('path');
/*var favicon = require('serve-favicon');*/
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require("crypto");
var multer  = require('multer');
var ccap = require('ccap')();//Instantiated ccap class
var session = require('express-session');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/app')));
app.use(express.static(path.join(__dirname, 'app')));

app.use(multer({
    dest: './app/uploads/images/',
    renPath: function (path,name) {
        //return path.replace(/([\s\S]*[\\])*resource[\\]/, '').toLowerCase() + name
        return '../../uploads/images/' + name
    }
  }
));

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

var cookieData ={};
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


app.use(function(req, res, next) {
    if(req.url.indexOf('h5') > -1){
        var viewName = req.url.substr(req.url.indexOf('h5') + 2 ,req.url.length);
        res.sendfile('./app/app/h5/view' + viewName);
    }else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


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





app.post('/uploadImg',function(req,res) {
    var file_data = '';
    if(req.files && req.files.imgFile && req.files.imgFile.size > 0){
        file_data = req.files.imgFile;
    }
    if(file_data){
        res.writeHeader(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(JSON.stringify({ "error": 0, "url": file_data.path }));
    }else{
        res.writeHeader(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(JSON.stringify({ "error": 1, "message": '上传文件失败' }));
    }
});




module.exports = app;
