$.extend({
    typeSelect:function(){
        function showOrHide(){
            var item = 0;

            $('#ITD_dlg .multipeSelect').each(function(){
                if ( $(this).find("ul input[type=checkbox]:checked")[0] ){
                    item = item+1
                }
            })
            if ( item ){
                $("#issueTypeDescription").animate({'height':item*22+16+'px'})
                $("#ITD_rightBar").animate({'height':item*22+28+'px'})
                $.renderSelectedIssueTypes();

            }else{
                $("#ITD_dlg .category").attr('checked',false)
                $("#issueTypeDescription").html('').animate({'height':'16px'})
                $("#ITD_rightBar").animate({'height':'28px'})
            }
        }
        setTimeout(function(){
            $("#ITD_dlg input").bind('change',function(){
                //$(this).parents(".multipeSelect").find("input").attr("checked",false);
                //$(this).attr("checked",true)
                showOrHide()
            })
        },100)
        // 显示 && 隐藏弹框
        $('#ITD_rightBar,#issueTypeDescription').bind('click',function(event){
            $('#ITD_dlg').show()
            $(document).one("click",function(){
                showOrHide()
                $('#ITD_dlg').hide();
            });
            $("#objectSelectBoxClose").click(function(){
                showOrHide()
                $('#ITD_dlg').hide();

            })
            event.stopPropagation();
        })


        $('#issueTypeDescription').on('click','.subBox',function(event){
            event.stopPropagation();
        })
        // 弹框绑定事件监听
        $('#ITD_dlg').click(function(event){
            event.stopPropagation();
        })

        //var selected;
        // 删除已选中的标签
        $("#issueTypeDescription").on('click','.iLabel',function(){
            var index = $(this).attr('index');

            $('#ITD_dlg').find('input').each(function(){
                if( index == $(this).attr('value') ){
                    $(this).attr('checked',false)
                    return false;
                }
            });
            showOrHide()
            $(this).remove();
        })
    },
    renderSelectedIssueTypes:function(){

        var sortArray=new Array();
        $('.selectInput input[type="checkbox"]:checked').each(function(){
            sortArray.push($(this).val());
        });
        $("#issueTypeDescription").data('select',sortArray);


        var typeDesc="";
        $("#ITD_dlg .category").each(function(index,value){
            if ( $(value).getTypeSelectLabels() != '' ){
                typeDesc=typeDesc+'<div class="subBox" ><strong>['+$(this).html()+']：</strong>'+$(value).getTypeSelectLabels()+"</div>";
            }
        });
        $("#issueTypeDescription").html(typeDesc);
    }

})


$.fn.extend({
    getTypeSelectValues:function(){
        var itemId=$(this).attr("id");
        var showItem=$(this).nextAll("ul:first");
        $(".close").parent().parent().hide();
        var _check=showItem.find(":checkbox");
        var selectValue="";
        var selectText="";
        $(_check).each(function(){
            if($(this).attr("checked")){
                selectValue=selectValue+$(this).attr("value")+',';
                selectText=selectText+$(this).parent().text()+',';
            }
        });
        if(showItem.find("input:checked").size()>0){
            $("#"+itemId).attr("checked","checked");
        }
        return selectValue;
    },
    setTypeSelectValues:function(ids){
        //设置选中的值
        var selectValue=ids.split(",");
        for(i=0;i<selectValue.length;i++){
            $(this).nextAll("ul:first").find("input[value='"+selectValue[i]+"']").attr("checked","checked");
        }
        $(this).attr("checked","checked");
    },
    getTypeSelectLabels:function(){
        var itemId=$(this).attr("id");
        var showItem=$(this).nextAll("ul:first");
        var _check=showItem.find(":checkbox");
        var selectValue="";
        var selectText="";
        var selectDom="";
        $(_check).each(function(){
            if($(this).attr("checked")){
                selectValue = $(this).attr("value");
                selectText  = $.trim( $(this).parent().text() );
                selectDom   = selectDom +'<span class="iLabel" index="'+selectValue+'">'+selectText+'</span>';
            }
        });
        if(showItem.find("input:checked").size()>0){
            $("#"+itemId).attr("checked","checked");
        }else{
            $("#"+itemId).attr("checked",false);
        }
        return selectDom;
    },
    resetTypeSelectLabels:function(){
        //$(defaultOption.addTo).text(self.getTypeSelectLabels());
    }
});