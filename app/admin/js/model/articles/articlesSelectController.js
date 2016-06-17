/**
 * Created by T-30 on 2015-3-5.
 */
myAppModule.controller('articlesSelectController',['$scope','articlesServers','$stateParams','$timeout',function($scope,articlesServers,$stateParams,$timeout){
    $scope.val = $stateParams.val;

    $("#pages").page({
        url:"/selectName",
        dataLengthUrl:"/addArticle/articleListLength",
        data:{
            val : $scope.val,
            model : 'select'
        },
        callback:function(data){
            $scope.articleData = data.datas.datas;
            $timeout(function(){
                $scope.dataLength = $(".listLenth").html();
                $scope.$apply()
            },100)
            $scope.$apply()
        }
    })

}])