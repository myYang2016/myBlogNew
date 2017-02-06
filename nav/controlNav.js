/**
 * Created by admin on 2016/12/29.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url_database = 'mongodb://localhost:27017/blog';

//获取上一级地址
var COMMENT_URL = __dirname.match(/.*(?=\\[A-Za-z0-9]+$)/)[0].replace(/\\/g,'\/');
// router.use(function timeLog(req,res,next){
//     console.log('Time:',Date.now());
//     next();
// });
const mongoData = function(url,fun){
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err);
        console.log("Connected correctly to server");
        fun(db);
    });
};
//获取nav数组
var navArray = [];
var getNav = function(db){
    var collection = db.collection('navs');
    collection.find({name:"nav"}).toArray(function(err,docs){
        assert.equal(err,null);
        if(docs[0].nav){
            navArray = docs[0].nav;
        }
        db.close();
    });
};
mongoData(url_database,getNav);
//获取数据
router.get('/api/getNav',function(req,res){
    var fun = function(db){
        var collection = db.collection('navs');
        collection.find({name:'nav'}).toArray(function(err,docs){
            assert.equal(err,null);
            res.json(docs[0]);
            db.close();
        });
    };
    mongoData(url_database,fun);
});
//上传数据
router.post('/api/postNav',function(req,res){
    var getData = req.body;
    console.log(req.body);
    var isChangeNav = false;
    if(getData.newNav){
        navArray.push(getData.newNav);
        isChangeNav = true;
    }
    if(getData.deleteNav){
        if(navArray.indexOf(getData.deleteNav) >= 0){
            navArray.splice(navArray.indexOf(getData.deleteNav),1);
            isChangeNav = true;
        }
    }
    //更改nav
    if(isChangeNav){
        mongoData(url_database,function (db) {
            // Get the documents collection
            var collection = db.collection('navs');
            collection.updateOne({name:"nav"},{$set:{nav:navArray,title:getData.title}},function(err,result){
                assert.equal(err,null);
                console.log('you add a new nav');
                db.close();
                res.redirect('http://'+req.hostname+':8000/backEnd.html');
            });
        });
    }

    //更改首页头像
    var getFile = function(){
        fs.readFile(req.files[0].path,function(err,data){
            var des_file = COMMENT_URL + '/public/img/head.jpg';
            assert.equal(err,null);
            fs.writeFile(des_file,data,function(err){
                assert.equal(err,null);
                res.redirect('http://'+req.hostname+':8000/backEnd.html');
            });
        });
    };
    if(req.files[0])getFile();
});
router.get('/api/getAllListDatabases',function(req,res){
    mongoData(url_database,function(db){
        var adminDb = db.admin();
        adminDb.listDatabases(function(err,dbs){
            assert.equal(err,null);
            res.json(dbs);
            db.close();
        })
    })
});
router.get('/api/getTxtList',function(req,res){
    mongoData(url_database,function (db) {
        var col = db.collection('blog_c');
        col.find({}).toArray(function(err,docs){
            assert.equal(err,null);
            res.json(docs);
        })
    })
});
//添加标签
router.post('/api/addLabel',function (req, res) {
    mongoData(url_database,function (db) {
        var col = db.collection('blog_c');
        col.find({b_label:['js','css']}).toArray(function (err, docs) {
            assert.equal(err,null);
            res.send(docs);
        })
    });
});

module.exports = router;