var player = null;
// 비디오 상태
var VideoState = {
	step: 20, // step
	rate: 1.0, // 배속
	totalDuration: 0, // 전체 재생시간
	repeat: false, // 반복여부
	repeatRangeStart: 0, // 구간반복 시작 지점
	repeatRangeEnd: 0, // 구간반복 끝나는 지점
	complete: false, // 성공여부
};
function getStep() {
	return VideoState.step;
}

function setStep(value) {
	VideoState.step = value;
}

function onKeyDown(keycode) {
	if (window.event) {
		var type = window.event.target.type; {
			if (type == "text" || type == "textarea")
				return true;
		}
	}
	switch (keycode) {
		case 13: // ENTER
			player.setFullscreen(true);
			break;
		case 32: // SPACE
			if (player.getPlayState() == PlayState.PLAYING)
				player.pause();
			else
				player.play();
			break;
		case 38: // UP
			player.setVolume(player.getVolume() + 0.1);
			break;
		case 40: // DOWN
			player.setVolume(player.getVolume() - 0.1);
			break;
		case 37: // LEFT
			player.backward(getStep());
			break;
		case 39: // RIGHT
			player.forward(getStep());
			break;
		case 190: // >
			var newrate = player.getRate() + 0.2;
			player.setRate(newrate.toFixed(1));
			break;
		case 188: // <
			var newrate = (player.getRate() - 0.2) < 0.6 ? 0.6 : (player.getRate() - 0.2);
			player.setRate(newrate.toFixed(1));
			break;
		case 77: // M
			player.setMute(!player.getMute());
			break;
		case 82: // R
			player.setRepeat(!player.getRepeat());
			break;
		default:
			return;
	}
	return false;
}

function getBlockMessenger() {
	return player.getBlockMessenger();
}

function onError(errcode) {
	player.setVisible(true);
	if (errcode == StarPlayerError.OPEN_FAILURE) {
	}
}

function onLoad() {
	var config = {
		userId: "ANONYMOUS",
		id: "starplayer",
		videoContainer: "video-container",
		controllerContainer: "controller-container",
		controllerContainerHtml5: "controller-container2",
		controllerUrl: "axissoft3.bin",
		visible: true,
		auto_progressive_download: false,
		blockVirtualMachine: true,
		blockMessenger: false,
		dualMonitor: true,
		captionSize: 5
	};
	var media = {
		url: encryptUrl,
		autoPlay: true,
		startTime: 0
	};
	if (folderContentRepeat != null) {
		media.startTime = folderContentRepeat.repeatRangeStart;
		media.endTime = folderContentRepeat.repeatRangeEnd;
	}
	// 플레이어 생성
	player = new StarPlayer(config, media);
	// 오픈 상태 이벤트
	player.onOpenStateChange = function(state) {
		switch (state) {
			case OpenState.CLOSING:
				break;
			case OpenState.OPENING: // 1
				break;
			case OpenState.OPENED: // 2
				if (folderContentRepeat != null && (folderContentRepeat.repeatRangeStart != '0' || folderContentRepeat.repeatRangeEnd != '0')) {
					player.setRepeat(true);
					player.setRepeatStartTime(folderContentRepeat.repeatRangeStart);
					player.setRepeatEndTime(folderContentRepeat.repeatRangeEnd);
				}
				break;
			case OpenState.CLOSED: // 0
				player.setVolume(1);
				player.setRate(VideoState.rate);
				VideoState.totalDuration = player.getDuration();
				break;
		}
	};
	player.onKeyDown = onKeyDown;
	// 마우스 더블 클릭 이벤트
	player.onMouseDbclick = function(_x, _y) {
		player.setFullscreen(!player.getFullscreen());
	};
	// 플레이 상태 변경 이벤트
	player.onPlayStateChange = function(state) {
		switch (state) {
			case PlayState.PLAYING:
				player.setVisible(true);
				VideoState.complete = false;
				break;
			case PlayState.PAUSED:
				break;
			case PlayState.STOPPED:
				player.setVisible(false);
				break;
			case PlayState.BUFFERING_STARTED:
				break;
			case PlayState.COMPLETE:
				VideoState.rate = player.getRate();
				VideoState.complete = true;
				break;
		}
	};
	// 볼륨 변경 이벤트
	player.onVolumeChange = function(_volume, _mute) {
	}
	// 배속 변경 이벤트
	player.onRateChange = function(_rate) {
	};
	// 구간반복 ON / OFF 이벤트
	player.onRepeatChange = function(repeat) {
		VideoState.repeat = repeat;
	};
	// 구간반복 구간 변경 이벤트
	player.onRepeatRangeChange = function(start, end) {
		VideoState.repeatRangeStart = start;
		VideoState.repeatRangeEnd = end;
	};
	initScriptUI(player);
}

$(function() {
	// 스타플레이어 로드
	onLoad();
	// 전역 keydown 이벤트
	$('body').bind('keydown', function(e) {
		onKeyDown(e.keyCode);
	});
	// 담기 클릭 이벤트
	$('#btn-repeat-save').bind('click', function() {
		player.pause();
		player.setVisible(false);
		// 구간반복 설정여부
		// 구간반복을 설정안했다면
		if (VideoState.repeat) {
			if (VideoState.repeatRangeStart == 0 && VideoState.repeatRangeEnd == VideoState.totalDuration) {
				alert('구간저장 시작지점 ~ 종료지점을 변경하셔야 합니다.');
				return false;
			}
			// 제목 공백 체크
			if (StringUtils.isEmpty($('input[name=title]').val())) {
				alert('구간 저장할 영상의 제목을 입력해 주세요.');
				$('input[name=title]').focus();
				return false;
			}
		}
		Layer.openFolderMain({
			menu: parameter.referMenu,
			type: 'VIEWER_VIDEO_REPEAT',
			parameter: {
				textbookCd: null,
				code2: masterContent.contentGubun + '-' + masterContent.contentId,
				repeatRangeStart: VideoState.repeatRangeStart,
				repeatRangeEnd: VideoState.repeatRangeEnd,
				repeatRangeTitle: $('input[name=title]').val()
			},
			callback: function(_response) {
				alert('저장이 완료되었습니다.');
				player.setVisible(true);
			},
			callbackClose: function() {
				player.setVisible(true);
			}
		});
	});
});