;!function(window, undefined){

    $(function(){



      var getTimeType = 1  //测试场景 1 为线上 2 为本地

      panIfDev(getTimeType); // 初始化场景


      // 活动时间
      function PanDongTime(){
        var starTime = new Date(2015,08,17,00,00,00),
            endTime = new Date(2015,08,22,23,59,59);
        var _time = [starTime,endTime];
        return _time;
      }

      // 测试环境初始化
      function panIfDev(_type){

        var _taday = (new Date()).getTime();

        if(_type == 1){
          // 获取服务器时间回调
          getServerTime(function(data){
              contrastTime(data);

          });
        }else {

          contrastTime(_taday);
        }

      }

      // 时间范围对比
      function contrastTime(_taday){

        var _tadayEnd = getDateEnd(_taday);

        var starTime = PanDongTime()[0].getTime(),
            betTime = _tadayEnd.getTime(),
            endTime = PanDongTime()[1].getTime();


        if(betTime > starTime && betTime < endTime ){
            var indexPanOpen = get_Cookie("indexPanOpen");

            if(!indexPanOpen){
              panInit();
              set_Cookie('indexPanOpen',"1",_tadayEnd);
            }
        }


      };

      function panInit(){
        var str = '<div class="PanAlterWrap">'+
                  '<span class="closePanOpen"></span>'+
                  '<img src="http://sf.panli.com/UED/images/20150927/doing_001.png" alt="" />'+
                  '<a href="http://www.panli.com/Special/shippingsale_201509.html" target="_blank"></a>'+
                  '</div>';

        indexOpen(str);
      }


      function indexOpen(html){
        //页面层-自定义
        Pan.open({
            type: 1,
            title: false,
            closeBtn: false,
            shadeClose: false,
            area: ['680px', '544px'],
            skin: 'layui-layer-nobg', //没有背景色
            content: html
        });

        $(document.body).on("click",'.closePanOpen,.PanAlterWrap a',function(){
            Pan.closeAll();
        })

      }

    })

}(window);
