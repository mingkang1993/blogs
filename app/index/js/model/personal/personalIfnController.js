/**
 * Created by T-30 on 2015-3-10.
 */
myAppModule.controller('personalIfnController',['$scope',"personalListService",'factorys',"$timeout",function($scope,personalListService,factorys,$timeout) {
    $timeout(function(){
        $scope.userDatas = $scope.$parent.userDatas;
    },100)
    $scope.formSubmit=function(form){
        var isSuccessValid = $(form).valid();
        if(isSuccessValid){
            $(form).ajaxSubmit({
                success : function(data) {

                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("失败");
                }
            });
        }
    };
}])