/**
 * Created by T-30 on 2015-3-5.
 */
myAppModule.controller('articlesListController',['$scope','articlesServers','$stateParams',function($scope,articlesServers,$stateParams){
    articlesServers.articleNav(function(data){
        $scope.articleNav =data;
    })
    $scope.listData = function(id){
        $("#pages").page({
            url:"/addArticle/listNavClick",
            dataLengthUrl:"/addArticle/articleListLength",
            data:{id:id},
            callback:function(data){
                $scope.articleData = data.datas.datas;
                $scope.$apply()
            }
        })
    }
    $scope.listData(0)

}])

myAppModule.controller('addArticlesNavController',['$scope','$stateParams',function($scope,$stateParams){
    $scope.formSubmit=function(form){
        var isSuccessValid = $(form).valid();
        if(isSuccessValid){
            $(form).ajaxSubmit({
                success : function(data) {
                    alert("添加成功");
                    location.href="#/articles/articlesList";
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("失败");
                }
            });
        }
    };

}])