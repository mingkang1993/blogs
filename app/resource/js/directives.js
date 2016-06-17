myAppModule.directive('uploadfile', ['$parse','$timeout', function($parse,$timeout) {
    var upload = {
        restrict: "A",//指令的使用方式，包括标签，属性，类，注释
        template: '<div id="{{queueid}}" class="custom-queue"></div><input type="button" id="{{fileid}}" class="file" /><select id="{{selectid}}" multiple="multiple" name="{{selectname}}" class="hidden"></select>',//指令使用的模板，用HTML字符串的形式表示
        replace: false,//是否用模板替换当前元素，若为false，则append在当前元素上
        link: function(scope, elem, attrs) {
            scope.queueid="queueid"+(new Date()).valueOf();
            scope.fileid="file"+(new Date()).valueOf();
            scope.selectid=attrs.selectid;
            scope.selectname=attrs.selectname;
            scope.$watch(attrs.fileid, function(value) {
                $timeout(function(){
                    $(elem).find(".file").uploadFile({
                        queueID:scope.queueid,
                        selectid:scope.selectid,
                        targetType:attrs.type,
                        queueSizeLimit:attrs.queuesizelimit
                    });
                    if(scope.data){
                        angular.forEach(scope.data.attachments,function(item){
                            $("<option>").val(item.fileName+"|"+item.realName).html(item.fileName+"|"+item.realName).attr("selected",true).data("filename",item.fileName).appendTo($("#"+scope.selectid));
                            $("#"+scope.queueid).addUploadFileValue({
                                id:item.id,
                                filename:item.realName,
                                bName:item.fileName,
                                removeAction:true
                            });
                        })
                    }
                },1000)
            });

        }//以编程的方式操作DOM，包括添加监听器等
    };
    return upload;
}]).directive('jqdatepicker', ['$parse','$timeout', function($parse,$timeout) {
    var datePicker = {
        restrict: "A",//指令的使用方式，包括标签，属性，类，注释
        template: '',//指令使用的模板，用HTML字符串的形式表示
        replace: false,//是否用模板替换当前元素，若为false，则append在当前元素上
        link: function(scope, elem, attrs){    //日期表单
            var dfop={
                yearRange: '1930:2060',
                timeFormat: 'HH:mm:ss',
                onSelect:function(date,obj){

                    var associatedid = $('#'+attrs['associatedid']);
                    if( associatedid[0] && !(associatedid.attr('max-date')||associatedid.attr('min-date')) ){
                        associatedid.datepicker( "option", associatedid.attr('datastatus'), date );
                    }
                }
            }

            $timeout(function(){
                var associatedid = $('#'+attrs['associatedid']);

                if(associatedid[0] && associatedid[0].value){
                    var  json  = '{'+attrs['datastatus']+':'+associatedid[0].value+'}'
                    angular.extend(dfop,json);
                }
                angular.extend(dfop,attrs);
                $(elem).attr('readonly','readonly')
                    .datePicker(dfop);
            },10);
        }//以编程的方式操作DOM，包括添加监听器等
    };

    return datePicker;

}])
    .directive('selFun', function ($timeout) {	// 搜索框回车之后直接搜索
        return function (scope, element, attrs) {
            $timeout(function(){
                $(element).selFun();
            },500)
        };
    }).directive('ngEnter', function () {	// 搜索框回车之后直接搜索
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    element.next().click()
                    event.preventDefault();
                }
            });
        };
    }).directive('return', function ($rootScope) {	// 搜索框回车之后直接搜索
        return function (scope, element, attrs) {
            element.bind("click", function (event) {
                if($rootScope.oldUrl){
                    location.href=$rootScope.oldUrl;
                }else{
                    location.href="/index.html";
                }
            });
        };
    })
    .directive('loop', ['$parse','$timeout', function($parse,$timeout) {
        var loop = {
            restrict: "A",//指令的使用方式，包括标签，属性，类，注释
            template: '',//指令使用的模板，用HTML字符串的形式表示
            replace: false,//是否用模板替换当前元素，若为false，则append在当前元素上
            link: function(scope, elem, attrs) {
                $timeout(function(){

                    $(elem).loop()

                },100);
            }//以编程的方式操作DOM，包括添加监听器等
        };

        return loop;

    }]).directive('slidebarFixed', ['$parse','$timeout', function($parse,$timeout) {
        var slidebarFixed = {
            restrict: "A",//指令的使用方式，包括标签，属性，类，注释
            template: '',//指令使用的模板，用HTML字符串的形式表示
            replace: false,//是否用模板替换当前元素，若为false，则append在当前元素上
            link: function(scope, elem, attrs) {

                function resetAnchorPoint($index){
                    scope.active = $index;
                    scope.$apply();
                }
                function headlineFixed(top){
                    if (top > 65) {
                        $("#gotoTop").stop().fadeIn();
                        if( !$('.slideBar').hasClass('fixed') ) $('.slideBar').addClass(" fixed");
                        if( !$('#detailView').hasClass('headlineFixed') ) $('#detailView').addClass(' headlineFixed');
                    } else {
                        $("#gotoTop").fadeOut();
                        $('.slideBar').removeClass(" fixed");
                        $('#detailView').removeClass(' headlineFixed')
                    }

                }
                function fixed(){
                    var nodeLi = $('#slideItems li:visible');
                    var arr = [];

                    $(window).unbind('scroll').bind('scroll',function () {
                        clearTimeout(window.scrollTimer);
                        window.scrollTimer=setTimeout(function(){
                            headlineFixed( $(window).scrollTop() )

                            arr.length =0;
                            $('#formElement .anchorPoint').each(function(){
                                var offset = $(this).offset();
                                arr.push(offset.top-70);
                            })

                            for(var len = arr.length-1;len>0;len--){
                                if( arr[len-1]<top && top<arr[len]){
                                    if( !nodeLi.eq(len-1).hasClass('current') ){
                                        resetAnchorPoint( len-1 )
                                    }
                                }else if(top<arr[0] && !nodeLi.eq(0).hasClass('current') ){
                                    resetAnchorPoint( 0 )

                                }else if(top>arr[arr.length-1] && !nodeLi.eq(arr.length-1).hasClass('current')){
                                    resetAnchorPoint( len )
                                }
                            }
                        },10);  // setTimeout
                    }); //scroll
                };

                $timeout(function(){
                    resetAnchorPoint(0);
                    fixed()
                },500,false)

                scope.slideClick=function(item,$index,$event){
                    scope.active=$index;
                    var getThere = $("#"+item.id).offset().top-55;

                    $(window).unbind('scroll')
                    $('body').animate({
                        scrollTop: getThere
                    },100,function(){
                        $(window).scrollTop(getThere)
                        headlineFixed( getThere )
                        resetAnchorPoint($index);
                        fixed()
                    });
                    scope.items[$index].show=true;
                    return false;
                };
            }//以编程的方式操作DOM，包括添加监听器等
        };

        return slidebarFixed;

    }]).directive('formValidate', ['$parse','$timeout', function($parse,$timeout) {
        var upload = {
            restrict: "A",//指令的使用方式，包括标签，属性，类，注释
            template: '',//指令使用的模板，用HTML字符串的形式表示
            replace: false,//是否用模板替换当前元素，若为false，则append在当前元素上
            link: function(scope, elem, attrs) {
                $timeout(function(){
                    $(elem).find("select").each(function(item,index){//解决formValidate无法验证无name值select的问题
                        if(!$(this).attr("name")){
                            $(this).attr("name","select"+new Date().getTime()+Math.floor(Math.random()*1000));
                        }
                    })
                    $(elem).formValidate({
                        onkeyup: false,
                        submitHandler: function(form) {
                            scope.formSubmit(form);
                            $timeout(function(){	// .headline 定位问题
                                if( !+[1,] ){
                                    var scrollTop = $('html').scrollTop();
                                    if (scrollTop > 65) {
                                        $("#gotoTop").stop().fadeIn();
                                        if( !$('.slideBar').hasClass('fixed') ) $('.slideBar').addClass(" fixed");
                                        if( !$('#detailView').hasClass('headlineFixed') ) $('#detailView').addClass(' headlineFixed');
                                    } else {
                                        $("#gotoTop").fadeOut();
                                        $('.slideBar').removeClass(" fixed");
                                        $('#detailView').removeClass(' headlineFixed')
                                    }
                                }
                            },300);
                        }
                    });
                },0);
            }//以编程的方式操作DOM，包括添加监听器等
        };

        return upload;

    }]).directive('treeselect', ['$parse','$timeout', function($parse,$timeout) {
        var treeselect = {
            restrict: "A",//指令的使用方式，包括标签，属性，类，注释
            template: '',//指令使用的模板，用HTML字符串的形式表示
            replace: false,//是否用模板替换当前元素，若为false，则append在当前元素上
            link: function(scope, elem, attrs) {
                var compluteGet = $parse(attrs['complute']);
                var compluteFun = compluteGet(scope.$parent);
                var selectGet = $parse(attrs['select']);
                var selectFun = selectGet(scope.$parent);
                var ngModel = $parse(attrs['ngModel']);
                var $form=$(elem).closest("form");
                var load=true;
                var orgNames=[];
                function getParent(treeNode){
                    if(treeNode && treeNode.getParentNode()){
                        orgNames.push(treeNode.getParentNode().name);
                        getParent(treeNode.getParentNode());
                    }
                }
                $timeout(function(){
                    tree=$(elem).treeSelect({
                        loadCom:function(){
                            if(load){
                                scope.complute(tree);
                            }
                            load=false;
                        },
                        onTreeSelect:function(treeNode){
                            orgNames=[];
                            var treeNodeParents;
                            orgNames.push(treeNode.name);//添加当前层级节点
                            getParent(treeNode);//递归父级元素
                            treeNodeParents=orgNames.reverse().join("->");//组织反转节点
                            scope.select(treeNode,treeNodeParents);
                            /*
                             $timeout(function(){
                             if($form[0] && $(elem)[0] && $(elem).valid()!=0){//用于验证bug的修复
                             $(elem).removeClass("errorInput").poshytip('disable').attr("createMsg","false");
                             }
                             },100);*/
                        }
                    });
                },300);
            }//以编程的方式操作DOM，包括添加监听器等
        };
        return treeselect;
    }]).directive('ngFocus', ['$parse', function($parse) {
        return function(scope, elem, attrs) {
            var fn = $parse(attrs['ngFocus']);
            elem.bind('focus', function(event) {
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            });
        }
    }]).directive('ngBlur', ['$parse', function($parse) {
        return function(scope, elem, attrs) {
            var fn = $parse(attrs['ngBlur']);
            elem.bind('blur', function(event) {
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            });
        }
    }]).directive('ngDate', ['$parse','$timeout', function($parse,$timeout) {
        var date = {
            restrict: "A",
            template: '',
            replace: false,
            link: function(scope, elem, attrs) {
                var date=new Date();
                var year = date.getFullYear();
                var month = date.getMonth() +1;
                var day = date.getDate();
                var week = date.getDay();
                switch (week) {
                    case 0 :
                        week= "星期日";
                        break;
                    case 1 :
                        week= "星期一";
                        break;
                    case 2 :
                        week= "星期二";
                        break;
                    case 3 :
                        week= "星期三";
                        break;
                    case 4 :
                        week= "星期四";
                        break;
                    case 5 :
                        week= "星期五";
                        break;
                    case 6 :
                        week= "星期六";
                        break;
                }
                $timeout(function(){
                    $(elem).html(year +"年"+month +"月"+day+"日  "+week)
                })
            }
        };

        return date;
    }]).directive('ngPlaceholder', ['$parse','$timeout', function($parse,$timeout) {
        var ngPlaceholderr = {
            restrict: "A",//指令的使用方式，包括标签，属性，类，注释
            template: '',//指令使用的模板，用HTML字符串的形式表示
            replace: false,//是否用模板替换当前元素，若为false，则append在当前元素上
            link: function(scope, elem, attrs) {
                $timeout(function(){
                    //var _this = $("#searchText");
                    var _placeholder =  attrs['newplaceholder'];
                    $(elem).focus(function() {
                        if ($(elem).val() === _placeholder) {
                            $(elem).val('')
                        }
                    }).blur(function() {
                        if ($(elem).val().length === 0) {
                            $(elem).val(_placeholder)
                        }
                    })
                    $(elem).val(_placeholder);

                },100);
            }//以编程的方式操作DOM，包括添加监听器等
        };

        return ngPlaceholderr;

    }]).directive('customuploadfile', ['$parse','$timeout', function($parse,$timeout){
        var customuploadfile = {
            restrict: "A",//指令的使用方式，包括标签，属性，类，注释
            template: "",//指令使用的模板，用HTML字符串的形式表示
            replace: false,//是否用模板替换当前元素，若为false，则append在当前元素上
            link: function(scope, elem, attrs) {
                var patrn = new RegExp(/^(([a-zA-Z]:)|(\\{2}\w+)\$?)(\\(\w[\w].*))+(.PNG|.JPG|.png|.rar|.jpg.GIF|.gif|.RAR)$/),
                    thatVal;
                $timeout(function(){
                    var thatName = "";
                    if($(elem).attr("id") != undefined){
                        thatName = $(elem).attr("id");
                    }else{
                        thatName = "headPng";
                    }
                    $(elem).html(
                        "<div class='customUploadfile'>" +
                        "<input type='text' name='dasdsad' readonly='readonly' class='form-control inputuploaText'/><input name="+ thatName +" type='file' class='inputuploa'/>" +
                        "<a href='javascript:;' class='btn btn-success inputuploA'>上传</a>" +
                        "</div>"
                    ).find("input[type=file]").change(function(){
                        thatVal = $(elem).find("input[type=file]").val();
                        if(!patrn.test(thatVal)){
                            $(elem).find("input[type=text]").val("");
                            $.messageBox({
                                message:"上传失败,只支持xls或excel！",
                                level:"error"
                            });
                        }else{
                            $(elem).find("input[type=text]").val(thatVal);
                            $(elem).find(".customUploadImg").html('<img src='+ thatVal +'>');
                            $.messageBox({message:"成功添加!"});
                        }
                    });

                },100);
            }//以编程的方式操作DOM，包括添加监听器等
        };
        return customuploadfile;
    }]).directive('valueCode', ['$parse','$timeout', function($parse,$timeout){
        var valueCode = {
            restrict : "A",
            replace : false,
            link : function(scope, elem){
                var code ;
                function createCode(){
                    code = "";
                    var codeLength = 6;
                    var selectChar = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
                    for(var i=0;i<codeLength;i++)
                    {
                        var charIndex = Math.floor(Math.random()*36);
                        code +=selectChar[charIndex];
                    }
                    $(elem).find("#checkCode").val(code)
                }
                createCode()
                $(elem).find("#checkCode").click(function(){
                    createCode()
                })
            }
        }
        return valueCode;
    }]).directive('ccapCode', ['$parse','$timeout','$http', function($parse,$timeout,$http){
        return ccapCode = {
            restrict : "A",
            template: "",//指令使用的模板，用HTML字符串的形式表示
            replace : false,//是否用模板替换当前元素，若为false，则append在当前元素上
            link : function(scope, elem){
                function createCode(){
                    $http({
                        method:'POST',
                        url: '/ccap/code',
                        cache: false
                    }).success(function(data, status) {
                        $(elem).html("<img src='data:image/jpeg; base64," + data.imgPic +"'>")
                        $(elem).find('img').data("dataImg",data.text);
                        //$scope.text = data.text;
                    }).error(function(data,status,headers,config){
                        $.messageBox({message:'请求视图信息出错！'})
                    })
                    //$(elem).find("#checkCode").val(code)
                }
                createCode()
                $(elem).on("click","img",function(){
                    createCode()
                    scope.$apply()
                })
            }
        }

    }])