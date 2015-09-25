
;!function(window, undefined){
    "use strict";

    var $, win, ready = {
        getPath: function(){
            var js = document.scripts, script = js[js.length - 1], jsPath = script.src;
            if(script.getAttribute('merge')) return;
            return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
        }(),

        //屏蔽Enter触发弹层
        enter: function(e){
            if(e.keyCode === 13) e.preventDefault();
        },
        config: {}, end: {},
        btn: ['&#x786E;&#x5B9A;','&#x53D6;&#x6D88;'],

        //五种原始层模式
        type: ['dialog', 'page', 'iframe', 'loading', 'tips']
    };

//默认内置方法。
    var Pan = {
        v: '0.1',
        ie6: !!window.ActiveXObject&&!window.XMLHttpRequest,
        index: 0,
        path: ready.getPath,
        config: function(options, fn){
            var item = 0;
            options = options || {};
            Pan.cache = ready.config = $.extend(ready.config, options);
            Pan.path = ready.config.path || Pan.path;
            typeof options.extend === 'string' && (options.extend = [options.extend]);
            Pan.use('skin/layer.css', (options.extend && options.extend.length > 0) ? (function loop(){



                var ext = options.extend;
                Pan.use(ext[ext[item] ? item : item-1], item < ext.length ? function(){
                    ++item;
                    return loop;
                }() : fn);
            }()) : fn);
            return this;
        },

        //载入配件
        use: function(module, fn, readyMethod){


            var i = 0, head = $('head')[0];
            var module = module.replace(/\s/g, '');
            var iscss = /\.css$/.test(module);
            var node = document.createElement(iscss ? 'link' : 'script');
            var id = 'layui_layer_' + module.replace(/\.|\//g, '');
            if(!Pan.path) return;
            if(iscss){
                node.rel = 'stylesheet';
            }
            node[iscss ? 'href' : 'src'] = /^http:\/\//.test(module) ? module : Pan.path + module;
            node.id = id;
            if(!$('#'+ id)[0]){
                head.appendChild(node);
            }


            //轮询加载就绪
            ;(function poll() {
                ;(iscss ? parseInt($('#'+id).css('width')) === 1989 : Pan[readyMethod||id]) ? function(){
                    fn && fn();
                    try { iscss || head.removeChild(node); } catch(e){};
                }() : setTimeout(poll, 100);
            }());
            return this;
        },

        ready: function(path, fn){
            var type = typeof path === 'function';
            if(type) fn = path;
            Pan.config($.extend(ready.config, function(){
                return type ? {} : {path: path};
            }()), fn);
            return this;
        },
        /* 谷歌统计代码 */
        googleCount:function(){
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date(); a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-436090-2', 'auto');ga('require', 'displayfeatures');
            ga('send', 'pageview');
        },
        /* rem 字体转换 */
        remFontSize:function(){
            var fontsize = function () {
                var W = document.body.getBoundingClientRect().width, defaultW = 720, defaultSize = 40;
                W = W > defaultW ? defaultW : W < 320 ? 320 : W;
                window.W = W; document.documentElement.style.fontSize = (W / defaultW * defaultSize).toFixed(2) + 'px';
            };
            var fontset = setTimeout(fontsize, 300);
            window.addEventListener('resize', function () { clearTimeout(fontset); fontset = setTimeout(fontsize, 300) });
            window.addEventListener("DOMContentLoaded", fontsize);
            setTimeout(fontsize, 300);

        },
        //各种快捷引用
        alert: function(content, options, yes){
            var type = typeof options === 'function';
            if(type) yes = options;
            return Pan.open($.extend({
                content: content,
                yes: yes
            }, type ? {} : options));
        },

        confirm: function(content, options, yes, cancel){
            var type = typeof options === 'function';
            if(type){
                cancel = yes;
                yes = options;
            }
            return Pan.open($.extend({
                content: content,
                btn: ready.btn,
                yes: yes,
                cancel: cancel
            }, type ? {} : options));
        },

        msg: function(content, options, end){ //最常用提示层
            var type = typeof options === 'function', rskin = ready.config.skin;
            var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '')||'layui-layer-msg';
            var shift = doms.anim.length - 1;
            if(type) end = options;
            return Pan.open($.extend({
                content: content,
                time: 3000,
                shade: false,
                skin: skin,
                title: false,
                closeBtn: false,
                btn: false,
                end: end
            }, (type && !ready.config.skin) ? {
                skin: skin + ' layui-layer-hui',
                shift: shift
            } : function(){
                options = options || {};
                if(options.icon === -1 || options.icon === undefined && !ready.config.skin){
                    options.skin = skin + ' ' + (options.skin||'layui-layer-hui');
                }
                return options;
            }()));
        },

        load: function(icon, options){
            return Pan.open($.extend({
                type: 3,
                icon: icon || 0,
                shade: 0.01
            }, options));
        },

        tips: function(content, follow, options){
            return Pan.open($.extend({
                type: 4,
                content: [content, follow],
                closeBtn: false,
                time: 3000,
                maxWidth: 210
            }, options));
        }
    };

    var Class = function(setings){
        var that = this;
        that.index = ++Pan.index;
        that.config = $.extend({}, that.config, ready.config, setings);
        that.creat();
    };

    Class.pt = Class.prototype;

//缓存常用字符
    var doms = ['layui-layer', '.layui-layer-title', '.layui-layer-main', '.layui-layer-dialog', 'layui-layer-iframe', 'layui-layer-content', 'layui-layer-btn', 'layui-layer-close'];
    doms.anim = ['layui-anim', 'layui-anim-01', 'layui-anim-02', 'layui-anim-03', 'layui-anim-04', 'layui-anim-05', 'layui-anim-06'];

//默认配置
    Class.pt.config = {
        type: 0,
        shade: 0.3,
        fix: true,
        move: doms[1],
        title: '&#x4FE1;&#x606F;',
        offset: 'auto',
        area: 'auto',
        closeBtn: 1,
        time: 0, //0表示不自动关闭
        zIndex: 19891014,
        maxWidth: 360,
        shift: 0,
        icon: -1,
        scrollbar: true, //是否允许浏览器滚动条
        tips: 2
    };

//容器
    Class.pt.vessel = function(conType, callback){
        var that = this, times = that.index, config = that.config;
        var zIndex = config.zIndex + times, titype = typeof config.title === 'object';
        var ismax = config.maxmin && (config.type === 1 || config.type === 2);
        var titleHTML = (config.title ? '<div class="layui-layer-title" style="'+ (titype ? config.title[1] : '') +'">'
        + (titype ? config.title[0] : config.title)
        + '</div>' : '');

        config.zIndex = zIndex;
        callback([
            //遮罩
            config.shade ? ('<div class="layui-layer-shade" id="layui-layer-shade'+ times +'" times="'+ times +'" style="'+ ('z-index:'+ (zIndex-1) +'; background-color:'+ (config.shade[1]||'#000') +'; opacity:'+ (config.shade[0]||config.shade) +'; filter:alpha(opacity='+ (config.shade[0]*100||config.shade*100) +');') +'"></div>') : '',

            //主体
            '<div class="'+ doms[0] +' '+ (doms.anim[config.shift]||'') + (' layui-layer-'+ready.type[config.type]) + (((config.type == 0 || config.type == 2) && !config.shade) ? ' layui-layer-border' : '') + ' ' + (config.skin||'') +'" id="'+ doms[0] + times +'" type="'+ ready.type[config.type] +'" times="'+ times +'" showtime="'+ config.time +'" conType="'+ (conType ? 'object' : 'string') +'" style="z-index: '+ zIndex +'; width:'+ config.area[0] + ';height:' + config.area[1] + (config.fix ? '' : ';position:absolute;') +'">'
            + (conType && config.type != 2 ? '' : titleHTML)
            +'<div class="layui-layer-content'+ ((config.type == 0 && config.icon !== -1) ? ' layui-layer-padding' :'') + (config.type == 3 ? ' layui-layer-loading'+config.icon : '') +'">'
            + (config.type == 0 && config.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico'+ config.icon +'"></i>' : '')
            + (config.type == 1 && conType ? '' : (config.content||''))
            +'</div>'
            + '<span class="layui-layer-setwin">'+ function(){
                var closebtn = ismax ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : '';
                config.closeBtn && (closebtn += '<a class="layui-layer-ico '+ doms[7] +' '+ doms[7] + (config.title ? config.closeBtn : (config.type == 4 ? '1' : '2')) +'" href="javascript:;"></a>');
                return closebtn;
            }() + '</span>'
            + (config.btn ? function(){
                var button = '';
                typeof config.btn === 'string' && (config.btn = [config.btn]);
                for(var i = 0, len = config.btn.length; i < len; i++){
                    button += '<a class="'+ doms[6] +''+ i +'">'+ config.btn[i] +'</a>'
                }
                return '<div class="'+ doms[6] +'">'+ button +'</div>'
            }() : '')
            +'</div>'
        ], titleHTML);
        return that;
    };

//创建骨架
    Class.pt.creat = function(){
        var that = this, config = that.config, times = that.index, nodeIndex;
        var content = config.content, conType = typeof content === 'object';

        if(typeof config.area === 'string'){
            config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
        }

        switch(config.type){
            case 0:
                config.btn = ('btn' in config) ? config.btn : ready.btn[0];
                Pan.closeAll('dialog');
                break;
            case 2:
                var content = config.content = conType ? config.content : [config.content||'http://sentsin.com?from=Pan', 'auto'];
                config.content = '<iframe scrolling="'+ (config.content[1]||'auto') +'" allowtransparency="true" id="'+ doms[4] +''+ times +'" name="'+ doms[4] +''+ times +'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
                break;
            case 3:
                config.title = false;
                config.closeBtn = false;
                config.icon === -1 && (config.icon === 0);
                Pan.closeAll('loading');
                break;
            case 4:
                conType || (config.content = [config.content, 'body']);
                config.follow = config.content[1];
                config.content = config.content[0] + '<i class="layui-layer-TipsG"></i>';
                config.title = false;
                config.shade = false;
                config.fix = false;
                config.tips = typeof config.tips === 'object' ? config.tips : [config.tips, true];
                config.tipsMore || Pan.closeAll('tips');
                break;
        }

        //建立容器
        that.vessel(conType, function(html, titleHTML){
            $('body').append(html[0]);
            conType ? function(){
                (config.type == 2 || config.type == 4) ? function(){
                    $('body').append(html[1]);
                }() : function(){
                    if(!content.parents('.'+doms[0])[0]){
                        content.show().addClass('layui-layer-wrap').wrap(html[1]);
                        $('#'+ doms[0] + times).find('.'+doms[5]).before(titleHTML);
                    }
                }();
            }() : $('body').append(html[1]);
            that.layero = $('#'+ doms[0] + times);
            config.scrollbar || doms.html.css('overflow', 'hidden').attr('layer-full', times);
        }).auto(times);

        config.type == 2 && Pan.ie6 && that.layero.find('iframe').attr('src', content[0]);
        $(document).off('keydown', ready.enter).on('keydown', ready.enter);

        //坐标自适应浏览器窗口尺寸
        config.type == 4 ? that.tips() : that.offset();
        if(config.fix){
            win.on('resize', function(){
                that.offset();
                (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && that.auto(times);
                config.type == 4 && that.tips();
            });
        }

        config.time <= 0 || setTimeout(function(){
            Pan.close(that.index)
        }, config.time);
        that.move().callback();
    };

//自适应
    Class.pt.auto = function(index){
        var that = this, config = that.config, layero = $('#'+ doms[0] + index);
        if(config.area[0] === '' && config.maxWidth > 0){
            //为了修复IE7下一个让人难以理解的bug
            if(/MSIE 7/.test(navigator.userAgent) && config.btn){
                layero.width(layero.innerWidth());
            }
            layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
        }
        var area = [layero.innerWidth(), layero.innerHeight()];
        var titHeight = layero.find(doms[1]).outerHeight() || 0;
        var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
        function setHeight(elem){
            elem = layero.find(elem);
            elem.height(area[1] - titHeight - btnHeight - 2*(parseFloat(elem.css('padding'))|0));
        }
        switch(config.type){
            case 2:
                setHeight('iframe');
                break;
            default:
                if(config.area[1] === ''){
                    if(config.fix && area[1] >= win.height()){
                        area[1] = win.height();
                        setHeight('.'+doms[5]);
                    }
                } else {
                    setHeight('.'+doms[5]);
                }
                break;
        }
        return that;
    };

//计算坐标
    Class.pt.offset = function(){
        var that = this, config = that.config, layero = that.layero;
        var area = [layero.outerWidth(), layero.outerHeight()];
        var type = typeof config.offset === 'object';
        that.offsetTop = (win.height() - area[1])/2;
        that.offsetLeft = (win.width() - area[0])/2;
        if(type){
            that.offsetTop = config.offset[0];
            that.offsetLeft = config.offset[1]||that.offsetLeft;
        } else if(config.offset !== 'auto'){
            that.offsetTop = config.offset;
            if(config.offset === 'rb'){ //右下角
                that.offsetTop = win.height() - area[1];
                that.offsetLeft = win.width() - area[0];
            }
        }
        if(!config.fix){
            that.offsetTop = /%$/.test(that.offsetTop) ?
            win.height()*parseFloat(that.offsetTop)/100
                : parseFloat(that.offsetTop);
            that.offsetLeft = /%$/.test(that.offsetLeft) ?
            win.width()*parseFloat(that.offsetLeft)/100
                : parseFloat(that.offsetLeft);
            that.offsetTop += win.scrollTop();
            that.offsetLeft += win.scrollLeft();
        }
        layero.css({top: that.offsetTop, left: that.offsetLeft});
    };

//Tips
    Class.pt.tips = function(){
        var that = this, config = that.config, layero = that.layero;
        var layArea = [layero.outerWidth(), layero.outerHeight()], follow = $(config.follow);
        if(!follow[0]) follow = $('body');
        var goal = {
            width: follow.outerWidth(),
            height: follow.outerHeight(),
            top: follow.offset().top,
            left: follow.offset().left
        }, tipsG = layero.find('.layui-layer-TipsG');

        var guide = config.tips[0];
        config.tips[1] || tipsG.remove();

        goal.autoLeft = function(){
            if(goal.left + layArea[0] - win.width() > 0){
                goal.tipLeft = goal.left + goal.width - layArea[0];
                tipsG.css({right: 12, left: 'auto'});
            } else {
                goal.tipLeft = goal.left;
            };
        };

        //辨别tips的方位
        goal.where = [function(){ //上
            goal.autoLeft();
            goal.tipTop = goal.top - layArea[1] - 10;
            tipsG.removeClass('layui-layer-TipsB').addClass('layui-layer-TipsT').css('border-right-color', config.tips[1]);
        }, function(){ //右
            goal.tipLeft = goal.left + goal.width + 10;
            goal.tipTop = goal.top;
            tipsG.removeClass('layui-layer-TipsL').addClass('layui-layer-TipsR').css('border-bottom-color', config.tips[1]);
        }, function(){ //下
            goal.autoLeft();
            goal.tipTop = goal.top + goal.height + 10;
            tipsG.removeClass('layui-layer-TipsT').addClass('layui-layer-TipsB').css('border-right-color', config.tips[1]);
        }, function(){ //左
            goal.tipLeft = goal.left - layArea[0] - 10;
            goal.tipTop = goal.top;
            tipsG.removeClass('layui-layer-TipsR').addClass('layui-layer-TipsL').css('border-bottom-color', config.tips[1]);
        }];
        goal.where[guide-1]();

        /* 8*2为小三角形占据的空间 */
        if(guide === 1){
            goal.top - (win.scrollTop() + layArea[1] + 8*2) < 0 && goal.where[2]();
        } else if(guide === 2){
            win.width() - (goal.left + goal.width + layArea[0] + 8*2) > 0 || goal.where[3]()
        } else if(guide === 3){
            (goal.top - win.scrollTop() + goal.height + layArea[1] + 8*2) - win.height() > 0 && goal.where[0]();
        } else if(guide === 4){
            layArea[0] + 8*2 - goal.left > 0 && goal.where[1]()
        }

        layero.find('.'+doms[5]).css({
            'background-color': config.tips[1],
            'padding-right': (config.closeBtn ? '30px' : '')
        });
        layero.css({left: goal.tipLeft, top: goal.tipTop});
    }

//拖拽层
    Class.pt.move = function(){
        var that = this, config = that.config, conf = {
            setY: 0,
            moveLayer: function(){
                var layero = conf.layero, mgleft = parseInt(layero.css('margin-left'));
                var lefts = parseInt(conf.move.css('left'));
                mgleft === 0 || (lefts = lefts - mgleft);
                if(layero.css('position') !== 'fixed'){
                    lefts = lefts - layero.parent().offset().left;
                    conf.setY = 0;
                }
                layero.css({left: lefts, top: parseInt(conf.move.css('top')) - conf.setY});
            }
        };

        var movedom = that.layero.find(config.move);
        config.move && movedom.attr('move', 'ok');
        movedom.css({cursor: config.move ? 'move' : 'auto'});

        $(config.move).on('mousedown', function(M){
            M.preventDefault();
            if($(this).attr('move') === 'ok'){
                conf.ismove = true;
                conf.layero = $(this).parents('.'+ doms[0]);
                var xx = conf.layero.offset().left, yy = conf.layero.offset().top, ww = conf.layero.outerWidth() - 6, hh = conf.layero.outerHeight() - 6;
                if(!$('#layui-layer-moves')[0]){
                    $('body').append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:'+ xx +'px; top:'+ yy +'px; width:'+ ww +'px; height:'+ hh +'px; z-index:2147483584"></div>');
                }
                conf.move = $('#layui-layer-moves');
                config.moveType && conf.move.css({visibility: 'hidden'});

                conf.moveX = M.pageX - conf.move.position().left;
                conf.moveY = M.pageY - conf.move.position().top;
                conf.layero.css('position') !== 'fixed' || (conf.setY = win.scrollTop());
            }
        });

        $(document).mousemove(function(M){
            if(conf.ismove){
                var offsetX = M.pageX - conf.moveX, offsetY = M.pageY - conf.moveY;
                M.preventDefault();

                //控制元素不被拖出窗口外
                if(!config.moveOut){
                    conf.setY = win.scrollTop();
                    var setRig = win.width() - conf.move.outerWidth(), setTop = conf.setY;
                    offsetX < 0 && (offsetX = 0);
                    offsetX > setRig && (offsetX = setRig);
                    offsetY < setTop && (offsetY = setTop);
                    offsetY > win.height() - conf.move.outerHeight() + conf.setY && (offsetY = win.height() - conf.move.outerHeight() + conf.setY);
                }

                conf.move.css({left: offsetX, top: offsetY});
                config.moveType && conf.moveLayer();

                offsetX = offsetY = setRig = setTop = null;
            }
        }).mouseup(function(){
            try{
                if(conf.ismove){
                    conf.moveLayer();
                    conf.move.remove();
                    config.moveEnd && config.moveEnd();
                }
                conf.ismove = false;
            }catch(e){
                conf.ismove = false;
            }
        });
        return that;
    };

    Class.pt.callback = function(){
        var that = this, layero = that.layero, config = that.config;
        that.openLayer();
        if(config.success){
            if(config.type == 2){
                layero.find('iframe')[0].onload = function(){
                    this.className = '';
                    config.success(layero, that.index);
                };
            } else {
                config.success(layero, that.index);
            }
        }
        Pan.ie6 && that.IE6(layero);

        //按钮
        layero.find('.'+ doms[6]).children('a').on('click', function(){
            var index = $(this).index();
            config['btn'+(index+1)] && config['btn'+(index+1)](that.index, layero);
            if(index === 0){
                config.yes ? config.yes(that.index, layero) : Pan.close(that.index);
            } else if(index === 1){
                cancel();
            } else {
                config['btn'+(index+1)] || Pan.close(that.index);
            }
        });

        //取消
        function cancel(){
            var close = config.cancel && config.cancel(that.index);
            close === false || Pan.close(that.index);
        }

        //右上角关闭回调
        layero.find('.'+ doms[7]).on('click', cancel);

        //点遮罩关闭
        if(config.shadeClose){
            $('#layui-layer-shade'+ that.index).on('click', function(){
                Pan.close(that.index);
            });
        }

        //最小化
        layero.find('.layui-layer-min').on('click', function(){
            Pan.min(that.index, config);
            config.min && config.min(layero);
        });

        //全屏/还原
        layero.find('.layui-layer-max').on('click', function(){
            if($(this).hasClass('layui-layer-maxmin')){
                Pan.restore(that.index);
                config.restore && config.restore(layero);
            } else {
                Pan.full(that.index, config);
                config.full && config.full(layero);
            }
        });

        config.end && (ready.end[that.index] = config.end);
    };

//for ie6 恢复select
    ready.reselect = function(){
        $.each($('select'), function(index , value){
            var sthis = $(this);
            if(!sthis.parents('.'+doms[0])[0]){
                (sthis.attr('pan') == 1 && $('.'+doms[0]).length < 1) && sthis.removeAttr('pan').show();
            }
            sthis = null;
        });
    };

    Class.pt.IE6 = function(layero){
        var that = this, _ieTop = layero.offset().top;

        //ie6的固定与相对定位
        function ie6Fix(){
            layero.css({top : _ieTop + (that.config.fix ? win.scrollTop() : 0)});
        };
        ie6Fix();
        win.scroll(ie6Fix);

        //隐藏select
        $('select').each(function(index , value){
            var sthis = $(this);
            if(!sthis.parents('.'+doms[0])[0]){
                sthis.css('display') === 'none' || sthis.attr({'pan' : '1'}).hide();
            }
            sthis = null;
        });
    };

//需依赖原型的对外方法
    Class.pt.openLayer = function(){
        var that = this;

        //置顶当前窗口
        Pan.zIndex = that.config.zIndex;
        Pan.setTop = function(layero){
            var setZindex = function(){
                Pan.zIndex++;
                layero.css('z-index', Pan.zIndex + 1);
            };
            Pan.zIndex = parseInt(layero[0].style.zIndex);
            layero.on('mousedown', setZindex);
            return Pan.zIndex;
        };
    };

    ready.record = function(layero){
        var area = [
            layero.outerWidth(),
            layero.outerHeight(),
            layero.position().top,
            layero.position().left + parseFloat(layero.css('margin-left'))
        ];
        layero.find('.layui-layer-max').addClass('layui-layer-maxmin');
        layero.attr({area: area});
    };

    ready.rescollbar = function(index){
        if(doms.html.attr('layer-full') == index){
            if(doms.html[0].style.removeProperty){
                doms.html[0].style.removeProperty('overflow');
            } else {
                doms.html[0].style.removeAttribute('overflow');
            }
            doms.html.removeAttr('layer-full');
        }
    };

    /*! 内置成员 */

//获取子iframe的DOM
    Pan.getChildFrame = function(selector, index){
        index = index || $('.'+doms[4]).attr('times');
        return $('#'+ doms[0] + index).find('iframe').contents().find(selector);
    };

//得到当前iframe层的索引，子iframe时使用
    Pan.getFrameIndex = function(name){
        return $('#'+ name).parents('.'+doms[4]).attr('times');
    };

//iframe层自适应宽高
    Pan.iframeAuto = function(index){
        if(!index) return;
        var heg = Pan.getChildFrame('body', index).outerHeight();
        var layero = $('#'+ doms[0] + index);
        var titHeight = layero.find(doms[1]).outerHeight() || 0;
        var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
        layero.css({height: heg + titHeight + btnHeight});
        layero.find('iframe').css({height: heg});
    };

//重置iframe url
    Pan.iframeSrc = function(index, url){
        $('#'+ doms[0] + index).find('iframe').attr('src', url);
    };

//设定层的样式
    Pan.style = function(index, options){
        var layero = $('#'+ doms[0] + index), type = layero.attr('type');
        var titHeight = layero.find(doms[1]).outerHeight() || 0;
        var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
        if(type === ready.type[1] || type === ready.type[2]){
            layero.css(options);
            if(type === ready.type[2]){
                layero.find('iframe').css({
                    height: parseFloat(options.height) - titHeight - btnHeight
                });
            }
        }
    };

//最小化
    Pan.min = function(index, options){
        var layero = $('#'+ doms[0] + index);
        var titHeight = layero.find(doms[1]).outerHeight() || 0;
        ready.record(layero);
        Pan.style(index, {width: 180, height: titHeight, overflow: 'hidden'});
        layero.find('.layui-layer-min').hide();
        layero.attr('type') === 'page' && layero.find(doms[4]).hide();
        ready.rescollbar(index);
    };

//还原
    Pan.restore = function(index){
        var layero = $('#'+ doms[0] + index), area = layero.attr('area').split(',');
        var type = layero.attr('type');
        Pan.style(index, {
            width: parseFloat(area[0]),
            height: parseFloat(area[1]),
            top: parseFloat(area[2]),
            left: parseFloat(area[3]),
            overflow: 'visible'
        });
        layero.find('.layui-layer-max').removeClass('layui-layer-maxmin');
        layero.find('.layui-layer-min').show();
        layero.attr('type') === 'page' && layero.find(doms[4]).show();
        ready.rescollbar(index);
    };

//全屏
    Pan.full = function(index){
        var layero = $('#'+ doms[0] + index), timer;
        ready.record(layero);
        if(!doms.html.attr('layer-full')){
            doms.html.css('overflow','hidden').attr('layer-full', index);
        }
        clearTimeout(timer);
        timer = setTimeout(function(){
            var isfix = layero.css('position') === 'fixed';
            Pan.style(index, {
                top: isfix ? 0 : win.scrollTop(),
                left: isfix ? 0 : win.scrollLeft(),
                width: win.width(),
                height: win.height()
            });
            layero.find('.layui-layer-min').hide();
        }, 100);
    };

//改变title
    Pan.title = function(name, index){
        var title = $('#'+ doms[0] + (index||Pan.index)).find(doms[1]);
        title.html(name);
    };

//关闭layer总方法
    Pan.close = function(index){
        var layero = $('#'+ doms[0] + index), type = layero.attr('type');
        if(!layero[0]) return;
        if(type === ready.type[1] && layero.attr('conType') === 'object'){
            layero.children(':not(.'+ doms[5] +')').remove();
            for(var i = 0; i < 2; i++){
                layero.find('.layui-layer-wrap').unwrap().hide();
            }
        } else {
            //低版本IE 回收 iframe
            if(type === ready.type[2]){
                try {
                    var iframe = $('#'+doms[4]+index)[0];
                    iframe.contentWindow.document.write('');
                    iframe.contentWindow.close();
                    layero.find('.'+doms[5])[0].removeChild(iframe);
                } catch(e){}
            }
            layero[0].innerHTML = '';
            layero.remove();
        }
        $('#layui-layer-moves, #layui-layer-shade' + index).remove();
        Pan.ie6 && ready.reselect();
        ready.rescollbar(index);
        $(document).off('keydown', ready.enter);
        typeof ready.end[index] === 'function' && ready.end[index]();
        delete ready.end[index];
    };

//关闭所有层
    Pan.closeAll = function(type){
        $.each($('.'+doms[0]), function(){
            var othis = $(this);
            var is = type ? (othis.attr('type') === type) : 1;
            is && Pan.close(othis.attr('times'));
            is = null;
        });
    };

//主入口
    ready.run = function(){
        $ = jQuery;
        win = $(window);
        doms.html = $('html');
        Pan.open = function(deliver){
            var o = new Class(deliver);
            return o.index;
        };
    };

    'function' === typeof define ? define(function(){
        ready.run();
        return Pan;
    }) : function(){
        window.Pan = Pan;
        ready.run();
        Pan.use('skin/layer.css');
    }();

}(window);

/*
* 判断是否是pc
* */

function is_pc(){
    var os = new Array("Android","iPhone","Windows Phone","iPod","BlackBerry","MeeGo","SymbianOS");  // 其他类型的移动操作系统类型，自行添加
    var info = navigator.userAgent;
    var len = os.length;
    for (var i = 0; i < len; i++) {
        if (info.indexOf(os[i]) > 0){
            return false;
        }
    }
    return true;
};

// 获取服务器时间
function getServerTime(callback){
  $.ajax({
       type: "POST",
       cache: false,
       async: false,
       url: "/App_Services/wsDefault.asmx/GetDateTime",
       dataType: "json",
       contentType: "application/json;utf-8",
       timeout: 10000,
       error: function () {
       },
       success: function (data) {
           if(data){
             callback(parseInt(data.d));
           }
       }
    });
}

function get_Cookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};
function del_Cookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
};

function set_Cookie(name,value,time)
{

    var exp = new Date();
    exp.setTime(time);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
};
function getsec(str)
{

    var str1=str.substring(1,str.length)*1;
    var str2=str.substring(0,1);
    if (str2=="s")
    {
        return str1*1000;
    }
    else if (str2=="h")
    {
        return str1*60*60*1000;
    }
    else if (str2=="d")
    {
        return str1*24*60*60*1000;
    }
};
// 今日 结束时间
function getDateEnd(date) {
    var _date = new Date(date);
    var year = _date.getFullYear(),
       month = _date.getMonth(),
       day = _date.getDate();
    return new Date(year, month, day, 23, 59, 59);
}
//这是有设定过期时间的使用示例：
//s20是代表20秒
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30




//var username=document.cookie.split(";")[0].split("=")[1];
////JS操作cookies方法!
////写cookies
//function setCookie(name,value)
//{
//    var Days = 30;
//    var exp = new Date();
//    exp.setTime(exp.getTime() + Days*24*60*60*1000);
//    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
//}
/*  myDate.getYear();        //获取当前年份(2位)
 myDate.getFullYear();    //获取完整的年份(4位,1970-????)
 myDate.getMonth();       //获取当前月份(0-11,0代表1月)
 myDate.getDate();        //获取当前日(1-31)
 myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
 myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
 myDate.getHours();       //获取当前小时数(0-23)
 myDate.getMinutes();     //获取当前分钟数(0-59)
 myDate.getSeconds();     //获取当前秒数(0-59)
 myDate.getMilliseconds();    //获取当前毫秒数(0-999)
 myDate.toLocaleDateString();     //获取当前日期
 var mytime=myDate.toLocaleTimeString();     //获取当前时间
 myDate.toLocaleString( );        //获取日期与时间*/

function removeEle(removeObj) {
    removeObj.parentNode.removeChild(removeObj);
};


/**
 * Created by Administrator on 2015/9/11.
 */
/*
* 2015年9月14日15:29:04
* 首页弹出框
* */
