$(function() {
	//footer 하단 고정
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	
	if (winWidth < winHeight)
	{
		$('#wrap').css({'min-height' : winHeight});
	}
	
	//교과서 리스트 탭메뉴
	if (!$('#container').hasClass('sub'))
	{
		globalTab();
	}

	//교과서 미리보기 하위 메뉴
	tbTab();
	
	//아코디언
	accordionTab($('.book_cont'));
	
	//TOP
	$('#btn_top').click(function(){
		$(window).scrollTop(0);
		$(this).fadeOut();
		
		if ($('#container').hasClass('sub'))
		{
			$('.book_info .title').removeClass('fixed');
		}
		
		return false;
	});
	
	//수활북 팝업
	$('.btn_pop_theme').click(function() {
		popupTheme = $(this).attr("href");
		
		if ($(popupTheme).is(":hidden")){
			$('.popup_theme').hide();
			$(popupTheme).show();
		}
		$('#bgLayer').show();
		return false;
	});
	$('.popup_theme .btn_pop_close').click(function() {
		$('.popup_theme').hide();
		$('#bgLayer').hide();
		return false;
	});
});

$(window).scroll(function() {
	//교과서 상세 고정메뉴
	if ($('#container').hasClass('sub'))
	{
		scrollFixed();
	}
	
	//TOP버튼
	var pos = $(window).scrollTop();

	if (pos > 100) {
		$('#btn_top').stop(true, false).fadeIn();
	} else {
		$('#btn_top').fadeOut();
	}
});

function globalTab(){
	var $btnTab = $('#header_brochure .tab');
	var $tabTarget = $('.book_list');
	var currentIdx = 0;
	
	$btnTab.find('a').click(function(){
		currentIdx = $(this).parent('li').index();
		
		$btnTab.find('li').removeClass('on');
		$(this).parent('li').addClass('on');

		$tabTarget.removeClass('on').eq(currentIdx).addClass('on');

		return false;
	});
}

function tbTab(){
	$('.tb_btn').click(function(){
		var _tbWrap = $(this).parent('li');
		var _tbList = _tbWrap.find('.tb_link');

		if (_tbWrap.hasClass('on'))
		{
			_tbList.slideUp();
			_tbWrap.removeClass('on');
		} else {
			_tbList.slideDown();
			_tbWrap.addClass('on');
		}

		return false;
	});
}

function accordionTab(target){
	var $target = target;
	var $btnAcco = $target.find('.btn_acco');
	
	$btnAcco.click(function(){
		var _thisMenu = $(this).parent('li');

		if (_thisMenu.hasClass('close'))
		{
			_thisMenu.find('.acco_cont').slideDown().end().removeClass('close');
		} else {
			_thisMenu.find('.acco_cont').slideUp().end().addClass('close');
		}
		
		return false;
	});
}

function scrollFixed(){
	var currentScroll = $(window).scrollTop();
	var $fixedDiv = $('.book_info .title');
	
	if (!$fixedDiv.hasClass('fixed') && currentScroll > 0)
	{
		$fixedDiv.addClass('fixed');
	} 
	else if (currentScroll == 0)
	{
		$fixedDiv.removeClass('fixed');
	}
};
