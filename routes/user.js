const express=require('express');
const bodyParser=require('body-parser');
const pool=require('../pool');
var router=express.Router();
//注册
router.post('/reg',function(req,res){
    var $uname=req.body.uname;
    var $email=req.body.email;
    var $upwd=req.body.upwd;
    var $sex=req.body.sex;
    var sql="insert into user values(null,?,?,?,?)";
    pool.query(sql,[$uname,$email,$upwd,$sex],function(err,result){
        if(err) throw err;
        if(result.affectedRows>0){
            res.send("1");
        }else{
            res.send("0");
        }}
    );
});
//登陆
router.post('/login',function(req,res){
    var $email=req.body.email;
    var $upwd=req.body.upwd;
    var sql='select * from user where email=? and upwd=?';
    pool.query(sql,[$email,$upwd],function(err,result){
        if(err) throw err;
        if(result.length){
            res.send(result[0]);
        }else{
            res.send('0');
        }
    });
});

//finduserById搜索用户
router.get('/queryuser/:uid', function (req,res) {
    var $uid=req.params.uid;
    var sql='select * from user where uid=?';
    pool.query(sql,[$uid], function (err,result) {
        if(err) throw err;
        if(result.length){
            res.send(result[0]);
        }else{
            res.send('0');
        }
    });
});

//添加到心愿单
router.put('/addwish',function(req,res){
    var $uid=req.body.uid;
    var $pid=req.body.pid;
    var $p_color=req.body.p_color;
    var $p_size=req.body.p_size;
    var $wid=req.body.wid;
    var sql='insert into collect values(null,?,?,?,?,?)';
    pool.query(sql,[$uid,$pid,$p_color,$p_size,$wid],function(err,result){
        if(err) throw err;
        if(result.affectedRows>0){
            res.send("1");
        }else{
            res.send("0")
        }
    });
})

//查询心愿单
router.get('/getwish/:uid',function(req,res){
    var $uid=req.params.uid;
    var sql='select * from collect inner join product on collect.pid=product.pid where uid=?';
    pool.query(sql,[$uid],function(err,result){
        if(err) throw err;
        console.log($uid);
        if(result.length){
            res.send(result); 
        }else{
            res.send("0")
        }
    });
});

//删除心愿单商品
router.delete('/delwish/:wid',(req,res)=>{
    var $wid=req.params.wid;
    sql='delete from collect where wid=?';
    pool.query(sql,[$wid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});


module.exports=router;