var stampContents;

$(window).on('load',function(){
	$('.btnActive').on('click',function(){
		var s = $(this).attr('data-src');
		window.open(s, 'menubar=no', false);
		playSoundClick();
	});

	$('.btnPlus').on('click',function(){
		return false;
		var s = $(this).attr('data-src');
		window.open(s, 'menubar=no', false);
		playSoundClick();
	});

	$('.btnCon').on('click',function(){
		var s = $(this).attr('data-src');
		window.open(s, 'menubar=no', false);
		playSoundClick();
	});

	$('.btnVideo').on('click',function(){
		var s = $(this).attr('data-src');
		window.open(s, 'menubar=no', false);
		playSoundClick();
	});

	$('.math_I').on('click',function(){
		effectAdo('click');
    	var url = '';
    	var src = $(this).attr('data-url');
    	window.open(src, 'menubar=no', false);
	});
})


function makeMask() {
	$('#container').append('<div class="mask"></div>');
	$('#container .mask').css({
		'width': '100%',
		'height': '100%',
		'background-color': 'rgba(0,0,0,0.8)'
	});
}

function removeMask() {
	$('.mask').remove();
}

function effectAdo(effect) {
	if (effect == 'anschk_x') {
		var n = Math.floor(Math.random() * 6 + 1);
		effect = 'wrong' + n;
	}
	if (effect == 'anschk_x2') {
		effect = 'anschk_x';
	}

	var ado = '#' + effect;
	if ($(ado).length == 0) {
		var html = '<audio id="' + effect + '" src="../../common/media/' + effect + '.mp3" type="audio/mp3"></audio>';
		$('#wrap').append(html);
	}
	ado_stop();
	if ($(ado)[0].currentTime > 0) $(ado)[0].currentTime = 0;
	$(ado)[0].play();

	$(ado).on('ended', function(){
		$('.ansX').removeClass('ansX')
	})
}

function contentAdo(effect, chk) {
	var ado = '#' + effect;
	if ($(ado).length == 0) {
		var html = '<audio id="' + effect + '" src="inc/media/mp3/' + effect + '.mp3" type="audio/mp3"></audio>';
		$('#wrap').append(html);
	}
	if(chk == undefined){
		ado_stop();
		if ($(ado)[0].currentTime > 0) $(ado)[0].currentTime = 0;
	}
	$(ado)[0].play();
}

function ado_stop() {
	$('audio').each(function () {
		$(this)[0].pause();
	});
}

function cho_hangul(str) {
	cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
	result = "";
	for (i = 0; i < str.length; i++) {
		code = str.charCodeAt(i) - 44032;
		if (code > -1 && code < 11172) result += cho[Math.floor(code / 588)];
		else result += str.charAt(i);
	}
	return result;

}

stampContents = function(wrap) {
    var self = this;
    this.wrap = wrap;
    this.timer, this.timer2;


    this.init = function() {
        this.makeHtml();

        var time = self.wrap.find('.stamp').css('animation-duration');
        time = time.replace('s', '');
        time = (Number(time) * 1000) - 700;

        var time2 = time - 700;

        this.timer = setTimeout(function() {
            self.wrap.find('.st').show();
        }, time);

        this.timer2 = setTimeout(function() {
            // effectAdo('stamp');
        }, time2);
    }

    this.makeHtml = function() {
        var stampNum = (Math.random() * (8 - 1)) + 1;
        stampNum = Math.floor(stampNum);
        var html = '<div class="stamp">' +
            '</div>' +
            '<div class="bounce2 item st st' + stampNum + '"></div>';
        self.wrap.append(html);
        if (stampNum == 1 || stampNum == 5) {
            effectAdo('stamp1');
        } else if (stampNum == 2 || stampNum == 6) {
            effectAdo('stamp2');
        } else if (stampNum == 3 || stampNum == 7) {
            effectAdo('stamp3');
        } else if (stampNum == 4 || stampNum == 8) {
            effectAdo('stamp4');
        }
    }
}