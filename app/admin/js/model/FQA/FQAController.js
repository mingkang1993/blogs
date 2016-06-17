/**
 * Created by T-30 on 2015-3-4.
 */

myAppModule.controller('FQAController',['$scope','$stateParams',function($scope,$stateParams){
    $scope.listId = $stateParams.id;
    $("#pages").page({
        url:"/admin/FQA/list",
        dataLengthUrl:"/admin/FQA/listLength",
        data:{
            id : $scope.listId
        },
        callback:function(data){
            $scope.listData = data.datas.datas;
            $scope.$apply()
        }
    })

    $scope.formSubmit=function(form){
        var isSuccessValid = $(form).valid();
        if(isSuccessValid){
            $(form).ajaxSubmit({
                success : function(data) {
                    if(data.state == true){
                        $scope.listData = data.datas;
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("失败");
                }
            });
        }
    };
}])
