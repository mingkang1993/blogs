/**
 * Created by T-30 on 2015-1-4.
 */
var settings = require("../../settings");
var sequelize = require("sequelize");
var comments = require("./comments");
var labelSort = require("./labelSort");
var praise = require("./praise");
//primaryKey：主键
//allowNull:允许为空
//autoIncrement:自增长
//defaultValue:默认值
//类型：sequelize.INTEGER,sequelize.STRING,sequelize.TEXT,sequelize.DATE

var article=settings.define('article',{//初始化 article 表，如果已存在，则不执行
    id:{type:sequelize.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true},
    user_name:{type:sequelize.STRING,allowNull:false},
    title:{type:sequelize.STRING,allowNull:false},
    content:{type:sequelize.TEXT, allowNull:false},
    praise_num:{type:sequelize.INTEGER, allowNull:true}
});

var sort_connect=settings.define('sort_connect',{//初始化 sort_connect 表，如果已存在，则不执行
    id:{type:sequelize.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true}
});


/*
 article.hasMany(praise, {constraints: false});
 praise.belongsTo(article, {as:"article", constraints: false});
 */


article.hasMany(comments.comments, {constraints: false, onDelete: 'CASCADE',onUpdate:'CASCADE'});   //article里面有多个sort_connect关系
article.belongsToMany(labelSort,{through:sort_connect, onDelete: 'CASCADE',onUpdate:'CASCADE'});
labelSort.belongsToMany(article,{through:sort_connect, onDelete: 'CASCADE',onUpdate:'CASCADE'});
article.hasMany(praise, {constraints: false, onDelete: 'CASCADE',onUpdate:'CASCADE'})
//sort_connect.belongsTo(labelSort, {constraints: false});  //sort_connect属于article
//sort_connect.belongsTo(article, {constraints: false});  //sort_connect属于article

settings.sync().then(function(err){

});
//article.sync();//同步数据库
//praise.sync();
//sort_connect.sync();//同步数据库
//comments.comments.sync();//同步数据库
//comments.comments2.sync();//同步数据库

exports.sort_connect=sort_connect;
exports.article=article;
