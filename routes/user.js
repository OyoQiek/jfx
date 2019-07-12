const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../pool');
var router = express.Router();
//注册
router.post('/reg', function (req, res) {
    var $uname = req.body.uname;
    var $email = req.body.email;
    var $upwd = req.body.upwd;
    var $sex = req.body.sex;
    var sql = "insert into user values(null,?,?,?,?,0)";
    pool.query(sql, [$uname, $email, $upwd, $sex], function (err, result) {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});
//登陆
router.post('/login', function (req, res) {
    var $email = req.body.email;
    var $upwd = req.body.upwd;
    var sql = 'select * from user where email=? and upwd=?';
    pool.query(sql, [$email, $upwd], function (err, result) {
        if (err) throw err;
        if (result.length) {
            res.send(result[0]);
        } else {
            res.send('0');
        }
    });
});

//finduserById搜索用户
router.get('/queryuser/:uid', function (req, res) {
    var $uid = req.params.uid;
    var sql = 'select * from user where uid=?';
    pool.query(sql, [$uid], function (err, result) {
        if (err) throw err;
        if (result.length) {
            res.send(result[0]);
        } else {
            res.send('0');
        }
    });
});

//添加到心愿单
router.put('/addwish', function (req, res) {
    var $uid = req.body.uid;
    var $pid = req.body.pid;
    var $p_color = req.body.p_color;
    var $p_size = req.body.p_size;
    var $wid = req.body.wid;
    var sql = 'insert into collect values(null,?,?,?,?,?)';
    pool.query(sql, [$uid, $pid, $p_color, $p_size, $wid], function (err, result) {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0")
        }
    });
})

//查询心愿单
router.get('/getwish/:uid', function (req, res) {
    var $uid = req.params.uid;
    var sql = 'select * from collect inner join product on collect.pid=product.pid where uid=?';
    pool.query(sql, [$uid], function (err, result) {
        if (err) throw err;
        console.log($uid);
        if (result.length) {
            res.send(result);
        } else {
            res.send("0")
        }
    });
});

//删除心愿单商品
router.delete('/delwish/:wid', (req, res) => {
    var $wid = req.params.wid;
    sql = 'delete from collect where wid=?';
    pool.query(sql, [$wid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

//修改账户信息
router.put('/change', (req, res) => {
    var $uid = req.body.uid;
    var $sex = req.body.sex;
    var $uname = req.body.uname;
    var $email = req.body.email;
    var $upwd = req.body.upwd;
    console.log($uid + $email + $sex);
    var sql = 'update user set uname=?,email=?,upwd=?,sex=? where uid=?';
    pool.query(sql, [$uname, $email, $upwd, $sex, $uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

//获取user收获地址信息
router.get('/getaddress/:uid', (req, res) => {
    var $uid = req.params.uid;
    var sql = "select * from user_address where uid=?";
    pool.query(sql, [$uid], (err, result) => {
        if (err) throw err;
        if (result.length) {
            res.send(result);
        } else {
            res.send("0");
        }
    });
});

//添加收货地址
router.post('/addaddress', (req, res) => {
    var $uid = req.body.uid;
    var $addname = req.body.addname;
    var $username = req.body.username;
    var $address = req.body.address;
    var $cityname = req.body.cityname;
    var $phone = req.body.phone;
    var sql = "insert into user_address values(null,?,?,?,?,?,0,?);";
    pool.query(sql, [$uid, $username, $addname, $cityname, $address, $phone], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

//删除收货地址
router.delete('/deladdress/:add_id', (req, res) => {
    var $add_id = req.params.add_id;
    var sql = "delete from user_address where address_id=?";
    pool.query(sql, [$add_id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

//设置默认收货地址
router.put('/setdefaultadd', (req, res) => {
    var $add_id = req.body.add_id;
    pool.query('update user_address set address_state=0', (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            pool.query('update user_address set address_state=1 where address_id=?', [$add_id], (err1, result1) => {
                if (err1) throw err1;
                if (result1.affectedRows > 0) {
                    res.send("1");
                } else {
                    res.send("0");
                }
            });
        } else {
            res.send("0")
        }
    });
});

//获取单个收货地址信息
router.get('/findaddress/:add_id', (req, res) => {
    var $add_id = req.params.add_id;
    var sql = 'select * from user_address where address_id=?';
    pool.query(sql, [$add_id], (err, result) => {
        if (err) throw err;
        if (result.length) {
            res.send(result);
        } else {
            res.send("0");
        }
    })
});

//获取默认收货地址
router.get('/getdefaultadd/:uid', (req, res) => {
    var $uid = req.params.uid;
    var sql = "select * from user_address where uid=? and address_state=1";
    pool.query(sql, [$uid], (err, result) => {
        if (err) throw err;
        if (result.length) {
            res.send(result);
        } else {
            res.send("0");
        }
    });
});

//获取选中支付列表
router.get('/getpaylist/:uid', (req, res) => {
    var $uid = req.params.uid;
    var sql = "select * from collect inner join product on collect.pid=product.pid where uid=?";
    pool.query(sql, [$uid], (err, result) => {
        if (err) throw err;
        if (result.length) {
            console.log(result)
            res.send(result);
        } else {
            res.send("0");
        }
    });
});

//编辑保存单个收货地址信息
router.put('/editaddress', (req, res) => {
    var $add_id = req.body.add_id;
    var $addname = req.body.addname;
    var $username = req.body.username;
    var $address = req.body.address;
    var $cityname = req.body.cityname;
    var $phone = req.body.phone;
    var sql = "update user_address set username=?,addressname=?,cityname=?,address=?,phone=? where address_id=?";
    pool.query(sql, [$username, $addname, $cityname, $address, $phone, $add_id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

//充值
router.put('/chongzhi', (req, res) => {
    var $uid = req.body.uid;
    var $je = req.body.je;
    var sql = "update user set balance=balance+? where uid=?";
    pool.query(sql, [$je, $uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1")
        } else {
            res.send("0")
        }
    });
});

//支付
router.put('/userpay', (req, res) => {
    var $uid = req.body.uid;
    var $pay = req.body.pay;
    sql = "update user set balance=balance-? where uid=?";
    pool.query(sql, [$pay, $uid], (err1, result1) => {
        if (err1) throw err1;
        if (result1.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });

});

//插入订单数据
router.post('/insertdd',(req,res)=>{
    var $uid=req.body.uid;
    var $addid=req.body.addid;
    var $pidlist=req.body.pidlist;
    var $ddsize=req.body.ddsize;
    var $ddcolor=req.body.ddcolor;
    var sql="insert into dd values(null,?,?,?,?,?)";
    var flag=true;
    console.log($pidlist);
    $pidlist=$pidlist.split(",");
    for(var p=0;p<$pidlist.length;p++){
        pool.query(sql,[$addid,$uid,$pidlist[p],$ddcolor[p],$ddsize[p]],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                flag=true;
            }else{
                flag=false;
            }
        });
        sql="delete from collect where uid=? and pid=?";
        pool.query(sql,[$uid,$pidlist[p]],(err,result1)=>{
            if(err) throw err;
            if(result1.affectedRows>0){
                flag=true;
            }else{
                flag=false;
            }
        });
    }
    if(flag){
        res.send("1");
    }else{
        res.send("0")
    }
});

module.exports = router;