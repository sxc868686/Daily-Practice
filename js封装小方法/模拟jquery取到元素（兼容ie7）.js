/**
 * Created by Administrator on 2017/1/14.
 */
function z(s){

    if(typeof s ==='function'){

        window.onload=s;

    }else if(typeof s ==='string' && s.substr(0,1)==='#'){

        s=s.substr(1);

        return document.getElementById(s);

    }else if(typeof s ==='string' && s.substr(0,1)==='.'){

        s=s.substr(1);

        var aEls=document.getElementsByTagName('*');
        var arr=[];

        for(var i=0;i<aEls.length;i++){

            var agetClass=aEls[i].className.split(' ');
            for(var j=0; j<agetClass.length;j++){
                if(agetClass[j]==s){
                    arr.push(aEls[i]);
                    break;
                };
            };
        };
        return arr;

    }else if(typeof s ==='string' && s.substr(0,1)==='o'){

        s=s.substr(1);

        return document.getElementsByTagName(s);

    } else if(typeof s=== 'object'){

        return s;

    };

};
