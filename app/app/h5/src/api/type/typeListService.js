/**
 * Created by kangdaye on 16/6/22.
 */
import axios from 'axios'

export function articleList (data){
    return axios.post('/article/list',data);
}
//
// export function articleList (data){
//     return axios.post('/article/list',data);
// }
