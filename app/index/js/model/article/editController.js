myAppModule.controller('articleEditController',['$scope','articleLabel','$stateParams',function($scope,articleLabel,$stateParams){
    if($scope.$parent.cookieName != undefined && !!$scope.$parent.cookieName){
        $scope.model = $stateParams.model;
        $scope.navNames = [];//循环遍历出所有的文章标签
        articleLabel.datumNavName({model:"screening"},function(data){
            $scope.navNames = data;
        });

        if($scope.model != "add"){
            articleLabel.content({id:$scope.model},function(data){
                $scope.contents = data.datas;
                $(".ke-container").find("iframe").contents().find(".ke-content").html($scope.contents.content);
                setTimeout(function(){
                    /*$(".multipeSelect ul input").each(function(i,d){
                         var datasNav = $scope.contents.label_sorts[i];
                         if(datasNav != undefined){
                             var dataNavVal = datasNav.id
                             var thatVal = $(this).val();
                             if(thatVal == dataNavVal){
                                 $(this).click()
                             }
                         }
                    })
                     */
                    angular.forEach($scope.contents.label_sorts,function(item,i){
                        var that = $(".multipeSelect ul"),
                            thatInput = that.find("li").eq(item.id-1).find("input");
                        thatInput.click()
                    })
                },200)
            });

        }

        $scope.formSubmit=function(form){
            var isSuccessValid = $(form).valid();
            if(isSuccessValid){
                $(form).ajaxSubmit({
                    success : function(data) {
                        $.messageBox({message:"发表成功"})

                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("失败");
                    }
                });
            }
        };
    }else{
        location.href = "#/reg&log"
    }

}])