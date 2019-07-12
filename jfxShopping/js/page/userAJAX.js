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

//小窗口登陆
function s_login() {
    var email = $('#email').val();
    var upwd = $('#upwd').val();
    if (!email) {
        $('.email_msg').css({
            "display": "block"
        });
        $('#email').css({
            "border-color": "#f00"
        });
    } else {
        $('.email_msg').css({
            "display": "none"
        });
        $('#email').css({
            "border-color": "#000"
        });
    }
    if (!upwd) {
        $('.upwd_msg').css({
            "display": "block"
        });
        $('.upwd_msg').text("请输入您的密码");
        $('#upwd').css({
            "border-color": "#f00"
        })
        return false;
    } else {
        $('.upwd_msg').css({
            "display": "none"
        });
        $('#upwd').css({
            "border-color": "#000"
        });
    }
    if (upwd.length < 8) {
        $('.upwd_msg').css({
            "display": "block"
        });
        $('.upwd_msg').text("密码格式错误");
        $('#upwdlogin').css({
            "border-color": "#f00"
        });
    } else {
        $('.upwd_msg').css({
            "display": "none"
        })
        $('#upwd').css({
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

// LOGO跳转
function toIndex() {
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var email = url.get("email");
    window.location.href = "index.html?uid=" + uid + "&email=" + email;
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
    var sxq_order = $('.sxqTag_order');
    var sxq_color = $('.sxqTag_color');
    var sxq_size = $('.sxqTag_size');
    sxq_order.text().charAt(0) == 0 ? sxq_order.css("display", "none") : sxq_order.css("display", "block");
    sxq_color.text().charAt(0) == 0 ? sxq_color.css("display", "none") : sxq_color.css("display", "block");
    sxq_size.text().charAt(0) == 0 ? sxq_size.css("display", "none") : sxq_size.css("display", "block");
    var xhr = new XMLHttpRequest();
    var title = "";
    xhr.open('get', '/product/findproduct/' + b_order + "-" + s_order + "-" + p_sex + "-" + news + "-" + sxq_order.eq(0).text().charAt(0) + "-" + sxq_color.eq(0).text().replace(/×/, "") + "-" + sxq_size.eq(0).text().replace(/×/, ""), true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            result = JSON.parse(result);
            // 获取标题
            switch (b_order) {
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
                var count = 0;
                for (var i = 0; i < result.length; i++) {
                    var arr = result[i].picadd.split(",");
                    var yz = "";
                    if (i > 0) {
                        var yz = result[i - 1].pid;
                    }
                    if (yz != result[i].pid) {
                        count++;
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
                            "</div>";
                    }
                }
                $('.list_cont').html(html);
                $('.list_number b').html(count + "条");
            } else {
                $('.list_cont').html("<h4 class='py-4 text-center'>敬请期待</h4>");
                $('.list_number b').html("0条");
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
                    if (result.p_save != 0) {
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
                        alert("库存不足");
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
    xhr.open('get', '/user/getwish/' + uid, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            result = JSON.parse(result);
            if (result.length) {
                var html = "";
                for (var i = 0; i < result.length; i++) {
                    var pic = result[i].picadd.split(",");
                    html += "<div class='col-lg-4 col-6 p-lg-4 p-3' onmouseover=" + "productchange('.producthide','.productshow')" + ">" +
                        "<input type='checkbox' name='buy[]' class='select' value='" + result[i].p_price + "|" + result[i].pid + "' onclick='getTotal()'/>" +
                        "<span class='d-none p_id'>" + result[i].pid + "</span>" +
                        "<a href='#' class='d-block w-100'><img src='" + pic[0] + "' class='producthide w-100' alt=''></a>" +
                        "<div class='productshow' style='display: none'>" +
                        "<a href='javascript:delWish(" + result[i].wid + ")' class='close'><span>&times;</span></a>" +
                        "<a href='#'><img src='" + pic[1] + "' class='w-100' alt=''></a>" +
                        "<div class='text-center m-auto'>" +
                        "<p>" + result[i].p_title + "<b class='ml-2'>" + result[i].p_size + "</b></p>" +
                        "<p class='wishPrice'>" + result[i].p_price + "</p>" +
                        "" +
                        "<input type='hidden' class='color' value='" + result[i].p_color + "'/>" +
                        "<input type='hidden' class='pid' value='" + result[i].pid + "'/>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                }
                $('.shownum b').html(result.length + "条");
                $('.productlist').html(html);
            } else {
                $('.shownum b').html(0 + "条");
                var html = "<div class='m-auto py-5'><h2>暂无商品</h2></div>";
                $('.productlist').html(html);
            }
        }
    }
}


//心愿单删除
function delWish(wid) {
    var xhr = new XMLHttpRequest();
    xhr.open('delete', '/user/delwish/' + wid, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 1) {
                getWish();
            } else {
                alert("删除失败");
            }
        }
    }
}

//获取个人信息
function getPersonInfo() {
    checklogin();
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/user/queryuser/' + uid, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            result = JSON.parse(result);
            $('#sex').val(result.sex);
            $('#uname').val(result.uname);
            $('#emailreg').val(result.email);
            $('#balance').val(result.balance);
        }
    }
}

//修改个人信息
function changePersonInfo() {
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var sex = $('#sex').val();
    var uname = $('#uname').val();
    var email = $('#emailreg').val();
    var upwd = $('#upwdreg').val();
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
    } else {
        $('.upwdreg_msg').css({
            "display": "none"
        })
        $('#upwdreg').css({
            "border-color": "#000"
        })
    }
    if (sex == "none" || !uname || !email || !upwd || upwd.length < 8) {
        return false;
    }
    var xhr1 = new XMLHttpRequest();
    xhr1.open('get', '/user/queryuser/' + uid, true);
    xhr1.send();
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState == 4 && xhr1.status == 200) {
            var result1 = xhr1.responseText;
            if (result1) {
                result1 = JSON.parse(result1);
                if (result1.uid == uid && result1.email == email) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('put', '/user/change', true);
                    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
                    var formdata = "uid=" + uid + "&sex=" + sex + "&uname=" + uname + "&email=" + email + "&upwd=" + upwd;
                    xhr.send(formdata);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var result = xhr.responseText;
                            if (result == 1) {
                                window.location.href = "userinfo_person.html?uid=" + uid + "&email=" + email;
                            } else {
                                alert("请求超时");
                            }
                        }
                    }
                }
            }
        }
    }
}

//搜索商品
function searchShop() {
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var email = url.get("email");
    var shop = $('#searchcont').val();
    console.log(shop);
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/product/search/' + shop, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result.length) {
                result = JSON.parse(result);
                window.location.href = "list.html?uid=" + uid + "&email=" + email + "&b_order=" + result[0].b_order + "&s_order=" + result[0].s_order + "&p_sex=2&new=0";
            } else {
                alert("请求超时");
            }
        }
    }
}

//地址信息加载
function showAddress() {
    checklogin();
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/user/getaddress/' + uid, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            var html = "";
            if (result != 0) {
                $('.address_none').css("display", "none");
                result = JSON.parse(result);
                var state = "";
                for (var i = 0; i < result.length; i++) {
                    result[i].address_state == 0 ? state = "<li class='before'><a href='javascript:defaultAdd(" + result[i].address_id + ")'>设为默认地址</a></li>" : state = "<li class='before'>(默认地址)</li>"; //盘对是否为默认地址
                    html += "<li class='d-flex flex-column col-md-4 col-12 mt-3'>" +
                        "<ul class='text-left mb-3 list-unstyled'>" +
                        "<li class='address_title'>" + result[i].addressname + "</li>" +
                        "<li class='username text-muted'>" + result[i].username + "</li>" +
                        "<li class='address p-0 m-0 text-muted'>" + result[i].cityname + "<br />" + result[i].address + "</li>" +
                        "<li class='phone text-muted'>电话：<span>" + result[i].phone + "</span></li>" +
                        "</ul>" +
                        "<ul class='d-flex flex-row flex-nowrap list-unstyled'>" +
                        "<li><a href='#change' data-toggle='modal' onclick='findAddress(" + result[i].address_id + ")'>编辑</a></li>" +
                        "<li class='before'><a href='javascript:delAddress(" + result[i].address_id + ")'>删除</a></li>" +
                        state + //添加设置默认地址按钮
                        "</ul>" +
                        "</li>";
                }
                $('.addresslist').html(html);
            } else {
                $('.address_none').css("display", "block");
            }
        }
    }
}


//收货地址添加
function addAddress() {
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var addname = $('#addname').val();
    var username = $('#username').val();
    var address = $('#address').val();
    var cityname = $('#cityname').val();
    var phone = $('#phone').val();
    if (!addname) {
        $('.addname_msg').css({
            "display": "block"
        })
        $('#addname').css({
            "border-color": "#f00"
        })
    } else {
        $('.addname_msg').css({
            "display": "none"
        })
        $('#addname').css({
            "border-color": "#000"
        })
    }
    if (!username) {
        $('.username_msg').css({
            "display": "block"
        })
        $('#username').css({
            "border-color": "#f00"
        })
    } else {
        $('.username_msg').css({
            "display": "none"
        })
        $('#username').css({
            "border-color": "#000"
        })
    }
    if (!address) {
        $('.address_msg').css({
            "display": "block"
        })
        $('#address').css({
            "border-color": "#f00"
        })
    } else {
        $('.address_msg').css({
            "display": "none"
        })
        $('#address').css({
            "border-color": "#000"
        })
    }
    if (!cityname) {
        $('.cityname_msg').css({
            "display": "block"
        })
        $('#cityname').css({
            "border-color": "#f00"
        })
    } else {
        $('.cityname_msg').css({
            "display": "none"
        })
        $('#cityname').css({
            "border-color": "#000"
        })
    }
    if (!phone) {
        $('.phone_msg').css({
            "display": "block"
        })
        $('#phone').css({
            "border-color": "#f00"
        })
    } else {
        $('.phone_msg').css({
            "display": "none"
        })
        $('#phone').css({
            "border-color": "#000"
        })
    }
    if (!addname || !username || !address || !cityname || !phone) {
        return false;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/user/addaddress', true);
    var formdata = "uid=" + uid + "&addname=" + addname + "&username=" + username + "&address=" + address + "&cityname=" + cityname + "&phone=" + phone;
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 1) {
                $('#addname').val("");
                $('#username').val("");
                $('#address').val("");
                $('#cityname').val("");
                $('#phone').val("");
                $('#modal').modal('hide');
                showAddress();
            } else {
                alert("添加地址失败");
            }
        }
    }
}

//删除收货地址
function delAddress(add_id) {
    var xhr = new XMLHttpRequest();
    xhr.open('delete', '/user/deladdress/' + add_id, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 1) {
                showAddress();
            } else {
                alert("删除地址失败");
            }
        }
    }
}

//设置默认收货地址
function defaultAdd(add_id) {
    var xhr = new XMLHttpRequest();
    xhr.open('put', '/user/setdefaultadd', true);
    var formdata = "add_id=" + add_id;
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 1) {
                showAddress();
            } else {
                alert("设置地址失败");
            }
        }
    }
}

//编辑收货地址信息
function findAddress(add_id) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/user/findaddress/' + add_id, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result) {
                result = JSON.parse(result)[0];
                $('#addname1').val(result.addressname);
                $('#username1').val(result.username);
                $('#address1').val(result.address);
                $('#cityname1').val(result.cityname);
                $('#phone1').val(result.phone);
                $('.add_id').val(result.address_id)
            } else {
                alert("编辑地址失败");
            }
        }
    }
}

//编辑收货地址信息
function editAddress() {
    var add_id = $('.add_id').val();
    var xhr = new XMLHttpRequest();
    xhr.open('put', '/user/editaddress', true);
    var formdata = "add_id=" + add_id + "&username=" + $('#username1').val() + "&addname=" + $('#addname1').val() + "&cityname=" + $('#cityname1').val() + "&address=" + $('#address1').val() + "&phone=" + $('#phone1').val();
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 1) {
                $('#change').modal('hide');
                showAddress();
            } else {
                alert("保存地址失败");
            }
        }
    }
}

//选中心愿单商品计算价格
function getTotal() {
    var text = $("input:checkbox[name='buy[]']:checked").map(function (index, elem) {
        return $(elem).val();;
    }).get().join('|');
    text = text.split("|");
    var sum = 0;
    var i = 1;
    var $p_id = "";

    if (text[0] != "") {
        for (var t of text) {
            if (i % 2 != 0) {
                sum += parseFloat(t.replace(/[a-z|A-Z|,|￥]/g, ""))
            } else {
                $p_id += "," + t;
            }
            i++;
        }
        console.log($p_id);
        $('.p_idlist').text($p_id)
        $('.wishTotal b').text("￥" + sum.toFixed(2));
    } else {
        $('.wishTotal b').text("￥" + 0);
    }
}

//充值金额
function chongzhi() {
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var je = $('#chongzhije').val();
    var xhr = new XMLHttpRequest();
    xhr.open('put', '/user/chongzhi', true);
    var formdata = "uid=" + uid + "&je=" + je;
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result == 1) {
                $('#chongzhi').modal('hide');
                getPersonInfo();
            } else {
                alert("充值失败");
            }
        }
    }
}

//获取支付列表
function getPayList() {
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var pidlist = $('.p_idlist').text();
    pidlist = pidlist.slice(1).split(",");
    if (pidlist[0] != "") {
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/user/getdefaultadd/' + uid, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                if (result != 0) {
                    result = JSON.parse(result);
                    var html = "";
                    var xhr1 = new XMLHttpRequest();
                    xhr1.open('get', '/user/getpaylist/' + uid, true);
                    xhr1.send();
                    xhr1.onreadystatechange = function () {
                        if (xhr1.readyState == 4 && xhr1.status == 200) {
                            var result1 = xhr1.responseText;
                            if (result1) {
                                result1 = JSON.parse(result1);
                                for(var r of result1){
                                    for(var p of pidlist){
                                        if(p==r.pid){
                                            var pic = r.picadd;
                                            pic = pic.split(",");
                                            html += "<li class='d-flex flex-nowrap flex-row justify-content-start border-top border-bottom py-1'>" +
                                            "<img src='" + pic[0] + "'/>" +
                                            "<div class='pl-4 pt-4'>" +
                                            "<ul class='shopInfo list-unstyled'>" +
                                            "<li>" + r.p_title + "</li>" +
                                            "<li>" + r.p_price + "</li>" +
                                            "<li class='dd_psize'>," + r.p_size + "</li>" +
                                            "<li class='d-none dd_pcolor'>," + r.p_color + "</li>" +
                                            "</ul>" +
                                            "</div>" +
                                            "<ul class='text-left mb-3 list-unstyled pt-4 text-right w-25'>" +
                                            "<li class='address_id d-none'>" + result[0].address_id + "</li>" +
                                            "<li class='address_title'>" + result[0].addressname + "</li>" +
                                            "<li class='username text-muted'>" + result[0].username + "</li>" +
                                            "<li class='address p-0 m-0 text-muted'>" + result[0].cityname + "<br />" + result[0].address + "</li>" +
                                            "<li class='phone text-muted'>电话：" + result[0].phone + "</li>" +
                                            "</ul>" +
                                            "</li>";
                                        }
                                    }
                                }   
                            } else {
                                html = "<li>暂无商品</li>"
                            }
                            $('.sureShopList ul').html(html);
                        }
                    }
                    $('#buytolist').modal('show');
                } else {
                    alert("请添加并设置默认收货地址");
                }
            }
        }
    } else {
        //若无商品
        alert("请先添加商品");
    }
}

//支付方法
function userPay(){
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var email=url.get("email");
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/user/queryuser/' + uid, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            result = JSON.parse(result);
            if(parseFloat(result.balance)>parseFloat($('.wishTotal b')[0].textContent.slice(1))){
                var xhr1 = new XMLHttpRequest();
                xhr1.open('put', '/user/userpay', true);
                var formdata = "uid=" + uid + "&pay=" + $('.wishTotal b')[0].textContent.slice(1);
                xhr1.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
                xhr1.send(formdata);
                xhr1.onreadystatechange = function () {
                    if (xhr1.readyState == 4 && xhr1.status == 200) {
                        var result1 = xhr1.responseText;
                        if(result1==1){
                            var ddcolor=$('.dd_pcolor').text().slice(1).split(",");
                            var ddsize=$('.dd_psize').text().slice(1).split(",");
                            var addid=$('.address_id')[0].textContent;
                            var pidlist = $('.p_idlist').text();
                            pidlist = pidlist.slice(1).split(",");
                            console.log(ddcolor);
                            var xhr2= new XMLHttpRequest();
                            xhr2.open('post','/user/insertdd',true);
                            var formdata = "uid=" + uid +"&addid="+addid+ "&pidlist=" + pidlist+"&ddcolor="+ddcolor+"&ddsize="+ddsize;
                            xhr2.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
                            xhr2.send(formdata);
                            xhr2.onreadystatechange=function(){
                                var result = xhr2.responseText;
                                if(result==1){
                                    location.href="userinfo_dd.html?uid="+uid+"&email="+email;
                                }
                            }
                        }
                    }
                }
            }else{
                alert("余额不足");
            }
        }
    }

}