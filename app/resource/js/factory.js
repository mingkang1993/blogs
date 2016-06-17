myAppModule.factory('factorys',['$http','$window','$timeout',function($http,$window,$timeout){    //公用
    return {
        praise : function(data,callback){
            if(typeof data.praiseNum == "object"){
                data.praiseNum = 0;
            }
            data.praiseNum++;
            $http({
                method:'POST',
                url: '/addArticle/praise',
                cache: false,
                data:data
            }).success(function(data, status) {
                callback(data)
            }).error(function(data,status,headers,config){
                $.messageBox({message:'请求视图信息出错！'})
            })
        }
    }
}]);
