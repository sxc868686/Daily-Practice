
//存取localStorage中的数据

var store={
    //保存
    save:function (key,value) {
        localStorage.setItem(key,JSON.stringify(value));
    },
    //取值
    fetch:function (key) {
        return JSON.parse(localStorage.getItem(key))||[];
    }
};


 var list=store.fetch('one');
//实例化
var vm=new Vue({
    el:'.main',//挂载点
    data:{//传数据
        list:list,
        txt:'', //记录文本框输入的值
        updatetxt:'', //记录正在编辑的数据
        oldtitle:'', //记录修改前的title
        visibililty:'all' //通过属性值变化进行属性筛选
    },
    watch:{//监听函数

        list:{
            handler:function () {//监控list，当list发生变化时此函数执行
                store.save('one',this.list);
            },
            deep:true //深度监控，可以监控list里的对象是否发生变化
        }
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
        },
        filterList:function () {//过滤任务方法
            //三种情况
            var filter={
                all:function (list) {
                    return list;
                },
                finish:function (list) {
                    return list.filter(function (item) {
                        return item.ischecked;
                    })
                },
                unfinished:function (list) {
                    return list.filter(function (item) {
                        return !item.ischecked;
                    })
                }
            }
            //找到过滤函数就返回过滤后的数据，没有则返回全部数据
            return filter[this.visibililty]?(list):list;
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

function watch() {//监听hash
    var hash=window.location.hash.slice(1);
    vm.visibililty=hash;
}
watch();
window.addEventListener('hashchange',watch);//当hash改变时执行