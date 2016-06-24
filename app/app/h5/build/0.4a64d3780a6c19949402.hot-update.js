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

	var routeConfig = [{ path: '/',
	    component: '/',
	    indexRoute: { component: Dashboard },
	    childRoutes: [{ path: 'about', component: About }, { path: 'inbox',
	        component: Inbox,
	        childRoutes: [{ path: '/messages/:id', component: Message }, { path: 'messages/:id',
	            onEnter: function onEnter(nextState, replaceState) {
	                replaceState(null, '/messages/' + nextState.params.id);
	            }
	        }]
	    }]
	}]; /**
	     * Created by kangdaye on 16/6/24.
	     */


	_routerConfig2.default.forEach(function (item) {
	    var reqModel = __webpack_require__(559)(item.componentUrl);
	});

/***/ }

})