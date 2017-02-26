var list=[//数据
    {
        title:'吃饭',
        ischecked:false
    },
    {
        title:'吃饭',
        ischecked:true
    }

];
//实例化
new Vue({
    el:'.main',//挂载点
    data:{//传数据
        list:list,
        txt:'' //记录文本框输入的值
    },
    methods:{//方法统一管理
        add:function () {//添加任务
            //事件处理函数中的this指向的是当前Vue这个根实例
            this.list.push({
                title:this.txt,
                ischecked:false
            });
            this.txt='';
        },
        deletes:function (item) {//删除任务
            var index=this.list.indexOf(item);//找到需要删除的数据所对应的下标
            this.list.splice(index,1);
        }
    }
});