'use strict';

var VIDEO_PATH = "../../data/video/";
var VIDEO_EXT = ".webm";
var VIDEOCOVER_EXT = ".jpg";
var beforeVolume = 0.5;
var zoom = 1;

var COMMON_METHOD_VIDEO = function () {
	//check scale
	var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	var wrapEl = document.getElementById('wrap');
	var _scaleValueX = windowW / wrapEl.clientWidth;
	var _scaleValueY = windowH / wrapEl.clientHeight;
	zoom = _scaleValueX < _scaleValueY ? _scaleValueX : _scaleValueY; 

	//비디오없는 페이지처리
	var $VIDEO_PNODES = $(".videoWrap").find(".video");
	var video_length = $VIDEO_PNODES.length;
    if( video_length<1){
        return;
	}
	
	for (var idx=0; idx<video_length; idx++) {
		drawVideoPanel($VIDEO_PNODES.eq(idx), idx, zoom)
	}
};

//add tag & event
var drawVideoPanel = function(VIDEO_PNODE, idx, zoom) {
	//video create ---------------------------------------------------------------------------------------------
    var VIDEO_NAME = VIDEO_PNODE.data("video");
    var video = document.createElement( "video" );
    video.src = VIDEO_PATH + VIDEO_NAME + VIDEO_EXT;
    video.id = "videoObj"+idx;
    video.volume  = beforeVolume;
    VIDEO_PNODE.append(video);


    //video cover thumb ----------------------------------------------------------------------------------------
    VIDEO_NAME = VIDEO_NAME.replace(/ /gi, "%20");
    var coverSrc = VIDEO_PATH + VIDEO_NAME + VIDEOCOVER_EXT;
    var videoCover = document.createElement( "div" );
    videoCover.className = "videoCover";
    videoCover.style.background = "url(" + coverSrc + ") no-repeat center center";
    videoCover.style.backgroundSize = " 100% auto";
    VIDEO_PNODE.append(videoCover);


    //video cover button ----------------------------------------------------------------------------------------
    var videoCoverBtn = document.createElement( "div" );
    videoCoverBtn.className = "videoCoverBtn";
    videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play.png\") no-repeat center center";
    VIDEO_PNODE.append(videoCoverBtn);

	videoCoverBtn.addEventListener("mouseover", function() {
		if($("body").hasClass("fullscreen")){
			if (!video.paused == true) {
				setTimeout(clearView, 3000);
			}
		}
		else{
			if (video.paused == true) {
				videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play.png\") no-repeat center center";
			} else {
				videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_pause.png\") no-repeat center center";
			}
		}
	});


	videoCoverBtn.addEventListener("mouseout", function() {
		if(video.currentTime >0){
			videoCoverBtn.style.background = "none";
		}
	});

	videoCoverBtn.addEventListener("click", function() {
		videoCover.style.background = "none";
		funcPlayButton();

		if (video.paused == true) {
			videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play.png\") no-repeat center center";
		} else {
			videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_pause.png\") no-repeat center center";
		}
	});


    //video controls ---------------------------------------------------------------------------------------------
    /*<input type=\"range\" id=\"videoVolume\" min=\"0\" max=\"1\" step=\"0.1\" value=\"1\">\
    */

    // var VIDEOWRAP_PNODE = $(".videoWrap");
    var videoControls = document.createElement( "div" );
    videoControls.id = "videoControls"+idx;
    videoControls.innerHTML = "<button type=\"button\" id=\"videoPlay"+idx+"\">Play</button>\
								<button type=\"button\" id=\"videoStop"+idx+"\">Stop</button>\
								<input type=\"range\" id=\"videoRange"+idx+"\" min=\"0\" max=\"100\" value=\"0\" step=\"0.00001\">\
								<span id=\"videoTimeNow"+idx+"\">00:00</span>\
								<span id=\"videoTimeSplit"+idx+"\">/</span>\
								<span id=\"videoTimeAll"+idx+"\">00:00</span>\
								<button type=\"button\" id=\"videoMute"+idx+"\">Mute</button>\
								<div id=\"videoVolume"+idx+"\" >\
								<span id=\"vol1_"+idx+"\" class=\"on\" ></span>\
								<span id=\"vol2_"+idx+"\" class=\"on\" ></span>\
								<span id=\"vol3_"+idx+"\" class=\"on\" ></span>\
								<span id=\"vol4_"+idx+"\" class=\"on\" ></span>\
								<span id=\"vol5_"+idx+"\" class=\"on\" ></span>\
								<span id=\"vol6_"+idx+"\"></span>\
								<span id=\"vol7_"+idx+"\"></span>\
								<span id=\"vol8_"+idx+"\"></span>\
								<span id=\"vol9_"+idx+"\"></span>\
								<span id=\"vol10_"+idx+"\"></span>\
								</div>\
								<button type=\"button\" id=\"videoFullscreen"+idx+"\">Full-Screen</button>";
    //VIDEOWRAP_PNODE.append(videoControls);
    VIDEO_PNODE.append(videoControls);
    
	var playButton = document.getElementById("videoPlay"+idx);
	var stopButton = document.getElementById("videoStop"+idx);
	var fullScreenButton = document.getElementById("videoFullscreen"+idx);
	var muteButton = document.getElementById("videoMute"+idx);

	

	var seekBar = document.getElementById("videoSeek"+idx);
	var $videoRange = $('#videoRange'+idx);
	var vol1 = document.getElementById("vol1_"+idx);
	var vol2 = document.getElementById("vol2_"+idx);
	var vol3 = document.getElementById("vol3_"+idx);
	var vol4 = document.getElementById("vol4_"+idx);
	var vol5 = document.getElementById("vol5_"+idx);
	var vol6 = document.getElementById("vol6_"+idx);
	var vol7 = document.getElementById("vol7_"+idx);
	var vol8 = document.getElementById("vol8_"+idx);
	var vol9 = document.getElementById("vol9_"+idx);
	var vol10 = document.getElementById("vol10_"+idx);

	var timeNow = document.getElementById("videoTimeNow"+idx);
	var timeAll = document.getElementById("videoTimeAll"+idx);

	//video controls - 시간처리
	video.addEventListener('loadeddata', function() {
	   timeAll.innerHTML = format(video.duration);

	/*$('#videoSeek').slider({
        value: 0,
        orientation: "horizontal",
        range: "max",
        min:0,
        max:video.duration,
        animate: "fast",
        change: function(event, seekto){
            //We got the volume.value -> Set it to the video;
            video.currentTime = seekto.value; //video.seekTo(seekto.value);
        }
    });*/
	}, false);

	video.ontimeupdate = function() {
	    timeNow.innerHTML = format(video.currentTime);
	};

	video.addEventListener("timeupdate", function() {
	  var value = (100 / video.duration) * video.currentTime;
	  var value2 = value;
      if(value<5){
       value2 += 0.5;
      } else if(value>95){
       value2 -= 0.5;
      }

	  $("#played"+idx).css({"width" : value+"%"});

	  if(value<100){
	  	// $("#videoSeekBtn"+idx).css({"left" : value+"%"});
	  	$videoRange.val(value);
	  	$videoRange.css( 'background', 'linear-gradient(to right, #0c88e0 0%, #0c88e0 '+value2 +'%, #fff ' +value2 + '%, white 100%)' );
	  }
	  else{
	  	funcEndVideo();
	  }
	});

	video.addEventListener("ended", function(){
		funcEndVideo();
	});

	//video controls - 버튼 동작
	playButton.addEventListener("click", function() {
		funcPlayButton();
	});

	stopButton.addEventListener("click", function() {
		funcStopVideo();
	});

	//전체창 일때
	fullScreenButton.addEventListener("click", function() {
		funcFullScreen();

	});

	document.addEventListener('fullscreenchange', exitHandler);
	document.addEventListener('webkitfullscreenchange', exitHandler);
	document.addEventListener('mozfullscreenchange', exitHandler);
	document.addEventListener('MSFullscreenChange', exitHandler);

	function funcFullScreen(){
		//return;
		if ($("body").hasClass("fullscreen")){
			document.exitFullscreen();
			exitFullscreenCustom();

			$(fullScreenButton).removeClass("on");
		}
		else{
			$("body").addClass("fullscreen");

			$(fullScreenButton).addClass("on");

			var elem = document.getElementById("wrap");
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen();
			}
		}
	}

	function exitHandler() {
	    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
	        exitFullscreenCustom();
	    }
	}

	function exitFullscreenCustom(){
		$("body").removeClass("fullscreen");
		COMMONLIBRARY.view.setScale();
		$("#videoControls"+idx).css("opacity", 1);
		$(fullScreenButton).removeClass("on");
	}

	parent.FUNC_FULL_SCREEN = funcFullScreen;

	muteButton.addEventListener("click", function() {
		if( $(this).hasClass("on")){
			video.volume = beforeVolume;
		}
		else{
			beforeVolume = video.volume
			video.volume = 0;
		}
		$(this).toggleClass("on");
	});

	$videoRange.on('input', function() {
	    var time = video.duration * ($videoRange.val() / 100);
        video.currentTime = time;
        $videoRange.css( 'background', 'linear-gradient(to right, #0c88e0 0%, #0c88e0 '+this.value +'%, #fff ' + this.value + '%, white 100%)' );
   });


	// seekBar.addEventListener("click", function(e) {
	// 	var xPos = e.pageX - this.getBoundingClientRect().left;
	// 	var fullWidth = parseInt($(seekBar).css("width").replace("px", ""));
	// 	fullWidth = fullWidth * zoom;

	// 	var clickPercent = parseInt(xPos / fullWidth * 100);

	// 	var time = video.duration * (clickPercent / 100);
	// 	video.currentTime = time;

	// 	//play video
	// 	playButton.classList.add('pause');
	// 	video.play();

	// 	playButton.innerHTML = "Pause";
	// 	videoCover.style.background = "none";
	// 	videoCoverBtn.style.background = "none";
	// });

	var $component = $('[data-component="video"]');
	var $videoVolume = $("#videoVolume"+idx).find("span");
	var $vol1 = $("#videoVolume"+idx).find("#vol1_"+idx);
	var $vol2 = $("#videoVolume"+idx).find("#vol2_"+idx);
	var $vol3 = $("#videoVolume"+idx).find("#vol3_"+idx);
	var $vol4 = $("#videoVolume"+idx).find("#vol4_"+idx);
	var $vol5 = $("#videoVolume"+idx).find("#vol5_"+idx);
	var $vol6 = $("#videoVolume"+idx).find("#vol6_"+idx);
	var $vol7 = $("#videoVolume"+idx).find("#vol7_"+idx);
	var $vol8 = $("#videoVolume"+idx).find("#vol8_"+idx);
	var $vol9 = $("#videoVolume"+idx).find("#vol9_"+idx);
	var $vol10 = $("#videoVolume"+idx).find("#vol10_"+idx);

    $component.on('scaleChange', function(event) {
        zoom = event.elScale;
    }).trigger('getScaleChange');

	vol1.addEventListener("click", function() {
	  video.volume = "0.1";
	  $videoVolume.removeClass("on");
	  $(this).addClass("on");
	});

	vol2.addEventListener("click", function() {
	  video.volume = "0.2";
	  $videoVolume.removeClass("on");
	  $vol1.addClass("on");
	  $vol2.addClass("on");
	});

	vol3.addEventListener("click", function() {
	  video.volume = "0.3";
	  $videoVolume.removeClass("on");
	  $vol1.addClass("on");
	  $vol2.addClass("on");
	  $vol3.addClass("on");
	});

	vol4.addEventListener("click", function() {
	  video.volume = "0.4";
	  $videoVolume.removeClass("on");
	  $vol1.addClass("on");
	  $vol2.addClass("on");
	  $vol3.addClass("on");
	  $vol4.addClass("on");
	});

	vol5.addEventListener("click", function() {
	  video.volume = "0.5";
	  $videoVolume.removeClass("on");
	  $vol1.addClass("on");
	  $vol2.addClass("on");
	  $vol3.addClass("on");
	  $vol4.addClass("on");
	  $vol5.addClass("on");
	});

	vol6.addEventListener("click", function() {
	  video.volume = "0.6";
	  $videoVolume.removeClass("on");
	  $vol1.addClass("on");
	  $vol2.addClass("on");
	  $vol3.addClass("on");
	  $vol4.addClass("on");
	  $vol5.addClass("on");
	  $vol6.addClass("on");
	});

	vol7.addEventListener("click", function() {
	  video.volume = "0.7";
	  $videoVolume.removeClass("on");
	  $vol1.addClass("on");
	  $vol2.addClass("on");
	  $vol1.addClass("on");
	  $vol2.addClass("on");
	  $vol3.addClass("on");
	  $vol4.addClass("on");
	  $vol5.addClass("on");
	  $vol6.addClass("on");
	  $vol7.addClass("on");
	});

	vol8.addEventListener("click", function() {
	  video.volume = "0.8";
	  $videoVolume.removeClass("on");
	  $vol1.addClass("on");
	  $vol2.addClass("on");
	  $vol3.addClass("on");
	  $vol4.addClass("on");
	  $vol5.addClass("on");
	  $vol6.addClass("on");
	  $vol7.addClass("on");
	  $vol8.addClass("on");
	});

	vol9.addEventListener("click", function() {
	  video.volume = "0.9";
	  $videoVolume.removeClass("on");
	  $vol1.addClass("on");
	  $vol2.addClass("on");
	  $vol3.addClass("on");
	  $vol4.addClass("on");
	  $vol5.addClass("on");
	  $vol6.addClass("on");
	  $vol7.addClass("on");
	  $vol8.addClass("on");
	  $vol9.addClass("on");
	});

	vol10.addEventListener("click", function() {
	  video.volume = "1";
	  $videoVolume.removeClass("on");
	  $vol1.addClass("on");
	  $vol2.addClass("on");
	  $vol3.addClass("on");
	  $vol4.addClass("on");
	  $vol5.addClass("on");
	  $vol6.addClass("on");
	  $vol7.addClass("on");
	  $vol8.addClass("on");
	  $vol9.addClass("on");
	  $vol10.addClass("on");
	});

	videoControls.addEventListener("mouseover", function() {
		if( !$("body").hasClass("fullscreen")){
			videoControls.style.opacity = "1";
			return;
		}
		videoControls.style.opacity = "0.8";
	});

	videoControls.addEventListener("mouseout", function() {
		if( !$("body").hasClass("fullscreen")){
			videoControls.style.opacity = "1";
			return;
		}
		videoControls.style.opacity = "0";
	});



	// 공통 함수
	function funcPlayButton() {
		if (video.paused == true) {
			// $("#videoPlay"+idx).addClass("pause");
			playButton.classList.add('pause');
			video.play();

			playButton.innerHTML = "Pause";
			videoCover.style.background = "none";
			videoCoverBtn.style.background = "none";
			
			setTimeout(clearView, 3000);
		} else {
			//$("#videoPlay").removeClass("pause");
			playButton.classList.remove('pause');
			// Pause the video
			video.pause();

			playButton.innerHTML = "Play";
			videoCoverBtn.style.background = "url(\"../../common/img/video/ico_play.png\") no-repeat center center";
			
		}

		video.style.opacity = "1";


	}

	function clearView() {
		videoCoverBtn.style.background = "";
	}


	function funcStopVideo(){
		video.pause();
		// $("#videoPlay").removeClass("pause");
		playButton.classList.remove('pause');
		playButton.innerHTML = "Play";
		video.currentTime = 0;
		//seekBar.value = 0;

		$("#played"+idx).css({"width" : "0%"});
	  	// $("#videoSeekBtn"+idx).css({"left" : "0%"});
		videoCoverBtn.style.background = "url(\"../../../../common/img/video/ico_play.png\") no-repeat center center";
	}

    function funcEndVideo(){
        video.pause();
        playButton.classList.remove('pause');
        playButton.innerHTML = "Play";
        $("#played"+idx).css({"width" : "0%"});
        videoCoverBtn.style.background = "url(\"../../../../common/img/video/ico_play.png\") no-repeat center center";
        $videoRange.val(100);
        $videoRange.css( 'background', 'linear-gradient(to right, #0c88e0 0%, #0c88e0 '+100 +'%, #fff ' +100 + '%, white 100%)' );
    }

	function format(s) {
		var m = Math.floor(s / 60);
		m = (m >= 10) ? m : "0" + m;
		s = Math.floor(s % 60);
		s = (s >= 10) ? s : "0" + s;
		return m + ":" + s;
	}

	//닫기 버튼 클릭시 동영상 멈춤
    $(document).on('click','button.btnClose',function(){
		funcStopVideo();
		/*var popNo = Number($(this).parents("div.popFullWrap").removeClass("on").attr('id').slice(-2)) -1;
		$("#videoStop"+popNo).trigger("click");*/
	});
    $(document).on('click','.tabHead li',function(){
		funcStopVideo();
		/*var popNo = Number($(this).parents("div.popFullWrap").removeClass("on").attr('id').slice(-2)) -1;
		$("#videoStop"+popNo).trigger("click");*/
	});
};
