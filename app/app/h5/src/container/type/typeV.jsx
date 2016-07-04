/**
 * Created by kangdaye on 16/6/22.
 */
import React,{Component} from 'react';
import { render } from 'react-dom'
import PageList from 'components/list/pageList.jsx';
import * as typeActions from 'actions/type/typeA';

class TypePageList extends PageList{
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            itemClickCallback : typeActions.listClick
        };
    }
    async getListNavData(){
        let reqData = await typeActions.datumListNavData();
        this.setState({data: reqData});
    }
    componentWillMount(){
        this.getListNavData();
    }
    render(){
        return <PageList {...this.state}></PageList>;
    }
}

export default render(
    <TypePageList></TypePageList>,
    document.getElementById('pageList')
)

