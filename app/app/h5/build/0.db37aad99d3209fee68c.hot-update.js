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

	var routeConfigObj = [{ path: '/',
	    component: '/',
	    indexRoute: { component: '/' },
	    childRoutes: []
	}]; /**
	     * Created by kangdaye on 16/6/24.
	     */


	_routerConfig2.default.forEach(function (item) {
	    var reqModel = __webpack_require__(559)(item.componentUrl);
	    routeConfigObj[0].childRoutes.push({});
	});

/***/ }

})