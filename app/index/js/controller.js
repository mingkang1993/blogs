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
    $urlRouterProvider.otherwise("/articles/articlesList&articlesList&0");
    $stateProvider.state('/articles/articlesList',{
        url : "/articles/articlesList&{model}&{id}",
        views: {
            "commonView": {
                templateUrl : "/index/views/articles/articlesList.html",
                controller:'articleListController'
            }
        }
    }).state('articles/editor',{
        url : "/articles/editor&{model}",
        views: {
            "commonView": {
                templateUrl : "/index/views/articles/editor.html",
                controller:'articleEditController'
            }
        }
    }).state('articles/viewContent',{
        url : "/articles/viewContent&{model}",
        views: {
            "commonView": {
                templateUrl : "/index/views/articles/viewContent.html",
                controller:'viewController'
            }
        }
    }).state('reg',{
        url : "/reg&{model}",
        views: {
            "commonView": {
                templateUrl : "/index/views/reg/log.html",
                controller:'regController'
            }
        }
    }).state('retrievePass',{
        url : "/retrievePass",
        views: {
            "commonView": {
                templateUrl : "/index/views/reg/retrievePass.html",
                controller:'retrievePassController'
            }
        }
    }).state('retrievePassEmail',{
        url : "/retrievePassEmail&{user}&{number}",
        views: {
            "commonView": {
                templateUrl : "/index/views/reg/retrievePassEmail.html",
                controller:'retrievePassEmailController'
            }
        }
    }).state('upPassword',{
        url : "/upPassword",
        views: {
            "commonView": {
                templateUrl : "/index/views/reg/upPassword.html",
                controller:''
            }
        }
    }).state('FQA',{
        url : "/FQA",
        views: {
            "commonView": {
                templateUrl : "/index/views/FQA/FQA.html",
                controller:'FQAController'
            }
        }
    }).state('personal/listContent',{
        url : "/personal/listContent&{name}",
        views: {
            "commonView": {
                templateUrl : "/index/views/personal/listContent.html",
                controller:'personalListContent'
            }
        }
    }).state('personal/information',{
        url : "/personal/information",
        views: {
            "commonView": {
                templateUrl : "/index/views/personal/information.html",
                controller:'personalIfnController'
            }
        }
    })
})

myAppModule.controller('indexController',['$scope',"indexServers",'factorys',function($scope,indexServers,factorys){
    //$scope.cookieName = $.cookie('user'); // 读取 cookie ;
   // $scope.createdAtDara = [];
    $scope.praise = function(id,praiseNum){
        if($scope.cookieName != undefined && !!$scope.cookieName){
            factorys.praise({
                username:$scope.cookieName,
                id:id,
                praiseNum: praiseNum
            },function(data){
                if(data.state == true){
                    window.location.reload();
                }else{
                    alert("您已经点赞过了")
                }
            })
        }else{
            location.href = "#/reg&log"
        }
    }

    indexServers.cookieData(function(datas){
        if(datas.sess === true){
            $scope.cookieName = datas.session.sessName;
        }
        if(!!$scope.cookieName && !$scope.userDatas){
            indexServers.userDatas($scope.cookieName,function(data){
                    $scope.userDatas = data;
                }
            )
        }
    })


    $scope.submit = function(){
        location.href="#/articles/articlesList&selectList&"+$scope.selectArt+"";
        //$("#search-form").submit()
    }

    $scope.quitout = function(){
        //$.cookie('user', '', { expires: -1 });
        indexServers.quitout(function(){

        })
        window.location.reload()
    };

    $scope.formSubmit=function(form){
        var isSuccessValid = $(form).valid();
        if(isSuccessValid){
            $(form).ajaxSubmit({
                success : function(data) {
                    /*
                    if(form.id === 'search-form'){
                        setTimeout(function(){
                            angular.element($("#row-container")).scope().listData(data)
                        },20)
                    }
                     */
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("失败");
                }
            });
        }
    };

}])

myAppModule.controller('paiHangController',['$scope',"article",function($scope,article){
    $scope.navNames = [];//循环遍历出所有的文章标签

    article.artPraiseCx(function(data){
        $scope.artPraiseCx = data;
    });

    article.datumNavName(function(data){
        $scope.navNames = data;
    });

}])


myAppModule.controller('retrievePassController',['$scope',function($scope){
    $scope.formSubmit=function(form){
        var isSuccessValid = $(form).valid();
        if(isSuccessValid){
            $(form).ajaxSubmit({
                success : function(data) {
                    console.log(data)
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("失败");
                }
            });
        }
    };
}])


myAppModule.controller('retrievePassEmailController',['$scope','$stateParams','indexServers',function($scope,$stateParams,indexServers){
    $scope.username = $stateParams.user;
    indexServers.PassEmailCode(function(data){
        if(data != $stateParams.number){
            location.href = "#/index"
        }
    })
    $scope.formSubmit=function(form){
        var isSuccessValid = $(form).valid();
        if(isSuccessValid){
            $(form).ajaxSubmit({
                success : function(data) {
                    if(data.state === true){
                        alert("修改成功")
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("失败");
                }
            });
        }
    };
}])


myAppModule.controller('FQAController',['$scope','$stateParams',function($scope,$stateParams){
    $scope.formSubmit=function(form){
        var isSuccessValid = $(form).valid();
        if(isSuccessValid){
            $(form).ajaxSubmit({
                success : function(data) {
                    if(data.state === true){
                        alert("感谢您的意见");
                        location.reload();
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("失败");
                }
            });
        }
    };
}])

