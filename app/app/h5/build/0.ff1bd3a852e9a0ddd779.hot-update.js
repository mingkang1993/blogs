webpackHotUpdate(0,{

/***/ 494:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(300);

	var _react2 = _interopRequireDefault(_react);

	var _routerConfig = __webpack_require__(495);

	var _routerConfig2 = _interopRequireDefault(_routerConfig);

	var _reactRouter = __webpack_require__(497);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by kangdaye on 16/6/24.
	 */
	var path = __webpack_require__(560);

	var routeConfigObj = [{ path: '/',
	    component: '/',
	    indexRoute: { component: '/' },
	    childRoutes: []
	}];

	//configProvider
	var configInjection = function configInjection(itemData, tarData) {
	    itemData.forEach(function (item) {
	        var routerItemData = {
	            path: item.url,
	            component: item.component
	        };

	        if (item.childRoutes) {
	            routerItemData.childRoutes = [];
	            configInjection(item.childRoutes, routerItemData);
	        }
	        tarData.push(routerItemData);
	    });
	    return tarData;
	};

	var a = configInjection(_routerConfig2.default, routeConfigObj[0].childRoutes);
	console.log(routeConfigObj);

/***/ }

})