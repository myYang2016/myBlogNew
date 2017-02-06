/**
 * Created by admin on 2016/12/29.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var multer = require("multer");
var cookieParser = require('cookie-parser');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
    // res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);

app.set('port', (process.env.port || 8000));
app.use('/', express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({dest: '/tmp/'}).array('image'));
app.use(cookieParser());

//控制nav的相关接口
app.use('/', require('./nav/controlNav'));
//添加博文
app.use('/', require('./nav/blogList'));
//文章内容相关接口
app.use('/', require('./nav/blogTxt'));

app.listen(app.get('port'), function () {
    console.log('Server started:http://localhost:' + app.get('port') + '/');
});
