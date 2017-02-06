/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by admin on 2017/1/11.
 */
var isSigned = false,
    user = '';
var DocForm = React.createClass({
    displayName: 'DocForm',

    getName: function getName() {
        var _this = this;

        $.ajax({
            url: this.props.cookieUrl,
            dataType: 'json',
            cache: false,
            success: function success(data) {
                _this.setState({ isSigned: !!data });
                user = data;
                isSigned = !!data;
            },
            error: function error(xhr, status, err) {
                console.error(err.toString());
            }
        });
    },
    getInitialState: function getInitialState() {
        return { isSigned: false };
    },
    componentDidMount: function componentDidMount() {
        this.getName();
    },
    render: function render() {
        var _this2 = this;

        return React.createElement(
            'div',
            { className: 'yourComments' },
            React.createElement(
                'h4',
                { className: 'yourEva' },
                '\u4F60\u7684\u8BC4\u8BBA',
                this.state.isSigned ? '' : React.createElement(
                    'span',
                    null,
                    ' (\u8BF7\u5148\u586B\u5199\u60A8\u7684\u76F8\u5173\u4FE1\u606F)'
                )
            ),
            React.createElement(
                'form',
                { action: this.state.isSigned ? "/api/evaPost" : "/api/registerPost", method: 'post', encType: 'multipart/form-data', role: 'form' },
                function () {
                    return _this2.state.isSigned ? React.createElement(
                        'div',
                        null,
                        React.createElement('textarea', { name: 'comments', className: 'doc_comments', cols: '30', rows: '10', placeholder: '\u8BF7\u8F93\u5165\u60A8\u7684\u8BC4\u8BBA' })
                    ) : React.createElement(
                        'div',
                        null,
                        React.createElement('input', { name: 'visitorName', className: 'form-control', type: 'text', placeholder: '\u8BF7\u8F93\u5165\u60A8\u7684\u59D3\u540D\uFF08\u5FC5\u586B\uFF09', required: 'required' }),
                        React.createElement('input', { name: 'visitorAddress', className: 'form-control', type: 'text', placeholder: '\u8BF7\u8F93\u5165\u60A8\u7684\u90AE\u7BB1\u5730\u5740\uFF08\u5FC5\u586B\uFF09', required: 'required' }),
                        React.createElement('input', { name: 'visitorWeb', className: 'form-control', type: 'text', placeholder: '\u8BF7\u8F93\u5165\u60A8\u7684\u7F51\u5740' })
                    );
                }(),
                React.createElement('input', { type: 'hidden', value: $('#docFooter').attr('data-title'), name: 'articleTitle' }),
                React.createElement('input', { type: 'submit', value: '\u63D0\u4EA4', className: 'btn_comments_sub btn' })
            )
        );
    }
});
var setTime_like, preIndex;
var Like = React.createClass({
    displayName: 'Like',

    changeLike: function changeLike() {
        var _this3 = this;

        if (setTime_like && this.props.index == preIndex) clearTimeout(setTime_like);
        preIndex = this.props.index;
        if (isSigned) {
            this.setState({
                isActiveLike: !this.state.isActiveLike,
                num: this.state.isActiveLike ? --this.state.num : ++this.state.num,
                isFirst: false
            });
            setTime_like = setTimeout(function () {
                console.log(_this3.state.isActiveLike);
                var data = {
                    title: $('#docFooter').attr('data-title'),
                    index: _this3.props.index,
                    isActive: _this3.state.isActiveLike,
                    num: _this3.state.num
                };
                $.ajax({
                    url: '/api/postLike',
                    type: 'post',
                    dataType: 'json',
                    cache: false,
                    data: data,
                    success: function success(data) {
                        console.log(data);
                    },
                    error: function error(xhr, status, err) {
                        console.error(err.toString());
                    }
                });
            }, 1000);
        } else {
            alert('请先填写信息');
        }
        return false;
    },
    getInitialState: function getInitialState() {
        return { isActiveLike: this.props.likeActive == 'true', num: this.props.like, isFirst: true };
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: this.state.isActiveLike || this.state.isFirst && this.props.likeActive == 'true' ? 'glyphicon glyphicon-thumbs-up like active' : 'glyphicon glyphicon-thumbs-up like', onClick: this.changeLike },
            React.createElement(
                'span',
                null,
                this.state.num
            )
        );
    }
});
var Comments = React.createClass({
    displayName: 'Comments',

    getCommentsMsg: function getCommentsMsg() {
        var _this4 = this;

        $.ajax({
            url: '/api/getComments',
            dataType: 'json',
            cache: false,
            data: { title: $('#docFooter').attr('data-title') },
            success: function success(data) {
                _this4.setState({ comments: data.comments, likeArr: data.like[user] });
            },
            error: function error(xhr, status, err) {
                console.error(err.toString());
            }
        });
    },
    getInitialState: function getInitialState() {
        return { comments: [], likeArr: [] };
    },
    componentDidMount: function componentDidMount() {
        this.getCommentsMsg();
    },
    render: function render() {
        var _this5 = this;

        var commentsMsg = this.state.comments;
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h4',
                { className: 'title' },
                commentsMsg.length ? '评论' : ''
            ),
            React.createElement(
                'ul',
                { className: 'comments' },
                commentsMsg.map(function (obj, index) {
                    return React.createElement(
                        'li',
                        { key: index },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'h5',
                                { className: 'visitorName' },
                                obj.visitorName + ':'
                            ),
                            React.createElement(Like, { like: obj.like, index: index, likeActive: user && _this5.state.likeArr ? _this5.state.likeArr[index] : '' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'txt' },
                            obj.comments
                        ),
                        React.createElement(
                            'div',
                            { className: 'time' },
                            obj.time
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn' },
                            '\u56DE\u590D'
                        )
                    );
                })
            )
        );
    }
});
ReactDOM.render(React.createElement(
    'div',
    null,
    React.createElement(Comments, null),
    React.createElement(DocForm, { cookieUrl: '/api/getCookie', getVisitor: '/api/getVisitor' })
), document.getElementById('docFooter'));

/***/ })
/******/ ]);