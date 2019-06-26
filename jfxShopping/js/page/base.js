/*顶部吸附*/
$(document).ready(function() {
    $('ul').addClass("list-unstyled");
    var ie6 = document.all;
    var dv = $('#navbar');
    dv.css({ 'position': 'static' })
    var st=0;
    var st2=st;
    //dv.attr('otop', dv.offset().top); //�洢ԭ���ľ��붥���ľ���
    $(window).scroll(function() {
        st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
        if (st>45 && st <= st2) {
            if (ie6) { //IE6��֧��fixed���ԣ�����ֻ�ܿ�����positionΪabsolute��topʵ�ִ�Ч��
                dv.css({ position: 'absolute', top: st });
                dv.css('transition','position 5s ease-in-out');
            } else if (dv.css('position') != 'fixed'){
                dv.css({ 'position': 'fixed', top: 0 });
                dv.css('transition','position 5s ease-in-out');
            }
        } else if (dv.css('position') != 'static') {
            dv.css({ 'position': 'static' });
            dv.css('transition','position 5s ease-in-out');
        }
        st2=st;
    });
});
//登陆窗口的显示隐藏
function showlogin(){
    var check=$(".checksh");
    var login=$('#login');
    var body_bg=$("#body_bg");
    //body_bg.css({"background":"rgba(0,0,0,.5)"});
    if(check.css("display")=="none"){
        login.fadeIn("fast");
        check.css({"display":"block"});
    }else{
        check.css({"display":"none"});
        login.fadeOut("fast");
    }

}
function hidelogin(){
    var login=$('#login');
    login.fadeOut("fast");
}
function showaccount(){
    var check=$('.afterchecksh');
    var account=$('#account');
    if(check.css("display")=="none"){
        account.fadeIn("fast");
        check.css({"display":"block"});
    }else{
        check.css({"display":"none"});
        account.fadeOut("fast");
    }
}
// 文本框获取焦点
function ckfocus(id,top){
    var msg=$(id);
    msg.css({"top":top,"font-size":".5rem"});
}
function ckblurs(id,top,input){
    var msg=$(id);
    var input=$(input);
    if(!input.val()){
        msg.css({"top":top,"font-size":"0.5rem"});
    }
}
function ckfocus(id,top,px){
    var msg=$(id);
    msg.css({"top":top,"font-size":px});
}
function ckblur(id,top,px,input){
    var msg=$(id);
    var input=$(input);
    if(!input.val()){
        msg.css({"top":top,"font-size":px});
    }
}

// 筛选器菜单
function showsxq(id, state) {
    var sxq = $(id);
    var state = $(state);
    for (var i = 0; i < 3; i++){
        $('.listsxq').eq(i).css({
            "display": "none"
        });
    }
    if (state.css("display") == "block") {
        $('.ordersxq').css({
            'display': "none"
        });
        $('.colorsxq').css({
            'display': "none"
        });
        $('.sizesxq').css({
            'display': "none"
        });
        sxq.css({
            "display": "none"
        });
    } else {
        state.css({
            "display": "block"
        });
        sxq.css({
            "display": "block"
        });
    }
}

//列表页产品变换
function productchange(hide,show){
    var hide=$(hide);
    var show=$(show);
    hide.mouseover(function(){
        var index=hide.index(this);
        hide.eq(index).hide();
        show.eq(index).show()
    })
    show.mouseout(function(){
        var index=show.index(this);
        show.eq(index).hide();
        hide.eq(index).show();
    });
    // hide.on('mousuover',function(){
    //     hide.css({"display":"none"});
    //     show.css({"display":"block"});
    // });
    // show.on('mouseout',function(){
    //     hide.css({"display":"block"});
    //     show.css({"display":"none"});
    // });
}

