/**
 * Created by kangdaye on 16/6/22.
 */
// import React,{ReactDom} from 'react';
import React,{Component} from 'react';
import { render } from 'react-dom'
import PageList from '../../components/list/pageList.jsx';
import * as typeListActions from '../../actions/type/typeListA';

class TypePageList extends PageList{
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            itemClickCallback : this.itemClickCallback
        };
    }
    itemClickCallback(evt,item){
        // location.href =
    }
    async getListNavData(){
        const reqData = await typeListActions.datumListNavData();
        this.setState({data: reqData.data});
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

