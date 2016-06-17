/**
 * Created by T-30 on 2015-2-12.
 */
myAppModule.service('userListServers', ['$http',function($http) {
    this.userDatas = function (callback){
        $http({
            method:'POST',
            url: '/admin/user_datas',
            cache: false,
            dataType: 'json'
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
    this.userDetail = function(id,callback){
        $http({
            method:'POST',
            url: '/admin/user_detail',
            cache: false,
            dataType: 'json',
            data: {id:id}
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    }
}]).service('indexService', ['$http',function($http) {
    this.unreadFQA = function (callback){
        $http({
            method:'POST',
            url: '/admin/FQA/unreadFQA',
            cache: false,
            dataType: 'json'
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
}]).service('FQAService', ['$http',function($http) {
    this.updateState = function (datas,callback){
        $http({
            method:'POST',
            url: '/admin/FQA/viewFQAData',
            cache: false,
            dataType: 'json',
            data:datas
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
}]).service('articlesServers', ['$http',function($http) {
    this.articleNav = function(callback){
        $http({
            method:'POST',
            url: '/datumList/navname',
            cache: false
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    }
    this.view = function(id,callback){
        $http({
            method:'POST',
            url: '/articlesList/content',
            cache: false,
            data:{id:id}
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    }
}]).service('articleEditor', ['$http',function($http){
    this.datumNavName = function (model,callback){
        $http({
            method:'POST',
            url: '/datumList/navname',
            cache: false,
            data : model
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };

    this.content = function(id,callback){
        $http({
            method:'POST',
            url: '/articlesList/content',
            cache: false,
            data:id
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };

}])
