/**
 * Created by kangdaye on 16/6/24.
 */
var path = require('path');

import React from 'react'
import { render } from 'react-dom'
import routerConfig from './routerConfig.js'
import { Router, Route, Link } from 'react-router'

const routeConfigObj = [
    { path: routerConfig.routerDefault.url,
        component: routerConfig.routerDefault.component,
        indexRoute: { component: routerConfig.routerDefault.component },
        childRoutes: [

        ]
    }
];

//configProvider
console.log(routerConfig)
const configInjection = (itemData,tarData) => {
    itemData.forEach((item)=>{
        var routerItemData = {
            path        : item.url,
            component   : item.component
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
render(<Router routes={routeConfigObj} />, document.body)
