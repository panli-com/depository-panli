## PanLi 组件库 

*9/19/2015 2:11:31 PM *

> //信息框-例1


    PL.alert('你好 panli', {icon: 6});



> 增强 信息框-例1
```
 PL.alert('信息文本','按钮文字',{icon: 6})
```

---

> //信息框-例2


    PL.confirm('你确定要删除吗？', {icon: 3}, function	(index){
    	PL.close(index);
    	alert('删除成功');
    });



> //信息框-例3


    PL.msg('默认消息');



> //信息框-例4


    PL.msg('不开心。。', {icon: 5});



> //信息框-例4


    PL.msg('玩命炫酷', function(){
    	//关闭后的操作
    });



> //页面层-自定义


    PL.open({
	    type: 1,
	    title: false,
	    closeBtn: false,
	    shadeClose: true,
	    skin: 'yourclass',
	    content: '自定义HTML内容'
    });



> //页面层-佟丽娅


    PL.open({
	    type: 1,
	    title: false,
	    closeBtn: false,
	    area: '516px',
	    skin: 'layui-Pan-nobg', //没有背景色
	    shadeClose: true,
	    content: $('#tong')
    });



> //iframe层-父子操作


    PL.open({
	    type: 2,
	    area: ['700px', '530px'],
	    fix: false, //不固定
	    maxmin: true,
	    content: 'test/iframe.html'
    });
    


> //iframe层-多媒体


    PL.open({
	    type: 2,
	    title: false,
	    area: ['630px', '360px'],
	    shade: 0.8,
	    closeBtn: false,
	    shadeClose: true,
	    content: 'http://pPL.youku.com/embed/XMjY3MzgzODg0'
    });


PL.msg('点击遮罩任意处关闭');



> //iframe层-禁滚动条


    PL.open({
	    type: 2,
	    area: ['360px', '500px'],
	    skin: 'layui-Pan-rim', //加上边框
	    content: ['http://PanLi.com', 'no']
    });



> //加载层-默认风格


    PL.load();


> //此处演示关闭


    setTimeout(function(){
    	PL.closeAll('loading');
    }, 2000);



> //加载层-风格2


    PL.load(1);


> //此处演示关闭


    setTimeout(function(){
    	PL.closeAll('loading');
    }, 2000);



> //加载层-风格3


    PL.load(2);
    

//此处演示关闭


    setTimeout(function(){
    	PL.closeAll('loading');
    }, 2000);
    


> //加载层-风格4


    PL.msg('加载中', {icon: 16});



> //打酱油


    PL.msg('尼玛，打个酱油', {icon: 4});



> //tips层-上


    PL.tips('上', '#id或者.class', {
    	tips: [1, '#0FA6D8'] //还可配置颜色
    });



> //tips层-右


    PL.tips('默认就是向右的', '#id或者.class');



> //tips层-下


    PL.tips('下', '#id或者.class', {
    	tips: 2
    });



> //tips层-左


    PL.tips('左边么么哒', '#id或者.class', {
    	tips: [4, '#78BA32']
    });



> //tips层-不销毁之前的


    PL.tips('不销毁之前的', '#id或者.class', {
    	tipsMore: true
    });
    


> //默认prompt


    PL.prompt(function(val){
    	PL.msg('得到了'+val);
    });



> //屏蔽浏览器滚动条


    PL.open({
    	content: '浏览器滚动条已锁',
    	scrollbar: false
    });



> //弹出即全屏


    var index = PL.open({
    	type: 2,
    	content: 'http://www.panli.com',
    	area: ['300px', '195px'],
    	maxmin: true
    });
    PL.full(index);



> //正上方


    PL.msg('灵活运用offset', {
    	offset: 0,
    	shift: 6
    });



### 更新日志

[查看更新日志](./up.md)