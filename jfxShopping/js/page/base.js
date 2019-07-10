
$(document).ready(function() {
    /*顶部吸附*/
    $('ul').addClass("list-unstyled");
    var ie6 = document.all;
    var dv = $('#navbar');
    dv.css({ 'position': 'static' })
    var st=0;
    var st2=st;
    //dv.attr('otop', dv.offset().top); //
    $(window).scroll(function() {
        st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
        if (st>45 && st <= st2) {
            if (ie6) { //IE6�
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
    //登陆窗口的显示隐藏
    $('.loginck').mouseover(function(){
        $('.bg').css({"height":$(document).height()});
        $('.bg').css({"display":"block"});
    });
    $('.loginck').mouseout(function(){
        $('.bg').css({"display":"none"});
    });
    $('.accountck').mouseover(function(){
        $('.bg').css({"height":$(document).height()});
        $('.bg').css({"display":"block"});
    });
    $('.accountck').mouseout(function(){
        $('.bg').css({"display":"none"});
    });
    
    //筛选器的选中和删除
    chooseSxq();

    //导航栏的显示与隐藏


    //
});




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
//筛选器的选中
function chooseSxq(){
    $('#ordersxq div ul li a').on("click",function(){
        var index=$('#ordersxq div ul li a').index(this);
        var order=$('#ordersxq div ul li a').eq(index).text();
        $('.sxqTag_order').html(order+"<span class='float-right pl-3 pr-1' onclick=delSxq('"+".sxqprice'"+")>&times;</span>");
        findProduct();
    });
    $('#colorsxq div ul li a').on("click",function(){
        var index=$('#colorsxq div ul li a').index(this);
        var color=$('#colorsxq div ul li a').eq(index).text();
        $('.sxqTag_color').html(color+"<span class='float-right pl-3 pr-1' onclick=delSxq('"+".sxqcolor'"+")>&times;</span>");
        findProduct();
    });
    $('#sizesxq div ul li a').on("click",function(){
        var index=$('#sizesxq div ul li a').index(this);
        var size=$('#sizesxq div ul li a').eq(index).text();
        $('.sxqTag_size').html(size+"<span class='float-right pl-3 pr-1' onclick=delSxq('"+".sxqsize'"+")>&times;</span>");
        findProduct();
    });
}
//筛选器的删除
function delSxq(delcla){
    $(delcla).html("0<span class='float-right pl-3 pr-1'>&times;</span>");
    findProduct();
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

//个人信息页面跳转
function choosePersonInfo(page){
    var url = new URLSearchParams(location.search);
    var uid = url.get("uid");
    var email = url.get("email");
    window.location.href = page+"?uid=" + uid + "&email=" + email;
}

