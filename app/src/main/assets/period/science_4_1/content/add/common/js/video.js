'use strict';

var VIDEO_PATH = "../../data/video/";
var VIDEO_EXT = ".webm";
var VIDEOCOVER_EXT = ".jpg";
var beforeVolume = 0.5;

var pageVideo;
var pageVideoSeekBar;
var pageVideoCover;
var pageVideoCoverBtn;
var pagePlayButton;

var COMMON_METHOD_VIDEO = function (v) {
	//초기화
	console.log('video', v);
	var $base = v !== undefined ? $('#' + v) : $('body');

	$('#videoControls').each(function(){
		$(this).remove();
	});
	$('.video *').remove();

	//비디오없는 페이지처리
	var VIDEO_PNODE = $base.find(".videoWrap .video");
	if ($(VIDEO_PNODE).length < 1) {
		return;
	}

	//video create ---------------------------------------------------------------------------------------------
	var VIDEO_NAME = VIDEO_PNODE.data("video");
	var video = document.createElement("video");
	video.src = VIDEO_PATH + VIDEO_NAME + VIDEO_EXT;
	video.volume  = beforeVolume;
	VIDEO_PNODE.append(video);

	pageVideo = video;

	//video cover thumb ----------------------------------------------------------------------------------------
	var coverSrc = VIDEO_PATH + VIDEO_NAME + VIDEOCOVER_EXT;
	var videoCover = document.createElement("div");
	pageVideoCover = videoCover;
	videoCover.className = "videoCover";
	videoCover.style.background = 'url("' + coverSrc + '")';
	videoCover.style.backgroundSize = "contain";
	VIDEO_PNODE.append(videoCover);


	//video cover button ----------------------------------------------------------------------------------------
	var videoCoverBtn = document.createElement("div");
	pageVideoCoverBtn = videoCoverBtn;
	videoCoverBtn.className = "videoCoverBtn";
	videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
	VIDEO_PNODE.append(videoCoverBtn);

	videoCoverBtn.addEventListener("mouseover", function () {
		if (!($("body").hasClass("fullscreen"))) { // fullscreen 인 경우 play/pause 표시하지 않음
			if (video.paused == true) {
				videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
			} else {
				videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_pause-b.png\") no-repeat center center";
			}
		}
	});

	videoCoverBtn.addEventListener("mouseout", function () {

		if (video.currentTime > 0) {
			videoCoverBtn.style.background = "none";
		}
	});

	videoCoverBtn.addEventListener("click", function () {
		videoCover.style.background = "none";
		funcPlayButton();

		if (!($("body").hasClass("fullscreen"))) { // fullscreen 인 경우 play/pause 표시하지 않음
			if (video.paused == true) {
				videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
			} else {
				videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_pause-b.png\") no-repeat center center";
			}
		}
	});


	//video controls ---------------------------------------------------------------------------------------------
	var VIDEOWRAP_PNODE = $base.find(".videoWrap");
	var videoControls = document.createElement( "div" );
	videoControls.id = "videoControls";
	videoControls.innerHTML = "<button type=\"button\" id=\"videoPlay\">Play</button>\
								<button type=\"button\" id=\"videoStop\">Stop</button>\
								<input type=\"range\" id=\"videoSeek\" value=\"0\">\
								<span id=\"videoTimeNow\">00:00</span>\
								<span id=\"videoTimeSplit\">/</span>\
								<span id=\"videoTimeAll\">00:00</span>\
								<button type=\"button\" id=\"videoMute\">Mute</button>\
								<div id=\"videoVolume\" >\
								<span id=\"vol1\" class=\"on\" ></span>\
								<span id=\"vol2\" class=\"on\" ></span>\
								<span id=\"vol3\" class=\"on\" ></span>\
								<span id=\"vol4\" class=\"on\" ></span>\
								<span id=\"vol5\" class=\"on\" ></span>\
								<span id=\"vol6\"></span>\
								<span id=\"vol7\"></span>\
								<span id=\"vol8\"></span>\
								<span id=\"vol9\"></span>\
								<span id=\"vol10\"></span>\
								</div>\
								<button type=\"button\" id=\"videoFullscreen\">Full-Screen</button>";
	VIDEOWRAP_PNODE.append(videoControls);
	/*var VIDEOWRAP_PNODE = $(".videoWrap");
	var videoControls = document.createElement("div");
	videoControls.id = "videoControls";
	videoControls.innerHTML = "<button type=\"button\" id=\"videoPlay\">Play</button>\
								<button type=\"button\" id=\"videoStop\">Stop</button>\
								<input type=\"range\" id=\"videoSeek\" value=\"0\">\
								<span id=\"videoTimeNow\">00:00</span> /\
								<span id=\"videoTimeAll\">00:00</span>\
								<span id=\"videoSound\"></span>\
								<input type=\"range\" id=\"videoVolume\" min=\"0\" max=\"1\" step=\"0.1\" value=\"1\">\
								<button type=\"button\" id=\"videoFullscreen\">Full-Screen</button>";
	VIDEOWRAP_PNODE.append(videoControls);*/

	var playButton = document.getElementById("videoPlay");
	pagePlayButton = playButton;
	var stopButton = document.getElementById("videoStop");
	var fullScreenButton = document.getElementById("videoFullscreen");
	var muteButton = document.getElementById("videoMute");

	var seekBar = document.getElementById("videoSeek");
	pageVideoSeekBar = seekBar;
	/*var volumeBar = document.getElementById("videoVolume");*/
	var vol1 = document.getElementById("vol1");
	var vol2 = document.getElementById("vol2");
	var vol3 = document.getElementById("vol3");
	var vol4 = document.getElementById("vol4");
	var vol5 = document.getElementById("vol5");
	var vol6 = document.getElementById("vol6");
	var vol7 = document.getElementById("vol7");
	var vol8 = document.getElementById("vol8");
	var vol9 = document.getElementById("vol9");
	var vol10 = document.getElementById("vol10");

	var timeNow = document.getElementById("videoTimeNow");
	var timeAll = document.getElementById("videoTimeAll");

	//video controls - 시간처리
	video.addEventListener('loadeddata', function () {
		timeAll.innerHTML = format(video.duration);
	}, false);

	video.ontimeupdate = function () {
		timeNow.innerHTML = format(video.currentTime);
	};

	video.addEventListener("timeupdate", function () {
		var value = (100 / video.duration) * video.currentTime;
		seekBar.value = value;
	});

	//video controls - 버튼 동작
	playButton.addEventListener("click", function () {
		funcPlayButton();
	});

	stopButton.addEventListener("click", function () {
		video.pause();
		playButton.innerHTML = "Play";
		video.currentTime = 0;
		seekBar.value = 0;
		videoCover.style.background = 'url("' + coverSrc + '") no-repeat center center / contain';
		videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
		playButton.style.background = "url(\"../../../common/img/video/ico_play.png\") no-repeat center center";
	});

	fullScreenButton.addEventListener("click", function () {
		$("body").toggleClass("fullscreen");
		if ($("body").hasClass("fullscreen")) {
			top.document.getElementById('ifHeader').style.display = 'none';
			top.setFullscreen(true);
			videoCoverBtn.style.background = "none"; // fullscreen 인 경우 play/pause 표시하지 않음
		} else {
			top.document.getElementById('ifHeader').style.display = 'block';
			top.setFullscreen(false);
		}
	});

	seekBar.addEventListener("change", function () {
		var time = video.duration * (seekBar.value / 100);

		video.currentTime = time;
		videoCover.style.background = "none";
		videoCoverBtn.style.background = "none";

		playButton.innerHTML = "Pause";
	});

	seekBar.addEventListener("mousedown", function () {
		video.pause();
	});

	seekBar.addEventListener("mouseup", function () {
		video.play();
	});

	seekBar.addEventListener("input", function () {
		var time = video.duration * (seekBar.value / 100);

		video.currentTime = time;

		funcPlayButton();
	});



	/*volumeBar.addEventListener("change", function () {
		video.volume = volumeBar.value;
	});*/
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

	vol1.addEventListener("click", function() {
		video.volume = "0.1";
		$("#videoVolume span").removeClass("on");
		$(this).addClass("on");
	});

	vol2.addEventListener("click", function() {
		video.volume = "0.2";
		$("#videoVolume span").removeClass("on");
		$("#videoVolume #vol1").addClass("on");
		$("#videoVolume #vol2").addClass("on");
	});

	vol3.addEventListener("click", function() {
		video.volume = "0.3";
		$("#videoVolume span").removeClass("on");
		$("#videoVolume #vol1").addClass("on");
		$("#videoVolume #vol2").addClass("on");
		$("#videoVolume #vol3").addClass("on");
	});

	vol4.addEventListener("click", function() {
		video.volume = "0.4";
		$("#videoVolume span").removeClass("on");
		$("#videoVolume #vol1").addClass("on");
		$("#videoVolume #vol2").addClass("on");
		$("#videoVolume #vol3").addClass("on");
		$("#videoVolume #vol4").addClass("on");
	});

	vol5.addEventListener("click", function() {
		video.volume = "0.5";
		$("#videoVolume span").removeClass("on");
		$("#videoVolume #vol1").addClass("on");
		$("#videoVolume #vol2").addClass("on");
		$("#videoVolume #vol3").addClass("on");
		$("#videoVolume #vol4").addClass("on");
		$("#videoVolume #vol5").addClass("on");
	});

	vol6.addEventListener("click", function() {
		video.volume = "0.6";
		$("#videoVolume span").removeClass("on");
		$("#videoVolume #vol1").addClass("on");
		$("#videoVolume #vol2").addClass("on");
		$("#videoVolume #vol3").addClass("on");
		$("#videoVolume #vol4").addClass("on");
		$("#videoVolume #vol5").addClass("on");
		$("#videoVolume #vol6").addClass("on");
	});

	vol7.addEventListener("click", function() {
		video.volume = "0.7";
		$("#videoVolume span").removeClass("on");
		$("#videoVolume #vol1").addClass("on");
		$("#videoVolume #vol2").addClass("on");
		$("#videoVolume #vol3").addClass("on");
		$("#videoVolume #vol4").addClass("on");
		$("#videoVolume #vol5").addClass("on");
		$("#videoVolume #vol6").addClass("on");
		$("#videoVolume #vol7").addClass("on");
	});

	vol8.addEventListener("click", function() {
		video.volume = "0.8";
		$("#videoVolume span").removeClass("on");
		$("#videoVolume #vol1").addClass("on");
		$("#videoVolume #vol2").addClass("on");
		$("#videoVolume #vol3").addClass("on");
		$("#videoVolume #vol4").addClass("on");
		$("#videoVolume #vol5").addClass("on");
		$("#videoVolume #vol6").addClass("on");
		$("#videoVolume #vol7").addClass("on");
		$("#videoVolume #vol8").addClass("on");
	});

	vol9.addEventListener("click", function() {
		video.volume = "0.9";
		$("#videoVolume span").removeClass("on");
		$("#videoVolume #vol1").addClass("on");
		$("#videoVolume #vol2").addClass("on");
		$("#videoVolume #vol3").addClass("on");
		$("#videoVolume #vol4").addClass("on");
		$("#videoVolume #vol5").addClass("on");
		$("#videoVolume #vol6").addClass("on");
		$("#videoVolume #vol7").addClass("on");
		$("#videoVolume #vol8").addClass("on");
		$("#videoVolume #vol9").addClass("on");
	});

	vol10.addEventListener("click", function() {
		video.volume = "1";
		$("#videoVolume span").removeClass("on");
		$("#videoVolume #vol1").addClass("on");
		$("#videoVolume #vol2").addClass("on");
		$("#videoVolume #vol3").addClass("on");
		$("#videoVolume #vol4").addClass("on");
		$("#videoVolume #vol5").addClass("on");
		$("#videoVolume #vol6").addClass("on");
		$("#videoVolume #vol7").addClass("on");
		$("#videoVolume #vol8").addClass("on");
		$("#videoVolume #vol9").addClass("on");
		$("#videoVolume #vol10").addClass("on");
	});

	// 공통 함수
	function funcPlayButton() {
		if (video.paused == true) {
			video.play();

			playButton.innerHTML = "Pause";
			playButton.style.background = "url(\"../../../common/img/video/ico_pause.png\") no-repeat center center";
			videoCover.style.background = "none";
			videoCoverBtn.style.background = "none";
		} else {
			// Pause the video
			video.pause();

			playButton.innerHTML = "Play";
			playButton.style.background = "url(\"../../../common/img/video/ico_play.png\") no-repeat center center";
			if (!($("body").hasClass("fullscreen"))) { // fullscreen 인 경우 play/pause 표시하지 않음
				videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
			}
		}
	}


	function format(s) {
		var m = Math.floor(s / 60);
		m = (m >= 10) ? m : "0" + m;
		s = Math.floor(s % 60);
		s = (s >= 10) ? s : "0" + s;
		return m + ":" + s;
	}


};
