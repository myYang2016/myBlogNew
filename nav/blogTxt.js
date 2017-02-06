/**
 * Created by admin on 2017/1/11.
 */
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var remarkable = require('remarkable');
const mongoData = function(url,fun){
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err);
        console.log("Connected correctly to server");
        fun(db);
    });
};

router.get('/api/getCookie',function(req,res){
    // res.clearCookie('yangBlog_visitorName');
    var cookies = req.cookies;
    cookies.yangBlog_visitorName ? res.json(cookies.yangBlog_visitorName) : res.json('');
});
router.post('/api/registerPost',function(req,res){
    var msg = req.body;
    mongoData('mongodb://localhost:27017/blog',function(db){
        var col = db.collection('visitor');
        col.find({visitorAddress:msg.visitorAddress}).toArray(function(err,docs){
            assert.equal(err,null);
            if(!docs.length){
                col.insertOne(msg,function(err,r){
                    assert.equal(err,null);
                    assert.equal(1,r.insertedCount);
                });
            }else{
                col.updateOne({visitorAddress:msg.visitorAddress},{$set:msg},function(err){
                    assert.equal(err,null);
                })
            }
            db.close();
        });
    });
    res.cookie('yangBlog_visitorName',msg.visitorName,{ expires: new Date(Date.now() + 900000) });
    res.redirect('http://'+req.hostname+':8000/docs/'+msg.articleTitle+'.html');
});
router.post('/api/evaPost',function(req,res){
    var data = req.body;
    var name = req.cookies.yangBlog_visitorName;
    var comments = data.comments;
    var time = new Date().toLocaleString();
    var title = data.articleTitle;
    var like = 0;
    mongoData('mongodb://localhost:27017/blog',function(db){
        var col = db.collection('comments');
        var commentsObj = {visitorName:name,comments:comments,time:time,like:like};
        col.find({title:title}).toArray(function(err,docs){
            assert.equal(err,null);
            var c = docs[0].comments;
            c.push(commentsObj);
            col.updateOne({title:title},{$set:{comments:c}},function(err,r){
                assert.equal(err,null);
                assert.equal(1,r.result.n);
                console.log('you update comments');
                res.redirect('http://'+req.hostname+':8000/docs/'+title+'.html');
                db.close();
            })
        })
    });
});
router.get('/api/getComments',function(req,res){
    var title = req.query.title;
    mongoData('mongodb://localhost:27017/blog',function(db){
        var col = db.collection('comments');
        col.find({title:title}).toArray(function (err, docs) {
            assert.equal(err,null);
            res.json(docs[0]);
        })
    })
});
router.post('/api/postLike',function(req,res){
    console.log(req.body);
    var data = req.body;
    var user = req.cookies.yangBlog_visitorName;
    mongoData('mongodb://localhost:27017/blog',function(db){
        var col = db.collection('comments');
        col.find({title:data.title}).toArray(function(err,docs){
            assert.equal(err,null);
            var like = docs[0].like;
            var comments = docs[0].comments;
            if(!like[user])like[user] = [];
            like[user][data.index] = data.isActive;
            comments[data.index].like = data.num;
            col.updateOne({title:data.title},{$set:{like:like,comments:comments}},function(err,r){
                assert.equal(err,null);
                assert.equal(1,r.result.n);
                console.log("you change like");
                db.close();
                res.json(like);
            });
        })
    })
});
module.exports = router;