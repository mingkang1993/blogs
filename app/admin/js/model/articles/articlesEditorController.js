/**
 * Created by T-30 on 2015-3-9.
 */
myAppModule.controller('articlesEditorController',['$scope','articleEditor','$stateParams',function($scope,articleEditor,$stateParams){
    $scope.model = $stateParams.id;
    var editor = KindEditor.create('#editor',{
        uploadJson: '/uploadImg'
    });
    $.typeSelect();
    $scope.navNames = [];//循环遍历出所有的文章标签
    articleEditor.datumNavName({model:"screening"},function(data){
        $scope.navNames = data;
    });

    articleEditor.content({id:$scope.model},function(data){
        $scope.contents = data.datas;
        $(".ke-container").find("iframe").contents().find(".ke-content").html($scope.contents.content);
        setTimeout(function(){
            /*
            $(".multipeSelect ul input").each(function(i,d){
                var datasNav = $scope.contents.label_sorts[i];
                var thatVal = $(this).val();
                if(datasNav != undefined){
                    console.log($(this).parents("ul").find("li").eq(datasNav.id-1).find("input"))
                    var dataNavVal = datasNav.id
                    if(thatVal == dataNavVal){
                        $(this).click()
                    }
                }
            })*/
            angular.forEach($scope.contents.label_sorts,function(item,i){
                var that = $(".multipeSelect ul"),
                    thatInput = that.find("li").eq(item.id-1).find("input");
                thatInput.click()
            })

        },200)
    });

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
}])