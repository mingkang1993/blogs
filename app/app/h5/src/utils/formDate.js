/**
 * Created by kangdaye on 16/6/24.
 */
export function formDate(date){
    var currentDates = new Date().getTime() - new Date(date).getTime(),
        currentDay = parseInt(currentDates / (60000*60) -1); //减去1小时
    if(currentDay >= 24){
        currentDay = parseInt(currentDay / 24) + "天前"
    }else if(currentDay == 0 ){
        var currentD = parseInt(currentDates / 60000);
        if(currentD >= 60){
            currentDay = "1小时前"
        }else{
            currentDay = currentD + "分钟前"
        }
    }else{
        currentDay = currentDay + "小时前"
    }

    return currentDay
};