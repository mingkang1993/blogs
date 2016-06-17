myAppModule.service('indexServers', ['$http',function($http){
    this.ccapCode = function(callback){
        $http({
            method:'POST',
            url: '/ccap/code',
            cache: false
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
    this.userDatas = function (username,callback){
        $http({
            method:'POST',
            url: '/user_data',
            cache: false,
            dataType: 'json',
            data : {"username" : username}
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
    this.cookieData = function(callback){
        $http({
            method:'POST',
            url: '/httpSession',
            cache: false
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
    this.quitout = function(callback){
        $http({
            method:'POST',
            url: '/quitout',
            cache: false
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
    this.indexArticleList = function(callback){
        $http({
            method:'POST',
            url: '/indexArticleList',
            cache: false
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };

    this.PassEmailCode = function(callback){
        $http({
            method:'POST',
            url: '/PassEmailCode',
            cache: false
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
}]).service('published', ['$http',function($http){
    this.publishedList = function(callback){
        $http({
            method:'POST',
            url: '/publishedList',
            cache: false
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
    this.deletePublished = function(data,callback){
        $http({
            method:'POST',
            url: '/deletePublished',
            cache: false,
            dataType: 'json',
            data:  {"id" : data.id}
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    }
}]);

myAppModule.service('articleLabel', ['$http',function($http){

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

}]).service('article', ['$http',function($http){
    this.articleList = function(callback){
        $http({
            method:'POST',
            url: '/articlesList',
            cache: false
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
    this.praise = function(data,callback){
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
    };
    this.datumNavName = function (callback){
        $http({
            method:'POST',
            url: '/datumList/navname',
            cache: false
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
    this.listNavClick = function (datas,callback){
        $http({
            method:'POST',
            url: '/addArticle/listNavClick',
            cache: false,
            data:datas
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };

    this.artPraiseCx = function (callback){
        $http({
            method:'POST',
            url: '/articlesList/artPraiseCx',
            cache: false
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };

}]).service('articleView', ['$http',function($http){
    this.content = function(id,callback){
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
    };
    this.commentsCx = function(id,callback){
        $http({
            method:'POST',
            url: '/articlesList/commentsCx',
            cache: false,
            data:id
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
}]).service('personalListService', ['$http',function($http){
    this.records = function(data,callback){
        $http({
            method:'POST',
            url: '/personal/records',
            cache: false,
            data:data
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
    this.userDatas = function (data,callback){
        $http({
            method:'POST',
            url: '/user_data',
            cache: false,
            dataType: 'json',
            data : data
        }).success(function(data, status) {
            callback(data)
        }).error(function(data,status,headers,config){
            $.messageBox({message:'请求视图信息出错！'})
        })
    };
}])





