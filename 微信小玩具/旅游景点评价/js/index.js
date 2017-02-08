/**
 * Created by Administrator on 2017/2/6.
 */
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
};

function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
};
window.onload=function () {
    var pli=id('picList').getElementsByTagName('li');
    id('picList').style.width=pli.length+'00%';
    for(var i=0;i<pli.length;i++){
      pli[i].style.width=view().w+'px';
    };

    //tab切换功能
    function fnTab(){
        var tab=id('tabPic');
        var tList=id('picList');
        var tNav=tab.getElementsByTagName('nav')[0].children;
        var tNow=0;//当前选中的项，默认第0个
        var iX=0; //记录translateX需要移动的值
        var iW=view().w; //记录屏幕的宽度
        var oTimer=null;//定时器

        oTimer=setInterval(function () {
            tNow++;
            tNow=tNow%tNav.length;
            Tab();
        },2000);
        //执行代码
        function Tab() {
            iX=-tNow*iW; //每次移动一个屏幕
            tList.style.WebkitTransform='translateX('+iX+'px)';
            tList.style.WebkitTransition='0.5s';
            for(var i=0;i<tNav.length;i++){
                removeClass(tNav[i],'active');
            };
            addClass(tNav[tNow],'active');
        };
    };
    fnTab();
};
