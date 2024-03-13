/* quickMenu *********************************/
$(window).load(function() {
	var cntOff = $('#subjectData, #sec_subject').offset().top;
	var headH = $('#header').outerHeight(true);
	var defT = $('#qMain').css('top');

	$(window).scroll(function() {
		var quickPos=$(window).scrollTop();

		if(quickPos > cntOff) {
			$('#qMain').stop(true, false).animate({'top' : quickPos-headH+'px'}, 400);
		} else {
			$('#qMain').stop(true, false).animate({'top' : defT}, 400);
		}
	});
});

$(function() {
	$('#vivaData .tabArea a').click(function() {
		var tabIdx = $('#vivaData .tabArea a').index(this);

		if (tabIdx == 1 && $('.tabList').eq(tabIdx).children('ul').is(':empty')) {
			makeOpinionList();
		}

		$('#vivaData .tabArea a').removeClass('on');
		$(this).addClass('on');

		$('#vivaData .tabList').hide();
		$('#vivaData .tabList').eq(tabIdx).show();
		return false;
	});

	//2013.08.05 추가_홍희경
	$('#vivaGive .tabArea a').click(function() {
		var tabIdx = $('#vivaGive .tabArea a').index(this);

		$('#vivaGive .tabArea a').removeClass('on');
		$(this).addClass('on');

		$('#vivaGive .tabList').hide();
		$('#vivaGive .tabList').eq(tabIdx).show();
		return false;
	});
});


function rollBanner(useId) {
	var tabIdx = 0;
	var idVal = useId;
	var rollMax = $(idVal + ' p').length; //이미지 갯수
	var visualW = $(idVal + ' p').width(); //이미지 width

	$(idVal).append('<span class="circlePage"></span>');
	$(idVal + ' p').each(function(i) {
		$(idVal + ' .circlePage').append('<a href="javascript: void(0)"></a>');
	});

	$(idVal + ' .circlePage a').click(function() {
		var tabIdx = $(idVal + ' .circlePage a').index(this);
		visualRoll(tabIdx);
		return false;
	});

	function visualRoll(tabIdx) {
		$(idVal + ' p').hide();
		$(idVal + ' p').eq(tabIdx).show();

		$(idVal + ' .circlePage a').removeClass('on');
		$(idVal + ' .circlePage a').eq(tabIdx).addClass('on');

		tabIdx < rollMax-1 ? tabIdx = tabIdx +1 : tabIdx = 0;

		clearTimeout(visualTime);
		visualTime = setTimeout(function() {visualRoll(tabIdx);}, 8000);
	}
	visualTime = setTimeout(function() {visualRoll(tabIdx);}, 0);

	if(rollMax == 1) {
		clearTimeout(visualTime);
		$(idVal + ' .circlePage').hide();
		$(idVal + ' p').show();
	}
}

function rollBanner1(useId) {
	var tabIdx1 = 0;
	var idVal1 = useId;
	var rollMax1 = $(idVal1 + ' p').length; //이미지 갯수
	var visualW = $(idVal1 + ' p').width(); //이미지 width

	$(idVal1).append('<span class="circlePage"></span>');
	$(idVal1 + ' p').each(function(i) {
		$(idVal1 + ' .circlePage').append('<a href="javascript: void(0)"></a>');
	});

	$(idVal1 + ' .circlePage a').click(function() {
		var tabIdx1 = $(idVal1 + ' .circlePage a').index(this);
		visualRoll1(tabIdx1);
		return false;
	});

	function visualRoll1(tabIdx1) {
		$(idVal1 + ' p').hide();
		$(idVal1 + ' p').eq(tabIdx1).show();

		$(idVal1 + ' .circlePage a').removeClass('on');
		$(idVal1 + ' .circlePage a').eq(tabIdx1).addClass('on');

		tabIdx1 < rollMax1-1 ? tabIdx1 = tabIdx1 +1 : tabIdx1 = 0;

		clearTimeout(visualTime1);
		visualTime1 = setTimeout(function() {visualRoll1(tabIdx1);}, 8000);
	}
	visualTime1 = setTimeout(function() {visualRoll1(tabIdx1);}, 0);

	if(rollMax1 == 1) {
		clearTimeout(visualTime1);
		$(idVal1 + ' .circlePage').hide();
		$(idVal1 + ' p').show();
	}
}

function rollBanner2(useId) {
	var tabIdx2 = 0;
	var idVal2 = useId;
	var rollMax2 = $(idVal2 + ' p').length; //이미지 갯수
	var visualW = $(idVal2 + ' p').width(); //이미지 width

	$(idVal2).append('<span class="circlePage"></span>');
	$(idVal2 + ' p').each(function(i) {
		$(idVal2 + ' .circlePage').append('<a href="javascript: void(0)"></a>');
	});

	$(idVal2 + ' .circlePage a').click(function() {
		var tabIdx2 = $(idVal2 + ' .circlePage a').index(this);
		visualRoll2(tabIdx2);
		return false;
	});

	function visualRoll2(tabIdx2) {
		$(idVal2 + ' p').hide();
		$(idVal2 + ' p').eq(tabIdx2).show();

		$(idVal2 + ' .circlePage a').removeClass('on');
		$(idVal2 + ' .circlePage a').eq(tabIdx2).addClass('on');

		tabIdx2 < rollMax2-1 ? tabIdx2 = tabIdx2 +1 : tabIdx2 = 0;

		clearTimeout(visualTime2);
		visualTime2 = setTimeout(function() {visualRoll2(tabIdx2);}, 8000);
	}
	visualTime2 = setTimeout(function() {visualRoll2(tabIdx2);}, 0);

	if(rollMax2 == 1) {
		clearTimeout(visualTime2);
		$(idVal2 + ' .circlePage').hide();
		$(idVal2 + ' p').show();
	}
}

$(window).load(function() {
	rollBanner('#roll1');
	rollBanner1('#roll2');
	rollBanner2('#roll3');

	/* 교과 컨텐츠 */
	mainSubjectDataImgSlide();

	/* 공지사항 */
	$("#slideNotice").jCarouselLite({
		btnNext: "#slideNotice .next",
		btnPrev: "#slideNotice .prev",
		vertical: true,
		visible: 1,
		scroll: 1,
		auto: 4000,
		speed: 600
	});

	/* 아이콘 슬라이드
	$(".iconSlideWrap").jCarouselLite({
		btnNext: "#iconSlide .next",
		btnPrev: "#iconSlide .prev",
		visible: 6,
		scroll: 1,
		speed: 600
	});*/
});

//최초 페이지 로딩후 과목명 클릭으로 이벤트가 발생해서 컨텐츠가 변경될 경우 아래 function을 호출해야  Slide 기능 동작함.
function mainSubjectDataImgSlide() {
	$(".imgSlide .slideWrap").jCarouselLite({
		btnNext: ".imgSlide .next",
		btnPrev: ".imgSlide .prev",
		visible: 3,
		scroll: 1,
		speed: 600
	});
}