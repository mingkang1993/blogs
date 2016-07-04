myAppModule.controller('articleListController',['$scope','article','$timeout','$stateParams',function($scope,article,$timeout,$stateParams){
    $scope.articleDatas = [];
    $scope.id = $stateParams.id;
    $scope.model = $stateParams.model;
    $scope.listData = function(data){
        /*if(data){
         $scope.articleDatas = data.datas
         }
         */
        var url = "",
            data = {};
        if($scope.model === 'selectList'){     //搜索文章后台selectLength字段
                url = "/selectName";
                data = {
                    val : $scope.id,
                    model : 'select'
                };
        }else{
                url = "/article/list";
                data = {
                    id : $scope.id
                };
        }

        $("#pages").page({
            url:url,
            dataLengthUrl:"/addArticle/articleListLength",
            data:data,
            callback:function(data){
                $scope.articleDatas = data.datas.datas;
                $scope.$apply()
            }
        })
    }
    $scope.listData()

    /*
    $timeout(function(){
        if($scope.articleDatas.length === 0){
            article.articleList(function(data){
                $scope.articleDatas = data;
                console.log($scope.articleDatas)
            });
        }
    },50)

      $timeout(function(){
        if($scope.articleDatas.length === 0){
            $("#pages").page({
                url:"/addArticle/listNavClick",
                dataLengthUrl:"/addArticle/articleListLength",
                sort:true,
                id:$scope.id,
                callback:function(data){
                    $scope.articleDatas = data.datas.datas;
                    $scope.$apply()
                }
            })
        }
    },50)
     */

    /*
    $scope.listNavClick = function(id){
        article.listNavClick({
            id:id,
            offsetNum:0
        },function(data){
            if(data.state == true){
                $scope.articleDatas = data.datas;
            }else{
                alert("没有数据")
            }
        });
    }
     */

}])