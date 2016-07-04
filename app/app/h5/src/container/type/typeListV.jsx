/**
 * Created by kangdaye on 16/6/22.
 */
import React,{Component} from 'react';
import { render } from 'react-dom'
import Content from 'components/content.jsx';
import * as typeListActions from 'actions/type/typeListA';

class TypeContent extends Content{
    constructor(props) {
        super(props);
        this.state = {
            data : []
        };
    }
    componentWillMount(){
        typeListActions.getArticleListData({
            id:0,
            offsetNum:0
        }).then(function(data){
            this.setState({data: data});
        }.bind(this));
    }
    render(){
        return <Content {...this.state}></Content>;
    }
}

export default render(
    <TypeContent></TypeContent>,
    document.getElementById('main')
)

