## 更新日志

> 查看当前页面 引入的 `panli` 组件库版本，
可以 `F12` 打开浏览器 `javascript` 控制台 输入 `PL.v` 就可以查看当前版本


>组件更新地址

```
http://localhost:45419/Panli.Site.Static/Ued/Pc/common/js/
```


## 2015年12月4日 09:49:25

>0.0.13


###　新增封装 ajax 获取数据 getSeverData(url,obj,callback)

>** url ajax 服务器地址

>** obj 传入的 data 数据 是一个对象 在传入前 请先 `JSON.stringify(obj)` 一下

>** callback 回调方法

demo

```
var url = 'http://panli.com',
	obj = {
		name："zan",
		age:"18"
	}
getSeverData(url,JSON.stringify(obj),function(d){
	console.log(d);
})
```

#### 新增 randomWord(randomFlag, min, max) 方法 

>** randomWord 产生任意长度随机字母数字组合

>** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位

>使用方法

>生成3-32位随机串：randomWord(true, 3, 32)

>生成88位随机串：randomWord(false, 88)


```
PL.randomWord(false, 18)
返回一个18位的随机字符串
```


## 2015年12月3日15:30:03

>0.0.12

- 在上一版本扩展属性 的时候 ie8下 有个 bug 解决此bug


## 2015年11月30日 17:45:00

>0.0.11

PL 挂载扩展

#### 倒计时剩余时间
```
PL.Countdown(end,sta,i)

end = "倒计时结束时间"
sta = "开始时间" -> 传入服务器返回的时间
i  = 索引值 默认1 开始
```

#### PL.Cookie 对象

```
PL.Cookie.get(name)

name = '获取Cookie的名字'

PL.Cookie.del(name)

name = '要删除Cookie的名字'


PL.Cookie.set(name,val,time)

val = "cookie 的值";
time = "cookie 的过期时间";

```



### 2015年11月27日12:54:13

>0.0.10

增强 PL.alert("信息文本","按钮文字",{icon: 6})

增加了 `按钮文字` 参数，默认为 确定 ，可以不传

### 2015年11月26日12:52:16

>0.0.9

新增 

> 加载文件函数

```
loadjscssfile(file,type)
```

file -> 文件地址
type -> 文件类型 js or css


### 2015年11月25日14:24:41

>0.0.9

del_Cookie() 错误修复

### 2015年11月23日10:20:54

>0.0.8

更新 谷歌统计代码 
PL.googleCount();