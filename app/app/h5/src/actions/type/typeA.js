import axios from 'axios'
import * as typeService from 'api/type/typeService';

export function datumListNavData(){
     return typeService.datumListNav();
}

export function listClick(item,evt){
     console.log(item);
}

