'use strict';

COMMONLIBRARY.createNs('tools');


COMMONLIBRARY.tools = (function () {


	return {
		/* 사운드준비 */
		init:function(){
			COMMONLIBRARY.tools.soundSet(); //사운드 준비
			COMMONLIBRARY.tools.slideInit();

			if (!$('.videoWrap').closest('.ui-modal').length) {
				COMMON_METHOD_VIDEO();
			}

			$("body").addClass("real");
			$('.btn-answer-blind').prop('disabled', true);
			$('[data-component]').on('getScaleChange', function() {
				COMMONLIBRARY.view.setScale();
			});

			$('.btn-answer').each(function(){
				if ($(this).hasClass('off')) {
					$(this).attr('state','off');
				}
			})
		},
		soundSet:function(){
			if (!$('.btnSoundClick').length) {
				var audioEle = document.createElement('audio');
				var soundUrl = '../../../common/media/popup_b.mp3';
				audioEle.setAttribute('class', 'btnSoundClick');
				audioEle.setAttribute('src', soundUrl);
				audioEle.setAttribute('type', 'audio/mpeg');
				$("body").append(audioEle);
			}

			if (!$('.btnSoundOk').length) {
				var audioEleOk = document.createElement('audio');
				var soundUrl2 = '../../../common/media/correct_b.mp3';
				audioEleOk.setAttribute('class', 'btnSoundOk');
				audioEleOk.setAttribute('src', soundUrl2);
				audioEleOk.setAttribute('type', 'audio/mpeg');
				$("body").append(audioEleOk);
			}

			if (!$('.btnSoundNo').length) {
				var audioEleNo = document.createElement('audio');
				var soundUrl3 = '../../../common/media/wrong_b.mp3';
				audioEleNo.setAttribute('class', 'btnSoundNo');
				audioEleNo.setAttribute('src', soundUrl3);
				audioEleNo.setAttribute('type', 'audio/mpeg');
				$("body").append(audioEleNo);
			}

			if (!$('.btnSoundPopup').length) {
				var audioElePopup = document.createElement('audio');
				var soundUrl4 = '../../../common/media/popup_b.mp3';
				audioElePopup.setAttribute('class', 'btnSoundPopup');
				audioElePopup.setAttribute('src', soundUrl4);
				audioElePopup.setAttribute('type', 'audio/mpeg');
				$("body").append(audioElePopup);
			}

			if (!$('.btnSoundTab').length) {
				var audioEleTab = document.createElement('audio');
				var soundUrl5 = '../../../common/media/tab_b.mp3';
				audioEleTab.setAttribute('class', 'btnSoundTab');
				audioEleTab.setAttribute('src', soundUrl5);
				audioEleTab.setAttribute('type', 'audio/mpeg');
				$("body").append(audioEleTab);
			}
			if (!$('.btnXylophone01').length) {
				var audioEleXlp = document.createElement('audio');
				var soundUrl6_01 = '../../../common/media/tab_b.mp3';
				audioEleXlp.setAttribute('class', 'btnXylophone01');
				audioEleXlp.setAttribute('src', soundUrl6_01);
				audioEleXlp.setAttribute('type', 'audio/mpeg');
				$("body").append(audioEleXlp);
			}
			if (!$('.btnXylophone02').length) {
				var audioEleXlp2 = document.createElement('audio');
				var soundUrl6_02 = '../../../common/media/tab_b.mp3';
				audioEleXlp2.setAttribute('class', 'btnXylophone02');
				audioEleXlp2.setAttribute('src', soundUrl6_02);
				audioEleXlp2.setAttribute('type', 'audio/mpeg');
				$("body").append(audioEleXlp2);
			}

			$('input[type="checkbox"]').on('change', function(){
				if ($(this).prop('checked')) {
					COMMONLIBRARY.tools.clickAudio();
				}
			});
		},
		playXlpAudio: function () {
			var playXlpAudio = document.getElementsByClassName('btnXylophone01')[0];
			if (!playXlpAudio.ended) {
				playXlpAudio.currentTime = 0;
			}
			playXlpAudio.play();
		},
		playXlpAudio2: function () {
			var playXlpAudio = document.getElementsByClassName('btnXylophone01')[0];
			if (!playXlpAudio.ended) {
				playXlpAudio.currentTime = 0;
			}
			playXlpAudio.play();
		},
		clickAudio: function () {
			var clickAudio = document.getElementsByClassName('btnSoundClick')[0];
			if (!clickAudio.ended) {
				clickAudio.currentTime = 0;
			}
			clickAudio.play();
		},
		correctAudio: function(){
			var correctAudio = document.getElementsByClassName('btnSoundOk')[0];
			if (!correctAudio.ended) {
				correctAudio.currentTime = 0;
			}
			correctAudio.play();
		},
		wrongAudio: function(){
			var wrongAudio = document.getElementsByClassName('btnSoundNo')[0];
			if (!wrongAudio.ended) {
				wrongAudio.currentTime = 0;
			}
			wrongAudio.play();
		},
		popupAudio: function(){
			var popupAudio = document.getElementsByClassName('btnSoundClick')[0];
			if (!popupAudio.ended) {
				popupAudio.currentTime = 0;
			}
			popupAudio.play();
		},
		tabAudio: function(){
			var tabAudio = document.getElementsByClassName('btnSoundTab')[0];
			if (!tabAudio.ended) {
				tabAudio.currentTime = 0;
			}
			tabAudio.play();
		},

		answerCheck: function (a, b, s, t) {
			// a : target
			// b : true & false
			// s : sound

			// ox일때 사용
			// ox="o", ox="x"
			// oxgroup="name"
			var $scope = t !== undefined ? t : $('body');
			var $btn = $scope.find('[question="' + a + '"]');
			var $cont = $scope.find('[answer="' + a + '"]');
			var $wrap = $btn.closest('.ui-allcheck');//check여부
			var oxGroup = $btn.attr('oxgroup');//OX문제
			var initial = $btn.attr('initial');//초성문제
			var $q = $scope.find('[question]');
			var $a = $scope.find('[answer]');
			var $btnAllShow = $('.btn-answer-show');
			var $btnAllHide = $('.btn-answer-blind');
			var q_all = 0;
			var q_cur = 0;

			if (initial) {
				//초성 : 두번 클릭 (off > hide)
				if (b) {
					//보이기
					if (a === 'all') {
						$q.removeClass('on').addClass('off hide').prop('disabled', true);
						$a.removeClass('off').addClass('on');
					} else {
						if (!$btn.hasClass('off')) {
							$btn.removeClass('on').addClass('off');
						} else {
							$btn.addClass('hide').prop('disabled', true);
							$cont.removeClass('off').addClass('on');
						}
						$btnAllHide.prop('disabled', false);
					}
				} else {
					//숨기기
					(a === 'all') ?
						actHide($q, $a, $wrap):
						actHide($btn, $cont, $('.ui-allcheck'));
				}
			} else {
				//기본: 한번 클릭
				if (b) {
					//보이기
					(a === 'all') ?
						actShow($q, $a):
						actShow($btn, $cont);
				} else {
					//숨기기
					(a === 'all') ?
						actHide($q, $a, $wrap):
						actHide($btn, $cont, $('.ui-allcheck'));
				}
			}

			if (a === 'all') {
				if (b) {
					$btnAllShow.prop('disabled', true);
					$btnAllHide.prop('disabled', false);
					$('.ui-allcheck').addClass('allchecked');

					!!$('.dragQuiz-wrap').length && COMMONLIBRARY.tools.quizDragCorrect();
				} else {
					$btnAllShow.prop('disabled', false);
					$btnAllHide.prop('disabled', true);
					$('.ui-allcheck').removeClass('allchecked');
					$('.ui-allcheck').attr('check', 0);

					(!!$('.dragQuiz-wrap').length && s !== 'no') && COMMONLIBRARY.tools.quizDragReset();
				}
			}

			function actShow(a, b){
				// var $scope = $('body');

				if (!!$('.tab-pnl.selected').length) {
					$scope = $('.tab-pnl.selected');
				} else {
					if (!!$('.slidepage').length) {
						$scope = $('.slidepage > .slidepage-wrap > .slidepage-item').eq(Number($('.slidepage').attr('current')) - 1);
					}
				}

				q_all = $scope.find('[answer]').length;
				q_cur = $scope.find('.on[answer]').length;
				a.removeClass('on').addClass('off hide').prop('disabled', true);
				b.removeClass('off').addClass('on');
				$btnAllHide.prop('disabled', false);
			}

			function actHide(a, b, c){
				a.each(function(){
					$(this).attr('state') === 'off' ?
						a.removeClass('hide').addClass('on').prop('disabled', false):
						a.removeClass('off').removeClass('hide').addClass('on').prop('disabled', false);
				});
				b.removeClass('on').addClass('off');
			}

			//ui-allcheck 밑에 정답확인 한 갯수 체크 전체 체크 시 allchecked
			if (!!$wrap.length) {
				var checkN = Number($wrap.attr('check'));
				var answerN = Number($wrap.attr('answer'));
				var ox = $btn.attr('ox');

				if ($wrap.attr('check') === undefined){
					$wrap.attr('check', 0);
					checkN = Number($wrap.attr('check'));
				}

				if ($wrap.attr('answer') === undefined) {
					answerN = $wrap.find('button').length;
					checkN = checkN + 1;
				} else {
					if (ox === 'o') {
						checkN = checkN + 1;
					}
				}

				$wrap.attr('check', checkN);

				if (answerN === checkN) {
					$wrap.addClass('allchecked');
				} else {
					$wrap.removeClass('allchecked');
				}
			}

			//OX 타입일때 X 클릭시 O 체크
			if (!!$btn.attr('ox')) {
				$('[oxgroup="' + oxGroup +'"]').removeClass('on').addClass('off').prop('disabled', true);
				var qname = $btn.attr('question');

				if (!b) {
					$('[oxgroup="' + oxGroup +'"]').each(function(){
						var qname2 = $(this).attr('question');
						$('[answer="' + qname2 +'"]').removeClass('off').addClass('on');
					});
					$('[answer="' + qname +'"]').removeClass('on').addClass('off').prop('disabled', true);

				} else {
					console.log(2222)
					$('[answer="' + qname +'"]').removeClass('off').addClass('on');
				}
			}
			//사운드
			if (s !== 'no') {
				if (s !== undefined) {
					//s 정답 오답 구분 사운드 사용 시
					if ($btn.attr('ox') !== undefined) {
						b ? COMMONLIBRARY.tools.correctAudio() : COMMONLIBRARY.tools.wrongAudio();
					} else {
						if (q_all !== q_cur) {
							COMMONLIBRARY.tools.clickAudio();
						} else {
							(a !== 'all' && b) && COMMONLIBRARY.tools.clickAudio();
							(a === 'all' && !b) && COMMONLIBRARY.tools.clickAudio();
						}
					}
				} else {
					//기본 사운드
					COMMONLIBRARY.tools.clickAudio();
				}
			}
		},
		nextEvent: function () {
			$('#wrap').addClass('next');
			COMMONLIBRARY.tools.tabAudio();
		},
		prevEvent: function () {
			$('#wrap').removeClass('next');
			COMMONLIBRARY.tools.tabAudio();
		},
		loadSlide: function() {
			// this = COMMONLIBRARY.tools
			var _this = this;
			var slideTotal = $('.slidepage').length;
			if(slideTotal > 1) {
				$('.slidepage').each(function() {
					var targetEl = $(this);
					var idName = targetEl.attr('id');
					_this.slideInit(1, idName);
				});
			}else if(slideTotal === 1){
				_this.slideInit();
			}
		},
		//슬라이드 페이지
		slideInit: function(v, idname){
			var _v = v;
			var _idname = idname;

			if (_idname === undefined) {
				$('.slidepage').each(function() {
					_idname = $(this).attr('id');
					act(_v, _idname);
				});
			} else {
				act(_v, _idname);
			}

			function act(v, idname) {
				var $base = idname === undefined ? $('.slidepage') : $('#' + idname);
				var $item = $base.find('> .slidepage-wrap > .slidepage-item');
				var pagination = !!$base.attr('paging');
				var len = $item.length;
				var v = v !== undefined ? Number(v) : 1;
				var baseId = $base.attr('id');

				$base.removeAttr('sum').attr('sum', len);
				$base.find('> .slidepage-paging').remove();
				(!$base.attr('current')) && $base.attr('current', v);
				$item.css('width', $base.outerWidth());
				$base.find('> .slidepage-wrap').css('width', $base.outerWidth() * $item.length);

				$base.find('.btn-prev').attr('idname', baseId);
				$base.find('.btn-next').attr('idname', baseId);

				if (Number($base.attr('current')) === 1) {
					$base.find('.btn-prev.fix').addClass('disabled').prop('disabled', true);
					$base.find('.btn-next.fix').removeClass('disabled').prop('disabled', false);
				} else if (Number($base.attr('current')) === len) {
					$base.find('.btn-next.fix').addClass('disabled').prop('disabled', true);
					$base.find('.btn-prev.fix').removeClass('disabled').prop('disabled', false);
				}

				if (len === 1) {
					$base.find('.btn-prev.fix').hide();
					$base.find('.btn-next.fix').hide();
				}

				if (pagination) {
					var pagingHtml = "";

					pagingHtml += '<div class="slidepage-paging">';
					for (var i = 0; i < len; i++) {
						pagingHtml += '<span class="n'+ (i + 1) +'" ></span>';
					}
					pagingHtml += '</div>';

					$base.append(pagingHtml);
					pagingHtml = '';
				}
			}
		},
		actSlide: function (v, idname, callback) {
			//v 이동할 슬라이드 페이지
			var $base = idname === undefined ? $('.slidepage') : $('#' + idname);
			var n = v;
			var len = Number($base.attr('sum'));
			var baseId = $base.attr('id');
			var $next = $base.find('.btn-next[idname="'+baseId+'"]');
			var $prev = $base.find('.btn-prev[idname="'+baseId+'"]');

			if (v === 'next') {
				$prev.removeClass('disabled').prop('disabled', false);
				n = Number($base.attr('current')) + 1;

				if (len >= n) {
					$base.find('> .slidepage-wrap').css('left', $base.outerWidth() * (n - 1) * -1 );
					$base.attr('current', n);
					if (len === n) {
						$next.addClass('disabled').prop('disabled', true);
					} else {
						$next.removeClass('disabled').prop('disabled', false);
					}
				}
			} else if (v === 'prev') {
				$next.removeClass('disabled').prop('disabled', false);
				n = Number($base.attr('current'));

				if (0 <= n) {
					var _n = n - 1;
					_n = _n <= 0 ? 1 : _n;

					$base.find('> .slidepage-wrap').css('left', $base.outerWidth() * (_n - 1) * -1 );
					$base.attr('current', _n );
					if (1 === _n) {
						$prev.addClass('disabled').prop('disabled', true);
					} else {
						$prev.removeClass('disabled').prop('disabled', false);
					}
				}

			} else {
				$base.find('> .slidepage-wrap').css('left', $base.outerWidth() * (v - 1) * -1 );
				$base.attr('current', v);

				if (v === 1) {
					$prev.addClass('disabled').prop('disabled', true);
					$next.removeClass('disabled').prop('disabled', false);
				} else if (v === len) {
					$next.addClass('disabled').prop('disabled', true);
					$prev.removeClass('disabled').prop('disabled', false);
				} else {
					$next.removeClass('disabled').prop('disabled', false);
					$prev.removeClass('disabled').prop('disabled', false);
				}
			}
			$base.find('.ui-word').removeClass('on');
			COMMONLIBRARY.tools.answerCheck('all', false, 'no', $base);
			!$('body').data('soundnot') && COMMONLIBRARY.tools.tabAudio();
			!$('body').data('soundnot', false);
			callback !== undefined && callback($base.attr('current'));
		},

		//기본탭
		toggleTab:function(v, n, callback){
			// v : tab="name"
			// n : n='number"
			var $tabBtn = $('.tab-btn[tab="'+ v +'"]');
			var $tabBtnCurrent = $('.tab-btn[tab="'+ v +'"][n="'+ n +'"]');
			var $tabPnl = $('.tab-pnl[tab="'+ v +'"]');
			var $tabPnlCurrent = $('.tab-pnl[tab="'+ v +'"][n="'+ n +'"]');

			$tabBtn.removeClass('selected');
			$tabBtnCurrent.addClass('selected');
			$tabPnl.removeClass('selected');
			$tabPnlCurrent.addClass('selected');

			COMMONLIBRARY.tools.answerCheck('all', false, 'no');
			COMMONLIBRARY.tools.tabAudio();
			callback !== undefined && callback();
		},

		//토글 별점 포인트
		togglePoint:function(v){
			var $this = $(v);
			var $item = $this.parent().find('button');
			var idx = $this.index();
			var len = $item.length;
			var n = 1;

			$item.removeClass('on');

			for (var i = 0; i < idx + n; i++) {
				$item.eq(i).addClass('on');
			}
			// COMMONLIBRARY.tools.clickAudio();
			// (idx === len - 1) ?
			// 	COMMONLIBRARY.tools.correctAudio() :
			// 	COMMONLIBRARY.tools.clickAudio();

		},

		//스스로 평가하기
		toggleOnself: function(v){
			var $body = $('body');

			switch (v) {
				case 'toggle' :
					if (!$body.hasClass('onself-modal')) {
						$body.addClass('onself-modal');
						COMMONLIBRARY.tools.popupAudio();
					} else {
						$body.removeClass('onself-modal');
					}
					break;
				case 'open' :
					$body.addClass('onself-modal');
					COMMONLIBRARY.tools.popupAudio();
					break;
				case 'close' :
					$body.removeClass('onself-modal');
					break;
			}

		},

		//모달 열기
		modalOpen: function (v, callback, sound) {
			var $modal = $('#' + v);
			var callback = callback;
			$('body').data('soundnot', true);
			$modal.removeClass('close').addClass('ready');
			if ($modal.find('.video').length) {
				COMMON_METHOD_VIDEO(v);
			}

			setTimeout(function () {
				$modal.addClass('open');
				!!callback && callback();
			}, 0);
			if(sound === undefined){
				!$('.ui-modal.open').length && COMMONLIBRARY.tools.popupAudio();
			}
		},
		//모달 닫기
		modalClose: function (v, callback) {
			var $modal = $('#' + v);
			var callback = callback;

			$modal.find('#videoStop').trigger('click');
			$modal.removeClass('open').addClass('close');
			$modal.find('.video > *').remove();

			if(!!$modal.find('video').length) {
				$modal.find('video').remove();
				$('#videoControls').remove();
			}

			!!callback && callback();
			setTimeout(function () {
				$modal.removeClass('ready');
			}, 300);
		},

		// 모달 닫기2(비디오사라지지않게) --2021-11-25-PGE
		modalClose2: function (v, callback) {
			var $modal = $('#' + v);
			var callback = callback;

			$modal.find('#videoStop').trigger('click');
			$modal.removeClass('open').addClass('close');
			$modal.find('.video > *').remove();

//			if(!!$modal.find('video').length) {
//				$modal.find('video').remove();
//				$('#videoControls').remove();
//			}

			!!callback && callback();
			setTimeout(function () {
				$modal.removeClass('ready');
			}, 300);
		},

		//초성 퀴즈
		// questionInitial: function () {
		// 	$('.question-initial .question-item button').on('click.qi', function () {
		// 		var $item = $(this).closest('.question-item');
		// 		var step = $item.attr('step');

		// 		if (step === undefined) {
		// 			$item.attr('step', '1');
		// 		} else if (step === '1') {
		// 			$item.attr('step', '2');
		// 		}

		// 		COMMONLIBRARY.tools.clickAudio();
		// 	});
		// },

		//OX퀴즈
		quizOXStart: function (v) {
			var $OX = $('#modalOX');
			var $OXq = $OX.find('.ox-q');
			var $next = $OX.find('.btn-ox-next');
			var current = Number($OXq.attr('n'));
			var time = 15;
			var n = 0;

			$('.ox-q').removeClass('type-exp').attr('exp', 0);

			if (v !== 'next') {
				v === undefined ? v = 1 : '';
				current = v - 1;

				COMMONLIBRARY.tools.quizOXTimerStop();

				if (current >= 10) {
					$OXq.addClass('type-exp');
					COMMONLIBRARY.tools.quizOXTimerStop();
					COMMONLIBRARY.tools.quizOXExp(0);
					return false;
				} else {
					(current === 9) ?
						$next.addClass('exp'):
						$next.removeClass('exp');

					$OXq.attr('n', current + 1);
					$OX.find('.ox-q-n b').text('문제 ' + (current + 1));
				}
			} else if (v === 'next') {
				COMMONLIBRARY.tools.quizOXTimerStop();
				if (current >= 10) {
					$OXq.addClass('type-exp');
					COMMONLIBRARY.tools.quizOXTimerStop();
					COMMONLIBRARY.tools.quizOXExp(0);
					return false;
				} else {
					(current === 9) ?
						$next.addClass('exp'):
						$next.removeClass('exp');

					$OXq.attr('n', current + 1);
					$OX.find('.ox-q-n b').text('문제 ' + (current + 1));
				}
			}

			$OX.removeClass('result');
			$OX.find('.timer').text('00:' + time);
			if (!$('body').data('ox')) {
				$('body').data('ox', true);
			} else {
				COMMONLIBRARY.tools.tabAudio();
			}

			$('.type-ox .btn-close').off('click.ox').on('click.ox', function(){
				$('body').data('ox', false);
			});

			countTime();
			function countTime() {
				COMMONLIBRARY.tools.quizOXStart.timer = setTimeout(function () {
					n = n + 1;
					var c = time - n;
					if (c > 0) {
						$OX.find('.timer').text('00:' + (c < 10 ? '0' + c : c));
						countTime();
					} else {
						$OX.find('.timer').text('00:' + (c < 10 ? '0' + c : c));
						COMMONLIBRARY.tools.quizOXResult();
					}
				}, 1000);
			}
		},
		quizOXTimerStop: function () {
			clearTimeout(COMMONLIBRARY.tools.quizOXStart.timer);
		},
		quizOXResult: function (v) {
			var $OX = $('#modalOX');
			var $OXq = $OX.find('.ox-q');
			var current = Number($OXq.attr('n'));
			var answer = $OX.find('.ox-q-cont .txt').find('.n' + current).attr('ox');
			var autoplay = !!$OX.attr('autoplay') ? true : false;
			var time = 3;
			var n = 0;

			$OX.data('ing', true);
			COMMONLIBRARY.tools.quizOXTimerStop();

			function countTime() {
				COMMONLIBRARY.tools.quizOXStart.timer = setTimeout(function () {
					n = n + 1;
					var c = time - n;

					if (c > 0) {
						countTime();
					} else {
						COMMONLIBRARY.tools.quizOXStart('next');
					}
				}, 1000);
			}
			if (current <= 10) {
				$OXq.removeClass('type-exp');
				$OX.find('.timer').text('00:00');
				$OX.find('.ox-result').removeClass('type-x');

				if (answer !== 'o') {
					$OX.find('.ox-result').addClass('type-x');
				}

				(answer === v) ?
					COMMONLIBRARY.tools.correctAudio():
					COMMONLIBRARY.tools.wrongAudio();

				$OX.addClass('result');
				autoplay && countTime();

			} else {
				$OXq.addClass('type-exp');
			}
		},
		//OX퀴즈 해설
		quizOXExp: function (v) {
			var $OX = $('#modalOX');
			var $OXq = $OX.find('.ox-q');

			COMMONLIBRARY.tools.quizOXTimerStop();
			//COMMONLIBRARY.tools.tabAudio();

			$OXq.find('.ox-q-n b').text('문제' + v);
			$OXq.find('.exp-n').text(v + ' 번 해설');
			$OXq.attr('n', 0).attr('exp', v);
		},

		//darg퀴즈 리셋
		quizDragReset: function(v, s){
			var $wrap = v !== undefined ? $('#' + v) :$('.dragQuiz-wrap');
			var $item = $wrap.find('.dragQuiz-item');
			var $area = $wrap.find('.dragQuiz-area');
			var $svg = $wrap.find('svg');

			$area.removeClass('ok').removeAttr('full');
			$('.dragQuiz-item.clone').remove();

			$item.each(function(){
				var $this = $(this);

				$this.prop('disabled', false).removeClass('ok');
				$this.removeAttr('style');
				// $this.css({
				// 	top: $this.attr('orgt') + 'px',
				// 	left: $this.attr('orgl') + 'px'
				// });

				if (!!$this.attr('line')) {
					var nm = $this.attr('name');

					$svg.find('line[name="'+ nm +'"]')
						.attr('x2', $this.attr('linex'))
						.attr('y2', $this.attr('liney'));
				}
			});
			s !== 'no' && COMMONLIBRARY.tools.popupAudio();

		},
		quizDragCorrect: function(v){
			var $wrap_ = v !== undefined ? $('#' + v) : $('.dragQuiz-wrap');

			$wrap_.each(function(){
				var $wrap = $(this);
				var $item = $wrap.find('.dragQuiz-item.original');
				var $area = $wrap.find('.dragQuiz-area');
				var $svg = $wrap.find('svg');
				var scale = COMMONLIBRARY.view.scale;

				$area.addClass('ok');
				$item.each(function(){
					var $this = $(this);

					$this.prop('disabled', true).addClass('ok');

					if (!!$this.attr('line')) {
						var nm = $this.attr('name');
						var strokWidth = Number($svg.find('line[name="'+ nm +'"]').attr('stroke-width'));
						var y = $this.position().top / scale + Number($this.outerHeight() / 2);
						var x = $this.position().left / scale + Number($this.outerWidth() / 2);

						$svg.find('line[name="'+ nm +'"]')
							.attr('x2', x)
							.attr('y2', y);
					}
				});

			});
			//COMMONLIBRARY.tools.correctAudio();
		},
		//darg퀴즈
		quizDrag: function (v, callback, sound) {
			var $wrap = $('#' + v);
			var $item = $wrap.find('.dragQuiz-item');
			var $area = $wrap.find('.dragQuiz-area');
			var scale = COMMONLIBRARY.view.scale;
			var $svg = $wrap.find('svg');
			var callback = callback !== undefined ? callback : false;

			//기본값 세팅
			var timer = '';
			$(window).off('resize.aaa').on('resize.aaa', function () {
				clearTimeout(timer);

				timer = setTimeout(function(){
					COMMONLIBRARY.view.setScale();
					//COMMONLIBRARY.tools.quizDragReset();
					set();
				},500);
			});
			set();
			function set() {
				scale = COMMONLIBRARY.view.scale;
				$item.each(function (i) {
					var $this = $(this);

					$this.addClass('original');
					$this.attr('orgt', ($this.offset().top / scale - $wrap.offset().top / scale) );
					$this.attr('orgl', ($this.offset().left / scale - $wrap.offset().left / scale) );

					if (!$this.attr('onlymove')) {
						$this.after($this.clone().removeClass('original').addClass('clone').prop('disabled', true));
					}
					if (!!$this.attr('line')) {
						var nm = $this.attr('name');
						var strokWidth = 4 * scale;
						var lineX = Number($this.attr('orgl')) + ($this.outerWidth() / 2) * scale - strokWidth / 2;
						var lineY = Number($this.attr('orgt')) + ($this.outerHeight() / 2) * scale - strokWidth / 2;

						$this.attr('linex', lineX);
						$this.attr('liney', lineY);
						$svg.find('line[name="' + nm + '"]')
							.attr('x1', lineX)
							.attr('y1', lineY)
							.attr('x2', lineX)
							.attr('y2', lineY)
							.attr('stroke-width', strokWidth);
					}
				});

				$wrap.attr('ts', $wrap.offset().top);
				$wrap.attr('te', $wrap.offset().top + $wrap.outerHeight() * scale);
				$wrap.attr('ls', $wrap.offset().left);
				$wrap.attr('le', $wrap.offset().left + $wrap.outerWidth() * scale);

				$area.each(function (i) {
					scale = COMMONLIBRARY.view.scale;
					var $this = $(this);

					$this.attr('ts', $this.offset().top * scale);
					$this.attr('te', $this.offset().top * scale + $this.outerHeight() * scale);
					$this.attr('ls', $this.offset().left * scale);
					$this.attr('le', $this.offset().left * scale + $this.outerWidth() * scale);
				});

				$item.off('mousedown.drag').on('mousedown.drag', function (e) {
					scale = COMMONLIBRARY.view.scale;
					//dragStart(e, this);
					var $this = $(this);
					var $dragQuizWrap = $this.closest('.dragQuiz-wrap');
					var itemName = $this.attr('name');
					var $area = $dragQuizWrap.find('.dragQuiz-area[name="' + itemName + '"]');
					var wrapW = $dragQuizWrap.outerWidth();
					var wrapH = $dragQuizWrap.outerHeight();
					var itemW = $this.outerWidth() * scale;
					var itemH = $this.outerHeight() * scale;
					var moving = false;
					var onlymove = !!$this.attr('onlymove');
					var line = !!$this.attr('line');
					var x, y;

					var scopeW = wrapW - itemW,
						scopeH = wrapH - itemH;

					var arrTs = [],
						arrTe = [],
						arrLs = [],
						arrLe = [];

					var off_tw = $wrap.offset().top / scale,
						off_lw = $wrap.offset().left / scale,
						off_t = $this.position().top / scale,
						off_l = $this.position().left / scale;


					for (var i = 0, len = $area.length; i < len; i++) {
						arrTs.push($area.eq(i).position().top);
						arrTe.push($area.eq(i).position().top + $area.eq(i).outerHeight() * scale);
						arrLs.push($area.eq(i).position().left);
						arrLe.push($area.eq(i).position().left + $area.eq(i).outerWidth() * scale);
					}
					$('body').attr('dragend', 'false');
					$this.css({
						top: off_t + 'px',
						left: off_l + 'px'
					});

					$(document).off('mousemove.drag').on('mousemove.drag', function (e) {
						moving = true;

						if (e.touches !== undefined) {
							y = e.touches[0].pageY / scale;
							x = e.touches[0].pageX / scale;
						} else {
							if (e.pageY !== undefined) {
								y = e.pageY / scale;
								x = e.pageX / scale;
							}
							if (e.pageY === undefined) {
								y = e.clientY / scale;
								x = e.clientX / scale;
							}
						}

						var $body = $('body');
						var nowT = y - (itemH / 2)  - off_tw;
						var nowL = x - (itemW / 2) - off_lw;

						if (0 > nowT) {
							nowT = 0;
						}
						if (scopeH < nowT) {
							nowT = scopeH;
						}
						if (0 > nowL) {
							nowL = 0;
						}
						if (scopeW < nowL) {
							nowL = scopeW;
						}
						if (onlymove) {
							COMMONLIBRARY.tools.quizDrag.percent = function(){
								var per = [nowT / scopeH * 100, nowL / scopeW * 100];
								return per;
							};
							!!callback && callback([nowT / scopeH * 100, nowL / scopeW * 100, { target:$this, area:$area } ] );
							for (var i = 0; i < arrTs.length; i++) {
								var isInVer = (nowT * scale > arrTs[i] - (itemH * scale / 2) && nowT * scale < arrTe[i] - (itemH * scale / 2));
								var isInHor = (nowL * scale > arrLs[i] - (itemW * scale / 2) && nowL * scale < arrLe[i] - (itemW * scale / 2));

								if (isInVer && isInHor) {
									if (Number($body.attr('dragps')) !== i) {
										$body.attr('dragps', i);
									}
									break;
								} else {
									if (0 <= nowT && scopeH >= nowT && 0 <= nowL && scopeW >= nowL) {
										$body.removeAttr('dragps');
									}
								}
							}
							$('.btn-answer-blind').prop('disabled', false);
						}

						if (line) {
							var lineName = $this.attr('name');
							var lineX = Number(nowL) + Number($this.outerWidth() / 2);
							var lineY = Number(nowT) + Number($this.outerHeight() / 2);

							$svg.find('line[name="' + lineName + '"]')
								.attr('x2', lineX)
								.attr('y2', lineY);

							(0 > nowT) && $svg.find('line[name="' + lineName + '"]').attr('y2', 0);
							(scopeH < nowT) && $svg.find('line[name="' + lineName + '"]').attr('y2', scopeH);
							(0 > nowL) && $svg.find('line[name="' + lineName + '"]').attr('x2', 0);
							(scopeW < nowL) && $svg.find('line[name="' + lineName + '"]').attr('x2', scopeW);
						}

						$this.css({
							top: nowT + 'px',
							left: nowL + 'px'
						});
					}).off('mouseup.drag').on('mouseup.drag', function (e) {
						if (moving && !onlymove) {
							var nowT = $this.position().top + (itemH / 2);
							var nowL = $this.position().left  + (itemW / 2);
							var $area_;
							var isIn;

							for (var i = 0; i < arrTs.length; i++) {
								isIn = (nowT > arrTs[i] && nowT < arrTe[i]) && (nowL > arrLs[i] && nowL < arrLe[i]);
								$area_ = $area.eq(i);

								if (isIn && !$area_.attr('full')) {
									if (!$area_.attr('full')) {
										if (!!$area_.attr('limit')) {
											$area_.attr('full', true);
											$area_.addClass('ok');
										} else {
											$area_.addClass('ok');
										}

										$this.addClass('ok');
										$this.prop('disabled', true);
										if (!!callback && typeof callback === 'function') {
											callback({
												current: i,
												target: $area_
											});
										}
										if (sound === undefined || sound !== 'nosound') {
											COMMONLIBRARY.tools.correctAudio();
										}
										$('.btn-answer-blind').prop('disabled', false);
									}
								}
							}

							if (!$this.hasClass('ok')) {

								if (line) {
									var lineName = $this.attr('name');
									$svg.find('line[name="' + lineName + '"]')
										.attr('x2', $this.attr('linex'))
										.attr('y2', $this.attr('liney'));
								}

								$this.stop().animate({
									top: $this.attr('orgt') + 'px',
									left: $this.attr('orgl') + 'px'
								});

								if (sound === undefined || sound !== 'nosound') {
									COMMONLIBRARY.tools.wrongAudio();
								}

								!!callback && callback(false);
							}
						}

						if (moving && onlymove){
							$('body').attr('dragend', 'true');
							var per =  COMMONLIBRARY.tools.quizDrag.percent();

							!!callback && callback([per[0], per[1], { target:$this, area:$area } ] );
						}
						$(document).off('mousemove.drag');
						$(document).off('mouseup.drag');
					});
				});
			}
		},
		uiScene: function(v, n, opt) {
			var $scene = $('[scene="'+ v +'"]');
			var _n = n === undefined ? 1 : n;
			var opt = opt;
			var $re =  $('.btn-answer-re, .btn-reset, .btn-answer-blind .type-reset');

			if (!$scene.hasClass('scene-end')) {
				var _pas = $('[scene="'+ v +'"][scenenum="'+ (_n) +'"]').attr('pause');

				if (_pas === 'true' || _pas === 'false') {
					sceneEnd();
				} else {
					act();
				}
			}

			function sceneEnd(){
				if (!!$('[scene="'+ v +'"][scenenum="'+ (_n) +'"]').hasClass('scene-ok')) {
					_n = _n + 1;
					if (!!$('[scene="'+ v +'"][scenenum="'+ (_n) +'"]').hasClass('scene-ok')) {
						sceneEnd();
					} else {
						act();
					}
				} else {
					act();
				}
			}

			function act(){
				var $this = $('[scene="'+ v +'"][scenenum="'+ _n +'"]');
				var _delay = Number($this.attr('delay'));
				var _speed = Number($this.attr('speed'));
				var _pause = $this.attr('pause');
				var _audio = $this.attr('audio');

				if (_pause !== 'true') {
					_audio !== undefined && setTimeout(COMMONLIBRARY.tools[_audio],_delay);
					$this.addClass('scene-ok');
					$this.stop().delay(_delay).animate({
						opacity: 1,
						margin: 0,
					}, _speed, function(){
						_n = _n + 1;
 						$('body').attr('scene'+ v, _n - 1);
						if ($('[scene="'+ v +'"][scenenum="'+ _n +'"]').length) {
							act();
						} else {
							$scene.addClass('scene-end');
							$re.removeClass('blind');
						}
						(opt !== undefined && opt.callback !== undefined) && opt.callback();
					});

					$this.queue(function(){
						var that = $(this);
						that.dequeue();
					});
				} else {
					$this.attr('pause', 'false');
					//n !== undefined && act();
				}
			}
		},
		uiSceneReset: function(v) {
			var $scene = $('[scene="'+ v +'"]');
			var $re = $('.btn-answer-re, .btn-reset, .btn-answer-blind .type-reset');

			$re.addClass('blind');
			$scene.each(function(){
				var $this = $(this);
				$this.clearQueue().stop().removeClass('scene-end scene-ok').removeAttr('style');
				if ($this.attr('pause') !== undefined) {
					$this.attr('pause', true);
				}
			});
			COMMONLIBRARY.tools.uiScene(v);
		},
		uiFingerGuide: function(v) {

			var $base = $('.finger-guide[name="'+ v +'"]');
			var mt = $base.attr('mtop');
			var ml = $base.attr('mleft');
			var n = 0;

			if (!$base.attr('end')) {
				$base.show();
				act();
			}
			function act() {
				$base.css({
					transform: 'translate('+ ml +'px, '+ mt +'px)'
				}).addClass('flicker1');

				$base.off().on('transitionend', function(){
					setTimeout(function(){
						$base.fadeOut(300, function(){
							$base.hide().attr('end', true);
						});
					}, 1500);


					// $base.css({
 					// 	transform: 'translate(0, 0)'
					// });
					// $base.on('transitionend', function(){

					// 	n = n + 1;
					// 	(n < 4) ? act() : $base.fadeOut(200, function(){
					// 		$base.hide().attr('end', true);
					// 	});
					// });
				})
			}
		},























		initDraggable: function () {
			var self = this;
			var zoomVal = this.scale;
			var wrap = document.getElementById('wrap');
			var wrapTop = wrap.offsetTop / zoomVal;
			var wrapLeft = wrap.offsetLeft / zoomVal;
			var dragItems = document.getElementsByClassName('dragBox');
			var dragItemLen = dragItems.length;
			var i = 0;
			var btnReplays = document.getElementsByClassName('btn_replay');
			var btnReplayLen = btnReplays.length;
			var dragItem;
			var posX;
			var posY;
			var dragItemW;
			var dragItemH;
			var cloneItem;
			var cloneClass;

			// 클론 좌표 설정
			var setPosition = function (ev) {
				var touchObj;

				if (util.isTouchDevice) {
					touchObj = ev.touches[0];
					posX = touchObj.clientX / zoomVal;
					posY = touchObj.clientY / zoomVal;
				} else {
					posX = ev.clientX / zoomVal;
					posY = ev.clientY / zoomVal;
				}

				cloneItem.style.left = posX - dragItemW / 2 - wrapLeft + 'px';
				cloneItem.style.top = posY - dragItemH / 2 - wrapTop + 'px';
			};

			var startDragItem = function (e) {
				var computedStyle;
				var id = this.closest('.quizType').id;
				var dragContainer = this.closest('.drag_container');
				var target = e.target;

				e.preventDefault();

				if (
					target.tagName === 'input' ||
					target.tagName === 'textarea' ||
					target.classList.contains('btn_zoom') ||
					this.classList.contains('done')
				) {
					return;
				}

				dragItem = this;
				dragItemH = dragItem.clientHeight;
				dragItemW = dragItem.clientWidth;

				// 드래그 요소 복제
				cloneItem = dragItem.cloneNode(true);
				cloneClass = cloneItem.classList;
				cloneClass.add('clone');
				cloneClass.add(id);

				// 복제 제외 요소 처리
				if (dragContainer.dataset.exEle) {
					cloneItem.querySelector(dragContainer.dataset.exEle).remove();
				}

				// css 복제
				computedStyle = window.getComputedStyle(dragItem);
				Array.from(computedStyle).forEach(function (key) {
					var value = computedStyle.getPropertyValue(key);
					if (computedStyle.getPropertyValue(key) !== 'auto') {
						if (util.detectUa() === 'ie') {
							// ie의 경우: width 값으로 innerWidth 값을 가져옴
							if (key === 'width') {
								value = dragItemW + 'px';
							} else if (key === 'height') {
								value = dragItemH + 'px';
							}
						}
						cloneItem.style.setProperty(
							key,
							value,
							computedStyle.getPropertyPriority(key)
						);
					}
				});
				// 클론 삽입
				if (dragItem.closest('.popWrap')) {
					// 팝업 내 콘텐츠인 경우
					dragItem
						.closest('.pop_container')
						.insertAdjacentElement('beforeend', cloneItem);
				} else {
					document
						.getElementById('wrap')
						.insertAdjacentElement('beforeend', cloneItem);
				}

				setPosition(e);

				if (dragContainer.dataset.orgHide !== 'false') {
					dragItem.classList.add('blind');
				}

				document.addEventListener(util.getEventType('move'), moveDragItem);
				document.addEventListener(util.getEventType('up'), finishDragItem);
			};

			var moveDragItem = function (e) {
				// e.preventDefault();
				setPosition(e);
				cloneClass.add('dragging');
			};

			var finishDragItem = function () {
				var cloneRect = cloneItem.getBoundingClientRect();
				var cloneRectX = cloneRect.x ? cloneRect.x : cloneRect.left;
				var cloneRectY = cloneRect.y ? cloneRect.y : cloneRect.top;
				var dropBoxes = dragItem
					.closest('.quizType')
					.querySelectorAll('.dropBox');
				var isOverlap = false;
				var dropEle = null;
				var dropRect = null;
				var dropRectX = 0;
				var dropRectY = 0;
				var dropPointEle = null;
				var dropContainer = null;
				var dropContainerRect = null;
				var dropContainerX = 0;
				var dropContainerY = 0;
				var align = '';
				var beforeCloneEle = null;

				var chkIntersection = function (boxR) {
					var boxRectX = boxR.x ? boxR.x : boxR.left;
					var boxRectY = boxR.y ? boxR.y : boxR.top;

					return !(
						boxRectX > cloneRectX + cloneRect.width ||
						boxRectX + boxR.width < cloneRectX ||
						boxRectY > cloneRectY + cloneRect.height ||
						boxRectY + boxR.height < cloneRectY
					);
				};

				dropBoxes.forEach(function (box) {
					var boxRect = box.getBoundingClientRect();

					if (isOverlap) {
						return;
					} else if (chkIntersection(boxRect)) {
						isOverlap = true;
						dropEle = box;
					} else {
						isOverlap = false;
					}
				});

				document.removeEventListener(util.getEventType('move'), moveDragItem);
				document.removeEventListener(util.getEventType('up'), finishDragItem);

				if (
					// 드랍 영역 매치 안되거나 중복되면 클론 제거
					!isOverlap ||
					dragItem.dataset.drag !== dropEle.dataset.drop ||
					cloneItem.dataset.dragMatch !== dropEle.dataset.dragMatch
				) {
					cloneItem.remove();
					dragItem.classList.remove('blind');
					dropPointEle = document.elementFromPoint(
						posX * zoomVal,
						posY * zoomVal
					);
					if (dropPointEle.className.indexOf('drag') === -1) {
						self.playFeedSound(false);
					}
				} else {
					dropContainer = dropEle.closest('.drop_container');
					align = dropContainer.dataset.align;
					beforeCloneEle = cloneItem.previousElementSibling;

					dragItem.classList.add('done');
					cloneClass.remove('dragging');
					cloneClass.add('done');

					// 클론 드랍박스 안 위치 수정
					if (!align) {
						dropRect = dropEle.getBoundingClientRect();
						dropRectX = dropRect.x ? dropRect.x : dropRect.left;
						dropRectY = dropRect.y ? dropRect.y : dropRect.top;

						cloneItem.style.left =
							dropRectX / zoomVal +
							(dropEle.clientWidth - dragItemW) / 2 -
							wrapLeft +
							'px';
						cloneItem.style.top =
							dropRectY / zoomVal +
							(dropEle.clientHeight - dragItemH) / 2 -
							wrapTop +
							'px';
					} else if (align === 'left') {
						dropContainerRect = dropContainer.getBoundingClientRect();
						dropContainerX = dropContainerRect.x
							? dropContainerRect.x
							: dropContainerRect.left;
						dropContainerY = dropContainerRect.y
							? dropContainerRect.y
							: dropContainerRect.top;

						while (
							beforeCloneEle.classList.contains('clone') &&
							beforeCloneEle.dataset.drag !== cloneItem.dataset.drag
						) {
							beforeCloneEle = beforeCloneEle.previousElementSibling;
						}

						if (beforeCloneEle.classList.contains('clone')) {
							cloneItem.style.left =
								beforeCloneEle.offsetLeft +
								beforeCloneEle.clientWidth * dropContainer.dataset.zoom +
								'px';
						} else {
							cloneItem.style.left =
								(dropContainerX - wrap.offsetLeft) / zoomVal + 'px';
						}

						cloneItem.style.top =
							(dropContainerY - wrap.offsetTop + dropContainerRect.height / 2) /
							zoomVal -
							(dragItemH * dropContainer.dataset.zoom) / 2 +
							'px';
					}

					cloneItem.style.transform =
						'scale(' + dropContainer.dataset.zoom + ')';

					// 슬라이드 예외 처리
					if (dragItem.closest('.detailList')) {
						dragItem
							.closest('.slideDetail')
							.querySelectorAll('.detailList')
							.forEach(function (li, idx) {
								if (li === dragItem.closest('.detailList')) {
									cloneItem.classList.add('slide' + idx);
								}
							});
					}

					self.playFeedSound(true);
				}
			};

			var initDragItem = function () {
				var btnAnswers = document.querySelectorAll('.btn_answer');

				for (i = 0; i < btnReplayLen; i++) {
					btnReplays[i].addEventListener('click', function () {
						var id = this.dataset.target;
						var targetQuiz = document.getElementById(id);
						var typeAns = targetQuiz.dataset.typeAns;
						var clones = document.querySelectorAll('.clone.' + id);
						var cloneLen = clones.length;
						var dropBoxEls = document
							.getElementById(id)
							.querySelectorAll('.dropBox');
						var dropBox;
						var j;

						if (typeAns === 'showImg') {
							for (j = 0; j < dropBoxEls.length; j++) {
								dropBoxEls[j].querySelector('.answer').classList.remove('show');
							}
						} else {
							dropBox = dropBoxEls[0];
							dropBox.style.background = '';
						}

						for (j = 0; j < cloneLen; j++) {
							clones[j].remove();
						}

						for (j = 0; j < dragItemLen; j++) {
							dragItems[j].classList.remove('blind');
							dragItems[j].classList.remove('done');
						}
					});

					// 예시 답안
					btnAnswers[i].addEventListener('click', function () {
						var targetId = this.dataset.target;
						var targetQuiz = document.getElementById(targetId);
						var typeAns = targetQuiz.dataset.typeAns;
						var dragEls = targetQuiz.querySelectorAll('.dragBox');
						var dropEls = targetQuiz.querySelectorAll('.dropBox');
						var clones = document.querySelectorAll('.clone.' + targetId);
						var dropEle;
						var answerEle;
						var answerImg;
						var j;

						if (typeAns === 'showImg') {
							for (j = 0; j < dropEls.length; j++) {
								dropEls[j].querySelector('.answer').classList.add('show');
							}
							for (j = 0; j < clones.length; j++) {
								clones[j].remove();
							}
							for (j = 0; j < dragEls.length; j++) {
								dragEls[j].classList.add('done');
							}
						} else {
							answerEle = targetQuiz.querySelector('[data-drag="0"]');
							answerImg = answerEle.querySelector('.img').src;
							dropEle = dropEls[0];
							dropEle.style.background =
								'url("' + answerImg + '") center center';
							answerEle.classList.add('blind');
						}
					});
				}
			};

			for (i = 0; i < dragItemLen; i++) {
				dragItems[i].addEventListener(util.getEventType('down'), startDragItem);
			}

			// 다시 풀기
			if (dragItemLen) {
				initDragItem();
			}
			// 예시 답안
		},
		// 정/오답 효과음
		initFeedSound: function () {
			// audio 생성
			this.corrAudio = document.createElement('audio');
			this.incorrAudio = document.createElement('audio');

			this.corrAudio.src = '../common/media/correct_b.mp3';
			this.corrAudio.id = 'feedOk';
			this.incorrAudio.src = '../common/media/wrong_b.mp3';
			this.incorrAudio.id = 'feedNo';

			document.body.appendChild(this.corrAudio);
			document.body.appendChild(this.incorrAudio);
		},
		// 정/오답 효과음 재생
		playFeedSound: function (isCorrect) {
			var audio;
			if (isCorrect) {
				audio = this.corrAudio;
			} else {
				audio = this.incorrAudio;
			}
			if (!audio.ended) {
				audio.pause();
				audio.currentTime = 0;
			}
			audio.play();
		},
		// 선긋기
		initDrawLine: function () {
			var self = this;
			var containers = document.querySelectorAll('.drawLineContainer');
			var container = null;
			var svgCotainer = null;
			var containerRect = null;
			var containerRectX = 0;
			var containerRectY = 0;
			var line = null;
			var startPoints = [];
			var endPoints = [];
			var startPoint = {};
			var endPoint = {};
			var startDot = null;
			var isReverse = false;

			// 시작점, 끝점 포인트 배열 초기화
			var getPoints = function (cont) {
				cont.querySelectorAll('.startLineContainer .dot').forEach(function (el) {
					var contComputedStyle = window.getComputedStyle(cont);
					var contLeft =
						contComputedStyle.left === 'auto'
							? 0
							: parseInt(contComputedStyle.left, 10);
					var contTop =
						contComputedStyle.top === 'auto'
							? 0
							: parseInt(contComputedStyle.top, 10);
					var dotComputedStyle = window.getComputedStyle(el);
					var dotLeft =
						dotComputedStyle.left === 'auto'
							? 0
							: parseInt(dotComputedStyle.left, 10);
					var dotTop =
						dotComputedStyle.top === 'auto'
							? 0
							: parseInt(dotComputedStyle.top, 10);
					var dotWidth =
						dotComputedStyle.width === 'auto'
							? 0
							: parseInt(dotComputedStyle.width, 10);
					var dotHeight =
						dotComputedStyle.height === 'auto'
							? 0
							: parseInt(dotComputedStyle.height, 10);

					startPoints.push({
						x: dotLeft + dotWidth / 2 - contLeft,
						y: dotTop + dotHeight / 2 - contTop,
					});
				});

				cont.querySelectorAll('.endLineContainer .dot').forEach(function (el) {
					var contComputedStyle = window.getComputedStyle(cont);
					var contWidth =
						contComputedStyle.width === 'auto'
							? 0
							: parseInt(contComputedStyle.width, 10);
					var contTop =
						contComputedStyle.top === 'auto'
							? 0
							: parseInt(contComputedStyle.top, 10);
					var dotComputedStyle = window.getComputedStyle(el);
					var dotRight =
						dotComputedStyle.right === 'auto'
							? 0
							: parseInt(dotComputedStyle.right, 10);
					var dotTop =
						dotComputedStyle.top === 'auto'
							? 0
							: parseInt(dotComputedStyle.top, 10);
					var dotWidth =
						dotComputedStyle.width === 'auto'
							? 0
							: parseInt(dotComputedStyle.width, 10);
					var dotHeight =
						dotComputedStyle.height === 'auto'
							? 0
							: parseInt(dotComputedStyle.height, 10);

					endPoints.push({
						x: contWidth - dotRight - dotWidth / 2,
						y: dotTop + dotHeight / 2 - contTop,
					});
				});
			};

			// svg 생성 및 추가
			var createSvg = function (cont) {
				svgCotainer = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'svg'
				);

				svgCotainer.setAttribute('class', 'svgContainer');
				svgCotainer.setAttribute('width', window.getComputedStyle(cont).width);
				svgCotainer.setAttribute(
					'height',
					window.getComputedStyle(cont).height
				);

				cont.appendChild(svgCotainer);

				getPoints(cont);
				createAnswerLine(cont);
			};

			// 정답 line 생성 및 추가
			var createAnswerLine = function (cont) {
				var answerLine = null;

				cont
					.querySelectorAll('.startLineContainer .dot')
					.forEach(function (el, i) {
						var answer = Number(el.dataset.answer);

						answerLine = document.createElementNS(
							'http://www.w3.org/2000/svg',
							'line'
						);

						answerLine.setAttribute('class', 'answer blind');
						svgCotainer.appendChild(answerLine);

						answerLine.setAttribute('x1', startPoints[i].x);
						answerLine.setAttribute('y1', startPoints[i].y);
						answerLine.setAttribute('x2', endPoints[answer - 1].x);
						answerLine.setAttribute('y2', endPoints[answer - 1].y);
					});
			};

			var setLine = function () {
				line.setAttribute('x1', startPoint.x);
				line.setAttribute('y1', startPoint.y);
				line.setAttribute('x2', endPoint.x);
				line.setAttribute('y2', endPoint.y);
			};

			var startDraw = function (e) {
				e.preventDefault();

				container = this.closest('.drawLineContainer');
				svgCotainer = container.querySelector('.svgContainer');

				if (e.target.classList.contains('dot')) {
					startDot = e.target;
				}

				if (startDot.classList.contains('done')) {
					return;
				}

				var dotIdx = [].indexOf.call(
					startDot.parentElement.querySelectorAll('.dot'),
					startDot
				);
				isReverse = startDot.parentElement.classList.contains(
					'endLineContainer'
				);

				line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				startPoint = isReverse ? endPoints[dotIdx] : startPoints[dotIdx];

				container.addEventListener(util.getEventType('move'), moveDraw);
				container.addEventListener(util.getEventType('up'), endDraw);
				container.addEventListener(util.getEventType('out'), cancelDraw);
			};

			var moveDraw = function (e) {
				var pointX = 0;
				var pointY = 0;

				e.preventDefault();

				containerRect = container.getBoundingClientRect();
				containerRectX = containerRect.x ? containerRect.x : containerRect.left;
				containerRectY = containerRect.y ? containerRect.y : containerRect.top;

				if (util.isTouchDevice) {
					pointX = e.touches[0].clientX;
					pointY = e.touches[0].clientY;
				} else {
					pointX = e.clientX;
					pointY = e.clientY;
				}

				endPoint = {
					x: (pointX - containerRectX) / self.scale,
					y: (pointY - containerRectY) / self.scale,
				};

				setLine();
				svgCotainer.insertBefore(line, svgCotainer.querySelector('line'));
			};

			var endDraw = function (e) {
				var endPointX = util.isTouchDevice
					? e.changedTouches[0].clientX
					: e.clientX;
				var endPointY = util.isTouchDevice
					? e.changedTouches[0].clientY
					: e.clientY;
				var endPointEle = document.elementFromPoint(endPointX, endPointY);
				var endPointIdx = 0;
				var startContainer = null;
				var endContainer = null;
				var lineClass = line.getAttribute('class');

				if (startDot.classList.contains('done')) {
					return;
				}

				startContainer = startDot.parentElement;
				endContainer = endPointEle.parentElement;

				// .dot 영역 && 중복선택X && 정답 && 시작점/끝점끼리 연결X && 다른 svg 컨테이너에 연결X
				if (
					endPointEle.classList.contains('dot') &&
					!endPointEle.classList.contains('done') &&
					// endPointEle.dataset.answer === startDot.dataset.answer &&
					startContainer !== endContainer &&
					endPointEle.closest('.drawLineContainer') === container
				) {
					endPointIdx = [].indexOf.call(
						endPointEle.parentElement.querySelectorAll('.dot'),
						endPointEle
					);

					endPoint = isReverse
						? startPoints[endPointIdx]
						: endPoints[endPointIdx];

					setLine();
					line.setAttribute('class', lineClass + ' done');
					startDot.classList.add('done');
					endPointEle.classList.add('done');
				} else {
					line.remove();
				}

				container.removeEventListener(util.getEventType('move'), moveDraw);
				container.removeEventListener(util.getEventType('up'), endDraw);
				container.removeEventListener(util.getEventType('out'), cancelDraw);
			};

			var cancelDraw = function () {
				line.remove();

				container.removeEventListener(util.getEventType('move'), moveDraw);
				container.removeEventListener(util.getEventType('up'), endDraw);
				container.removeEventListener(util.getEventType('out'), cancelDraw);
			};

			var replayDraw = function () {
				var quizId = this.dataset.target;
				var quiz = document.getElementById(quizId);

				quiz.querySelectorAll('.done').forEach(function (ele) {
					if (ele.tagName === 'line') {
						ele.remove();
					} else {
						ele.classList.remove('done');
					}
				});

				quiz.querySelectorAll('line.answer').forEach(function (ele) {
					var lineClass = ele.getAttribute('class');
					ele.setAttribute('class', lineClass + ' blind');
				});
			};

			var showAnswer = function () {
				var quizId = this.dataset.target;
				var quiz = document.getElementById(quizId);

				quiz.querySelectorAll('line.answer').forEach(function (ele) {
					var lineClass = ele.getAttribute('class');
					ele.setAttribute('class', lineClass.replace('blind', ''));
				});

				quiz.querySelectorAll('.dot').forEach(function (ele) {
					ele.classList.add('done');
				});
			};

			containers.forEach(function (cont) {
				var quizId = cont.closest('.quizType').id;

				createSvg(cont);

				cont.querySelectorAll('.dot').forEach(function (el) {
					el.addEventListener(util.getEventType('down'), startDraw);
				});

				// 다시 풀기
				document
					.querySelector('.btn_replay[data-target="' + quizId + '"]')
					.addEventListener('click', replayDraw);
				// 정답 보기
				document
					.querySelector('.btn_answer[data-target="' + quizId + '"]')
					.addEventListener('click', showAnswer);
			});
		},





		/* 탭 기능 ------------------------------------------------------------------------------- */
		methodTab: function () {
			$(".tabWrap .tabHead li").click(function () {
				var tabWrap = $(this).closest(".tabWrap");
				var tabHead = tabWrap.find(".tabHead");
				var tabBody = tabWrap.find(".tabBody");

				tabHead.find("li").removeClass("on");
				tabBody.find("li").removeClass("on");

				$(this).addClass("on");
				var idx = $(this).index();
				tabBody.find("#tabBody" + idx).addClass("on");
			});
		},

		/* 퀴즈풀기 ------------------------------------------------------------------------------- */
		effectBox: function () {
			$(".effectWrap .btnQ").click(function () { //개별문제 정답확인
				if ($(this).hasClass("trans")) {
					return;
				}

				if (!$(this).hasClass("able")) {
					return;
				}

				//Sound
				var clickAudio = document.getElementsByClassName('btnSoundClick')[0];
				if (!clickAudio.ended) {
					clickAudio.currentTime = 0;
				}
				clickAudio.play();

				//this button : to trans
				$(this).toggleClass("trans");

				var btnList = $(this).parents(".groupWrap").find(".btnQ");
				var bAll = true;

				for (var i = 0; i < btnList.length; i++) {
					if (!$(btnList).eq(i).hasClass("trans")) {
						bAll = false;
						break;
					}
				}
				//group check
				if (bAll) {
					$(".quizBtnWrap .btnCorrect").addClass("re");
				}
				else {
					$(".quizBtnWrap .btnCorrect").removeClass("re");
				}

				//next button : disable -> able
				$(btnList).eq(i).addClass("able");
			});

			/*$(".effectWrap .btnOrderQ").click(function(){ // btnOrderQ 순차적
			   if($(this).data("clickable") !== "on"){
				return;
			   }
			   else{
				$(this).toggleClass("trans");

				var btnList = $(this).parents(".groupWrap").find(".btnOrderQ");
				for (var i = 0; i < btnList.length; i++) {
				  if ($(btnList).eq(i).data("clickable") == "on") {
					$(btnList).eq(i+1).data("clickable","on").addClass("btnQuizbg");
					break;
				  }
				}
				$(this).data("clickable","off");
			   }

			  var clickAudio = document.getElementsByClassName('btnSoundClick')[0];
			  if (!clickAudio.ended) {
				 clickAudio.currentTime = 0;
			  }
			  clickAudio.play();


			  var btnList = $(this).parents(".groupWrap").find(".btnOrderQ");
			  var bAll = true;
			  for (var i = 0; i < btnList.length; i++) {
				if (!$(btnList).eq(i).hasClass("trans")) {
				  bAll = false;
				  break;
				}
			  }

			  if (bAll) {
				$(".quizBtnWrap .btnCorrect").addClass("re");
			  } else {
				$(".quizBtnWrap .btnCorrect").removeClass("re");
			  }

			});*/

			$(".quizBtnWrap .btnCorrect").click(function () { //그룹별 정답확인
				var clickAudio = document.getElementsByClassName('btnSoundClick')[0];
				if (!clickAudio.ended) {
					clickAudio.currentTime = 0;
				}
				clickAudio.play();

				var groupId = "#" + $(this).data("group");

				// btnOrderQ
				var btnList = $(groupId).find(".effectWrap .btnOrderQ");

				if ($(this).hasClass("re")) { //다시 풀기 -> 확인하기
					$(groupId).find(".effectWrap .btnQ, .effectWrap .btnOrderQ").removeClass("trans");
					$(this).removeClass("re");

					$(btnList).data("clickable", "off").removeClass("btnQuizbg");
					$(btnList).eq(0).data("clickable", "on").addClass("btnQuizbg");
				}
				else {  //확인하기 -> 다시 풀기
					$(groupId).find(".effectWrap .btnQ, .effectWrap .btnOrderQ").addClass("trans");
					$(this).addClass("re");

					$(btnList).data("clickable", "off");
				}

				var btnList = $(this).parents(".groupWrap").find(".btnOrderQ");
				$(btnList).removeClass("able");
				$(btnList).addClass("able");

			});

			var audioEle = document.createElement('audio');
			var soundUrl = '../../../common/media/popup_b.mp3';
			audioEle.setAttribute('class', 'btnSoundClick');
			audioEle.setAttribute('src', soundUrl);
			audioEle.setAttribute('type', 'audio/mpeg');
			$("body").append(audioEle);

		},

		/* 슬라이더 페이징  ------------------------------------------------------------------------ */
		slider: function () {
			var sliderWrap = $(".sliderWrap");
			var slide = $(sliderWrap).find(".slideList");
			//슬라이더 없으면 리던
			if ($(slide).length < 1) {
				return;
			}

			//슬라이더 갯수 체크해서 페이징 필요없으면 리턴
			var cnt = $(slide).children().length;
			if (cnt < 2) {
				return;
			}

			//첫번째 슬라이더 보이기
			$(slide).find("li.slide").removeClass("on");
			$(slide).find("li.slide").first().addClass("on");

			//페이징 버튼 붙이기
			$(sliderWrap).append("<a href =\"#\" class=\"btnPrev dim\">이전</a><a href =\"#\" class=\"btnNext\">다음</a>");

			//페이징 버튼 이벤트 처리
			$(document).on('click', '.btnPrev', function () {
				if ($(this).hasClass("dim")) {
					return;
				}

				sliderInit();

				var now = $(slide).find(".slide.on").index();
				now--;

				$(".sliderWrap .slideList .slide").removeClass("on");
				$(".sliderWrap .slideList .slide").eq(now).addClass("on");

				if (now < 1) {
					$(".sliderWrap .btnPrev").addClass("dim");
				}

				$(".sliderWrap .btnNext").removeClass("dim");
			});

			//페이징 버튼 이벤트 처리
			$(document).on('click', '.btnNext', function () {
				if ($(this).hasClass("dim")) {
					return;
				}

				sliderInit();

				var now = $(slide).find(".slide.on").index();
				now++;
				$(".sliderWrap .slideList .slide").removeClass("on");
				$(".sliderWrap .slideList .slide").eq(now).addClass("on");

				$(".sliderWrap .btnPrev").removeClass("dim");


				now++;
				var len = $(".sliderWrap .slideList").children().length;

				if (len == now) {
					$(this).addClass("dim");
				}
			});



			//화면 초기화
			function sliderInit() {
				$(".btnPopToastOpen").removeClass("on");
				$(".btnPopFullOpen").removeClass("on");
				$(".popFullWrap").removeClass("on");
				$(".popToastWrap").removeClass("on");
				$(".effectWrap").removeClass("on");
				$(".effectWrap .btnQ").removeClass("trans");
				$(".btnCorrect").removeClass("re");
			};
		},

		/* 팝업 레이어 ------------------------------------------------------------------------ */
		popLayer: function () {
			//팝업창 닫기
			$(".popFullWrap .btnClose").click(function () {
				$(this).parents(".popFullWrap").removeClass("on");
				if(!!$(this).parents(".popFullWrap").find('video').length) {
					$('#videoStop').trigger('click');
				}
			});

			//레이어 팝업 - 전체창 열기
			$(".btnPopFullOpen").click(function () {
				var popId = $(this).data("pop");
				$("#" + popId).addClass("on");
			});

			//레이어 팝업 - 토스트창 열기
			$(".btnPopToastOpen").click(function () {
				var popId = $(this).data("pop");

				if ($(this).hasClass("on")) {
					$(this).removeClass("on");
					$("#" + popId).removeClass("on");

				}
				else {

					$("#" + popId).addClass("on");
					$(this).addClass("on");
				}
			});
		},


		/* 분수 처리 ------------------------------------------------------------------------ */
		mathForm: function () {
			var fracFormNode = $(".formFraction .frac");
			//frac 없으면 리던
			if ($(fracFormNode).length < 1) {
				return;
			}



			var fracNode;
			var objT;
			var objB;
			for (var i = 0; i < fracFormNode.length; i++) {
				fracNode = $(fracFormNode).eq(i);
				var arr = fracNode.html().split("/");

				objT = document.createElement("span");
				objT.className = 't';
				objT.innerHTML = arr[0];

				objB = document.createElement("span");
				objB.className = 't';
				objB.innerHTML = arr[2];

				$(fracNode).html("");
				$(fracNode).append("<span class='t'>" + arr[0] + "</span><span class='b'>" + arr[1] + "</span>");

			}

		},


		/* 팝업 버튼 처리 ------------------------------------------------------------------------ */
		popBtn: function () {
			return;
			//팝업레이어
			var btn = $(".btnPopFullOpen");
			for (var btni = 0; btni < btn.length; btni++) {

				var showidx = $(btn[btni]).data("showidx");
				if (showidx == "") {
					continue;
				}
				if (!showidx.includes("/")) {
					showidx = showidx + "/";
				}
				var arr = showidx.split("/");

				var slideList = $(".slideList .slide");
				if ($(slideList).length < 1) {
					continue;
				}

				for (var i = 0; i < arr.length; i++) {
					if ($(slideList).eq(i).hasClass("on")) {
						$(btn[btni]).addClass("show");
					}
				}

			}

			//토스트팝업
			btn = $(".btnPopToastOpen");
			for (btni = 0; btni < btn.length; btni++) {

				var showidx = $(btn[btni]).data("showidx");
				if (showidx == "") {
					continue;
				}
				showidx = showidx + "";
				if (!showidx.includes("/")) {
					showidx = showidx + "/";
				}
				var arr = showidx.split("/");

				var slideList = $(".slideList .slide");
				if ($(slideList).length < 1) {
					continue;
				}

				for (var i = 0; i < arr.length; i++) {
					if ($(slideList).eq(i).hasClass("on")) {
						$(btn[btni]).addClass("show");
					}
				}

			}
		},
		// 정/오답 효과음(html)
		initFeedSound_in: function () {
			// audio 생성
			this.corrAudio = document.createElement('audio');
			this.incorrAudio = document.createElement('audio');

			this.corrAudio.src = '../../../common/media/correct_b.mp3';
			this.corrAudio.id = 'feedOk';
			this.incorrAudio.src = '../../../common/media/wrong_b.mp3';
			this.incorrAudio.id = 'feedNo';

			document.body.appendChild(this.corrAudio);
			document.body.appendChild(this.incorrAudio);
		},


	};
})();
