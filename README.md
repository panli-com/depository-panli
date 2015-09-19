## PanLi 组件库

//信息框-例1
Pan.alert('见到你真的很高兴', {icon: 6});



//信息框-例2
Pan.confirm('你确定你很帅么？', {icon: 3}, function(index){
    Pan.close(index);
    alert('自恋狂');
});



//信息框-例3
Pan.msg('这是最常用的吧');



//信息框-例4
Pan.msg('不开心。。', {icon: 5});



//信息框-例4
Pan.msg('玩命卖萌中', function(){
//关闭后的操作
});



//页面层-自定义
Pan.open({
    type: 1,
    title: false,
    closeBtn: false,
    shadeClose: true,
    skin: 'yourclass',
    content: '自定义HTML内容'
});



//页面层-佟丽娅
Pan.open({
    type: 1,
    title: false,
    closeBtn: false,
    area: '516px',
    skin: 'layui-Pan-nobg', //没有背景色
    shadeClose: true,
    content: $('#tong')
});



//iframe层-父子操作
Pan.open({
    type: 2,
    area: ['700px', '530px'],
    fix: false, //不固定
    maxmin: true,
    content: 'test/iframe.html'
});



//iframe层-多媒体
Pan.open({
    type: 2,
    title: false,
    area: ['630px', '360px'],
    shade: 0.8,
    closeBtn: false,
    shadeClose: true,
    content: 'http://pPan.youku.com/embed/XMjY3MzgzODg0'
});
Pan.msg('点击遮罩任意处关闭');



//iframe层-禁滚动条
Pan.open({
    type: 2,
    area: ['360px', '500px'],
    skin: 'layui-Pan-rim', //加上边框
    content: ['http://PanLi.com', 'no']
});



//加载层-默认风格
Pan.load();
//此处演示关闭
setTimeout(function(){
    Pan.closeAll('loading');
}, 2000);



//加载层-风格2
Pan.load(1);
//此处演示关闭
setTimeout(function(){
    Pan.closeAll('loading');
}, 2000);



//加载层-风格3
Pan.load(2);
//此处演示关闭
setTimeout(function(){
    Pan.closeAll('loading');
}, 2000);



//加载层-风格4
Pan.msg('加载中', {icon: 16});



//打酱油
Pan.msg('尼玛，打个酱油', {icon: 4});



//tips层-上
Pan.tips('上', '#id或者.class', {
    tips: [1, '#0FA6D8'] //还可配置颜色
});



//tips层-右
Pan.tips('默认就是向右的', '#id或者.class');



//tips层-下
Pan.tips('下', '#id或者.class', {
    tips: 2
});



//tips层-左
Pan.tips('左边么么哒', '#id或者.class', {
    tips: [4, '#78BA32']
});



//tips层-不销毁之前的
Pan.tips('不销毁之前的', '#id或者.class', {
    tipsMore: true
});



//默认prompt
Pan.prompt(function(val){
    Pan.msg('得到了'+val);
});



//屏蔽浏览器滚动条
Pan.open({
    content: '浏览器滚动条已锁',
    scrollbar: false
});



//弹出即全屏
var index = Pan.open({
    type: 2,
    content: 'http://www.panli.com',
    area: ['300px', '195px'],
    maxmin: true
});
Pan.full(index);



//正上方
Pan.msg('灵活运用offset', {
    offset: 0,
    shift: 6
});



//还该列举什么呢
Pan.msg('等我想想…');
