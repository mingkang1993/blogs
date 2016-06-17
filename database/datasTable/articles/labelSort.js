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
var labelSort=settings.define('label_sort',{//初始化 articleSort 表，如果已存在，则不执行
    id:{type:sequelize.INTEGER,autoIncrement:true,primaryKey :true,allowNull:false},
    sortName:{type:sequelize.STRING,allowNull:true}
});


/*
var labelSortDo=labelSort.create({
    sortName:"HTML5"
}).success(function(user){

}).error(function(err){
    console.log(err)
})
 */

//labelSort.belongsTo(sort_connect, {constraints: false});  //sort_connect属于article

labelSort.sync();//同步数据库

module.exports=labelSort;//暴露 article 对象到外部

