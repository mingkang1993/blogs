/**
 * Created by kangdaye on 16/6/22.
 */
import axios from 'axios'

export function datumListNav (data){
    return axios.post('/datumList/navname');
}

