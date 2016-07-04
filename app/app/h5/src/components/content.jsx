/**
 * Created by kangdaye on 16/6/28.
 */
import React,{Component} from 'react'
import * as util from 'utils';

class ContentFoot extends Component{
    constructor(props){
        super(props);
        this.state = {
            data  : props.data || [],
            class : props.class
        };
    }
    evtClick(...mapData){
        mapData[0].evtCallback.apply(this,arguments);
        this.setState({
            data  : mapData[1]
        });
    }
    render(){
        const template = this.state.data.map((item,index) => {
            return (
                <a key={index} className={ this.props.class } onClick={this.evtClick.bind(this,item,this.state.data)}>
                    <img src={ item.image }/>
                    <span>{ item.text }</span>
                </a>
            )
        });

        return (
            <div>
                {template}
            </div>
        );
    };
}

export default class Content extends Component{
    render(){
        let data = this.props.data instanceof Array ? this.props.data : [this.props.data];

        const contentDom = data.map((item) => {
            let createdDate = util.formDate(item.createdAt);
            let footClass = !item.footRightData &&  !item.footLeftData ? 'hidden' : '' + 'click_hf';

            return (
                <li className="box" key={item.id}>
                    <div className="author">
                        <a href="#"><img src="img/icon/icon2.png"/></a>
                        <p className="author_name">楼主：{item.user_name}</p>
                        <p className="author_time">时间：{createdDate}</p>
                        <a href="#" className="close"><img src="img/close.png"/></a>
                    </div>
                    <a href="#">
                        <div className="topic" dangerouslySetInnerHTML={{__html: item.content}}>
                        </div>
                    </a>
                    <div className={footClass}>
                        <ContentFoot class='left' data={item.footLeftData}></ContentFoot>
                        <ContentFoot class='right' data={item.footRightData}></ContentFoot>
                    </div>
                </li>
            )
        });

        return (
            <div className="wrap">
                <ul>
                    {contentDom}
                </ul>
            </div>
        )
    }
}