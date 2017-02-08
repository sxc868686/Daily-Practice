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
        var tNow=0;//当前显示的图片，默认第0个
        var iX=0; //记录translateX需要移动的值
        var iW=view().w; //记录屏幕的宽度
        var oTimer=null;//定时器
        var iStartTouchX=0;//记录开始时的x轴坐标
        var iTouchX=0;//记录手指按下的x轴坐标

        //自动播放tab
        function auto() {
            oTimer=setInterval(function () {
                tNow++;
                tNow=tNow%tNav.length;
                Tab();
            },2000);
        }

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
        //因为on不一定支持animation,使用自定义的方法替代
        bind(tab,'touchstart',fnStart);
        bind(tab,'touchmove',fnMove);
        bind(tab,'touchend',fnEnd);
        auto();
        //清除默认的touchmove事件
        bind(document,'touchmove',function (ev) {
            ev.preventDefault();
        })
        //手指滑动开始事件
        function fnStart(ev) {
            clearInterval(oTimer);
            tList.style.WebkitTransition='none';//清除延迟，否则滑动如同生锈一般
            var ev=ev || window.event;
            ev=ev.changedTouches[0];
            //console.log(ev); 得到changedTouches的参数列表
            iStartTouchX=ev.pageX;
            iTouchX=iX;
        };
        //滑动事件
        function fnMove(ev) {
            var ev=ev || window.event;

            ev=ev.changedTouches[0];
            var iDis=ev.pageX-iStartTouchX;//得到出发点和移动后的终点距离的差值
            iX=iTouchX+iDis;
            tList.style.WebkitTransform='translateX('+iX+'px)';
        };
        //滑动结束事件
        function fnEnd() {
            //得到移动后该显示哪个图片的值
            tNow=iX/iW;
            tNow=-Math.round(tNow);
            if(tNow<0){
                tNow=0;
            }else if(tNow>tNav.length-1){
                tNow=tNav.length-1;
            }
            tNow=tNow%tNav.length;
            Tab();
            auto();
        }

    };

    fnTab();
};
