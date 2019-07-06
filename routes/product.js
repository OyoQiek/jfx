const express=require('express');
const bodyParser=require('body-parser');
const pool=require('../pool');
var router=express.Router();

//findproduct查找商品
router.get('/findproduct/:b_order-:s_order-:p_sex-:new-:sxq_order-:sxq_color-:sxq_size',function(req,res){
    var $b_order=req.params.b_order;
    var $s_order=req.params.s_order;
    var $p_sex=req.params.p_sex;
    var $new=req.params.new;
    var $sxq_order=req.params.sxq_order;
    if($sxq_order!=0){
        $sxq_order=="L"?$sxq_order="asc":$sxq_order="desc";
    }else{
        $sxq_order=0;
    }
    //$sxq_order=$sxq_order.charAt(0);
    var $sxq_color=req.params.sxq_color;
    //$sxq_color=$sxq_color.charAt(0);
    var $sxq_size=req.params.sxq_size;
    //$sxq_size=$sxq_size.charAt(0);
    if($b_order=="0"){
        var sql="";
        if($sxq_order!=0 && $sxq_color==0 && $sxq_size==0){
            sql="select * from product order by p_price,up_date "+$sxq_order;
        }else if($sxq_order!=0 && $sxq_color!=0 && $sxq_size==0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and product.p_color='"+$sxq_color+"' order by p_price "+$sxq_order;
        }else if($sxq_order !=0 && $sxq_color!=0 && $sxq_size!=0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and product.p_color='"+$sxq_color +"' and warehouse.p_size='"+$sxq_size+"' order by p_price "+$sxq_order;
        }else if($sxq_order==0 && $sxq_color!=0 && $sxq_size!=0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and product.p_color='"+$sxq_color +"' and warehouse.p_size='"+$sxq_size+"' order by up_date desc";
        }else if($sxq_order==0 && $sxq_color==0 && $sxq_size!=0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and warehouse.p_size='"+$sxq_size+"' order by up_date desc";
        }else if($sxq_order==0 && $sxq_color!=0 && $sxq_size==0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and product.p_color='"+$sxq_color+"' order by up_date desc";
        }else{
            sql="select * from product order by up_date desc";
        }//select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 order by up_date desc;
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
        var sql="";
        if($sxq_order!=0 && $sxq_color==0 && $sxq_size==0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where b_order=? and p_sex=? order by p_price,up_date "+$sxq_order;
        }else if($sxq_order!=0 && $sxq_color!=0 && $sxq_size==0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and b_order=? and p_sex=? and product.p_color='"+$sxq_color+"' order by p_price "+$sxq_order;
        }else if($sxq_order !=0 && $sxq_color!=0 && $sxq_size!=0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and b_order=? and p_sex=? and product.p_color='"+$sxq_color +"' and warehouse.p_size='"+$sxq_size+"' order by p_price "+$sxq_order;
        }else if($sxq_order==0 && $sxq_color!=0 && $sxq_size!=0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and b_order=? and p_sex=? and product.p_color='"+$sxq_color +"' and warehouse.p_size='"+$sxq_size+"' order by up_date desc";
        }else if($sxq_order==0 && $sxq_color==0 && $sxq_size!=0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and b_order=? and p_sex=? and warehouse.p_size='"+$sxq_size+"' order by up_date desc";
        }else if($sxq_order==0 && $sxq_color!=0 && $sxq_size==0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and b_order=? and p_sex=? and product.p_color='"+$sxq_color+"' order by up_date desc";
        }else{
            sql="select * from product where b_order=? and p_sex=? order by up_date desc";
        }
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
        var sql="";
        if($sxq_order!=0 && $sxq_color==0 && $sxq_size==0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where b_order=? and s_order=? and p_sex=? order by p_price,up_date "+$sxq_order;
        }else if($sxq_order!=0 && $sxq_color!=0 && $sxq_size==0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and b_order=? and s_order=? and p_sex=? and product.p_color='"+$sxq_color+"' order by p_price "+$sxq_order;
        }else if($sxq_order !=0 && $sxq_color!=0 && $sxq_size!=0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and b_order=? and s_order=? and p_sex=? and product.p_color='"+$sxq_color +"' and warehouse.p_size='"+$sxq_size+"' order by p_price "+$sxq_order;
        }else if($sxq_order==0 && $sxq_color!=0 && $sxq_size!=0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and b_order=? and s_order=? and p_sex=? and product.p_color='"+$sxq_color +"' and warehouse.p_size='"+$sxq_size+"' order by up_date desc";
        }else if($sxq_order==0 && $sxq_color==0 && $sxq_size!=0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and b_order=? and s_order=? and p_sex=? and warehouse.p_size='"+$sxq_size+"' order by up_date desc";
        }else if($sxq_order==0 && $sxq_color!=0 && $sxq_size==0){
            sql="select * from product inner join warehouse on product.pid=warehouse.pid where p_save!=0 and b_order=? and s_order=? and p_sex=? and product.p_color='"+$sxq_color+"' order by up_date desc";
        }else{
            sql="select * from product where b_order=? and s_order=? and p_sex=? order by up_date desc";
        }
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

//搜索商品模糊查询
router.get('/search/:shop',(req,res)=>{
    var $shop=req.params.shop;
    console.log($shop);
    var sql=" ";
    pool.query("select * from product where p_info like '%?%'",[$shop],(err,result)=>{
        if(err) throw err;
        if(result.length){
            res.send(result);
        }else{
            res.send("0");
        }
    });
});

module.exports=router;
