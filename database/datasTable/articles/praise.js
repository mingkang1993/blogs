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
var praise=settings.define('praise',{//初始化 articleSort 表，如果已存在，则不执行
   id:{type:sequelize.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true},
   user_name:{type:sequelize.STRING,allowNull:true}
});

/*
 var labelSortDo=labelSort.create({
 sortName:"HTML5"
 }).success(function(user){

 }).error(function(err){
 console.log(err)
 })
 */

module.exports=praise;//暴露 article 对象到外部

