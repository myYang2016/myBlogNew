
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('es6-promise');
require('fetch-ie8');

// import React from 'react';
// import ReactDOM from 'react-dom';

// const React = require('react');
// const ReactDOM = require('react-dom');
// const App = require('./App');
var NavList = React.createClass({
    handleClickEvent:function(e){
        var index = $(e.currentTarget).index();
        this.setState({activeNum:index});
    },
    getInitialState:() => {
        return {activeNum:0}
    },
    render:function(){
        var navArray = this.props.nvaArr;
        return (
            <ul className="nav nav-pills ver_re_mid fr">
                {
                    navArray.map((comment,index) => <li className={index == this.state.activeNum?'active':''} onClick={this.handleClickEvent}><a href="#">{comment}</a></li>)
                }
            </ul>
        )
    }
});
//头部
var Header = React.createClass({
    getNavList:function(){
        $.ajax({
            url:this.props.navUrl,
            dataType:'json',
            cache:false,
            success:(data) => {
                this.setState({data:data.nav,title:data.title});
            },
            error:(xhr,status,err) => {
                console.error(this.props.navUrl,status,err.toString());
            }
        })
    },
    getInitialState:function(){
        return {data:['Home'],title:'yang'};
    },
    componentDidMount:function(){
        this.getNavList();
    },
    render:function(){
        return (
            <header>
                <img src={this.props.titleImg} className="img-circle ver_re_mid fl"/>
                <h2 className="title fl">{this.state.title?this.state.title:'Mr.Yang'}</h2>
                <NavList nvaArr={this.state.data} />
            </header>
        )
    }
});
//标签部分
let Labels = React.createClass({
    render:function () {
        return (
            <table cellPadding='0' cellSpacing='0' className="labelTab">
                <tr>
                    <td className="active">js</td>
                    <td>css</td>
                    <td>http</td>
                    <td>node</td>
                </tr>
            </table>
        )
    }
});
//博文列表部分
let BlogListArea = React.createClass({
    getTxtList:function(){
        $.ajax({
            url:'/api/getTxtList',
            dataType:'json',
            cache:false,
            success:(data) => {
                this.setState({textArray:data});
            },
            error:(xhr, status, err) => {
                console.error(err.toString());
            }
        })
    },
    getTest:function(){
        ajaxObj.getData('http://localhost:8888/api/getNav',{yang:'test'},function (data) {
            alert(JSON.stringify(data));
        });
    },
    getInitialState:function(){
        return {textArray:[]}
    },
    componentDidMount:function () {
        this.getTxtList();
        this.getTest();
    },
    render:function(){
        return (
            <div className="work">
                <div className="container">
                    <Labels />
                    <ul className="workRecord list-unstyled">
                        {
                            this.state.textArray.map((obj,index) =>
                                <li key={index}>
                                    <a href={obj.b_url}>
                                        <blockquote className="title">
                                            {obj.b_title}
                                            <small>{obj.b_subtitle}</small>
                                        </blockquote>
                                        <div className="content">{obj.b_introduce}</div>
                                        <div className="bottom fr">
                                            <span className="author">{obj.b_author} </span>
                                            <span className="time">{obj.b_time}</span>
                                        </div>
                                    </a>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
});
ReactDOM.render(
    <div>
        <Header titleImg="img/head.jpg" navUrl="/api/getNav"/>
        <BlogListArea />
    </div>,
    document.getElementById('app')
);
