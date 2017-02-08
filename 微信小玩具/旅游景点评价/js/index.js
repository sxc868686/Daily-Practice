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
}

window.onload=function () {
    var pli=id('picList').getElementsByTagName('li');
    id('picList').style.width=pli.length+'00%';
    for(var i=0;i<pli.length;i++){
      pli[i].style.width=view().w+'px';
    };
};
