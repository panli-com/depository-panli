## 更新日志

> 查看当前页面 引入的 `panli` 组件库版本，
可以 `F12` 打开浏览器 `javascript` 控制台 输入 `PL.v` 就可以查看当前版本

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