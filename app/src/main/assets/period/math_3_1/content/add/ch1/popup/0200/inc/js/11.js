var clickCon1;
var clickCon2;
var clickCon3;
var clickCon4;
var clickCon5;
var clickCon6;
var clickCon7;
var clickCon8;
var clickCon9;
var totalNum;
var pageCon;
var pop_index = 0;
var easy_page = ['clickPage1', 'clickPage2', 'clickPage3'];
var normal_page = ['clickPage4', 'clickPage5', 'clickPage6'];
var hard_page = ['clickPage7', 'clickPage8', 'clickPage9'];
var easy_rand = [];
var noraml_rand = [];
var hard_rand = [];
var easy_show = [];
var normal_show = [];
var hard_show = [];
var click_page = [];

var stampCon;

var currentPage;

$(window).on('load', function () {
	bgColorChange('#fff');

	$('.introPage').show();

	var easy = 3;
	var normal = 2;
	var hard = 1;

	// 인트로 페이지에 각 문항 클릭시 색상 변하게
	$('.question li').on('click', function () {
		effectAdo('click');
		$(this).addClass('act');
		$(this).siblings().removeClass('act');

		if ($(this).parent().hasClass('easy')) {
			easy = $(this).index();
		} else if ($(this).parent().hasClass('normal')) {
			normal = $(this).index();
		} else {
			hard = $(this).index();
		}
		$('.sum').html(easy + normal + hard)
	});


	// 인트로 페이지에서 시작하기 버튼
	$('.startBtn').click(function () {
		effectAdo('click');
		totalNum = easy + normal + hard;

		//-- add
		easy_rand = shuffleRandom(easy);
		normal_rand = shuffleRandom(normal);
		hard_rand = shuffleRandom(hard);

		easy_show = make_quiz(easy_page, easy_rand, easy);
		normal_show = make_quiz(normal_page, normal_rand, normal);
		hard_show = make_quiz(hard_page, hard_rand, hard);
		click_page = easy_show.concat(normal_show, hard_show);
		// ---------


		if (totalNum == 0) {
			alert('문제를 선택하세요.');
			return false;
		}

		if (totalNum == 1) {
			currentPage = 1;
		}

		$('.setContent li').remove();

		$('.introPage').hide();
		$('.headerSec').show();
		$('.pageing').show(); //--add
		$('.pageing').find('.prev').addClass('dis'); //--add

		for (var i = 0; i < totalNum; i++) {
			if (i < easy) {
				$('.setContent').append('<li class="easy">' + (i + 1) + '</li>');
			} else if (i < (easy + normal)) {
				$('.setContent').append('<li class="normal">' + (i + 1) + '</li>');
			} else if (i < (totalNum)) {
				$('.setContent').append('<li class="hard">' + (i + 1) + '</li>');
			}
		}

		//		$('.setContent li').eq(0).addClass('on');
		$('.setContent li').eq(0).trigger('click'); //--add
		$('.' + click_page[0]).show(); //--add

		$('.pageing .btn').on('click', function () {
			effectAdo('click');
			var cur = $('.setContent li.on').index();
			currentPage = $('.setContent li.on').index();

			if ($(this).hasClass('next')) {
				cur += 1;
			} else {
				cur -= 1;
			}

			$('.setContent li').eq(cur).trigger('click');
		});


	});

	$('.clickPage4 .que li').click(function () {
		effectAdo('click');

		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
		} else {
			$(this).addClass('on');
		}

		if ($('.que1').hasClass('on') && $('.que2').hasClass('on')) {
			$('.que3').removeClass('mask');
		} else {
			$('.que3').addClass('mask');
			$('.que3').removeClass('on');
		}

		if ($('.que3').hasClass('on')) {
			$('.clickPage4 .ansbtn').addClass('re');
		} else {
			$('.clickPage4 .ansbtn').removeClass('re');
		}

	});

	$('.clickPage4 .ansbtn').click(function () {
		if ($(this).hasClass('re')) {
			$(this).removeClass('re');
			$('.clickPage4 .que li').removeClass('on');
			$('.clickPage4 .que3').addClass('mask');
		} else {
			$(this).addClass('re');
			$('.clickPage4 .que3').removeClass('mask');
			$('.clickPage4 .que li').addClass('on');
		}
	});

});

// 상단 탭 클릭(문제번호)
$(document).on('click', '.setContent li', function () {
	$('.finish_btn').removeClass('on');
	effectAdo('click');
	var idx = $(this).index();
	currentPage = idx;
	var page = $('.' + click_page[idx]);

	console.log(page);

	var difficulty = $(this).attr('class');
	$('.setContent li').removeClass('on');
	$(this).addClass('on')

	if (difficulty == 'easy') {
		$('.clickPage').hide();
		$('.' + click_page[idx]).show();

		$('.difficulty').css('background', 'url(inc/images/11/difficulty_easy.png)');

	} else if (difficulty == 'normal') {
		$('.clickPage').hide();
		$('.' + click_page[idx]).show();

		$('.difficulty').css('background', 'url(inc/images/11/difficulty_normal.png)');

	} else if (difficulty == 'hard') {
		$('.clickPage').hide();
		$('.' + click_page[idx]).show();

		$('.difficulty').css('background', 'url(inc/images/11/difficulty_hard.png)');

	}

	if (page.attr('class').indexOf('clickPage1') > -1) {
		clickCon1 = new clickAdoContents(3, $('.clickPage1'));
		clickCon1.init();

		pop_index = 1;

	} else if (page.attr('class').indexOf('clickPage2') > -1) {
		clickCon2 = new clickAdoContents(2, $('.clickPage2'));
		clickCon2.init();

		pop_index = 2;


	} else if (page.attr('class').indexOf('clickPage3') > -1) {
		clickCon3 = new clickAdoContents(3, $('.clickPage3'));
		clickCon3.init();

		pop_index = 3;

	} else if (page.attr('class').indexOf('clickPage4') > -1) {
		clickCon4 = new clickAdoContents(3, $('.clickPage4'));
		clickCon4.init();
		var clickItem = $('.clickPage4 .clickContent .clickItem');

		clickItem.eq(2).addClass('mask');
		$('.clickPage4 .clickContent .clickItem').click(function () {
			$(this).addClass('on');
			$(this).addClass('mask2');
			if (clickItem.eq(0).hasClass('on') && clickItem.eq(1).hasClass('on')) {
				clickItem.eq(2).removeClass('mask');
			} else {
				clickItem.eq(2).addClass('mask');
				clickItem.eq(2).removeClass('on');
			}
		})

		$('.clickPage4 .clickContent .ansbtn').click(function () {
			clickItem.eq(2).addClass('mask');
			clickItem.removeClass('on');
			clickItem.removeClass('mask2');
		})


		pop_index = 4;

	} else if (page.attr('class').indexOf('clickPage5') > -1) {
		clickCon5 = new clickAdoContents(2, $('.clickPage5'));
		clickCon5.init();

		pop_index = 5;

	} else if (page.attr('class').indexOf('clickPage6') > -1) {
		clickCon6 = new clickAdoContents(1, $('.clickPage6'));
		clickCon6.init();

		pop_index = 6;

	} else if (page.attr('class').indexOf('clickPage7') > -1) {
		clickCon7 = new clickAdoContents(1, $('.clickPage7'));
		clickCon7.init();

		pop_index = 7;


	} else if (page.attr('class').indexOf('clickPage8') > -1) {
		clickCon8 = new clickAdoContents(1, $('.clickPage8'));
		clickCon8.init();

		pop_index = 8;

	} else if (page.attr('class').indexOf('clickPage9') > -1) {
		clickCon9 = new clickAdoContents(1, $('.clickPage9'));
		clickCon9.init();

		pop_index = 9;

	}

	$('.solpop').remove();

	var cur = $('.setContent li.on').index();
	var num = $('.setContent li').length;

	$('.pageing .btn').hide()
	if (cur !== 0) $('.pageing .prev').show();
	if (cur !== (num - 1)) $('.pageing .next').show();


	if (cur == num - 1) {
		$('.ansbtn').click(function () {
			if ($(this).hasClass('re')) {
				$('.finish_btn').addClass('on');
			} else {
				$('.finish_btn').removeClass('on');
				$('.bounce2').remove();
			}
		});
	}



});


// solbtn 눌렀을 때 팝업창 만들기
function makePop() {
	var selector = '.clickPage' + pop_index;
	var html2 = '<div class="solpop"><div class="closeBtn"></div></div>'
	//    var html3 = '<div class="closebtn"></div>'
	var url = 'inc/images/11/pop' + pop_index + '.png';
	$(selector).append(html2);
	$('.solpop').css({
		'display': 'block',
		'background': 'url(' + url + ') 0 0 no-repeat'
	});
	// makeMask();
}

// 정답풀이 버튼 눌렀을 때
$(document).on('click', '.solbtn', function () {
	makePop();
	// $('.mask2').show();

	effectAdo('click');

})

// 팝업창 닫기
$(document).on('click', '.closeBtn', function () {
	effectAdo('click');
	if ($(this).css('display') == 'block') {
		$('.solpop').css('display', 'none');
		//        $('.closebtn').remove();
		$('.solpop').remove();
		// removeMask();
		// $('.mask2').hide();
	} else {
		$('.solpop').css('display', 'block');

	}
});

// 랜덤 숫자 생성
function shuffleRandom(n) {
	var ar = new Array();
	var temp;
	var rnum;

	for (var i = 1; i <= n; i++) {
		ar.push(i);
	}

	for (var i = 0; i < ar.length; i++) {
		rnum = Math.floor(Math.random() * n);
		temp = ar[i];
		ar[i] = ar[rnum];
		ar[rnum] = temp;
	}

	return ar;
}

// 난이도에 따라 clickPage 생성
function make_quiz(diff_array, ar, n) {
	var array = [];

	for (var i = 0; i < n; i++) {
		array.push(diff_array[ar[i] - 1]);
	}

	return array;
}

// -------------------------


var clickAdoContents = function (items, wrap) {
	var self = this;
	this.wrap = wrap;
	this.itemwrap = '';
	this.clickItems = items;
	this.openItemNum = 0;
	this.items = '';
	this.ansbtn = '';
	this.init = function () {
		this.openItemNum = 0;

		if (this.wrap.find('.clickItem').length > 0) {
			this.wrap.find('.clickContent').remove();
		}

		if (self.clickItems > 0) {
			this.makeWrap();
			this.makeItem();
			this.makeBtn();

			this.items.on('click', function () {
				if ($(this).css('opacity') == '0') {
					$(this).css('opacity', '1');
					self.openItemNum--;
				} else {
					$(this).css('opacity', '0');
					self.openItemNum++;
				}

				if (currentPage + 1 == totalNum) {

					console.log('currentPage totalNum are same');

					if (self.openItemNum == self.clickItems) {
						$('.finish_btn').addClass('on');
					} else {
						$('.finish_btn').removeClass('on');
					}

				}

				// effectAdo('click');
				if (self.openItemNum == self.clickItems) {
					self.ansbtn.addClass('re');
					effectAdo('anschk_o');
				} else {
					effectAdo('click');
					self.ansbtn.removeClass('re');
				}
			});

			this.ansbtn.on('click', function () {
				// effectAdo('click');
				if ($(this).hasClass('re')) {
					effectAdo('click');
					self.items.css('opacity', '1');
					self.openItemNum = 0;
					self.ansbtn.removeClass('re');
				} else {
					effectAdo('anschk_o');
					self.items.css('opacity', '0');
					self.ansbtn.addClass('re');
					self.openItemNum = self.clickItems;

				}
			});
		} else {
			this.makeWrap();
			this.makeItem();

			this.items.on('click', function () {
				effectAdo('click');
				if ($(this).css('opacity') == '0') {
					$(this).css('opacity', '1');
				} else {
					$(this).css('opacity', '0');
				}
			});
		}

	}

	this.makeWrap = function () {
		var html = '<div class="clickContent"></div>';
		this.wrap.append(html);
		this.itemwrap = this.wrap.find('.clickContent');
	};

	this.makeItem = function () {
		var html = '';
		for (var i = 0; i < this.clickItems; i++) {
			html += '<div class="clickItem clickItem' + (i + 1) + '"></div>'
		}
		this.itemwrap.append(html);

		this.items = this.itemwrap.find('.clickItem');

		if (this.items.length == 1) this.items.addClass('ex');
	};

	this.makeBtn = function () {
		var html = '<div class="ansbtn"></div>'
		this.itemwrap.append(html);

		this.ansbtn = this.itemwrap.find('.ansbtn');
	};
}