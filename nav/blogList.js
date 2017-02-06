/**
 * Created by admin on 2017/1/7.
 */
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const mongoData = function(url,fun){
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err);
        console.log("Connected correctly to server");
        fun(db);
    });
};

router.post('/api/postNewBlog',function(req,res){
    var data = req.body;
    var fun = (db) => {
        var col = db.collection('blog_c');
        col.insertOne(data,function(err,r){
            assert.equal(err,null);
            assert.equal(1,r.insertedCount);
            db.close();
            res.redirect('http://'+req.hostname+':8000/backEnd.html');
        })
    };
    mongoData('mongodb://localhost:27017/blog',fun);
});
module.exports = router;