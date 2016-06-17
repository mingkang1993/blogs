var myAppModule = angular.module('myAppModule',[
    "ui.router",
    "ui.bootstrap"
]).factory('httpResponse',['httpSession',function(httpSession){
    return {
        response: function(rejection){

        },
        responseError: function(rejection) {

        }
    }
}])


myAppModule.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/index");
    $stateProvider.state('/index',{
        url : "/index",
        views: {
            "commonView": {
                templateUrl : "/admin/views/index/index.html",
                controller:'indexListController'
            }
        }
    }).state('/user/userList',{
        url : "/user/userList",
        views: {
            "commonView": {
                templateUrl : "/admin/views/user/userList.html",
                controller:'userListController'
            }
        }
    }).state('/user/userDetail',{
        url : "/user/userDetail&{model}&{id}",
        views: {
            "commonView": {
                templateUrl : "/admin/views/user/userDetail.html",
                controller:'userDetailController'
            }
        }
    }).state('/FQA/list',{
        url : "/FQA/list&{id}",
        views: {
            "commonView": {
                templateUrl : "/admin/views/FQA/list.html",
                controller:'FQAController'
            }
        }
    }).state('/FQA/viewFQA',{
        url : "/FQA/viewFQA&{id}",
        views: {
            "commonView": {
                templateUrl : "/admin/views/FQA/viewFQA.html",
                controller:'viewFQAController'
            }
        }
    }).state('/articles/articlesList',{
        url : "/articles/articlesList",
        views: {
            "commonView": {
                templateUrl : "/admin/views/articles/articlesList.html",
                controller:'articlesListController'
            }
        }
    }).state('/articles/articlesSelect',{
        url : "/articles/articlesSelect&{val}",
        views: {
            "commonView": {
                templateUrl : "/admin/views/articles/articlesSelect.html",
                controller:'articlesSelectController'
            }
        }
    }).state('/articles/articlesView',{
        url : "/articles/articlesView&{id}",
        views: {
            "commonView": {
                templateUrl : "/admin/views/articles/articlesView.html",
                controller:'articlesViewController'
            }
        }
    }).state('/articles/addArticlesNav',{
        url : "/articles/addArticlesNav",
        views: {
            "commonView": {
                templateUrl : "/admin/views/articles/addArticlesNav.html",
                controller:'addArticlesNavController'
            }
        }
    }).state('/articles/articlesEditor',{
        url : "/articles/articlesEditor&{id}",
        views: {
            "commonView": {
                templateUrl : "/admin/views/articles/articlesEditor.html",
                controller:'articlesEditorController'
            }
        }
    })
})


myAppModule.controller('indexController',['$scope','indexService',function($scope,indexService){
    $scope.unreadFQA = function(){
        indexService.unreadFQA(function(data){
            $scope.topFQA = data;
        })
    };
    $scope.unreadFQA()
}])

myAppModule.controller('indexListController',['$scope',function($scope){
    $("#echartsMain").chartBreadOrRadar({
        dataName : ["全部","卧槽","尼玛","了个","屁啊"],
        datas:[
            { text : '全部' , val : "111"},
            { text : '卧槽' , val : "222" },
            { text : '尼玛' , val : "333" },
            { text : '了个' , val : "444" },
            { text : '屁啊' , val : "555" }
        ]
    })
}])

myAppModule.controller('userListController',['$scope','userListServers',function($scope,userListServers){
    $scope.userData = [];
    setTimeout(function() {
        animationHover($('.contact-box'), 'pulse');
    },100)
    userListServers.userDatas(function(data){
        console.log(data)
        $scope.userData = data.data
    })

}])


myAppModule.controller('userDetailController',['$scope','userListServers','$stateParams',function($scope,userListServers,$stateParams){
    $scope.id = $stateParams.id;
    userListServers.userDetail($scope.id,function(data){
        $scope.dynamicData = data;
    })
}])


