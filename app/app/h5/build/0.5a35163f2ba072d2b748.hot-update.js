webpackHotUpdate(0,{

/***/ 357:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(300);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(358);

	var _pageList = __webpack_require__(488);

	var _pageList2 = _interopRequireDefault(_pageList);

	var _typeListA = __webpack_require__(491);

	var typeListActions = _interopRequireWildcard(_typeListA);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by kangdaye on 16/6/22.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	// import React,{ReactDom} from 'react';


	var TypePageList = function (_PageList) {
	    _inherits(TypePageList, _PageList);

	    function TypePageList(props) {
	        _classCallCheck(this, TypePageList);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TypePageList).call(this, props));

	        _this.state = {
	            data: [],
	            itemClickCallback: _this.itemClickCallback
	        };
	        return _this;
	    }

	    _createClass(TypePageList, [{
	        key: 'itemClickCallback',
	        value: function itemClickCallback(evt, item) {
	            // location.href =
	        }
	    }, {
	        key: 'getListNavData',
	        value: function () {
	            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	                var reqData;
	                return regeneratorRuntime.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                _context.next = 2;
	                                return typeListActions.datumListNavData();

	                            case 2:
	                                reqData = _context.sent;

	                                this.setState({ data: reqData.data });

	                            case 4:
	                            case 'end':
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));

	            function getListNavData() {
	                return ref.apply(this, arguments);
	            }

	            return getListNavData;
	        }()
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this.getListNavData();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(_pageList2.default, this.state);
	        }
	    }]);

	    return TypePageList;
	}(_pageList2.default);

	console.log(_reactDom.render);
	exports.default = (0, _reactDom.render)(_react2.default.createElement(TypePageList, null), document.getElementById('pageList'));

/***/ }

})