$(function() {
	$(window).scroll(function() {
		var pos = $(this).scrollTop();

		/* 메인 교과서 리스트 타이틀
		$('.book_list').each(function() {
			if (pos >= $(this).offset().top - 96) { //타이틀 높이 만큼 위로 올리기
				$('.book_list').removeClass('fixed');
				$(this).addClass('fixed');
			} else if (pos === 0) {
				$('.book_list').removeClass('fixed');
			}
		}); */
		
		$('.tabs li:last-child').addClass('last');
		$('.book_cont dl dd ul li:last-child').addClass('last');

		//TOP버튼
		if (pos > 700) {
			$('.btn_top').stop(true, false).animate({'top' : pos + 400 + 'px'}, 200).show();
		} else {
			$('.btn_top').hide();
		}
		
		//서브헤더 고정
		if(pos > 1) {
			$('#header_brochure').addClass('fixed');
			$('#header_brochure').children().children().find('h1').addClass('sub');
			$('#header_brochure').children().children().find('.txt').hide();
			$('#header_brochure').children().children().find('.link').hide();
			
			//2018-08-23 container 높이 조절
			$('#container.main').css({'padding-top' : '262px'});
		} else {
			$('#header_brochure').removeClass('fixed');
			$('#header_brochure').children().children().find('h1').removeClass('sub');
			$('#header_brochure').children().children().find('.txt').show();
			$('#header_brochure').children().children().find('.link').show();
			
			//2018-08-23 container 높이 조절
			$('#container.main').css({'padding-top' : '358px'});
		}
	});
	
	
	//LNB
	$('#lnb_brochure dl dt a').click(function() {
		if($(this).parent().next().is(':hidden')){
			//하나만 남기고 닫기
			$('#lnb_brochure dl dt a').parent().removeClass('on');
			$('#lnb_brochure dl dd').hide();
			
			$(this).parent().addClass('on');
			$(this).parent().next().show();
		} else {
			$(this).parent().removeClass('on');
			$(this).parent().next().hide();
		}
		return false;
	});
	
	//Q&A 롤링
	// $('.qna_wrap .rolling_list').rollingBanner(3500, false);
	
	
	//책소개버튼
	$('.book_info .btn_tip').click(function() {
		if($(this).next().is(':hidden')){
			$('.input_box').hide();
			$('.layer_tip.preview').hide();
			$(this).next().show();
		} else {
			
			$(this).next().hide();
		}
	});
	
	//엔트리팝업
	$('.btn_pop_entry').click(function() {
		$(this).parent().parent().next('.popup_entry').show();
		return false;
	});
	$('.popup_entry .btn_pop_close').click(function() {
		$(this).parent('.popup_entry').hide();
		return false;
	});
	
	//테마관 홍보 팝업
	$('.btn_pop_theme').click(function() {
		popupTheme = $(this).attr("href");
		
		if ($(popupTheme).is(":hidden")){
			$('.popup_theme').hide();
			$(popupTheme).show();
		}
		bgLayerH();
		return false;
	});
	$('.popup_theme .btn_pop_close').click(function() {
		$('.popup_theme').hide();
		$('#bgLayer').hide();
		return false;
	});
	
	//지도 탭
	$('.tabs a').click(function() {
		var idx = $(this).parent().index();
		
		$('.tabs a').removeClass('on');
		$(this).addClass('on');
		
		$('.tabs_cont').removeClass('active');
		$('.tabs_cont').eq(idx).addClass('active');
		
		
		return false;
	});
		
});
//책내용 탭
function TabFn(idx) {
	$(".tab_cont").removeClass('block').addClass('none');
	$(".tabCont" + idx).addClass('block');
	$('.tab_btn li').find('a').removeClass('on');
	$('.tab_btn li').find('a').eq(idx - 1).addClass('on');
}

//질문전체보기
function qnaList(tpy,obj) {
	/*
	if( CHLOGIN() )
	{
		return;
	}
	*/
	qnaListData(tpy,obj)
	
	//pop('qna_list');
	$('#qna_list').show();
	bgLayerH();	
}
//질문글쓰기
function qnaWrite() {
	
	if( CHLOGIN('only') )
	{
		return;
	}
	
	//pop('qna_write');
	$('#qna_write').show();
	bgLayerH();
}
function bgLayerClose() {
	$('#bgLayer').hide();
	$('.layer_wrap').hide();
}
