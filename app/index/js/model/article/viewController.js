myAppModule.controller('viewController',['$scope','$stateParams','articleView',function($scope,$stateParams,articleView){

    setTimeout(function(){
        KindEditor.create('.editor',{
            items : ['emoticons']
        });
    },50)

    $scope.model = $stateParams.model;
    $scope.index = -1;
    articleView.content($scope.model,function(datas){
        $scope.comments = datas.datas.comments
        $scope.datas = datas.datas
    })
/*
    articleView.commentsCx({
        id:$scope.model
    },function(datas){
        $scope.comments = datas
    })
 */
    $scope.replyClick = function(index){
        $scope.parIndex = -1;
        $scope.index = index;
    }

    $scope.replyChidClick = function(parIndex,chidIndex){
        $scope.index = -1;
        angular.forEach($scope.comments,function(item,index){
            if(item.id === parIndex){
                $scope.parIndex = index+1;
            }
        })
        $scope.chidIndex = chidIndex;
    }

    $scope.formSubmit=function(form){
        var isSuccessValid = $(form).valid();
        if(isSuccessValid){
            if($scope.$parent.cookieName != undefined && !!$scope.$parent.cookieName){
                $(form).ajaxSubmit({
                    success : function(data) {
                        //$.messageBox({message:"发表成功"})
                        window.location.reload()
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("失败");
                    }
                });
            }else{
                location.href = "#/reg&log"
            }
        }
    };


}])