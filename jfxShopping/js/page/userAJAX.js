//注册请求
function reg() {
    var uname = $('#uname').val();
    var email = $('#emailreg').val();
    var upwd = $('#upwdreg').val();
    var sex = $('#sex').val();
    var sure = $('#sure');
    if (sex == "none") {
        $('.sex_msg').css({
            "display": "block"
        })
        $('#sex').css({
            "border-color": "#f00"
        })
    } else {
        $('.sex_msg').css({
            "display": "none"
        })
        $('#sex').css({
            "border-color": "#000"
        })
    }
    if (!uname) {
        $('.uname_msg').css({
            "display": "block"
        })
        $('#uname').css({
            "border-color": "#f00"
        })
    } else {
        $('.uname_msg').css({
            "display": "none"
        })
        $('#uname').css({
            "border-color": "#000"
        })
    }
    if (!email) {
        $('.emailreg_msg').css({
            "display": "block"
        })
        $('#emailreg').css({
            "border-color": "#f00"
        })
    } else {
        $('.emailreg_msg').css({
            "display": "none"
        })
        $('#emailreg').css({
            "border-color": "#000"
        })
    }
    if (!upwd || upwd.length < 8) {
        $('.upwdreg_msg').css({
            "display": "block"
        })
        $('#upwdreg').css({
            "border-color": "#f00"
        })
        return false;
    } else {
        $('.upwdreg_msg').css({
            "display": "none"
        })
        $('#upwdreg').css({
            "border-color": "#000"
        })
    }
    if (!sure[0].checked) {
        alert("请阅读并同意协议！");
    }
    if (sex == "none" || !uname || !email || !upwd || !sure[0].checked) {
        return false;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/user/reg', true);
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    var formdata = "uname=" + uname + "&email=" + email + "&upwd=" + upwd + "&sex=" + sex;
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 1) {
                window.location.href = "login.html"
            } else {
                alert("请求超时");
            }
        }
    }
}

//登陆请求
function login() {
    var email = $('#emaillogin').val();
    var upwd = $('#upwdlogin').val();
    if (!email) {
        $('.emaillogin_msg').css({
            "display": "block"
        });
        $('#emaillogin').css({
            "border-color": "#f00"
        });
    } else {
        $('.emaillogin_msg').css({
            "display": "none"
        });
        $('#emaillogin').css({
            "border-color": "#000"
        });
    }
    if (!upwd) {
        $('.upwdlogin_msg').css({
            "display": "block"
        });
        $('.upwdlogin_msg').text("请输入您的密码");
        $('#upwdlogin').css({
            "border-color": "#f00"
        })
        return false;
    } else {
        $('.upwdlogin_msg').css({
            "display": "none"
        });
        $('#upwdlogin').css({
            "border-color": "#000"
        });
    }
    if (upwd.length < 8) {
        $('.upwdlogin_msg').css({
            "display": "block"
        });
        $('.upwdlogin_msg').text("密码格式错误");
        $('#upwdlogin').css({
            "border-color": "#f00"
        });
    } else {
        $('.upwdlogin_msg').css({
            "display": "none"
        })
        $('#upwdlogin').css({
            "border-color": "#000"
        })
    }
    if (!email || !upwd || upwd.length < 8) {
        return false;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/user/login', true);
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    var formdata = "email=" + email + "&upwd=" + upwd;
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 0) {
                alert("用户名或密码错误！");
            } else {
                result = JSON.parse(result);
                window.location.href = "index.html?uid=" + result.uid + "&email=" + result.email;
            }
        }
    }
}

//判断当前是否是用户登陆状态
function checklogin() {
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var email = url.get("email");
    if (uid == "" || uid == null || uid == "null" || email == "" || email == null || email == "null") {
        $('.accountck').css({
            "display": "none"
        });
        $('.loginck').css({
            "display": "block"
        });
        $('.sm_login_account').css({
            "display": "none"
        });
        $('.sm_login_exit').css({
            "display": "none"
        });
        $('.sm_login').css({
            "display": "block"
        });
        return false;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/user/queryuser/' + uid, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            result = JSON.parse(result);
            if (uid == result.uid && email == result.email) {
                $('.accountck').css({
                    "display": "block"
                });
                $('.loginck').css({
                    "display": "none"
                });
                $('.sm_login_account').css({
                    "display": "block"
                });
                $('.sm_login_exit').css({
                    "display": "block"
                });
                $('.sm_login').css({
                    "display": "none"
                });
                $('.sm_login_account').html("<a href='userinfo_dd.html?uid=" + uid + "&email=" + email + "' class='nav-link'>我的账户</a>");
                $('.sm_login_exit').html("<a href='index.html' class='nav-link'>注销</a>");
                var html = $('.accountck');
                html.html("<a href='#' class='mr-3 pb-0 pt-2 d-md-inline-block d-none text-dark small' style='cursor: pointer'" +
                    "'>我的账户：<span><b>" + result.uname + "</b></span></a>" +
                    "<div id='account' class='login account bg-white'>" +
                    "<ul class='list-unstyled'>" +
                    "<li><a href='userinfo_dd.html?uid=" + uid + "&email=" + email + "'>订单</a></li>" +
                    "<li><a href='userinfo_wish.html?uid=" + uid + "&email=" + email + "'>心愿单</a></li>" +
                    "<li><a href='userinfo_person.html?uid=" + uid + "&email=" + email + "'>个人信息</a></li>" +
                    "<li><a href='userinfo_address.html?uid=" + uid + "&email=" + email + "'>地址</a></li>" +
                    "<li><a href='index.html'>注销</a></li>" +
                    "</ul>" +
                    "</div>");
            }
        }
    }
}
// 导航跳转
function toList(b_order, s_order, p_sex, news) {
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var email = url.get("email");
    window.location.href = "list.html?uid=" + uid + "&email=" + email + "&b_order=" + b_order + "&s_order=" + s_order + "&p_sex=" + p_sex + "&new=" + news;
}


//商品查询  在列表页加载
function findProduct() {
    checklogin();
    var urlPar = new URLSearchParams(location.search);
    var uid = urlPar.get("uid");
    var email = urlPar.get("email");
    var b_order = urlPar.get("b_order");
    var s_order = urlPar.get("s_order");
    var p_sex = urlPar.get("p_sex");
    var news = urlPar.get("new");
    var xhr = new XMLHttpRequest();
    var title = "";
    xhr.open('get', '/product/findproduct/' + b_order + "-" + s_order + "-" + p_sex + "-" + news, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            result = JSON.parse(result);
            // 获取标题
            switch (result[0].b_order) {
                case "cy":
                    title = "成衣";
                    break;
                case "bd":
                    title = "包袋";
                    break;
                case "xl":
                    title = "鞋履";
                    break;
                case "ps":
                    title = "配饰";
                    break;
            }
            // 查询所有最新系列
            if (b_order == "0") {
                $('.toptitle').html("<b>最新系列</b>");
                // 查询大类最新系列 
            } else if (b_order != "0" && news == "1") {
                $('.toptitle').html("<span class='h6'>" + title + "</span><br/><b>最新系列</b>");
                //查询女性大类商品 
            } else if (b_order != "0" && s_order == "0" && p_sex == "0") {
                $('.toptitle').html("<span class='h6'>女士</span><br/><b>" + title + "</b>");
                //查询男性大类商品 
            } else if (b_order != "0" && s_order == "0" && p_sex == "1") {
                $('.toptitle').html("<span class='h6'>男士</span><br/><b>" + title + "</b>");
                //查询女性小类商品
            } else if (b_order != "0" && s_order != "0" && p_sex == "0") {
                $('.toptitle').html("<span class='h6'>女士</span><br/><b>" + title + "</b>");
                //查询男性小类商品
            } else if (b_order != "0" && s_order != "0" && p_sex == "1") {
                $('.toptitle').html("<span class='h6'>男士</span><br/><b>" + title + "</b>");
            }
            if (result != 0) {
                // 按地址栏的数据将查询后的结果遍历到页面中
                var html = "";
                for (var i = 0; i < result.length; i++) {
                    var arr = result[i].picadd.split(",");
                    html += "<div class='col-lg-4 col-6 p-lg-4 p-3' onmouseover=" + "productchange('.producthide','.productshow')" + ">" +
                        "<a href='productinfo.html?uid='" + uid + "&email=" + email + "&pid=" + result[i].pid + "' class='d-block w-100'><img src='" + arr[0] + "' class='producthide w-100'" +
                        "alt=''></a>" +
                        "<div class='productshow' style='display: none'>" +
                        "<a href='productinfo.html?uid=" + uid + "&email=" + email + "&pid=" + result[i].pid + "'>" +
                        "    <img src='" + arr[1] + "' class='w-100' alt=''>" +
                        "</a>" +
                        "    <div class='text-center m-auto'>" +
                        "        <p>" + result[i].p_title + "</p>" +
                        "        <p>" + result[i].p_price + "</p>" +
                        "    </div>" +
                        "</div>" +
                        "</div>"
                }
                $('.list_cont').html(html);
                $('.list_number b').html(result.length + "条");
            }
        }
    }
}

//获取单件商品的详情
function getProductInfo() {
    checklogin();
    var urlPar = new URLSearchParams(location.search);
    var uid = urlPar.get("uid");
    var email = urlPar.get("email");
    var pid = urlPar.get("pid");
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/product/getinfo/' + uid + "-" + email + "-" + pid, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            result = JSON.parse(result)[0];
            var pic = result.picadd.split(",");
            // 商品图片
            var html = "";
            html += "<div class='carousel-item active'>" +
                "<img src='" + pic[0] + "' class='w-100' alt=''></div>" +
                "<div class='carousel-item'><img src='" + pic[1] + "' class='w-100' alt=''></div>" +
                "<div class='carousel-item'><img src='" + pic[2] + "' class='w-100' alt=''></div>" +
                "<div class='carousel-item'><img src='" + pic[3] + "' class='w-100' alt=''></div>" +
                "<div class='carousel-item'><img src='" + pic[4] + "' class='w-100' alt=''></div>";
            $('.banner').html(html);
            //商品信息
            $('.productinfo h3').text(result.p_title);
            $('.productinfo h4').text(result.p_price);
            $('#info').html("<p>中式领上衣，泡泡长袖，尚蒂伊蕾丝装饰，花卉和豹纹印花。撞色胸袋、袖口和纽扣扣袢，黑色双绉肩部镶饰。</p>" +
                "<p>产品编号：<span>" + result.p_num + "</span></p>" +
                "<p>材质：<span>" + result.p_cz + "</span></p>" +
                "<input type='hidden' class='color' value='" + result.p_color + "'/>");
        }
    }
}

//商品详情中选择尺寸
function chooseSize() {
    var list = $('.sizelist li');
    list.on("click", function () {
        var index = list.index(this);
        $('.size button').html(list.eq(index).text() + "<span class='dropdown-toggle float-right'></span>");
    });
}

//加入心愿单
function addWish() {
    var urlPar = new URLSearchParams(location.search);
    var uid = urlPar.get("uid");
    var email = urlPar.get("email");
    var pid = urlPar.get("pid");
    var size = $('.size button').text();
    var color = $('.color').val();
    if (size != "尺寸 " && color != "") {
        // 查询仓库信息
        var xhr1 = new XMLHttpRequest();
        xhr1.open('get', '/product/getsave/' + pid + "-" + size, true);
        xhr1.send();
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState == 4 && xhr1.status == 200) {
                var result = xhr1.responseText;
                if (result != 0) {
                    result = JSON.parse(result)[0];
                    if (result.p_num != 0) {
                        // 添加到心愿单
                        var xhr = new XMLHttpRequest();
                        xhr.open('put', '/user/addwish', true);
                        var formdata = "uid=" + uid + "&email=" + email + "&pid=" + pid + "&p_color=" + color + "&p_size=" + size + "&wid=" + result.wid;
                        xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
                        xhr.send(formdata);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                var result1 = xhr.responseText;
                                if (result1 == 1) {
                                    window.location.href = "userinfo_wish.html?uid=" + uid + "&email=" + email;
                                } else {

                                }
                            }
                        }
                    } else {
                        // 库存不足
                    }
                }
            }
        }
    }
}

//心愿单加载
function getWish() {
    checklogin();
    var urlPar = new URLSearchParams(location.search);
    var uid = urlPar.get("uid");
    var email = urlPar.get("email");
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/user/getwish/'+uid, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result=xhr.responseText;
            result=JSON.parse(result);
            if(result.length){
                var html="";
                for(var i=0;i<result.length;i++){
                    var pic = result[i].picadd.split(",");
                    html+="<div class='col-lg-4 col-6 p-lg-4 p-3' onmouseover=" + "productchange('.producthide','.productshow')" + ">" +
                        "<input type='checkbox' name='buy[]' class='select' />"+
                        "<a href='#' class='d-block w-100'><img src='"+pic[0]+"' class='producthide w-100' alt=''></a>"+
                        "<div class='productshow' style='display: none'>"+
                            "<a href='javascript:delWish("+result[i].wid+")' class='close'><span>&times;</span></a>"+
                            "<a href='#'><img src='"+pic[1]+"' class='w-100' alt=''></a>"+
                            "<div class='text-center m-auto'>"+
                                "<p>"+result[i].p_title+"</p>"+
                                "<p>"+result[i].p_price+"</p>"+
                                "<input type='hidden' class='color' value='" + result[i].p_color + "'/>"+
                                "<input type='hidden' class='pid' value='" + result[i].pid + "'/>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
                }
                $('.shownum b').html(result.length+"条");
                $('.productlist').html(html);
            }else{
                $('.shownum b').html(0+"条");
                var html="<div class='m-auto py-5'><h2>暂无商品</h2></div>";
                $('.productlist').html(html);
            } 
        }
    }
}


//心愿单删除
function delWish(wid){
    var xhr = new XMLHttpRequest();
    xhr.open('delete', '/user/delwish/'+wid, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if(xhr.readyState==4 && xhr.status==200){
            var result=xhr.responseText;
            if(result==1){
                getWish();
            }else{
                alert("删除失败");
            }
        }
    }
}