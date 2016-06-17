/**
 * Created by T-30 on 2015-1-4.
 */
var settings = require("../../settings");
var sequelize = require("sequelize");


//primaryKey：主键
//allowNull:允许为空
//autoIncrement:自增长
//defaultValue:默认值
//类型：sequelize.INTEGER,sequelize.STRING,sequelize.TEXT,sequelize.DATE
var comments=settings.define('comments',{//初始化 articleSort 表，如果已存在，则不执行
    id:{type:sequelize.INTEGER,autoIncrement:true,primaryKey :true,allowNull:false},
    user_name:{type:sequelize.STRING,allowNull:false},
    head_pnd:{type:sequelize.STRING,allowNull:false},
    file:{type:sequelize.STRING,allowNull:true},
    content:{type:sequelize.TEXT,allowNull:false}
});

//回复回复表
var comments2=settings.define('comments2',{//初始化 articleSort 表，如果已存在，则不执行
    id:{type:sequelize.INTEGER,autoIncrement:true,primaryKey :true,allowNull:false},
    head_pnd:{type:sequelize.STRING,allowNull:false},
    user_name:{type:sequelize.STRING,allowNull:false},
    content:{type:sequelize.TEXT,allowNull:false}
});


comments.hasMany(comments2, {constraints: false, onDelete: 'CASCADE',onUpdate:'CASCADE'});   //comments里面有多个comments2关系
comments2.belongsTo(comments, {constraints: false, onDelete: 'CASCADE',onUpdate:'CASCADE'});  //comments2属于comments


//comments.sync();//同步数据库
//comments2.sync();//同步数据库

exports.comments=comments;
exports.comments2=comments2;

