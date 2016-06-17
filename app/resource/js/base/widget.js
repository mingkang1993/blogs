$.ajaxSetup({
    cache:false
});
$.extend({

    httpData: function( xhr, type, s ) {
        var ct = xhr.getResponseHeader("content-type") || "",
            xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
            data = xml ? xhr.responseXML : xhr.responseText;

        if ( xml && data.documentElement.nodeName === "parsererror" ) {
            jQuery.error( "parsererror" );
        }

        // Allow a pre-filtering function to sanitize the response
        // s is checked to keep backwards compatibility
        if ( s && s.dataFilter ) {
            data = s.dataFilter( data, type );
        }

        // The filter can actually parse the response
        if ( typeof data === "string" ) {
            // Get the JavaScript object, if JSON is used.
            if ( type === "json" || !type && ct.indexOf("json") >= 0 ) {
                data = jQuery.parseJSON( data );

                // If the type is "script", eval it in global context
            } else if ( type === "script" || !type && ct.indexOf("javascript") >= 0 ) {
                jQuery.globalEval( data );
            }
        }

        return data;
    },
    handleError: function( s, xhr, status, e ) {
        // If a local callback was specified, fire it
        if ( s.error ) {
            s.error.call( s.context, xhr, status, e );
        }

        // Fire the global callback
        if ( s.global ) {
            jQuery.triggerGlobal( s, "ajaxError", [xhr, s, e] );
        }
    },
    layout:function(option){
        function layoutFun(){
            var documentHeight=document.documentElement.clientHeight
                -$(".ui-layout-north").outerHeight(true)
                -$(".ui-layout-south:visible").outerHeight(true);
            var rightWidth=document.documentElement.clientWidth-$(".ui-layout-west:visible").width();
            $(".ui-layout-center,.ui-layout-west").height(documentHeight);
            setTimeout(function(){
                $(".center-left").height(documentHeight-$("#contentDiv>.newNavTop").outerHeight(true)-54)
                $(".orgObjContent").height(documentHeight-$("#contentDiv>.newNavTop").outerHeight(true)-$(".center-left h4").outerHeight(true)-$(".center-left .autosearch").outerHeight(true)-$("#editModeBox").outerHeight(true) -80);
            },500)
            $(".ui-layout-north dl.sysMenuList").width(document.documentElement.clientWidth);//ie6 bug
            if(window._currentGrid!=undefined && !window._currentGrid.closest(".leaderCon")[0] && !window._currentGrid.closest(".workbenchTabList")[0] && window._currentGrid.closest(".ui-layout-center")[0]){
                window._currentGrid.setGridWidth(rightWidth-$(".superviseCenterRight:visible").width()-$("#contentDiv .center-left").width()-$("#contentDiv .center-content-right").width()-20).setGridHeight(documentHeight-$("#nav:visible").outerHeight(true)-$("#thisCrumbs:visible").outerHeight(true)-$(".content-top").height()-$("#content-top").height()-$(".groupNav").height()-$("#commonPopulation:visible").outerHeight(true)-$("#tabList .ui-tabs-nav").outerHeight(true)-$("#contractCommonPopulation").outerHeight(true)-$("#statistics").height()-$(".center-right .newNavBottom").outerHeight(true)-$("#contentDiv>.newNavTop").outerHeight(true)-78);
            }
        }
        layoutFun();
        $(window).resize(function(){
            clearTimeout(window._layoutTimer);
            window._layoutTimer=setTimeout(function(){
                layoutFun();
            },300);
        });
        $(".slideResizer .slideToggler").toggle(function(){//缩进条按钮事件
            $(".ui-layout-west").hide();
            $(".slideResizer .slideToggler").addClass("slideTogglerCur").attr("title","展开");
            layoutFun();
            $(window).trigger("resize");
        },function(){
            $(".ui-layout-west").show();
            $(".slideResizer .slideToggler").removeClass("slideTogglerCur").attr("title","缩进");

            layoutFun();
            $(window).trigger("resize");
        });
    },
    messageBox : function(options) {
        var dfop={
            message: false,
            level: "success",
            speed: 500,
            life:3000
        };
        $.extend(dfop, options);
        if(options=='close'){
            $("#jGrowl").removeAttr("style").empty();
            return false;
        }
        if(!$("#jGrowl")[0]){
            $("body").append("<div id='jGrowl'></div>");
        }else{
            $("#jGrowl").removeAttr("style").empty();
        }
        dfop.message='<div class="'+dfop.level+'"><span></span>'+dfop.message+'</div>';
        $("#jGrowl").addClass("jGrowl").append(dfop.message).animate({top:0},dfop.speed);
        function hideMessageBox(){
            clearTimeout(window._messageBox);
            window._messageBox=setTimeout(function(){
                $("#jGrowl").remove();
            },dfop.life);
        }
        hideMessageBox();
        $("#jGrowl").hover(function(){
            clearTimeout(window._messageBox);
        },function(){
            hideMessageBox();
        });
    },
    loadingComp:function(option){       // loading状态控件 - 用于jqgrid
        var _init=function(){
            $("body").prepend('<div class="dialog_loading"><div class="loadingcon"></div></div>');
        };
        if(typeof(option)=='string'){
            if(option=="open"){
                _init();
                $(".dialog_loading").show();
            };
            if(option=="close"){
                $(".dialog_loading").remove();
            }
        };
    },

    fillFormElem:function(op){        //获取数据字典项
        var o = $.extend({
            //getPageDataUrl:'system/sysUser/getById.action',          // 请求页面数据所需要的
            //getDataId:setData.id,                                    // 修改模式下所需要的id
            tplId:'',        // 模版的id
            viewModId:'',    // 生成好的页面插入到这个id
            setData:'',      // 新增模式下说需要的
            maps:'',         // 请求select所用的id
            callback:null    // 某些情况需要回调执行一些方法

        },op||{});

        var obj = {
            data:{},
            pageData:null,
            elemData:null,
            renderTpl:function(tplId,data){
                var html = template.render(tplId,data);      //渲染模版
                $('#'+ o.viewModId).append( html)
                    .find('select').each(function(){
                        $(this).val( $(this).attr('dfVal') )

                    });
                if( $.isFunction(o.callback)  ){ o.callback(obj.data) }

            },
            mergerData:function(a,b){
            },
            init:function(){
                function setElemData(elemData){
                    obj.elemData = elemData;

                    if(!o.getPageDataUrl && !obj.pageData){
                        obj.data = o.setData;
                        obj.data.elemData = obj.elemData;
                        obj.renderTpl(o.tplId,obj.data);
                    }else if(o.getPageDataUrl && obj.pageData){
                        obj.data = $.extend(obj.pageData, o.setData||{});
                        obj.data.elemData = obj.elemData;
                        obj.renderTpl(o.tplId,obj.data);
                    }
                }
                if(o.maps){
                    $.ajax({
                        url:'system/sysDict/getDict.action',
                        data:{"maps": o.maps,"appId":OAPPID},
                        success:setElemData
                    });
                }else{
                    setElemData('');
                }

                if(o.setData.mode == 'edit' || o.setData.mode == 'copy'){
                    $.ajax({
                        url: o.getPageDataUrl,
                        data:{'id': o.getDataId},
                        success:function(pageData){
                            obj.pageData = pageData;
                            if( obj.elemData || !o.maps ){
                                obj.data = $.extend(obj.pageData, o.setData||{});
                                obj.data.elemData = obj.elemData;
                                obj.renderTpl(o.tplId,obj.data);
                            }
                        }
                    });
                }
            }
        };
        obj.init();
    }
});

$.fn.extend({
    serializeFormJSON : function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },
    gridRowRightClick:function(o){
        var self=$(this);
        var dfop = {
            width: 150,
            items: [
                {text: "新增记录", icon: "resource/external/contextmenu/css/images/icons/add.png", alias: "add", action: function(){
                    $("#add").click();
                }},
                {text: "修改记录", icon: "resource/external/contextmenu/css/images/icons/edit.png", alias: "edit", action: function(){
                    var selectId=self.data("selectid");
                    if(selectId && typeof updateOperator=='function'){
                        updateOperator(selectId);
                    }
                }},
                {text: "删除记录", icon: "resource/external/contextmenu/css/images/icons/del.png", alias: "del", action: function(){
                    var selectId=self.data("selectid");
                    if(selectId && typeof deleteOperator=='function'){
                        deleteOperator(selectId);
                    }
                }},
                {text: "高级搜索", icon: "resource/external/contextmenu/css/images/icons/search.png", alias: "search", action: function(){
                    $("#search").click();
                }},
                {text: "刷新", icon: "resource/external/contextmenu/css/images/icons/refresh.png", alias: "reload", action: function(){
                    $("#reload").click();
                }}
            ],
            onShow: applyrule,
            onContextMenu: BeforeContextMenu
        };
        $.extend(dfop,o);

        function applyrule(menu) {
            if (this.id == "target2") {
                menu.applyrule({
                    name: "target2",
                    disable: true,
                    items: ["1-2", "2-3", "2-4", "1-6"]
                });
            }else {
                menu.applyrule({
                    name: "all",
                    disable: true,
                    items: []
                });
            }
        }

        function BeforeContextMenu() {
            return this.id != "target3";
        }
        self.contextmenu(dfop);
    },
    dialogtip:function(option){     // formValidate组件调用
        var defaultOption={
            className: 'tip-error',
            showOn: 'none',
            alignTo: 'target',
            hideTimeout:0,
            showTimeout:0,
            alignX: 'center',
            alignY: 'bottom',
            offsetX: 0,
            offsetY: 5
        };
        $.extend(defaultOption,option);
        $(this).poshytip(defaultOption);
    },
    isButtonEnabled:function(){
        return !($(this).attr("disabled")=="true" || $(this).attr("disabled")=="disabled");
    },

    buttonDisable:function(){
        $(this).addClass("disabled");
    },
    buttonEnable:function(){
        $(this).removeClass("disabled");
    },
    datePicker : function(o) {
        var self = $(this);
        var dfop={
            showWeek: false,
            changeMonth: true,
            changeYear: true,
            yearSuffix: '',
            dateFormat:'yy-mm-dd',
            showButtonPanel: true,
            showClearButton:true
        };
        $.extend(dfop,o);
        if(!$("#ui-datepicker-div").attr("id")){
            $.datepicker.initialized = false;
        }
        self.datepicker(dfop);
    },

    pop:function(options){      // isPopExtend
        var self=$(this);
        var selfId=$(this).attr("id");
        var conId=selfId+new Date().getTime();
        var thisWindow = {
            l: $(window).scrollLeft(),
            t: $(window).scrollTop(),
            w: $(window).width(),
            h: $(window).height()
        };
        var defaultOption={
            className: 'tip-yellowsimple',
            hideTimeout:0,
            showTimeout:0,
            offsetX: 5,
            offsetY: 0,
            showOn: 'none',
            alignTo: 'target',
            alignX: 'right',
            alignY: 'center',
            openNew:true,
            content:function(){}
        };
        $.extend(defaultOption,options);
        var target='_blank';
        if(defaultOption.openNew!=true){
            target='_self';
        }
        if(defaultOption.content==null || defaultOption.content==""){
            defaultOption.content='<div class="popupcon" id="'+conId+'">暂无人员类型</div>';
        }else{
            defaultOption.content='<div class="popupcon" id="'+conId+'">人员类型：'+defaultOption.content+'</div>';
        }


        var init=function(){
            var tipMsg = self.parent().attr("title");
            if(tipMsg && tipMsg!=""){
                self.parent().attr("title","");
            }
            self.poshytip(defaultOption);
            $(".tip-yellowsimple").bgiframe();
        };

        self.hover(
            function(){
                if(self.offset().left+300>thisWindow.w){
                    defaultOption.alignX="left";
                }
                else{
                    defaultOption.alignX="right";
                };
                init();
                self.poshytip("show");
            },
            function(){
                self.poshytip("hide");
            });
    },
    selFun:function(options){
        //定义常量
        var self = $(this);
        var settings = $.extend({url:''},options);

        if( self.next('.ui-select')[0] ){self.next('.ui-select').remove()}
        this.each(function() {
            //html template
            var $html = $('<span class="ui-select"><span class="default"><label class="ui_sj"><label></label></label><span></span></span><ul class="newUl"></ul></span>');
            //将下拉框隐藏，把模版插入其后
            var $this = $(this).hide().after($html);
            //声明全局变量
            var $list = $html.find('ul'),$default = $html.find('.default'),$span = $default.find('span'),$label = $default.find('label');
            //从网络加载数据
            if(settings.url){
                $.ajax({
                    url: settings.url,
                    dataType:'json',
                    async : false,
                    success: function(data){
                        //得到已经存在的option个数
                        var size = $this.find('option').size();
                        $.each(data,function(i,option){
                            //由于ie6 的bug ，不得不采用原生的方式对DOM进行操作
                            $this[0].options[i+size] = new Option(option.domainName,option.id);
                        });
                    }
                });
            }

            //将option遍历到li中
            $this.find('option').each(function(){
                var $option = $(this);
                $('<li val="'+$option.val()+'"><a href="javascript:;">'+$option.text()+'</a></li>').appendTo($list);

                if($option.prop('selected') === true){
                    $this.val($option.val());
                    $span.text($option.text());
                }
            });
            //计算下拉框宽度
            if($span.text() === ''){
                var $li = $list.find('li').first();
                $this.val($li.attr('val'));
                $span.text($li.text());
            }
            $span.width($(this).width());
            //click 事件
            $default.width($span.outerWidth()+$label.outerWidth(true)).click(function(event){
                //阻止事件冒泡
                event.stopPropagation();
                if(!$list.find('li').size())
                    return ;
                $list.slideToggle(200);
            });
            $html.width($default.outerWidth());
            //$list.width($default.outerWidth());

            $list.find('li').click(function(){
                var $li = $(this);
                $span.text($li.text());
                if($this.val() != $li.attr('val'))
                    $this.val($li.attr('val')).change();
            }).hover(function(){
                $(this).toggleClass('active');
            });

            $this.change(function(){
                var index = $this[0].selectedIndex,$li = $list.find('li:eq('+index+')');
                $span.text($li.text());
            });

            $(document).click(function(){
                $list.slideUp(200);
            });
        });
        return this;
    },
    statisticsAutoHeight:function(){
        var wrapHeight = null,
            wrapWidth = null,
            tableHeight = null,
            layout=function(){
                wrapWidth=$(".ui-layout-center").width()-400;
                wrapHeight=($(".ui-layout-center").height()-$("#thisCrumbs").outerHeight()-$("#contentDiv > .btnbanner").outerHeight()-$(".leaderTit").outerHeight()*2)/2-28;
                tableHeight=wrapHeight-50;
                $(".highcharts-container,.warpTable").height(wrapHeight);
                $(".highcharts-container").width(wrapWidth);
            }
        layout();
        $(window).resize(function(){
            layout();
        })
        return {
            wrapHeight:wrapHeight,
            tableHeight:tableHeight
        };
    }
});


$.fn.extend({
    treeSelect:function(options){
        var self=$(this).addClass("treeSelectInput");
        var selfId=self.attr("id");

        var defaultOption={
            url:'/gisOrg/list.action',
            editable:false, //禁止手写及联想功能
            triggerAction:'all',
            name:'org',
            maxHeight: 300,
            maxWidth:250,
            listWidth:200,
            selectedClass:'',
            onSelect:{},
            inputName:"",
            allOrg:false,
            rootId:false,
            inputCodeName:"",
            onTreeSelect:function(treeNode){

            }
        };
        function initHtml(){
            $("#"+selfId+"-menuContent").remove();//首先把隐藏的Tree删除
            var htmlTree = '<div id="'+selfId+'-menuContent" class="menuContent"><ul id="'+selfId+'-tree" class="ztree"></ul></div>';
            $("body").append(htmlTree);//再把tree动态添加上去
        }
        $.extend(defaultOption, options);

        if(!defaultOption.url){return false;}
        initHtml();
        var tree = $("#"+selfId+"-tree").initZTree({
            orgType:'0',
            shouldJugeMultizones:true,
            allOrg:defaultOption.allOrg,
            url:defaultOption.url,
            rootId:defaultOption.rootId,
            loadCom:defaultOption.loadCom
        });
        $("#"+selfId+"-div").height(defaultOption.maxHeight).width(defaultOption.listWidth);

        /*var construct=function(){

         //把搜索框添加到tree上面
         //var htmlSearch  = "<div class='ui-widget currentOrgTxt'><input class='org_autocomplete' id='"+selfId+"-autocomplete' type='text' value='请输入层级' /></div>";
         //$("#"+selfId+"-menuContent").prepend(htmlSearch);
         }()*/
        /*$("#"+selfId).autocomplete({
         source: function(request, response) {
         $.ajax({
         url: "/system/sysOrg/searchNameRegion.action",
         type:'POST',
         data:{
         "param[condition]": request.term,
         "param[appId]":"8C57380114684330A9F3F308558712C4"
         },
         success: function(data) {
         response($.map(data, function(item) {
         return {
         label: item.name+","+stringFormatter(item.contactWay),
         value: item.name,
         id: item.id
         };
         }));
         },
         error : function(){
         $.messageBox({
         message:"搜索失败，请重新登入！",
         level:"error"
         });
         }
         });
         },
         select: function(event, ui) {
         $("#user_autocomplete").removeAttr("userId");
         $("#user_autocomplete").val("");
         $.ajax({
         url:"/system/sysOrg/orgTreePidById.action",
         type:'POST',
         data:{
         "id": ui.item.id
         },
         success:function(data){
         var path=[];
         $(data).each(function(index,item){
         path.push(item.id);
         })
         $.searchChild(tree,path.join("/"));
         }
         });
         }
         });

         $(".org_autocomplete").bind('focusin',function(){
         if( this.value === this.defaultValue ){
         this.value = '';
         }
         }).bind("focusout",function(){
         if( this.value === '' ){
         this.value = this.defaultValue;
         }
         });
         */
        function stringFormatter(str){
            if(str==undefined){
                return "";
            }
            return str;
        }
        //下拉树的点击事件 by tanliang
        function ztreeClick(event, treeId, treeNode,clickFlag) {
            if(treeNode != null){
                /*$("#"+selfId).val(treeNode.name);
                 if ($("input[name='"+defaultOption.inputName+"']").val()!=treeNode.id){
                 $("input[name='"+defaultOption.inputName+"']").val(treeNode.id);
                 }
                 if ($("input[name='"+defaultOption.inputCodeName+"']").val()!=treeNode.orgInternalCode){
                 $("input[name='"+defaultOption.inputCodeName+"']").val(treeNode.orgInternalCode);
                 }
                 */
                defaultOption.onTreeSelect(treeNode);
            }
            if(clickFlag==1){
                hideMenu();
            }
        }

        $("#"+selfId).bind('click',showMenu);
        /**
         * 显示ztree
         * by tanliang
         */
        function showMenu() {
            var inputObj = $("#"+selfId);//或得到输入框的JQuery对象
            var inputOffset = $("#"+selfId).offset();//获得到输入框的offset
            //通过inputOffset和inputObj得到绝对位置，继而把隐藏的ztree在特定的位置显示出来
            $("#"+selfId+"-menuContent").css({
                left:inputOffset.left,
                top:inputOffset.top + inputObj.outerHeight(true)
            }).slideDown("fast");
            $("body").bind("mousedown", onBodyDown);//鼠标一开点击BODY的时候隐藏ztree
        }
        /**
         * 隐藏ztree
         * by tanliang
         */
        function hideMenu() {
            $("#"+selfId+"-menuContent").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }
        function onBodyDown(event) {
            if (!(event.target.id == selfId || event.target.id == selfId+"-menuContent" || $(event.target).parents("#"+selfId+"-menuContent").length>0)) {
                hideMenu();
            }
        }

        $("#"+selfId+"-tree").height( defaultOption.maxHeight - 40 );
        //为这个ztree注册点击事件
        $.fn.zTree.getZTreeObj(selfId+"-tree").setting.callback.onClick=function(event, treeId, treeNode,clickFlag){
            ztreeClick(event, treeId, treeNode,clickFlag);
        };
        return $.fn.zTree.getZTreeObj(selfId+"-tree");
    }

});

/*分页组建*/
$.fn.extend({
    page:function(options){
        var o ={
            url:"",
            pagenum:0,
            listLenth:0,
            totalPage:8,
            sortNavData:{},
            data:{
                id:0
            },
            dataLengthUrl:"",
            method:'post',
            callback:function(){}
        }
        $.extend(o,options)
        var self = $(this);
        var selfId=self.attr("id");
        var $self = $("#" + selfId);
        inst = function(){
            var divLay = '<div class="page-lay" id=#'+selfId+'>'+
                            '<span>共有<span class="listLenth"></span>条数据 共<span class="totalPage"></span>页 当前第<span class="pagenum"></span>页</span>'+
                            '<a href="javascript:;" page="home" class="home">首页</a>'+
                            '<a href="javascript:;" page="up" class="up">上一页</a>'+
                            '<a href="javascript:;" page="next" class="next">下一页</a>'+
                            '<a href="javascript:;" page="back" class="back">尾页</a>'+
                            '<span>转到<input type="text" class="page-go"><a href="javascript:;" page="jump" class="jump">GO</a></span>'+
                         '</div>'
            $self.html(divLay)
            $self.on("click","a",function(){
                pages($(this))
            })
            $.ajax({
                url:o.dataLengthUrl,
                type:o.method,
                cache:false,
                data:o.data,
                success:function(data) {
                    o.listLenth = data.dataLength;
                    o.totalPage = Math.ceil(data.dataLength / 10);
                },
                error : function(error) {
                    console.log(error);
                }
            });
        }
        pages = function(that){
            switch (that.attr("page")){
                case "home":
                    if(o.pagenum != 0){
                        o.pagenum = 0;
                        ajax()
                    }
                    break;
                case  "next":
                    if(o.pagenum + 1 < o.totalPage){
                        o.pagenum += 1;
                        ajax()
                    }
                    break;
                case "up":
                    if(o.pagenum > 0){
                        o.pagenum -= 1;
                        ajax()
                    }
                    break;
                case "back":
                    if(o.pagenum != o.totalPage -1){
                        o.pagenum = o.totalPage - 1;
                        ajax()
                    }
                    break;
                case "jump":
                    var thatVal = $self.find(".page-go").val();
                    if(thatVal > 0 && thatVal <= o.totalPage && thatVal != o.pagenum+1){
                        o.pagenum = $(".page-go").val() - 1;
                        ajax()
                    }else{
                        alert("页码不对");
                        return
                    }
                    break;
            }
            /*
            if(that.attr("page") == "home"){
                if(o.pagenum != 0){
                    o.pagenum = 0;
                    ajax()
                }else{
                    alert("到头了");
                    return
                }
            }else if(that.attr("page") == "next"){
                if(o.pagenum + 1 >= o.totalPage){
                    o.pagenum = o.totalPage -1;
                    alert("到头了");
                    return
                }else{
                    o.pagenum += 1;
                    ajax()
                }
            }else if(that.attr("page") == "up"){
                if(o.pagenum != 0){
                    o.pagenum -= 1;
                    ajax()
                }else{
                    o.pagenum = 0;
                    alert("到头了");
                    return
                }
            }else if(that.attr("page") == "back"){
                if(o.pagenum != o.totalPage -1){
                    o.pagenum = o.totalPage - 1;
                    ajax()
                }else{
                    alert("到头了");
                    return
                }
            }else if(that.attr("page") == "jump"){
                var thatVal = $self.find(".page-go").val();
                if(thatVal > 0 && thatVal <= o.totalPage){
                    o.pagenum = $(".page-go").val() - 1;
                    ajax()
                }else{
                    alert("页码不对");
                    return
                }
            }
             */
        }
        ajax = function(){
            o.data.offsetNum = o.pagenum;
            $.ajax({
                url:o.url,
                type:o.method,
                cache:false,
                data:o.data,
                success:function(data) {
                    o.callback({"pagenum":o.pagenum,"datas":data})
                    //o.listLenth = data.dataLength;
                    $self.find(".listLenth").html(o.listLenth)
                    //o.totalPage = Math.ceil(data.dataLength / 10);
                    $self.find(".totalPage").html(o.totalPage)
                    $self.find(".pagenum").html(o.pagenum+1)
                },
                error : function(error) {
                    console.log(error);
                }
            });
        }
        inst();
        ajax();
    }

});
