var config=require('./config.json');
var sequelize=require('sequelize');
var db=new sequelize(config.database,config.user,config.password,config.option);

db.authenticate().then(function(err){//测试连接是否成功
    if(!!err){
        console.log('unable to connect to the database');
    }else{
        console.log('Connection has been established successfully');
    }
});
module.exports=db;