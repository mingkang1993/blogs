/**
 * Created by T-30 on 2015-1-4.
 */
myAppModule.controller('regController',['$scope',"$stateParams",function($scope,$stateParams){
    $scope.model = $stateParams.model;
    $scope.formSubmit=function(form){
        var isSuccessValid = $(form).valid();
        if(isSuccessValid){
            $(form).ajaxSubmit({
                success : function(data) {
                    if($scope.model == "add"){
                        var patt1=new RegExp(/{[\S\s]*}/);
                        var parentData = eval("(" + data.match(patt1)[0] + ")"); // 匹配出来转换成对象
                        if(parentData.state == true){
                            alert("注册成功");
                            //$.cookie("user",parentData.user);
                            location.href="/index";
                        }else {
                            alert("账号已存在")
                        }
                        return;
                    }
                    /*login*/
                    if(data.state == true){
                        alert("登陆成功");
                        //$.cookie("user",data.user);
                        location.href="/index";
                    }else{
                        alert("账号或密码错误");
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("失败");
                }
            });
        }
    };
}])
