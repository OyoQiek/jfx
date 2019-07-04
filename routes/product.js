const express=require('express');
const bodyParser=require('body-parser');
const pool=require('../pool');
var router=express.Router();

//findproduct查找商品
router.get('/findproduct/:b_order-:s_order-:p_sex-:new',function(req,res){
    var $b_order=req.params.b_order;
    var $s_order=req.params.s_order;
    var $p_sex=req.params.p_sex;
    var $new=req.params.new;
    
    if($b_order=="0"){
        var sql="select * from product order by up_date desc";
        pool.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            if(result.length){
                console.log(result);
                res.send(result);
            }else{
                res.send('0');
            }
        });
    }else if($b_order !="0" && $s_order =="0" ){
        var sql="select * from product where b_order=? and p_sex=? order by up_date desc";
        pool.query(sql,[$b_order,$p_sex],function (err,result){
            if(err) throw err;
            console.log($b_order+$s_order+$p_sex);
            console.log(result);
            if(result.length){
                res.send(result);
            }else{
                res.send('0');
            }
        });
    }else if($b_order !="0" && $s_order !="0"){
        var sql="select * from product where b_order=? and s_order=? and p_sex=?";
        pool.query(sql,[$b_order,$s_order,$p_sex],function(err,result){
            if(err) throw err;
            console.log(result);
            if(result.length){
                console.log(result);
                res.send(result);
            }else{
                res.send('0');
            }
        });
    }
    
});

//getProductInfo获取单件商品的详情
router.get('/getinfo/:uid-:email-:pid',function(req,res){
    var $pid=req.params.pid;
    var sql='select * from product where pid=?';
    pool.query(sql,[$pid],function(err,result){
        if(err) throw err;
        if(result.length){
            res.send(result);
        }else{
            res.send("0");
        }
    });
});

//根据商品id/size获取仓库信息
router.get('/getsave/:pid-:p_size',function(req,res){
    var $pid=req.params.pid;
    var $p_size=req.params.p_size;
    var sql='select * from warehouse where pid=? and p_size=?';
    pool.query(sql,[$pid,$p_size],function(err,result){
        if(err) throw err;
        console.log(result+$pid+$p_size);
        if(result.length){
            res.send(result);
        }else{
            res.send("0");
        }
    });
});
module.exports=router;
