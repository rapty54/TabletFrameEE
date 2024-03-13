// 음원 관련 스크립트
var AudioPlayer = {

	bind: function() {
		// 음원
		$('.btn_volume').click(function() {
			$(this).toggleClass('on');
			if ($(this).hasClass('on')) {
				// 재생 -> 일시정지
				$('.play-volume-slider-wrap').show();
			} else if (!$(this).hasClass('on')) {
				// 일시정지 -> 재생
				$('.play-volume-slider-wrap').hide();
			}
		});
		// mp3 파일 경로
		var src = window.globals.config.cdnDomain + masterContent.filePath + masterContent.saveFileName;
		// 슬라이더
		var $slider = $('#slider');
		// 사운드 크기 조절 슬라이더
		var $mixSlider = $('#mix-slider');
		// 슬라이드 이벤트 적용
		$slider.slider({
			orientation: 'horizontal',
			range: 'min',
			max: 100,
			value: 0,
			slide: function(_event, ui) {
				// 퍼센트를 현재시간으로 변환
				var currentTime = (ui.value / 100 * audio.duration).toFixed(2);
				audio.currentTime = currentTime;
				// 진행바 퍼센트로 표시
				$prograssBar.css({
					width: audio.currentTime + '%'
				});
			},
			change: function() {
			},
		});
		// 소리 슬라이드 이벤트 적용
		$mixSlider.slider({
			orientation: 'vertical',
			range: 'min',
			max: 60,
			value: 0,
			slide: function(_event, ui) {
				audio.volume = ui.value / 100;
				// 진행바 퍼센트로 표시
				$mixPrograssBar.css({
					width: ui.value + '%'
				});
			},
			change: function() {
			},
		});
		// 플레이 버튼
		var $play = $('#btn-play');
		// 중지 버튼
		var $pause = $('#btn-pause');
		// 진행바
		var $prograssBar = $slider.find('.ui-slider-range');
		// 가운데 움직이기 버튼
		var $locate = $slider.find('.ui-slider-handle');
		// 소리조절 진행바
		var $mixPrograssBar = $mixSlider.find('.ui-slider-range');
		// 시작 시간
		var $playTime = $('#play-time');
		// 마지막 시간
		var $playTimeEnd = $('#play-time-end');
		// 오디오 생성
		var audio = new Audio(src);
		// 시작 버튼 클릭 이벤트
		$play.bind('click', function(_e) {
			// 재생
			var playPromise = audio.play();
			if (playPromise !== undefined) {
				playPromise.then(function() {
					// 재생 버튼 숨김
					$play.hide();
					// 중지 버튼 보이기
					$pause.show();
					// 총 재생시간 표시
					$playTimeEnd.text(FormatUtils.toMinSeconds(audio.duration));
				}).catch(function(error) {
					console.log(error);
				});
			} else {
				// 재생 버튼 숨김
				$play.hide();
				// 중지 버튼 보이기
				$pause.show();
			}
		});
		// 중지 버튼 클릭 이벤트
		$pause.bind('click', function(e) {
			e.preventDefault();
			audio.pause();
			$pause.hide();
			$play.show();
		});
		// 재생시간 업데이트 이벤트
		audio.addEventListener('timeupdate', function() {
			// 총 재생시간 표시
			$playTimeEnd.text(FormatUtils.toMinSeconds(audio.duration));
			var percent = (audio.currentTime / audio.duration * 100).toFixed(2);
			$prograssBar.css({
				width: percent + '%'
			});
			$locate.css({
				left: percent + '%'
			});
			// 총 재생시간 표시
			$playTime.text(FormatUtils.toMinSeconds(audio.currentTime));
		});
		// 처음 실행시 play 클릭 이벤트
		$play.trigger('click');
		// 새로고침시에는 브라우저에서 자동실행은 차단될 수 있음...
		// Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
	}
};

$(function() {
	AudioPlayer.bind();
});