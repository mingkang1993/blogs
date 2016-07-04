import * as typeListService from 'api/type/typeListService';

export async function getArticleListData(data){
     let reqData = await typeListService.articleList(data);
     reqData.datas.forEach(function(item){
          item.footLeftData = [
               {
                    image : 'img/zan1.png',
                    text : item.praise_num,
                    evtCallback : function(){
                         item.footLeftData[0].image = 'aaaaa'
                    }
               }
          ];

          item.footRightData = [
               {
                    image : 'img/huifu.png',
                    text : item.comments.length,
                    evtCallback : function(){
                         console.log(2)
                    }
               }
          ];
     });

     return reqData.datas
}
