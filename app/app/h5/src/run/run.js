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
    {
        path: routerConfig.routerDefault.url,
        getComponent : routerConfig.routerDefault.getComponent,
        indexRoute: { component: routerConfig.routerDefault.defaultIndexComponent },
        childRoutes: routerConfig.router
    }
];

render(<Router history={history} routes={routeConfigObj} />, document.getElementById('router'));
