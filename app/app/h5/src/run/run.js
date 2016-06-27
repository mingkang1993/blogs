/**
 * Created by kangdaye on 16/6/24.
 */
import React from 'react'
import { render } from 'react-dom'
import routerConfig from './routerConfig.js'
import { Router,useRouterHistory} from 'react-router'
import { createHistory } from 'history'

const history = useRouterHistory(createHistory)({
   basename: '/h5/'
});

const routeConfigObj = [
    { path: routerConfig.routerDefault.url,
        getComponent : routerConfig.routerDefault.getComponent,
        indexRoute: { component: routerConfig.routerDefault.defaultIndexComponent },
        childRoutes: [

        ]
    }
];

const configInjection = (itemData,tarData) => {
    itemData.forEach((item)=>{
        const routerItemData = {
            path            : item.url,
            getComponent    : item.getComponent
        };

        if (item.childRoutes){
            routerItemData.childRoutes = [];
            configInjection(item.childRoutes,routerItemData);
        }
        tarData.childRoutes.push(routerItemData);
    });
    return tarData;
};
configInjection(routerConfig.router,routeConfigObj[0]);

render(<Router history={history} routes={routeConfigObj} />, document.getElementById('main'));
