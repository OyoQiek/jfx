//注册请求
function reg(){
    var uname=$('#uname').val();
    var email=$('#emailreg').val();
    var upwd=$('#upwdreg').val();
    var sex=$('#sex').val();
    var sure=$('#sure');
    if(sex=="none"){
        $('.sex_msg').css({"display":"block"})
        $('#sex').css({"border-color":"#f00"})
    }else{
        $('.sex_msg').css({"display":"none"})
        $('#sex').css({"border-color":"#000"})
    }
    if(!uname){
        $('.uname_msg').css({"display":"block"})
        $('#uname').css({"border-color":"#f00"})
    }else{
        $('.uname_msg').css({"display":"none"})
        $('#uname').css({"border-color":"#000"})
    }
    if(!email){
        $('.emailreg_msg').css({"display":"block"})
        $('#emailreg').css({"border-color":"#f00"})
    }else{
        $('.emailreg_msg').css({"display":"none"})
        $('#emailreg').css({"border-color":"#000"})
    }
    if(!upwd || upwd.length<8){
        $('.upwdreg_msg').css({"display":"block"})
        $('#upwdreg').css({"border-color":"#f00"})
        return false;
    }else{
        $('.upwdreg_msg').css({"display":"none"})
        $('#upwdreg').css({"border-color":"#000"})
    }
    if(!sure[0].checked){
        alert("请阅读并同意协议！");
    }
    if(sex=="none" || !uname || !email|| !upwd || !sure[0].checked){
        return false;
    }
    var xhr=new XMLHttpRequest();
    xhr.open('post','/user/reg',true);
    xhr.setRequestHeader("content-Type","application/x-www-form-urlencoded");
    var formdata="uname="+uname+"&email="+email+"&upwd="+upwd+"&sex="+sex;
    xhr.send(formdata);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var result=xhr.responseText;
            if(result==1){
                window.location.href="login.html"
            }else{
                alert("请求超时");
            }
        }
    }
}

//登陆请求
function login(){
    var email=$('#emaillogin').val();
    var upwd=$('#upwdlogin').val();
    if(!email){
        $('.emaillogin_msg').css({"display":"block"});
        $('#emaillogin').css({"border-color":"#f00"});
    }else{
        $('.emaillogin_msg').css({"display":"none"});
        $('#emaillogin').css({"border-color":"#000"});
    }
    if(!upwd){
        $('.upwdlogin_msg').css({"display":"block"});
        $('.upwdlogin_msg').text("请输入您的密码");
        $('#upwdlogin').css({"border-color":"#f00"})
        return false;
    }else{
        $('.upwdlogin_msg').css({"display":"none"});
        $('#upwdlogin').css({"border-color":"#000"});
    }
    if(upwd.length<8){
        $('.upwdlogin_msg').css({"display":"block"});
        $('.upwdlogin_msg').text("密码格式错误");
        $('#upwdlogin').css({"border-color":"#f00"});
    }else{
        $('.upwdlogin_msg').css({"display":"none"})
        $('#upwdlogin').css({"border-color":"#000"})
    }
    if(!email || !upwd || upwd.length<8){
        return false;
    }
    var xhr=new XMLHttpRequest();
    xhr.open('post','/user/login',true);
    xhr.setRequestHeader("content-Type","application/x-www-form-urlencoded");
    var formdata="email="+email+"&upwd="+upwd;
    xhr.send(formdata);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var result=xhr.responseText;
            if(result==0){
                alert("用户名或密码错误！");
            }else{
                result=JSON.parse(result);
                window.location.href="index.html?uid="+result.uid+"&email="+result.email;
            }
        }
    }
}

//判断当前是否是用户登陆状态
function checklogin(){
    var url=new URLSearchParams(location.search);
    var uid=url.get("uid");
    var email=url.get("email");
    if(uid == "" || uid==null || uid == "null" || email == "" || email==null || email == "null"){
        $('.accountck').css({"display":"none"});
        $('.loginck').css({"display":"block"});
        return false;
    }
    var xhr=new XMLHttpRequest();
    xhr.open('get','/user/queryuser/'+uid,true);
    xhr.send();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var result=xhr.responseText;
            result=JSON.parse(result);
            if(uid == result.uid && email == result.email){
                $('.accountck').css({"display":"block"});
                $('.loginck').css({"display":"none"});
                var html=$('.accountck');
                html.html("<a href='#' class='mr-3 pb-0 pt-2 d-md-inline-block d-none text-dark small' style='cursor: pointer'"+
                "onmouseover='showaccount()'>我的账户：<span><b>"+result.uname+"</b></span></a>"+
                "<span class='afterchecksh'></span>"+
                "<div id='account' class='login account bg-white'>"+
                "<ul class='list-unstyled'>"+
                "<li><a href='userinfo_dd.html?uid="+uid+"&email="+email+"'>订单</a></li>"+
                "<li><a href='userinfo_wish.html?uid="+uid+"&email="+email+"'>心愿单</a></li>"+
                "<li><a href='userinfo_person.html?uid="+uid+"&email="+email+"'>个人信息</a></li>"+
                "<li><a href='userinfo_address.html?uid="+uid+"&email="+email+"'>地址</a></li>"+
                "<li><a href='index.html'>注销</a></li>"+
                "</ul>"+
                "</div>");
            }
        }
    }
}
