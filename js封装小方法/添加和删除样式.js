/**
 * Created by Administrator on 2017/1/14.
 */
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

}

//得到标签样式（非行间样式）
function getstyle(obj,attrs){

    return obj.currentStyle ? obj.currentStyle[attrs]: getComputedStyle(obj)[attrs];

};