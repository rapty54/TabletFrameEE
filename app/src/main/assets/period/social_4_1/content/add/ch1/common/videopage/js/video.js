var marking;
var mc;
var sp = 0;
var settime;
var sync;

var videoPlayer;

videoPlayer = function(elem) {
    var self = this;
    this.wrap = elem;

    this.init = function() {
        elem.html('');
        self.makeVideo();

        self.vdowrap = self.wrap.find('.vdo-wrap');
        self.ctrwrap = self.wrap.find('.control-wrap');

        self.video = self.vdowrap.find('video');
        self.playbtn = self.vdowrap.find('.play');
        self.endbtn = self.vdowrap.find('.videoend');
        self.c_play = self.ctrwrap.find('.play');
        self.c_pause = self.ctrwrap.find('.pause');
        self.c_replay = self.ctrwrap.find('.replay');
        self.c_role = self.ctrwrap.find('.role');
        self.c_stop = self.ctrwrap.find('.stop');
        self.fullbtn = self.wrap.find('.f_icon');
        self.tvideo = self.ctrwrap.find('video');

        self.currentTime = self.ctrwrap.find('.currentTime');

        self.move_pr = false;
        self.p_bar = self.ctrwrap.find('.progress');
        self.progressBar = self.ctrwrap.find('.progress span');

        self.move_vol = false;
        self.s_wrap = self.ctrwrap.find('.s-con');
        self.s_icon = self.s_wrap.find('.s_icon');
        self.s_bar = self.s_wrap.find('.sound');

        self.scriptbtn = self.ctrwrap.find('.script');

        self.tooltip = self.ctrwrap.find('.tooltip');

        if (!self.src) self.src = '../../common/videopage/mp4/dummy.mp4';

        self.markerbox = false;
        self.replayMode = false;
        self.tabbox = false;
        self.replayA = 0;
        self.replayB = 0;
        //Load
        self.video.attr('src', self.src);
        self.tvideo.attr('src', self.src);
        self.vdoLoad();
        self.rate();

        //Event
        self.playbtn.on('click', self.play);
        self.c_play.on('click', self.play);
        self.endbtn.on('click', self.stop);
        self.c_stop.on('click', self.stop);
        self.c_replay.on('click', self.replay);
        // self.c_role.on('click', self.roleplayMode); //04.12 하단 롤플레이 모드
        self.c_pause.on('click', self.pause)
        self.s_bar.on('mousedown mousemove mouseup', self.soundControl);
        self.p_bar.on('mousedown mousemove mouseup', self.progressControl);
        self.p_bar.on('mousemove mouseout', self.tooltipVideo);
        self.fullbtn.on('click', self.fullScrren)

        self.s_icon.on('click', function() {
            if ($(this).hasClass('mute')) {
                $(this).removeClass('mute')
                self.video[0].muted = false;
                self.video[0].volume = 0.5;
                self.s_bar.find('span').width('50%');
            } else {
                $(this).addClass('mute')
                self.video[0].muted = true;
                self.video[0].volume = 0;
                self.s_bar.find('span').width('0');
            }
        });

        self.video.on('click',function(){
            if(self.video[0].paused){
                self.play();
            }else{
                self.pause();
            }
        });

        self.video.on('ended', self.ended);
    }

    this.vdoLoad = function() {
        var totalTime = self.ctrwrap.find('.totalTime');

        self.video[0].load();
        self.tvideo[0].load();
        self.video.on('loadeddata', function() {
            self.timeTxt(Math.floor(self.video[0].duration), totalTime);
            videoTime = Math.floor(self.video[0].duration);
        });

        self.video[0].playbackRate = 1;

        self.vdowrap.find('.script-wrap').hide();
        self.vdowrap.find('.script-wrap').html('');
        self.endbtn.hide();
    }

    this.play = function() {
        self.playbtn.hide();
        self.endbtn.hide();
        self.c_play.hide();
        self.c_pause.show();
        self.video[0].play()
        self.ctrwrap.find('.r-box').hide();
        self.video[0].playbackRate = self.ctrwrap.find('.r-btn').html();
        self.id = window.requestAnimationFrame(self.render);
    }

    this.pause = function() {
        if(!elem.hasClass('adomode')){
            self.playbtn.show();
        }
        self.c_play.show();
        self.c_pause.hide();
        self.video[0].pause();
        window.cancelAnimationFrame(self.id);
    }

    this.ended = function() {
        if(!elem.hasClass('adomode')){
            self.playbtn.show();
        }
        self.endbtn.show();
        self.c_play.show();
        self.c_pause.hide();
        self.video[0].pause();
        if(self.tabbox) self.vdowrap.find('.tab').removeClass('on');
        self.cancelRoleplayMode();
        window.cancelAnimationFrame(self.id);
    }

    this.stop = function() {
        self.video[0].currentTime = 0;
        self.currentTime.html('00:00');
        self.progressBar.width('0')
        self.vdowrap.find('.script-wrap').html('');
        self.pause();
        if(self.tabbox) self.vdowrap.find('.tab').removeClass('on');
        self.cancelRoleplayMode();
        self.video.load();
    }

    this.replay = function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            self.video.removeAttr('loop');
        }else{
            $(this).addClass('on');
            self.video.attr('loop','true');
        }
    }

    //04.12 하단 플레이 모드
    // this.roleplayMode = function(){
    //     if(self.c_role.hasClass('ab')){
    //         self.cancelRoleplayMode();
    //         return false;
    //     }

    //     if(self.c_role.hasClass('a')){
    //         self.c_role.removeClass('a');
    //         self.c_role.addClass('ab');
    //         self.p_bar.append('<div class="replay_b"></div>');
    //         self.replayMode = true;
    //         self.replayB = self.video[0].currentTime;
    //         var l = (self.replayB / self.video[0].duration) * 100;
    //         self.p_bar.find('.replay_b').css('left',l+'%');
    //         if(self.replayA > self.replayB ){
    //             var a = self.replayA;
    //             var b = self.replayB;
    //             self.replayA = b;
    //             self.replayB = a;
    //         }
    //         return false;
    //     }
    //     self.c_role.addClass('a');
    //     self.p_bar.append('<div class="replay_a"></div>');
    //     self.replayA = self.video[0].currentTime;
    //     var l = (self.replayA / self.video[0].duration) * 100;
    //     self.p_bar.find('.replay_a').css('left',l+'%');
    // }

    this.roleplayMode = function(elem,time){
        var idx = elem.parent().index();
        var t = time;

        if(elem.parent().hasClass('on')){
            if(elem.hasClass('on')){
                //구간 반복 Off
                self.cancelRoleplayMode();
            }else{
                //구간 반복 On
                elem.addClass('on'); 
                self.replayA = t[idx];
                if(t[idx+1]) self.replayB = t[idx+1];
                else self.replayB = self.video[0].duration - 0.1;
                self.replayMode = true;

                self.c_replay.removeClass('on');
                self.video.removeAttr('loop');
            }
        }else{
            self.cancelRoleplayMode();
            self.video[0].currentTime = elem.parent().attr('data-time');
            self.play();

            elem.addClass('on'); 
            self.replayA = t[idx];
            if(t[idx+1]) self.replayB = t[idx+1];
            else self.replayB = self.video[0].duration - 0.1;
            self.replayMode = true;

            self.c_replay.removeClass('on');
            self.video.removeAttr('loop');
        }
    }

    this.cancelRoleplayMode = function(){
        self.vdowrap.find('.rolemode').removeClass('on');
        self.replayMode = false;
        self.replayA = 0;
        self.replayB = 0;
    }

    this.soundControl = function(e) {
        var s_wid = self.s_bar.width();
        var zoom = FORTEACHERCD.responsive.baseContainerSize.zoom;
        var volume = ((e.pageX - self.s_bar.offset().left) / zoom) / s_wid * 100;
        var scale = Number(self.wrap.css('transform').split(',')[3]);
        if(!scale) scale = 1;
        volume = volume / scale;

        function volumeC() {
            if (volume < 1) {
                self.s_icon.addClass('mute')
                self.video[0].muted = true;
                self.video[0].volume = 0;
                self.s_bar.find('span').width('0')
            } else {
                self.s_icon.removeClass('mute')
                self.video[0].muted = false;
                self.video[0].volume = volume / 100;
                self.s_bar.find('span').width(volume + '%')
            }
        }

        switch (e.type) {
            case 'mousedown':
                self.move_vol = true;
                volumeC();
                break;
            case 'mousemove':
                if (self.move_vol) volumeC();
                break;
            case 'mouseup':
                if (self.move_vol) {
                    self.move_vol = false;
                    volumeC();
                }
                break;
            case 'mouseleave':
                self.move_vol = false;
                break;
        }
    }
    this.timeout;
    this.tooltipVideo = function(e){
        var p_wid = self.p_bar.width();
        var zoom = FORTEACHERCD.responsive.baseContainerSize.zoom;
        var playbar = ((e.pageX - self.p_bar.offset().left) / zoom) / p_wid * 100;
        var pro_time = self.video[0].duration * playbar / 100;
        var scale = Number(self.wrap.css('transform').split(',')[3]);
        if(!scale) scale = 1;
        playbar = playbar / scale;
        self.tooltip.hide();
        if (self.timeout !== undefined) {
            window.clearTimeout(self.timeout);
        }

        self.tvideo[0].currentTime = Number(pro_time);
        self.timeout = window.setTimeout(function () {
            self.tooltip.show();
            var left = (e.pageX - self.p_bar.offset().left) / zoom;
            if(!scale) scale = 1;
            left = left / scale;
            self.tooltip.css('left',left+'px');
            if(e.type == 'mouseout'){
                self.tooltip.hide();
            }
        }, 400);
    }

    this.progressControl = function(e) {
        var p_wid = self.p_bar.width();
        var zoom = FORTEACHERCD.responsive.baseContainerSize.zoom;
        var playbar = ((e.pageX - self.p_bar.offset().left) / zoom) / p_wid * 100;

        function pro_C() {
            var scale = Number(self.wrap.css('transform').split(',')[3]);
            if(!scale) scale = 1;
            playbar = playbar / scale;
            var pro_time = self.video[0].duration * playbar / 100;
            if(self.replayMode){
                if(Number(pro_time) < self.replayA || Number(pro_time) > self.replayB){
                    return false;  
                } 
            }
            self.video[0].currentTime = Number(pro_time);
            self.timeTxt(self.video[0].currentTime, self.currentTime);
            if (playbar < 1) {
                self.progressBar.width('0%');
            } else if (playbar > 99) {
                self.progressBar.width('100%');
            } else {
                self.progressBar.width(playbar + '%')
            }

            if(self.tabbox){
                self.moveTab(Number(pro_time));
            }
        }
        switch (e.type) {
            case 'mousedown':
                self.move_pr = true;
                pro_C();
                break;
            case 'mousemove':
                if (self.move_pr) pro_C();
                break;
            case 'mouseup':
                if (self.move_pr) {
                    pro_C();
                    self.move_pr = false;
                }
                break;
            case 'mouseleave':
                self.move_pr = false;
                break;
        }
    }

    this.makeVideo = function() {
        var html = '' +
            '<div class="vdo-wrap">' +
            '<video id="notevdo" src="">' +
            '<track src="" kind="metadata" default="default"/>' +
            '</video>' +
            '<button class="play"></button>' +
            '<button class="videoend"></button>' +
            '</div>' +
            '<div class="control-wrap">' +
            '<div class="p-con">' +
            '<button class="play"></button>' +
            '<button class="pause"></button>' +
            '</div>' +
            '<button class="stop"></button>' +
            '<button class="replay"></button>' +
            '<button class="role"></button>' +
            '<div class="c-con">' +
            '<div class="progress">' +
            '<span></span>' +
            '<div class="tooltip">' +
            '<video id="tooltipVideo" src=""></video>' +
            '<div class="tooltipTime"></div>' +
            '</div>' +
            '</div>' +
            '<div class="time">' +
            '<div class="currentTime">00:00</div>' +
            '<div class="totalTime">00:00</div>' +
            '</div>' +
            '</div>' +
            '<button class="btn script"><div class="icon"></div>자막</button>' +
            '<div class="r-con">' +
            '<div class="btn r-btn">1.0</div>' +
            '<div class="r-box">' +
            '<div class="btn">0.5</div>' +
            '<div class="btn">0.7</div>' +
            '<div class="btn on">1.0</div>' +
            '<div class="btn">1.2</div>' +
            '<div class="btn">1.5</div>' +
            '<div class="btn">2.0</div>' +
            '</div>' +
            '</div>' +
            '<div class="s-con">' +
            '<button class="s_icon"></button>' +
            '<div class="sound">' +
            '<span></span>' +
            '</div>' +
            '</div>' +
            '<div class="f-con">' +
            '<button class="f_icon"></button>' +
            '</div>' +
            '</div>';

        self.wrap.append(html);
    }

    this.timeTxt = function(time, txtfield) {
        if (!time) time = 0;
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);

        if (min < 10) min = '0' + min
        if (sec < 10) sec = '0' + sec

        var vdoTime = min + ':' + sec;
        txtfield.text(vdoTime)
    }

    //requestAnimationFrame재정의
    window.requestAnimationFrame = function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||

            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            }
    }();

    window.cancelAnimationFrame = (function() {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame ||
            function(id) {
                window.clearTimeout(id);
            };
    })();

    this.render = function() {
        var curT = self.video[0].currentTime;
        var time = curT / self.video[0].duration
        var integer = 0;
        var ceil = String(Math.ceil(time * 1000));
        if (ceil.length > 1) integer = String(Math.ceil(time * 100));
        var percent = Number(integer) + '.' + Number(ceil.substring(ceil.length, ceil.length - 1));
        if (ceil.substring(ceil.length, ceil.length - 1) != 0) self.progressBar.css('width', percent + '%')
        self.timeTxt(curT, self.currentTime);
        
        self.id = window.requestAnimationFrame(self.render);
        
        if(self.replayMode){
            if(curT > self.replayB){
                self.video[0].currentTime = self.replayA;
            }
        }
        
        if(self.tabbox){
            self.moveTab(curT);
        }
        
    }

    this.track = function() {
        self.scriptbtn.on('click', function() {
            self.ctrwrap.find('.script-wrap').toggle();
        });

        var a = 0;
        var tr = self.video[0].textTracks[0];
        var cues = tr.cues;

        for (i = 0; i < cues.length; i++) {
            cues[i].onenter = function() {
                self.ctrwrap.find('.script-wrap').html(this.text)
            }
            cues[i].onexit = function() {
                self.ctrwrap.find('.script-wrap').html('')
            }
        }

        tr.addEventListener('cuechange', function() {
            if (this.activeCues.length > 0) {
                self.ctrwrap.find('.script-wrap').html(this.activeCues[0].text)
            }
        });
    }

    this.rate = function() {
        // 배속
        self.ctrwrap.find('.r-con .r-btn').on('click', function() {
            if (self.ctrwrap.find('.r-box').css('display') == 'block') {
                self.ctrwrap.find('.r-box').hide();
            } else {
                self.ctrwrap.find('.r-box').show();
            }
        });

        self.ctrwrap.find('.r-box .btn').on('click', function() {
            $(this).addClass('on');
            $(this).siblings().removeClass('on');
            var r = $(this).html();
            self.ctrwrap.find('.r-btn').html(r);
            self.video[0].playbackRate = r;
            $(this).parent().hide()
        });
    }

    this.markMaker = function(time) {
        var m = time.split(' ');
        var d = 0;
        if(self.ctrwrap.find('.markerbox').length > 0) self.ctrwrap.find('.markerbox').remove();
        self.p_bar.parent().append('<div class="markerbox"></div>');
        self.video.on('loadeddata', function() {
            if(self.markerbox) return false;
            d = self.video[0].duration;
            for (var i = 0; i < m.length; i++) {
                var s = m[i].split(':');
                s = Number(s[0]) * 3600 + Number(s[1]) * 60 + Number(s[2]);
                m[i] = s;

                var time = m[i] / d;
                var integer = 0;
                var ceil = String(Math.ceil(time * 1000));
                if (ceil.length > 1) integer = String(Math.ceil(time * 100));
                var percent = Number(integer) + '.' + Number(ceil.substring(ceil.length, ceil.length - 1));

                var h = '<div class="marker marker' + (i + 1) + '"></div>'

                self.ctrwrap.find('.markerbox').append(h);
                self.ctrwrap.find('.marker' + (i + 1)).css('left', percent + '%');
                self.ctrwrap.find('.marker' + (i + 1)).attr('data-time', m[i]);
                self.ctrwrap.find('.marker' + (i + 1)).attr('data-pos', percent);
                self.ctrwrap.find('.marker' + (i + 1)).append('<div class="act"></div>');
                self.ctrwrap.find('.marker' + (i + 1)).on('click', function(e) {
                    self.video[0].currentTime = $(this).attr('data-time');
                    self.progressBar.width($(this).attr('data-pos') + '%');
                    self.play();
                });
            }
            $('.markerbox').show();
            self.markerbox = true;
        });
    }

    this.tabMaker = function(list,time,rmode) {
        var l = list;
        var m = time.split(' ');
        var r = rmode;
        if(self.vdowrap.find('.tabbox').length > 0) self.vdowrap.find('.tabbox').remove();
        self.vdowrap.append('<div class="tabbox"></div>');

        for(var i = 0;i < l.length; i++){
            if(r){
                self.vdowrap.find('.tabbox').append('<div class="tab tab' + (i + 1) + '">'+l[i]+'</div>');
                var rolebtn = '<div class="btn rolemode"></div>';
                self.vdowrap.find('.tabbox').find('.tab' + (i + 1)).append(rolebtn);
                self.vdowrap.find('.tabbox').find('.tab' + (i + 1)+' .rolemode').on('click',function(e){
                    e.stopPropagation();
                    self.roleplayMode($(this),m);
                })
            }else{
                self.vdowrap.find('.tabbox').append('<div class="tab tab' + (i + 1) + '">'+l[i]+'</div>');
            }

            var s = m[i].split(':');
            s = Number(s[0]) * 3600 + Number(s[1]) * 60 + Number(s[2]);
            m[i] = s;

            self.vdowrap.find('.tab' + (i + 1)).attr('data-time', m[i]);
        }

        self.vdowrap.find('.tab').on('click',function(e){
            e.stopPropagation();
            if($(this).hasClass('on')) return false;
            self.cancelRoleplayMode();
            $(this).siblings().removeClass('on');
            $(this).addClass('on');
            self.video[0].currentTime = $(this).attr('data-time');
            self.play();
        });

        self.tabbox = true;
    }

    this.moveTab = function(time) {
        var tabtime = [];
        self.vdowrap.find('.tab').each(function(){
           tabtime.push($(this).attr('data-time'));
        })

        for(var i = 0;i < tabtime.length; i ++){
            self.vdowrap.find('.tab').removeClass('on');
            if(tabtime.length == i+1){
                if(time > tabtime[i]){
                    self.vdowrap.find('.tab').eq(i).addClass('on');
                    break;
                }
            }else{
                if(time > tabtime[i] && time < tabtime[i+1]){
                    self.vdowrap.find('.tab').eq(i).addClass('on');
                    break;
                }else{
                    self.vdowrap.find('.tab').removeClass('on');
                }
            }
        }
    }

    var timer;
    this.fullScrren = function(){
        var controls = self.wrap;
        $('.f_icon').toggleClass('on');
        if(!$('.f_icon').hasClass('on')){
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if(document.webkitEnterFullScreen) {
                document.webkitEnterFullScreen();
            }
            clearTimeout(timer);
            self.video.off('mousemove');
            self.ctrwrap.off('mouseover');
            self.ctrwrap.find('.control-wrap').fadeIn();
        }
        else{
            if (controls[0].requestFullscreen) {
                controls[0].requestFullscreen();
            } else if (controls[0].mozRequestFullScreen) {
                controls[0].mozRequestFullScreen();
            } else if (controls[0].webkitRequestFullscreen) {
                controls[0].webkitRequestFullscreen();
            } else if (controls[0].msRequestFullscreen) {
                controls[0].msRequestFullscreen();
            } else if(controls[0].webkitEnterFullScreen) {
                controls[0].webkitEnterFullScreen();
            }
            
            self.ctrwrap.fadeOut(function(){
                self.video.off('mousemove').on('mousemove',function(e){
                    e.stopPropagation();
                    self.ctrwrap.fadeIn();

                    self.ctrwrap.off('mouseover').on('mouseover',function(){
                        clearTimeout(timer);
                        self.ctrwrap.show();
                    });
                    
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        self.ctrwrap.fadeOut();
                    },1000)
                });
            });

            var screen_change_events = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange";
            $(document).on(screen_change_events, function() {
                console.log('change')
                clearTimeout(timer);
                self.video.off('mousemove');
                self.ctrwrap.off('mouseover');
                self.ctrwrap.fadeIn();
                
                if (document.fullscreenElement) {
                } else {
                    console.log('Leaving full-screen mode.');
                    $('.f_icon').removeClass('on');
                }
            });
        }
    }
}