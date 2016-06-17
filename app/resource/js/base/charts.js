(function($) {
    $.fn.extend({
        chartBreadOrRadar : function(o){
            var self = $(this).attr("id"),
                $self = $("#" + self),
                myChart = echarts.init(document.getElementById(self)),
                lastIndex = 0,
                timeTicket,
                opction = {
                    url : "",
                    datas:[],
                    method : "post",
                    title : {
                        text: '表头',
                        subtext: '表头内容'
                    },
                    tooltip : {
                        trigger: 'item'
                    },
                    dataName:[],
                    toolbox: {
                        show : true,
                            feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    legend : {},
                    polar : [{
                        center : [document.getElementById(self).offsetWidth - 250, 225],
                        radius : 100
                    }],
                    series : [
                        {
                            name:'pie',
                            type:'pie',
                            radius : [0, 110],
                            center: [250, 225],
                            data: (function (){
                                var res = [];
                                var len = 0;
                                while (len++ < o.datas.length) {
                                    res.push({
                                        name: o.datas[len-1].text,
                                        value: o.datas[len-1].val
                                    });
                                }
                                return res;
                            })()
                        },
                        {
                            name: 'radar',
                            type: 'radar',
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data: (function (){
                                var res = [];
                                var len = 0;
                                while (len++ < o.datas.length) {
                                    res.push({
                                        name: o.datas[len-1].text,
                                        value: o.datas[len-1].val
                                    });
                                }
                                return res;
                            })()
                        }
                    ],
                    calculable : true,
                    clickCallback : function(){}
                }
            $.extend(opction,o);
            opction.legend.data = opction.dataName;
            opction.polar[0].indicator=  opction.datas;

/*
            $.ajax({
                url:opction.url,
                type:opction.method,
                cache:false,
                data:opction.datas,
                success:function(data) {

                },
                error : function(error) {
                    console.log(error);
                }
            });
 */
            clearInterval(timeTicket);
                timeTicket = setInterval(function (){
                lastIndex += 1;
                if(lastIndex>5){
                    lastIndex = 1
                }
                // 动态数据接口 addData
                myChart.addData([
                    [0,        // 系列索引
                        {         // 新增数据
                            name:  opction.datas[lastIndex-1].text,
                            value: opction.datas[lastIndex-1].val
                        },
                        false,     // 新增数据是否从队列头部插入
                        false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                        opction.datas[lastIndex-1].text
                    ],
                    [1,        // 系列索引
                        {         // 新增数据
                            name: opction.datas[lastIndex-1].text,
                            value: [19,18,28,18,11],
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        var value = params.data
                                        return isNaN(value) ? undefined : (value >= 120 ? 'green' : 'green')
                                    },
                                    label: {
                                        show: true,
                                        formatter:function(params) {
                                            return params.value;
                                        }
                                    }
                                }
                            }
                        },
                        false,     // 新增数据是否从队列头部插入
                        false      // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                    ]
                ]);
               opction.polar[0].indicator[lastIndex-1] =  opction.datas[lastIndex-1];
            }, 2000);

            myChart.setOption(opction);

        }
    })
})(jQuery)