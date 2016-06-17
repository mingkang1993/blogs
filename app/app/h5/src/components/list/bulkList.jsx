/**
 * Created by kangdaye on 16/6/15.
 */
import React,{Component} from 'react';

export default class command extends Component{
    // constructor(){
    //
    // }
    render(){
        return(
            <div>
                <a href="forum.html" >
                    <div class="index">
                        <div class="index_box">
                            <div class="index_icon">
                                <div class="icon_h"><img src="img/icon/icon1.png"></div>
                                <div class="titl">
                                    <h1>杂谈社区</h1>
                                    <div class="titl_h">
                                        <time title="#">2015-2-6</time>
                                        <floor title="#">今日<span>(31)</span></floor>
                                        <I><span>总贴(1321)</span></I>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}


