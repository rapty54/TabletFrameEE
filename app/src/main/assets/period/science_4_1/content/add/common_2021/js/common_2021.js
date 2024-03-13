$(window).on('load', function () {
	$('.btnActive').on('click', function () {
		var s = $(this).attr('data-src');
		window.open(s);
		playSoundClick();
	})

	// --add
	// 생각열기 버튼 클릭
	$('.btn-think').on('click', function () {
		$('.pop1 .videoFrame').show();
	})
})

function shuffle(paTarget) {
	var kaTarget = paTarget.concat();
	var j, koTemp;
	for (var i = kaTarget.length - 1; i > 0; --i) {
		j = Math.floor(Math.random() * (i + 1));

		koTemp = kaTarget[i];
		kaTarget[i] = kaTarget[j];
		kaTarget[j] = koTemp;
	}
	return kaTarget;
}

function makeMask() {
	$('#wrap').append('<div class="mask"></div>');
	$('#wrap .mask').css({
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
		var html = '<audio id="' + effect + '" src="../../../common_2021/media/' + effect + '.mp3" type="audio/mp3"></audio>';
		$('#wrap').append(html);
	}
	ado_stop();
	if ($(ado)[0].currentTime > 0) $(ado)[0].currentTime = 0;
	$(ado)[0].play();

	$(ado).on('ended', function () {
		$('.ansX').removeClass('ansX')
	})
}

function contentAdo(effect, chk) {
	var ado = '#' + effect;
	if ($(ado).length == 0) {
		var html = '<audio id="' + effect + '" src="inc/media/mp3/' + effect + '.mp3" type="audio/mp3"></audio>';
		$('#wrap').append(html);
	}
	if (chk == undefined) {
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

// 드래그 기본 - (1:1매칭)
dragContents = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.dragArea = wrap.find('.dragArea');
	this.dropArea = wrap.find('.dropArea');
	this.drag = wrap.find('.drag');
	this.drop = wrap.find('.drop');

	this.btn = wrap.find('.button');
	this.btnAns = wrap.find('.btn-answer-show');
	this.btnRe = wrap.find('.btnRetry');

	this.count = 0;
	this.total = self.drag.length;
	//	this.option = option;

	this.result = '';

	this.init = function () {
		self.drag.each(function () {
			$(this).attr({
				'origin-top': $(this).css('top'),
				'origin-left': $(this).css('left')
			})
		})

		self.btnAns.on('click', function () {
			self.clickBtnAns($(this));
		})

		self.btnRe.on('click', function () {
			self.clickBtnRe($(this));
		})

		setTimeout(function () {
			self.addDrag();
			self.addDrop();
		}, 500)

	}

	this.addDrag = function () {
		var factor = COMMONLIBRARY.view.scale;

		//		var containmentX1 = 100;
		//		var containmentY1 = 100;
		//		var containmentX2 = 1567 - self.wrap.outerWidth();
		//		var containmentY2 = 875 - self.wrap.outerHeight();
		//
		self.drag.draggable({
			//			 containment: [containmentX1*factor,containmentY1*factor,containmentX2*factor,containmentY2*factor],
			cursor: 'pointer',
			revert: 'invalid',
			scroll: false,
			start: function (e, obj) {
				COMMONLIBRARY.view.setScale();
				var factor = COMMONLIBRARY.view.scale;

				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
				isRec = $(this);

				isRec.css('z-index', 100);

				isRec.draggable({
					revert: true
				})

				$('body').attr('ondragstart', 'return false');
				$('body').attr('onselectstart', 'return false');
			},
			drag: function (e, obj) {
				var factor = COMMONLIBRARY.view.scale;

				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
				isRec.css('z-index', 100);
			},
			stop: function (e, obj) {
				self.drag.css('z-index', 1);

				$('body').removeAttr('ondragstart');
				$('body').removeAttr('onselectstart');

			}

		});
	}

	this.addDrop = function () {
		self.drop.droppable({
			accept: self.drag,
			over: function (e, obj) {
				var $this = $(this);
			},
			drop: function (e, obj) {
				var factor = COMMONLIBRARY.view.scale;

				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);

				var $this = $(this);

				// 이미 드롭된 영역
				if ($this.hasClass('com')) {
					COMMONLIBRARY.tools.wrongAudio();
					return false;
				}

				if (isRec.is('[data-ans]')) {
					var idx = $this.index();
					var dataAns = Number(isRec.attr('data-ans'));

					if ((idx + 1) == dataAns) {
						self.checkTrue(isRec, $this);

					} else {
						self.checkFalse(isRec);

					}


				} else {
					self.checkTrue(isRec, $this);
				}
			}
		});
	}

	// 초기화
	this.reset = function () {
		self.drop.removeClass('com').removeAttr('data-drag');
		self.drag.removeClass('com');
		self.count = 0;

		self.drag.each(function () {
			$(this).css({
				'top': $(this).attr('origin-top'),
				'left': $(this).attr('origin-left')
			})
		})

	}

	// 확인하기
	this.clickBtnAns = function (el) {
		var comNum = self.dragArea.find('.drag.com').length;

		if ($('body').attr('ondragstart')) return false;
		if (comNum == self.total) return false;

		//		if ( comNum > 0 && comNum != self.total) {
		COMMONLIBRARY.tools.correctAudio();
		self.drag.addClass('com');
		self.drop.addClass('com');

		self.drag.each(function (idx) {
			$(this).css({
				'top': self.wrap.find('.drop' + $(this).attr('data-ans')).css('top'),
				'left': self.wrap.find('.drop' + $(this).attr('data-ans')).css('left'),
			})
		})

		//		} else {
		//			return false;
		//		}

	}

	// 다시하기
	this.clickBtnRe = function (el) {
		var comNum = self.dragArea.find('.drag.com').length;
		if (comNum === 0) return false;
		ado_stop();
		COMMONLIBRARY.tools.clickAudio();
		self.reset();
	}

	// 정답
	this.checkTrue = function (dragObj, dropObj) {
		COMMONLIBRARY.tools.correctAudio();

		dragObj.draggable({
			revert: false
		})
		dragObj.removeAttr('style');
		dragObj.css({
			'top': dropObj.css('top'),
			'left': dropObj.css('left'),
		})

		dragObj.addClass('com');
		dragObj.css('z-index', 1);

		dropObj.addClass('com');
		self.count++;

		if (self.count >= self.total) {
			self.btnAns.addClass('on dis');
		}
	}

	// 오답
	this.checkFalse = function (dragObj) {
		COMMONLIBRARY.tools.wrongAudio();
		dragObj.draggable({
			revert: true
		})
	}


}

// 슬라이딩 페이이징
pageingContents = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.pageNum = wrap.find('.page').length;
	this.currentPage = 0;
	this.next, this.prev, this.navi, this.dot

	this.init = function () {
		self.wrap.find('.navigation').remove();
		self.currentPage = 0;
		self.wrap.find('.page').hide();
		self.wrap.find('.page').eq(0).show();
		self.makeNavi();

		self.next.on('click', function () {
			self.nextClick($(this));
		});

		self.prev.on('click', function () {
			self.prevClick($(this));
		});

		self.dot.each(function () {
			$(this).on('click', function () {
				if ($(this).hasClass('on')) return false;
				var p = $(this).index();
				self.currentPage = p;
				self.pageMove(self.currentPage);
			});
		});

		//		$('#cimgPreload .pageConetents').remove();
		//		self.wrap.find('.page').each(function (i) {
		//			var b = $(this).css('background-image');
		//			b = b.split('/');
		//			var imgSrc = 'inc/images/' + b[b.length - 2] + '/' + b[b.length - 1].split('.')[0] + '.png';
		//			$('#cimgPreload').append('<div class="pageConetents" style=background-image:url(' + imgSrc + ')>');
		//		});

	}

	this.makeNavi = function () {
		var html = '<div class="navigation"></div>';
		self.wrap.append(html);
		self.navi = self.wrap.find('.navigation');
		var prev = '<div class="prev dis"></div>';
		var next = '<div class="next"></div>'
		var pageing = '<div class="pageing"><div class="dotWrap"></div></div>';
		self.navi.append(prev + next + pageing);
		var dot = '<div class="dot"></div>';
		for (var i = 0; i < self.pageNum; i++) {
			self.navi.find('.dotWrap').append(dot);
		}
		self.navi.find('.pageing .dot').eq(0).addClass('on');
		self.navi.find('.pageing').css('width', (24 * self.pageNum) + (28 * (self.pageNum - 1)) + 70 + 'px');
		self.navi.find('.pageing').css('left', 783.5 - Number(self.navi.find('.pageing').css('width').split('px')[0]) / 2);
		//		self.navi.find('.pageing').css('left', 783.5 - (((78 * self.pageNum) + 10) / 2) + 'px');
		self.navi.find('.dotWrap').css('width', (24 * self.pageNum) + (28 * (self.pageNum - 1)));

		self.next = self.navi.find('.next');
		self.prev = self.navi.find('.prev');
		self.dot = self.navi.find('.pageing .dot');
	}

	this.nextClick = function (el) {
		if (el.hasClass('dis')) return false;
		self.currentPage = self.currentPage + 1;
		self.pageMove(self.currentPage);
	}

	this.prevClick = function (el) {
		if (el.hasClass('dis')) return false;
		self.currentPage = self.currentPage - 1;
		self.pageMove(self.currentPage);
	}

	this.pageMove = function (page) {
		self.currentPage = page;
		self.wrap.find('.page').hide();
		self.wrap.find('.page').eq(self.currentPage).show();
		self.navi.find('.pageing .dot').removeClass('on');
		self.navi.find('.pageing .dot').eq(self.currentPage).addClass('on');

		// 1단계 위 부모에 현재 page 표시
		self.wrap.parent().attr('data-cur', (page + 1));

		//		effectAdo('click');
		COMMONLIBRARY.tools.clickAudio();
//		$('.dis').removeClass('dis');
		self.prev.removeClass('dis');
		self.next.removeClass('dis');
		
		if (self.currentPage == 0) {
			self.prev.addClass('dis');
		} else if (self.currentPage + 1 == self.pageNum) {
			self.next.addClass('dis');
		}
	};
}

// 도장
stampContents = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.timer, this.timer2;


	this.init = function () {
		this.makeHtml();

		var time = self.wrap.find('.stamp').css('animation-duration');
		time = time.replace('s', '');
		time = (Number(time) * 1000) - 700;

		var time2 = time - 700;

		this.timer = setTimeout(function () {
			self.wrap.find('.st').show();
		}, time);

		this.timer2 = setTimeout(function () {
			// effectAdo('stamp');
		}, time2);
	}

	this.makeHtml = function () {
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

// 통합교과
// 확장자를 포함한 html파일명 추출
function getFileName() {
	var ksUrl = window.location.href;
	ksUrl = ksUrl.substring(ksUrl.lastIndexOf('/') + 1);
	return (ksUrl.match(/[^.]+(\.[^?#]+)?/) || [])[0].split('?')[0];
}
// 통합교과
// 가이드용 밑그림
// <div id="wrap"/> 밑에 <div class="tt blk"/>가 있을 경우 테스터 동작
(function () {
	$(function () {
		if ($('.tt').length === 0) {
			return false;
		}
		var ksPageNo = getFileName().split('.').slice(0, -1)[0].split('_').pop();
		$('.tt').css('background', 'url(img/' + ksPageNo + '/tt' + '1' + '.png) no-repeat 0 0 / cover');
		//		$('.setContent li').on('click', function () {
		//			try {
		//				$('.tt').css('background', 'url(inc/images/' + ksPageNo + '/tt' + ($(this).index() + 1) + '.png) 0 0 no-repeat');
		//			} catch (error) {}
		//		});

	});

})();

// 함께읽기 123
$(document).on('click', '.btn-tobtn', function () {
	var self = $(this);
	self.addClass('on');
	self.parent().find('.to').show().addClass('motion');
	var time = self.parent().find('.to').css('animation-duration');
	time = time.replace('s', '');
	time = Number(time) * 1000;

	COMMONLIBRARY.tools.clickAudio();
	effectAdo('count');
	timer = setTimeout(function () {
		self.removeClass('on');
		self.parent().find('.to').hide().removeClass('motion');
	}, time + 2000);
});

// 준비물 팝업 닫기
$(document).on('click', '.btn-materials', function () {
	var pop = $(this).attr('data-pop');

	// 체크박스 있는 경우 초기화
	if ($('.' + pop).find('[type=checkbox]').length > 0) {
		$('.' + pop).find('[type=checkbox]').prop('checked', false);;
	}
})

// 끄기, 켜기
$(document).on('click', '.btnSwitch', function () {
	COMMONLIBRARY.tools.clickAudio();
	var parent = $(this).parent();
	var obj = parent.find('.switchObj');
	$(this).toggleClass('re');
	obj.toggleClass('on');

})

// 팝업 열기
$(document).on('click', '[data-pop]', function () {
	COMMONLIBRARY.tools.clickAudio();
	var pop = $(this).attr('data-pop');

	$('.' + pop).show();
})


// 팝업 닫기
$(document).on('click', '.pop .btn-close, .fullpop .btn-close', function () {
	$(this).parent('.pop').hide();
})

// 확인하기, 문제더하기
var quizContent = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.type = wrap.attr('data-quiz');
	this.btnConfirm = wrap.find('.btn-answer-show');
	this.btnRe = wrap.find('.btnRetry');
	this.question = wrap.find('[question]');
	this.answer = wrap.find('[answer]');

	this.answerWrap = wrap.find('.answer-wrap');
	this.total = self.answerWrap.length;

	this.ansWrap = self.wrap.find('.ansWrap');
	this.data_ans = self.ansWrap.attr('data-ans');
	this.array = [];

	this.ansOXResult;


	this.init = function () {
		if (self.type === 'ansItem') {
			self.ansItemInit();

		} else if (self.type === 'ansOX') {
			self.ansOXInit();

		} else if (self.type === 'inputChoice') {
			self.inputChoice();
		}
	}

	// 1. 정답아이템
	this.ansItemInit = function () {

		// 정답아이템 클릭
		self.answerWrap.on('click', function () {
			//COMMONLIBRARY.tools.clickAudio();
			self.itemToggle($(this));
			var open = self.wrap.find('.answer-item.on').length;
			ado_stop();

			//			if ($(this).find('[answer]').hasClass('on')) {
			//
			//			} else {
			//				ado_stop();
			//				COMMONLIBRARY.tools.clickAudio();
			//			}
			//
			if (self.total === open) {
				COMMONLIBRARY.tools.correctAudio();
			} else {
				COMMONLIBRARY.tools.clickAudio();
			}
		})

		// 확인하기
		self.btnConfirm.on('click', function () {
			var open = self.wrap.find('.answer-item.on').length;
			if (self.total === open) return false;

			//			COMMONLIBRARY.tools.clickAudio();
			COMMONLIBRARY.tools.correctAudio();
			self.allShow();

		})

		// 다시하기
		self.btnRe.on('click', function () {
			var open = self.wrap.find('.answer-item.on').length;
			if (open === 0) return false;

			var state = false;
			self.answer.each(function () {
				if ($(this).hasClass('on')) {
					state = true;
					return false;
				}
			})

			if (state) {
				ado_stop();
				COMMONLIBRARY.tools.clickAudio();
				self.allHide();
			}
		})

	}

	// 2. ox 둘 중 하나 선택
	this.ansOXInit = function () {
		self.ansOXResult = false;
		var $dataItem = self.wrap.find('[data-ans]');
		$dataItem.removeClass('on com');

		// 아이템클릭
		$dataItem.on('click', function () {
			var option = self.wrap.find('[data-ans="true"]').length;

			// 정답 1개인 경우
			if (option === 1) {
				COMMONLIBRARY.tools.clickAudio();
				$dataItem.removeClass('on');
				$(this).addClass('on');

			} else {
				// 2개씩 여러개 묶음
				if (self.wrap.find('.quizSet').length > 0) {
					var quizSet = $(this).parents('.quizSet');
					var option2 = quizSet.find('[data-ans="true"]').length;

					if (option2 === 1) {
						COMMONLIBRARY.tools.clickAudio();
						quizSet.find('[data-ans]').removeClass('on');
						$(this).addClass('on');
					}

				} else {
					// 정답 2개 이상인 경우 - 정답 개수만큼만 체크 가능
					if (self.wrap.find('[data-ans].on').length >= option && !$(this).hasClass('on')) return false;
					COMMONLIBRARY.tools.clickAudio();
					$(this).toggleClass('on');
				}


			}
		})

		// 확인하기
		self.btnConfirm.on('click', function () {
			var option = self.wrap.find('[data-ans="true"]').length;

			if (self.wrap.find('[data-ans]').hasClass('com')) return false;

			// 답을 선택했을 때
			if (self.wrap.find('[data-ans].on').length > 0) {
				var result = true;
				self.wrap.find('[data-ans="true"]').each(function () {
					if (!$(this).hasClass('on')) {
						COMMONLIBRARY.tools.wrongAudio();
						self.ansOXResult = false;
						result = false;
						return false;
					}
				})

				if (result) {
					COMMONLIBRARY.tools.correctAudio();
					self.ansOXResult = true;
				}

				self.wrap.find('[data-ans]').removeClass('on').addClass('com');

			} else {
				ado_stop();
				COMMONLIBRARY.tools.correctAudio();
				self.wrap.find('[data-ans]').removeClass('on').addClass('com');
			}


		})

		// 다시하기
		self.btnRe.on('click', function () {
			self.ansOXResult = false;
			var state = false;
			if ($dataItem.length > 0) {
				$dataItem.each(function () {
					// 하나라도 선택되어 있으면
					if ($(this).hasClass('on') || $(this).hasClass('com')) {
						state = true;
						return false;
					}
				})
			}

			if (state) {
				ado_stop();
				COMMONLIBRARY.tools.clickAudio();
				self.wrap.find('[data-ans]').removeClass('on com');
			}
		})

	}

	// 2. ox 둘 중 하나 선택 - 초기화
	this.ansOXReset = function () {
		self.wrap.find('[data-ans]').removeClass('on com');
	}

	// 3. 기호 선택
	this.inputChoice = function () {
		self.ansWrap.html('');
		self.answerWrap.find('button').removeClass('on');
		self.btnConfirm.removeClass('com');
		self.array = [];

		// 아이템클릭
		self.answerWrap.find('button').off('click').on('click', function () {
			var html = $(this).siblings('.answer-item').html()
			var txt = ''

			//			if($(this).hasClass('on')){
			//				$(this).removeClass('on')
			//				for(var i = 0; i < self.array.length; i ++){
			//					if(self.array[i].indexOf(html) > -1) self.array.splice(i, 1);
			//				}
			//			}
			//			else{
			//				$(this).addClass('on')
			//				self.array.push(html)
			//			}

			$(this).addClass('on');
			self.array.push(html);

			for (var i = 0; i < self.array.length; i++) txt += self.array[i]

			self.ansWrap.html(txt)
			self.btnConfirm.removeClass('com')
			self.btnRe.removeClass('com')

			COMMONLIBRARY.tools.popupAudio();
		})


		// 확인하기
		self.btnConfirm.off('click').on('click', function () {
			if ($(this).hasClass('com')) return false;
			//			if (self.ansWrap.html() == '' || self.ansWrap.html().length !== self.data_ans.length || $(this).hasClass('com')) return false;

			if (self.ansWrap.html().length > 0) {
				self.ansWrap.html() == self.data_ans ? COMMONLIBRARY.tools.correctAudio() : COMMONLIBRARY.tools.wrongAudio();

			} else {
				COMMONLIBRARY.tools.correctAudio();
			}


			self.ansWrap.html(self.data_ans);
			self.array = self.data_ans.split('');
			$(this).addClass('com');

			self.wrap.addClass('com');

			self.answerWrap.find('button').addClass('on');
		})

		// 다시풀기
		self.btnRe.off('click').on('click', function () {
			if (self.ansWrap.html() == '') return false;
			self.ansWrap.html('')
			self.wrap.find('.on, .com').removeClass('com')
			self.array = []
			self.init();
			COMMONLIBRARY.tools.clickAudio();

			self.wrap.removeClass('com');
		})

	}

	// 보이기
	this.allShow = function () {
		self.question.removeClass('on').addClass('off hide');
		self.answer.removeClass('off').addClass('on');
	}

	// 숨기기
	this.allHide = function () {
		self.question.removeClass('off hide').addClass('on');
		self.answer.addClass('off').removeClass('on');
	}

	// 정답아이템 토글
	this.itemToggle = function (el) {
		el.find('[question]').toggleClass('off hide');
		el.find('[answer]').toggleClass('on');
	}
}

// 팝업 열기
$(document).on('click', '[data-pop]', function () {
	//	ado_stop();
	COMMONLIBRARY.tools.clickAudio();

	var pop = $(this).attr('data-pop');
	$('.' + pop).show();

	// 마지막페이지 깨몽 준비물
	if ($(this).hasClass('chaMong')) {
		$(this).toggleClass('on');

		if (!$(this).hasClass('on')) {
			$('.' + pop).hide();
		}
	}
})

// 정답아이텝 - 토글
toggleContents = function (wrap) {
	var self = this;
	this.wrap = wrap;

	this.answerWrap = wrap.find('.answer-wrap');

	this.question = wrap.find('[question]');
	this.answer = wrap.find('[answer]');

	this.total = self.answer.length;
	this.btnAll = '';
	this.btnRe = '';

	this.init = function () {

		// 아이템 클릭
		self.answerWrap.on('click', function () {
			COMMONLIBRARY.tools.clickAudio();

			$(this).find('.btn-answer').toggleClass('off hide');
			$(this).find('.answer-item').toggleClass('on');
		})

		if (wrap.find('.btnWrap button').length > 0) {
			self.btnAll = wrap.find('.btnAll');
			self.btnRe = wrap.find('.btnRe');

			self.btnRe.prop('disabled', false);

			// 모두보기
			self.btnAll.on('click', function () {
				var open = self.wrap.find('.answer-item.on').length;

				if (self.total === open) return false;

				COMMONLIBRARY.tools.clickAudio();
				self.question.addClass('off hide');
				self.answer.addClass('on');
			})

			// 다시하기
			self.btnRe.on('click', function () {
				var open = self.wrap.find('.answer-item.on').length;

				if (open === 0) return false;
				COMMONLIBRARY.tools.clickAudio();
				self.question.removeClass('off hide');
				self.answer.removeClass('on');
			})
		}

	}

	this.reset = function () {
		self.question.removeClass('off hide');
		self.answer.removeClass('on');
	}
}

// 객관식 - 선택한것 순서대로 텍스트 표시
multipleChoice1 = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.choiceList = wrap.find('.nt_choiceList');
	this.choice = wrap.find('.nt_choiceList li');

	this.resultList = wrap.find('.resultList');
	this.result = wrap.find('.resultList li')

	this.ans = self.resultList.attr('data-ans');

	this.btnShow = wrap.find('.btn-answer-show');
	this.btnRetry = wrap.find('.btnRetry');

	this.total = self.choice.length;
	var count = 0;

	this.init = function () {
		self.reset();

		// 보기 클릭
		self.choice.on('click', function () {
			// 재클릭불가
			if ($(this).hasClass('on')) return false;

			$(this).addClass('on');
			COMMONLIBRARY.tools.clickAudio();

			var html = $(this).attr('data-num');

			self.result.eq(count).html(html);
			count++;
			if (count >= self.total) count = 0;

		})

		// 확인하기
		self.btnShow.on('click', function () {
			if (self.resultList.find('.com').length === self.total) return false;
			// 사용자 입력
			var userInput = '';
			self.result.each(function () {
				userInput += $(this).html();
			})

			// 모두 선택된 경우
			if (self.choiceList.find('.on').length === self.total) {
				// 정답
				if (userInput === self.ans) {
					ado_stop();
					COMMONLIBRARY.tools.correctAudio();
					self.result.addClass('com');

				} else { //오답
					ado_stop();
					COMMONLIBRARY.tools.wrongAudio();
					self.showAns();
					self.choice.removeClass('on');
					self.result.addClass('com');
				}

			} else {
				ado_stop();
				COMMONLIBRARY.tools.correctAudio();
				self.showAns();
				self.choice.removeClass('on');
				self.result.addClass('com');
			}

		})

		// 다시하기
		self.btnRetry.on('click', function () {
			var userInput = '';
			self.result.each(function () {
				userInput += $(this).html();
			})

			if (userInput === '') return false;

			COMMONLIBRARY.tools.clickAudio();
			self.reset();
		})
	}

	this.showAns = function () {
		self.choiceList.addClass('com');
		self.choice.removeClass('on');

		self.result.html('');

		self.result.each(function (idx) {
			$(this).html(self.ans.split('')[idx]);
		})
	}

	// 초기화
	this.reset = function () {
		count = 0;

		self.result.html('');
		self.result.removeClass('com');

		self.choiceList.removeClass('com');
		self.choice.removeClass('on');
	}
}

// 객관식 - 기본 (선택한것 파란색으로 표시)
multipleChoice2 = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.choiceList = wrap.find('.nt_choiceList');
	this.choice = wrap.find('.nt_choiceList li');

	this.ans = self.choiceList.attr('data-ans');
	this.ansTotal;

	this.btnShow = wrap.find('.btn-answer-show');
	this.btnRetry = wrap.find('.btnRetry');

	this.count = 0;
	this.init = function () {
		self.reset();

		self.ansTotal = self.ans.split(',').length;

		// 정답1개
		if (self.ansTotal === 1) {
			self.choice.on('click', function () {
				if ($(this).hasClass('on')) return false;
				COMMONLIBRARY.tools.clickAudio();
				$(this).addClass('on').siblings().removeClass('on');
			})

		} else if (self.ansTotal > 1) { // 정답 2개이상
			self.choice.on('click', function () {
				if (self.count < self.ansTotal) {
					COMMONLIBRARY.tools.clickAudio();
					$(this).toggleClass('on');

					if ($(this).hasClass('on')) {
						self.count++;
					} else {
						self.count--;
					}

				} else {
					if ($(this).hasClass('on')) {
						$(this).removeClass('on');
						self.count--;
					}
					return false;
				}

			})
		}

		// 확인하기
		self.btnShow.on('click', function () {
			self.clickShow();
		})

		// 다시풀기
		self.btnRetry.on('click', function () {
			self.clickRetry();
		})

	}


	// 확인하기
	this.clickShow = function () {
		// 이미 확인하기 한 경우
		if (self.choiceList.hasClass('com')) return false;

		var str = '';
		self.choice.each(function () {
			if ($(this).hasClass('on')) {
				str += $(this).index() + 1;
			}
		})

		var arr = self.ans.split(',');
		self.choiceList.addClass('com');

		// 입력 없는 경우
		if (str == '') {
			COMMONLIBRARY.tools.correctAudio();
			self.choice.removeClass('on');
			$.each(arr, function (idx, item) {
				self.choiceList.find('li').eq(parseInt(item) - 1).addClass('com');
			})

		} else { // 입력 있는 경우
			if (self.ansTotal >= 2) {
				var newArr = str.split('');
				str = "";
				$.each(newArr, function (index, item) {
					str += item;
					if ((index + 1) !== arr.length) {
						str += ','
					}
				})

				console.log(str);
			}

			if (str === self.ans) {
				COMMONLIBRARY.tools.correctAudio();
				self.choice.removeClass('on');
				$.each(arr, function (idx, item) {
					self.choiceList.find('li').eq(parseInt(item) - 1).addClass('com');
				})

			} else {
				COMMONLIBRARY.tools.wrongAudio();
				$.each(arr, function (idx, item) {
					self.choiceList.find('li').eq(parseInt(item) - 1).removeClass('on').addClass('com');
				})
			}
		}

	}

	// 다시풀기
	this.clickRetry = function () {
		if (self.choiceList.find('.on').length === 0 && !self.choiceList.hasClass('com')) return false;

		COMMONLIBRARY.tools.clickAudio();
		self.reset();
	}

	// 초기화
	this.reset = function () {
		self.wrap.find('.com').removeClass('com');
		self.wrap.find('.on').removeClass('on');
		self.count = 0;
	}

}

initialContent = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.answerWrap = wrap.find('.answer-wrap');
	this.total = wrap.find('.answer-wrap').length;
	this.initialItem = wrap.find('.initialItem');

	this.btnInitial = wrap.find('.btnInitial');
	this.btnConfirm = wrap.find('.btn-answer-show');
	this.btnRe = wrap.find('.btn-answer-blind');

	this.question = wrap.find('[question]');
	this.answer = wrap.find('[answer]');

	this.count = 0;

	this.init = function () {
		self.btnRe.prop('disabled', false);

		// 초성보기 버튼 클릭
		self.btnInitial.on('click', function () {
			var open = self.wrap.find('[answer].on').length;
			if (self.total === open) return false;

			COMMONLIBRARY.tools.clickAudio();

			if (!$(this).hasClass('re')) {
				$(this).addClass('re');
				self.wrap.find('.btn-answer').each(function () {
					if (!$(this).hasClass('off hide')) {
						$(this).siblings('.initialItem').addClass('on');
					}
				})

			} else {
				$(this).removeClass('re');
				self.initialItem.removeClass('on');
			}

		})


		// 초성 클릭
		self.initialItem.on('click', function () {
			$(this).toggleClass('on');
		})

		// 정답아이템 클릭
		self.answerWrap.on('click', function () {
			if ($(this).find('[answer]').hasClass('on')) {
				self.count--;

			} else {
				self.count++;
			}

			//			COMMONLIBRARY.tools.clickAudio();

			$(this).find('[question]').toggleClass('off hide');
			$(this).find('[answer]').toggleClass('on');

			if (self.total === self.count) {
				ado_stop();
				COMMONLIBRARY.tools.correctAudio();
				//				console.log(self.count);
				self.btnInitial.addClass('re dis');

			} else {
				ado_stop();
				COMMONLIBRARY.tools.clickAudio();

				if (self.wrap.find('.initialItem.on').length === 0) {
					self.btnInitial.removeClass('re dis');
				}
			}
		})

		// 확인하기
		self.btnConfirm.on('click', function () {
			self.count = self.total;

			var open = self.wrap.find('[answer].on').length;
			if (open === self.total) return false;

			ado_stop();
			COMMONLIBRARY.tools.correctAudio();

			self.initialItem.removeClass('on');
			self.btnInitial.addClass('re dis');
			self.allShow();
		})

		// 다시하기
		self.btnRe.on('click', function () {
			self.count = 0;

			// 수정 2022-01-05
			var open1 = self.wrap.find('[answer].on').length;
			var open2 = self.wrap.find('.initialItem.on').length;
			if (open1 === 0 && open2 === 0) return false;

			ado_stop();
			COMMONLIBRARY.tools.clickAudio();
			self.reset();
		})

	}

	// 초기화
	this.reset = function () {
		self.count = 0;

		self.btnRe.prop('disabled', false);
		self.btnInitial.removeClass('re dis');
		self.initialItem.removeClass('on');

		self.allHide();

	}

	// 보이기
	this.allShow = function () {
		self.question.removeClass('on').addClass('off hide');
		self.answer.removeClass('off').addClass('on');

		self.answerWrap.addClass('on');
	}

	// 숨기기
	this.allHide = function () {
		self.question.removeClass('off hide').addClass('on');
		self.answer.addClass('off').removeClass('on');

		self.answerWrap.removeClass('on');
	}

}

// 순차
sequenceContens = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.answer = wrap.find('.answer-wrap');
	this.btnAll = wrap.find('.btnAll');
	this.btnRe = wrap.find('.btnRe');
	this.total = wrap.find('.answer-wrap').length;

	this.init = function () {
		self.reset();

		self.answer.on('click', function () {
			if ($(this).hasClass('on')) return false;

			COMMONLIBRARY.tools.clickAudio();
			$(this).addClass('on');

			if ($(this).next().length > 0) {
				$(this).next().addClass('ready');
			}

			//			토글해제
			//			if ($(this).hasClass('on')) {
			//				$(this).removeClass('on ');
			//				if ($(this).next().length > 0) {
			//					$(this).nextAll().removeClass('ready on');
			//				}
			//
			//			} else {
			//				$(this).addClass('on');
			//				if ($(this).next().length > 0) {
			//					$(this).next().addClass('ready');
			//				}
			//			}

		})

		// 모두보기
		self.btnAll.on('click', function () {
			var open = self.wrap.find('.answer-wrap.on').length;

			if (self.total === open) return false;
			COMMONLIBRARY.tools.clickAudio();
			self.answer.addClass('on');

		})

		// 다시하기
		self.btnRe.on('click', function () {
			var open = self.wrap.find('.answer-wrap.on').length;

			if (open === 0) return false;
			COMMONLIBRARY.tools.clickAudio();
			self.answer.removeClass('ready on');
			self.wrap.find('.answer-wrap').eq(0).addClass('ready');
			
			// 스크롤박스 있는 경우
			if (self.wrap.find('.scrollbox').length > 0) {
				self.wrap.find('.scrollbox').mCustomScrollbar("scrollTo", '0px', 'y');
//				self.wrap.find('.scrollbox').mCustomScrollbar("scrollTo", 0);
			}

		})
	}

	this.reset = function () {
		self.answer.removeClass('ready on');
		self.wrap.find('.answer-wrap').eq(0).addClass('ready');
		self.btnRe.prop('disabled', false);
	}
}

// 인라인영상 정지버튼
$(document).on('click', '.inVideo btton.stop', function () {
	console.log('eee');

	//	var $base = $(this).parents('.inVideo');
	//	$base.find('.pop').hide();
	//	var pop = $base.find('.pop').attr('class').split(' ')[1];
	//	$('[data-pop=' + pop + ']').show();

})
