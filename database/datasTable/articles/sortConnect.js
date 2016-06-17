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

var sort_connect=settings.define('sort_connect',{//初始化 sort_connect 表，如果已存在，则不执行
    lab_id:{type:sequelize.INTEGER,primaryKey :true,allowNull:false},
    art_id:{type:sequelize.INTEGER,primaryKey :true,allowNull:false}
});



sort_connect.sync();//同步数据库
module.exports=sort_connect;//暴露 article 对象到外部

