import axios from 'axios'
import * as typeListService from '../../store/type/typeListService';

export function datumListNavData(){
     return typeListService.datumListNav();
}

