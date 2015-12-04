//倒计时 PLCountdown(1451404800000)
PL.Countdown = function (end,sta,i){
	if(!i){
    i = 1
  }
  if(!sta){
    sta = new Date().getTime();
  }
  var t = parseInt(end) - parseInt(sta),
   d=Math.floor(t/1000/60/60/24),
   h=Math.floor(t/1000/60/60%24),
   m=Math.floor(t/1000/60%60),
   s=Math.floor(t/1000%60),
   index = i+1;
  if(t < 0){
    d = h = m = s = '00';
  };
  
  var time = {
    d:d,
    h:h,
    m:m,
    s:s,
    i:index,
    end:end,
    sta:sta
  };
  return time;
};
// Cookie 集合
PL.Cookie = {
  v:function () {
    return "0.0.1";
  },
  get:function (name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
  },
  del:function (name) {
     var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval=PL.Cookie.get(name);
      if(cval!=null)
          document.cookie= name + "="+cval+";expires="+exp.toGMTString();
          
         return name;
  },
  set:function (name,value,time,p) {
    var exp = new Date(),
        path = "/";
    if(p){
      path = p;
    }
    exp.setTime(time);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+"; path=" + path;
    
    return name;
  }
}


/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
使用方法
生成3-32位随机串：randomWord(true, 3, 32)
生成88位随机串：randomWord(false, 88)
*/

PL.randomWord = function (randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}


// 数据方法  获取服务端数据 
PL.getSeverData = function (url,obj,callback) {
    var radNub = PL.randomWord(false, 18);
     $.ajax({
            type: "POST",
            url: url+"?time="+radNub,
            dataType: "json",
            data: obj,
            contentType: "application/json;utf-8",
            timeout: 20000,
            error: function () {
                PL.msg("请求错误");
               
            },
            success: function (data) {
                callback(data);
            }
        });    
}