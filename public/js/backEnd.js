/**
 * Created by admin on 2016/12/29.
 */
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('es6-promise');
require('fetch-ie8');
var DropInput = React.createClass({
    render:function(){
        return (
            <div>
                <label>{this.props.label+': '}</label>
                <input type={this.props.type} name={this.props.name} placeholder={this.props.placeTxt} size={this.props.size} required={this.props.isRequired}/><br/>
            </div>
        )
    }
});
var ChangeNav = React.createClass({
    getAllListDatabases:function(){
        $.ajax({
            url:'/api/getAllListDatabases',
            dataType:'json',
            cache:false,
            success:(data) => {
                this.setState({databases:JSON.stringify(data)});
            },
            error:(err) => {
                console.log(err.toString());
            }
        })
    },
    getInitialState:()=>{
        return {databases:'databasesArea'}
    },
    componentDidMount:function(){
        this.getAllListDatabases();
    },
    render:function(){
        return (
            <div>
                <form action="/api/postNav" method="post" encType="multipart/form-data">
                    <DropInput label="添加导航标题" type="text" placeTxt="add nav" name="newNav"/>
                    <DropInput label="删除导航标题" type="text" placeTxt="delete nav" name="deleteNav" />
                    <DropInput label="首页头部名称" type="text" placeTxt="input title" name="title" />
                    <DropInput label="上传头像图片" type="file" placeTxt="" name="image" size="50" inputVal=''/>
                    <input type="submit" value='提交' />
                </form>
                <br /><br /><br /><br /><br />
                <form action="/api/postNewBlog" method="post" encType="multipart/form-data" className="addBlog">
                    <DropInput label="标题" type="text" placeTxt="input blog doc title" name="b_title" isRequired="required" />
                    <DropInput label="副标题" type="text" placeTxt="input blog doc subtitle" name="b_subtitle" isRequired="required" />
                    <DropInput label="简介" type="text" placeTxt="input blog doc introduce" name="b_introduce" isRequired="required" />
                    <DropInput label="作者" type="text" placeTxt="input blog doc author" name="b_author" isRequired="required" />
                    <DropInput label="时间" type="text" placeTxt="input blog doc time" name="b_time" isRequired="required" />
                    <DropInput label="地址" type="text" placeTxt="input blog doc url" name="b_url" isRequired="required" />
                    <input type="submit" value='提交'/>
                </form>
                <label htmlFor="">显示数据库：</label>
                <div>{this.state.databases}</div>
            </div>
        )
    }
});
ReactDOM.render(
    <div>
        <ChangeNav />
    </div>,
    document.getElementById('backEnd')
);