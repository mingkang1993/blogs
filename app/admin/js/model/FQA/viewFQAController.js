/**
 * Created by T-30 on 2015-3-4.
 */

myAppModule.controller('viewFQAController',['$scope','$stateParams','FQAService',function($scope,$stateParams,FQAService){
    $scope.viewHash = $stateParams;
    FQAService.updateState({
        id : $scope.viewHash.id,
        listId : $scope.viewHash.listId
    },function(data){
        if(data.state == true){
            angular.element($("#indexController")).scope().unreadFQA();
            $scope.viewData = data.datas;
            $scope.viewDataLength = data.dataLength
        }
    })

    $scope.formSubmit=function(form){
        var isSuccessValid = $(form).valid();
        if(isSuccessValid){
            $(form).ajaxSubmit({
                success : function(data) {
                    if(data.state == true){
                        alert("删除成功");
                        location.href = "/admin/#/FQA/list&0";
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("失败");
                }
            });
        }
    };
}])
