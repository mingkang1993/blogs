/**
 * Created by T-30 on 2015-3-10.
 */
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
var records = settings.define('records',{
    id:{type:sequelize.INTEGER,autoIncrement:true,primaryKey :true,allowNull:false},
    user_name:{type:sequelize.STRING,allowNull:false},
    head_png:{type:sequelize.STRING,allowNull:true}
});


records.sync();
module.exports=records;
