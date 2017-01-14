/**
 * Created by Administrator on 2017/1/14.
 */
var a1 = [1,3,4,5,6];
var a2 = [2,3,7];
var shao = [];
var duo = [];
var hebing = a1.concat(a2);
hebing.sort();
hebing.reverse();
var quchong = $.unique(hebing);
console.info(a1);
console.info(a2);
console.info(quchong);

quchong.forEach(function(qitem,index,array){

    if(a1.every(function(item,qindex,array){return qitem != item;}))
    {
        duo.push(qitem);
    }

    if(a2.every(function(item,qindex,array){return qitem != item;}))
    {
        shao.push(qitem);
    }
});
console.info("a2比a1多的元素"+duo);
console.info("少的元素"+shao);