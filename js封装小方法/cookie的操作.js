/**
 * Created by Administrator on 2017/1/14.
 */
//写cookie
function writeCookie(name, value, hours){
    var expire = "";
    if(hours != null){
        expire = new Date((new Date()).getTime() + hours * 3600000);
        expire = "; expires=" + expire.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expire;
}

//获得cookie
function getCookie(Name)
{
    var search = Name + "=" ;

    if(document.cookie.length > 0)
    {

        offset = document.cookie.indexOf(search)
        if(offset != -1)
        {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if(end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        }
        else return "";
    }
    else{
        return "";
    }
}

var myDate = new Date();
var datese=myDate.toLocaleDateString();
var imgs='';
var rs01='';
var rs02='';

function radomes(){

    if(getCookie('datese')==""||getCookie('bp_imgs')==""){

        //这里开始写入占卜数据，然后存入cookie
        newcoke();

    }else{
        var date1=new Date(getCookie('datese')).toLocaleDateString();
        date1 = date1.replace(/\-/gi,"/");
        datese = datese.replace(/\-/gi,"/");
        var time1 = new Date(date1).getTime();
        var time2 = new Date(datese).getTime();
        if(time1<time2){
            //这里放更新cookie的代码，并更新文本内容
            newcoke();


        }else{
            //这里从cookie拿出之前的内容并显示到文本里面
            var ddd1=getCookie('bp_imgs');
            var ddd2=getCookie('res01s');
            var ddd3=getCookie('res02s');

        }

    };
};