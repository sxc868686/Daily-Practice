var list=[//数据
    {
        title:'吃饭',
        ischecked:false //表示不选中
    },
    {
        title:'睡觉',
        ischecked:true //表示选中
    }

];
//实例化
new Vue({
    el:'.main',//挂载点
    data:{//传数据
        list:list,
        txt:'', //记录文本框输入的值
        updatetxt:'', //记录正在编辑的数据
        oldtitle:'', //记录修改前的title
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
        },
        dbclick:function (item) {//添加双击修改事件
            this.oldtitle=item.title;//记录修改之前的title
            this.updatetxt=item;
        },
        blurs:function (txt) {//焦点移出事件
            this.updatetxt='';//清空数值，与item值不对应，class移除
        },
        cancels:function (txt) {//取消编辑
            txt.title=this.oldtitle;
            this.oldtitle='';
            this.updatetxt='';
        }
    },
    computed:{//利用计算属性来实现未完成任务数量
        unCheckedSum:function () {
            return this.list.filter(function(item){
                return !item.ischecked
            }).length;
        }
    },
    directives:{//自定义指令
        'focus':{//自定义方法，添加焦点
            //利用钩子函数来实现
            update:function (el,binding) {//el为指令所绑定的元素，binding为一个对象
                // console.log(el);
                // console.log(binding)
                if(binding.value){//如果被选中，则添加焦点
                    el.focus();
                }
            }
        }
    }
});