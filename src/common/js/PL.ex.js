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

