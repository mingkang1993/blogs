/**
 * Created by T-30 on 2015-3-5.
 */
myAppModule.controller('articlesViewController',['$scope','articlesServers','$stateParams','$timeout',function($scope,articlesServers,$stateParams,$timeout){
   $scope.id =  $stateParams.id;
    articlesServers.view($scope.id,function(data){
        $scope.viewData = data.datas;
    })

}])