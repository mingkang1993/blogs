/**
 * Created by T-30 on 2015-3-10.
 */
myAppModule.controller('personalListContent',['$scope',"personalListService","$stateParams","$timeout",function($scope,personalListService,$stateParams,$timeout) {
    $scope.userName = $stateParams.name;
    personalListService.userDatas({
        username : $scope.userName
    },function(data){
        console.log(data)
        $scope.userDatas = data;
    })
    $timeout(function () {
        if ($scope.userName != $scope.$parent.userDatas.user){  //判断是否同个帐号进入空间
            personalListService.records({
                userName: $scope.$parent.userDatas.user,
                headPng: $scope.$parent.userDatas.headPng
            }, function (data) {
                $scope.recordsData = data.datas;
            })
        }
    }, 100)


    $("#pages").page({
        url:"/addArticle/personalListData",
        dataLengthUrl:"/addArticle/articleListLength",
        data:{userName:$scope.userName},
        callback:function(data){
            $scope.listData = data.datas.datas;
            $scope.$apply()
        }
    })
}])


