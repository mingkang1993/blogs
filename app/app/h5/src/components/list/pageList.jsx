/**
 * Created by kangdaye on 16/6/15.
 */
import React,{Component} from 'react';
import * as util from '../../utils';

export default class PageList extends Component{
    constructor(props){
        super(props);
        // this.state = {data: props.data};
    }
    render(){
        const repoList = this.props.data.map((item)=>{
            let createdDate = util.formDate(item.createdAt);
            return (
                <a href="javascript:;" key={item.id} onClick={this.props.itemClickCallback.bind(this,item)}>
                    <div className="index">
                        <div className="index_box">
                            <div className="index_icon">
                                <div className="icon_h">
                                    <img src="img/icon/icon1.png"/>
                                </div>
                                <div className="titl">
                                    <h1>{item.sortName}</h1>
                                    <div className="titl_h">
                                        <time title="#">{createdDate}</time>
                                        <floor title="#">今日<span>(31)</span></floor>
                                        <i><span>总贴(1321)</span></i>

                                    </div>

                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                    </div>
                </a>
            );
        });

        return(
            <div>
                {repoList}
            </div>
        )
    }
}


