//gnb scroll design
(function($){
	$(window).on("load",function(){
		$(".gnbScroll").mCustomScrollbar({
				axis:"y",
				theme:"dark-2",
				advanced:{autoExpandHorizontalScroll:true}, 
				callbacks:{
					whileScrolling:function(){
						var pct = this.mcs.draggerTop;
						var movieList = $(".gnbScroll ul");

						movieList.each(function() {
							var tabmenu = $(".gnb");
							var tabmenuH = tabmenu.find('li').height();
							var sectionsTop = $(this).offset().top - tabmenuH;
							
							if (pct >= sectionsTop) {
								tabmenu.find('li').removeClass('on');
								tabmenu.find('a[href="#'+$(this).attr('id')+'"]').parent().addClass('on');
							}
						});
					}
				
			}
		});
	});
})(jQuery);

$(window).scroll(function(){
	var scrollValue = $(window).scrollTop();

	if (scrollValue == 0)
	{
		$("#btnTop").hide().animate({opacity:0});
	} else {
		$("#btnTop").show().animate({opacity:1});
	}
});


function comingMsg (){
	alert('선택하신 테마는 9월에 오픈 예정입니다.'); 
}

$(function(){
	//activeNav();
	browserCheck();
	
	// 세계사 NAV
	$("#gnb_historytheme .gnb li a").not('.coming').on('click', function(e) {
		e.stopPropagation();
		selectChk();

		var idx = $(this).parent().index();
		var target = $(this).attr("href");

		$("#gnb_historytheme .gnb li").removeClass('on');
		$(this).parent().addClass('on');
		
		//5번째 메뉴 스크롤 위치 조정
		if (idx == 4){
			$('.gnbScroll').mCustomScrollbar('scrollTo', 2840 , {
				 scrollInertia:0	
			});
		//6번째 메뉴 스크롤 위치 조정
		} else if (idx == 5){
			$('.gnbScroll').mCustomScrollbar('scrollTo', 'bottom' , {
				 scrollInertia:0	
			});
		} else {
			$('.gnbScroll').mCustomScrollbar('scrollTo', target , {
				 scrollInertia:0	
			});
		}

		return false;
	});

	// 한국사 NAV
	$('#gnb_historytheme .kor_gnb li a').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		selectChk();

		allHide();
		var targetId = $(this).attr('href');
		$(targetId).show();

		$("#gnb_historytheme .kor_gnb li").removeClass('on');
		$(this).parent().addClass('on');
	});

	// 교과서 바로보기
	$('.select_book span').on('click', function (e) {
		e.stopPropagation();
		$('.select_book ul').stop().animate({height: 'toggle'});
	});
	$('body').not('.select_book ul li a').on('click', function(){ selectChk(); });

	//top버튼
	$("#btnTop button").on("click", function(){
		$(window).scrollTop(0);
	});
	
	//말풍선 닫기
	$(".title .btn_close").on("click", function(){
		$(this).parent().hide();
	});
	
	//메인배경랜덤
	var random = Math.floor(Math.random() * $('#slideshow li').length);
	$('#slideshow li').hide().eq(random).show();
});

//browserCheck
function browserCheck() {
	if( $.browser.msie ){
		if( parseInt($.browser.version) < 9 ) {
			$('#slideshow ul li img').each(function() {
				$(this).css({'display' : 'block'});
				$(this).parent().css({'background-image' : 'none'});
			});
		}
	}
}

function allHide(){
	$('#korGnbScroll ul').hide();
}

function selectChk() {
	if($('.select_book ul').css('display') == 'block') {
		$('.select_book ul').stop().slideUp();
	}
}