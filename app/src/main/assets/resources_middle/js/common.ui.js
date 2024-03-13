$(function() {
	open_chatroom();

	/* 2019 개편 */
	quickMenuFn();
	$(window).scroll(function() {
		quickMenuFn();
		//quickFn();

		//top
		if ($(this).scrollTop() > 500) {
            $('.gotop').fadeIn();
        } else {
            $('.gotop').fadeOut();
        }
	});
	$(window).resize(function() {
		quickMenuFn();
		open_chatroom();
	});

	//top
	$(".gotop").click(function() {
        $('html, body').animate({
            scrollTop : 0
        }, 500);
        return false;
    });

	//GNB 스크립트 /incHeaderNew.jsp 로 이동

	/*issueStart();
	$('#header .issuekeyword .btn a').click(function(){
		if ($(this).hasClass('btn_prev'))
		{
			issueKeywordFn('prev');
		} else {
			issueKeywordFn('next');
		}
		return false;
	}).mouseover(function(){
		issueStop();
	}).mouseleave(function(){
		issueStart();
	});*/


	//이슈키워드 롤링
	function issueStart(){
		issueRoll= setInterval(function(){
			issueKeywordFn('next');
		}, 3000);
	}
	function issueStop(){
		clearInterval(issueRoll);
	}
	function issueKeywordFn(val){
		var $target =$('#header .issuekeyword');
		var $item =$target.find('li');
		var idx = $target.find('li.active').index();
		var targetSize = $item.length;

		$item.hide().removeClass('active');
		if (val == 'prev')
		{
			idx = idx-1;
		} else
		{
			if (idx == targetSize-1)
			{
				idx=0;
			} else {
				idx = idx+1;
			}
		}
		$item.eq(idx).show().addClass('active');
	}




	$('#menu .subGnb_new .close, #menu .gnbMenu_new .close').click(function() {
		clearMenu();

		$('#menu .all').removeClass('on');
		return false;
	});

	// 2019 UI 개편으로 주석처리
//	$('#menu > .innerWrap > ul > li > a').click(function() {
//		var txtN = $(this).parent().index();
//		//clearMenu();
//		/*
//		if( txtN == 0 || txtN == 1 || txtN == 2 ) {
//			if(loadCnt == 0){
//				alert('2015 개정 비상교과서의 교수 자료 업데이트 중입니다.\n잠시 후 오픈 예정 입니다.\n감사합니다.');
//				return;
//			}
//		}
//		*/
//		$('#header').css("z-index","1001"); //2017-02-15 레이어겹침 수정
//		$('#bgLayer').css({"z-index":"1000", "position":"fixed"}).show();//2017-12-01 딤추가
//
//		//$('#menu li').eq(txtN).find('a').addClass('on');
//
//		//초.중.고 메뉴 클릭시 동작
//		if( txtN == 0 || txtN == 1 || txtN == 2 ) {
//			//alert(txtN);
//			if (txtN == 0) {
//				getGnbSub('ES'); //incHeaderNew.common.js
//			}
//			else if (txtN == 1) {
//				getGnbSub('MS');
//			}
//			else if (txtN == 2) {
//				getGnbSub('HS');
//			}
//
//			// 2017-02-23 토글메뉴로 변경
//			if ($('#menu .gnbMenu_new').eq(txtN).is(':hidden')){
//				$('#menu .gnbMenu_new').hide();
//				$('#menu .gnbMenu_new').eq(txtN).show();
//
//				$('#menu .subGnb_new').hide();
//
//				$('#menu li a').removeClass('on');
//				$('#menu li').eq(txtN).find('a').addClass('on');
//
//				$('#bgLayer').css({"z-index":"1000", "position":"fixed"}).show();//2017-12-01 딤추가
//			} else {
//				$('#menu .gnbMenu_new').eq(txtN).hide();
//				$('#menu li').eq(txtN).find('a').removeClass('on');
//				$('#bgLayer').css({"z-index":"9500", "position":"absolute"}).hide();//2017-12-01 딤추가
//			}
//			//$('#menu .gnbMenu_new').eq(txtN).show();
//		}
//		//열린자료, 창체,  비바샘터 클릭시 동작
//		else {
//			if (txtN == 6) { //나의 교실
//				location.href = CONTEXTPATH  + "/myclass/index.do";
//			}
//			else {
//				if (txtN == 3) { //열린 자료 클릭시 노출 배너 정보 조회
//					getGnbBanner('O');
//				}
//				else if (txtN == 4) { //창의적 체험활동 클릭시 노출 배너 정보 조회
//					getGnbBanner('C');
//				}
//				else if (txtN == 5) { //비바샘터 클릭시 노출 배너 정보 조회
//					getGnbBanner('S');
//				}
//
//				// 2017-02-23 토글메뉴로 변경
//				if ($('#menu .subGnb_new').eq(txtN-3).is(':hidden')){
//					$('#menu .subGnb_new').hide();
//					$('#menu .subGnb_new').eq(txtN-3).show();
//
//					$('#menu .gnbMenu_new').hide();
//
//					$('#menu li a').removeClass('on');
//					$('#menu li').eq(txtN).find('a').addClass('on');
//
//					$('#bgLayer').css({"z-index":"1000", "position":"fixed"}).show();//2017-12-01 딤추가
//				} else {
//					$('#menu .subGnb_new').eq(txtN-3).hide();
//					$('#menu li').eq(txtN).find('a').removeClass('on');
//
//					$('#bgLayer').css({"z-index":"9500", "position":"absolute"}).hide();//2017-12-01 딤추가
//				}
//				//$('#menu .subGnb_new').eq(txtN-3).show();
//			}
//		}
//
//		return false;
//
//		// 수박씨 추천 강의
//    	$('.subjectSvc .off a:eq(2)').mouseover(function() {
//    		$('.subjectSvc .on li').show();
//    	});
//    	$('.subjectSvc .on .subakc').mouseout(function(e) {
//    		if( $(e.relatedTarget).height() != 25 && $(e.relatedTarget).attr('class') != 'subakc') {
//    			$(this).hide();
//    		}
//    	});
//    	$('#btnSubakc').click(function(){
//			//백그라운드 전체를 어둡게 처리
//	 			bgLayerH();
//
//			//로그인 레이어 팝업
//			popDim('layerLogin');
//        });
//	});
	// 2019 UI 개편 적용부
	$('#gnbMenu > .inner > #eduClass > ul > li > a').click(function() {
		var txtN = $(this).parent().index();

		//중.고 메뉴 클릭시 동작
		if( txtN == 0 || txtN == 1 ) {
			if (txtN == 0) {
				getGnbSub('MS');
			}
			else if (txtN == 1) {
				getGnbSub('HS');
			}

			if ($('#gnbMenu .gnbMenu_new').eq(txtN).is(':hidden')){
				$('#gnbMenu .gnbMenu_new').each(function (){
					$(this).hide();
				});
				$('#gnbMenu .gnbMenu_new').eq(txtN).show();

				$('#gnbMenu #eduClass li').each(function (){
					$(this).removeClass('on');
				});
				$('#gnbMenu #eduClass li').eq(txtN).addClass('on');
			}
		}
	});

	$('.create_list > .tab > li > a').click(function() {
		$('.create_list .tab li').each(function(){
			$(this).removeClass("on");
		});
		$(this).parent().addClass("on");
	});

	//GNB 영역 우측에 보여질 배너 출력
	function getGnbBanner(type) {
		var ajaxData = {bannerType : type,
				vivasamformat : "json"};

		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/common/bannerInfo.do",
    		async : false,
    		cache : false,
    		dataType : "json",
    		data :  ajaxData,
    		success : function(data){
                var html = "";
                var result = data.result;

                if(data.code == "0000"){
                	if(result.length > 0){
                		var item = data.result[0];

                		//alert(item.imagePath + item.imageName);

                		//html += "<li>";
                		html += "<a href=\"";
                		if (item.url != "" && item.url.indexOf("http") == -1) {
                			html += CONTEXTPATH;
                		}
                		html += item.url + "\"";
                		if (item.linkType == "N") {
                			html += " target=\"_blank\"";
                		}
                		html += ">";
                		html += "<img src=\"" + CONTEXTPATH + item.imagePath + item.imageName + "\" alt=\"\" class=\"subBanner\" />";
                		html += "</a>";
                		//html += "</li>";

                		//alert(html);

                		$("#gnbBanner"+type).html(html);
                    }
                }
    		},
			error: function (xhr, ajaxOptions, thrownError){
			},
			complete:function (xhr, textStatus){
			}
		});
	}

	/* 창의적 체험활동/이달의 이슈 탭 */
	$('#rCont .banner2 .tab a').click(function() {
		var idx = $(this).parent().index();

		$('#rCont .banner2 .tab a').removeClass('on');
		$(this).addClass('on');

		$('#rCont .banner2 div').removeClass('on');
		$('#rCont .banner2 div').eq(idx).addClass('on');

		//console.log($('#rCont .baaner2 div'));

		return false;
	});


	/* select box */
	$('.slt p a').click(function() {
		//alert("!!!!");
		var obj = $(this).parent().parent();

		if( $(this).attr('class') == undefined || $(this).attr('class').indexOf('on') == -1  ) {
			obj.find('div').show();
			$(this).addClass('on');
			obj.css("z-index","9000"); //2016-02-17 레이어겹침 수정
		}else {
			obj.find('div').hide();
			$(this).removeClass('on');
			obj.css("z-index","8999"); //2016-02-17 레이어겹침 수정
		}
		return false;
	});

	/* 2018-08-23 select design common : 구조 동일하게 사용해야함 */
	$(".sltbox p.list-text > a").click(function() {
		if ($(this).parent().next('.sltbox_list').is(':hidden')){
			$('.sltbox_list').hide();
			$(this).parent().next('.sltbox_list').show();
			return false;
		}
	});
	$(".sltbox_list li").bind("click", function(){
		if(!$(this).hasClass('soon')){
			$(".sltbox_list li").each(function(){
				$(this).removeClass("on");
			});
			$(this).addClass("on");
			var txt = $(this).children("a").text();
		    $(this).parent().parent().prev('.list-text').find('a').text(txt);
		    $(this).parent().parent().hide();
		    return false;
		}
	});
	/*//2018-08-23 select design common : 구조 동일하게 사용해야함 */


	$('#layerLogin .close').click(function() {
		$('#bgLayer').hide();
		$('#layerLogin').hide();

		return false;
	});

	/* 로긴텍스트 창 */
	$('#layerLogin .txt, #loginFrm .txt, #loginFrmGnb .txt').focus(function() {
		$(this).removeClass('id');
	});

	//incFooterNew.jsp > 내 자료 관리 레이어에서 사용됨, 심원보
	$("#newName2 > #newName").each(function(){
		var defaultValue = $(this).val();

		$(this).focus(function(){
			if($(this).val() == defaultValue) $(this).val("");
		});
		$(this).blur(function(){
			if($(this).val() == "") $(this).val(defaultValue);
		});
	});

	//input clear
	$(".inputClear").each(function(){
		var defaultValue = $(this).val();

		$(this).focus(function(){
			if($(this).val() == defaultValue) $(this).val("");
		});
		$(this).blur(function(){
			if($(this).val() == "") $(this).val(defaultValue);
		});
	});


	//input label clear
	var i_text = $('.i_label').next('.i_text');
	i_text.focus(function(){
		$(this).prev('.i_label').css('visibility','hidden');
	})
	.blur(function(){
		if($(this).val() == ''){
			$(this).prev('.i_label').css('visibility','visible');
		} else {
			$(this).prev('.i_label').css('visibility','hidden');
		}
	})
	.change(function(){
		if($(this).val() == ''){
			$(this).prev('.i_label').css('visibility','visible');
		} else {
			$(this).prev('.i_label').css('visibility','hidden');
		}
	})
	.blur();

	//gnb 모바일 앱 홍보
	$('.btn_app').click(function() {
		$('#app_wrap').show();
		bgLayerH();
		return false;
	});
	$('#app_wrap .close').click(function() {
		$('#app_wrap').hide();
		bgLayerClose();

		return false;
	});

	//공지사항 임시
	$(".noti_tab ul li a").click(function(){
		$(".noti_tab ul li").removeClass("on");
		$(".notiCont").hide();
		var index = $(this).parent().addClass("on").index();
		var or="#notiCont0"+(index+1);
		$(or).show();
		return false;
	});
});

//퀵메뉴 2020
function quickMenuFn(){
	var $quick = $('#quickMenu');

	if ($quick.length){
		var winScroll = $(window).scrollTop();
		var winWidth = $(window).width();
		var topHeight = $('#header').outerHeight();
		var topPos = topHeight - winScroll - 1; // -2 : gnb 하단 라인 위로 올리기 위해
		var leftPos = $('#conts, #contents').offset().left + $('#conts, #contents').width() + 15;

		if (winScroll <= topHeight)
		{
			$quick.css({'top' : topPos});
		} else {
			$quick.css({'top' : topHeight});
		}

	}
}


/* 퀵메뉴
var quickmenuTime = 300;
function quickFn(){
	var quickPos = $(this).scrollTop();
	var topH = ($('.topDesc').height() == null ? 0 : $('.topDesc').height()) + 195;
	var windowH = document.body.clientHeight;
	var areaMove = windowH + quickPos - topH;
	var quickH = $('#quick').height();
	var time = quickmenuTime;

	if (quickPos == 0) quickmenuTime = 300;

	if ($('#conts, #contents').height() <= 800) {
		initQuickMenuLocation();
	}else {
		if( quickPos > topH) {
			if(windowH > quickH){
				var quickTop = areaMove - windowH + 5;
				if (quickTop < 20) quickTop = 20;
				$('#quick').stop(true, false).animate({'top' : quickTop}, time);

				// 2017-02-15 메인 위치변경
				if ($('#contents').hasClass('main')) {
					var quickTopMain = areaMove -windowH - 365;
					if (quickTopMain < 20) quickTopMain = 20;
					$('#quick').stop(true, false).animate({'top' : quickTopMain}, time);
				}
			} else {
				var quickTop = areaMove - quickH - 157;
				if (quickTop < 20) quickTop = 20;
				$('#quick').stop(true, false).animate({'top' : quickTop}, time);

				// 2017-02-15 메인 위치변경
				if ($('#contents').hasClass('main')) {
					var quickTopMain = areaMove - quickH - 525;
					if (quickTopMain < 20) quickTopMain = 20;
					$('#quick').stop(true, false).animate({'top' : quickTopMain}, time);
				}
			}
		} else {
			//alert('스크롤위치가 교과자료 전일때');
			$('#quick').stop(true, false).animate({'top' : '20px'}, time);

			// 2017-02-15 메인 위치변경
			if ($('#contents').hasClass('main')) {
				$('#quick').stop(true, false).animate({'top' : '-330px'}, time);
			}
		}
	}
} */

/* 우측 퀵메뉴의 위치를 초기 위치로 강제로 조정할때 호출, 심원보
function initQuickMenuLocation() {
	//컨텐츠 영역의 높이가 900px이하인 경우
	if ($('#conts', '#contents').height() <= 800) {
		$('#quick').stop();
		$('#quick').css({top: '20px'}); //초기 위치값 20px
	}
} */

function clearMenu() {
	$('#menu .subGnb_new, #menu .gnbMenu_new').hide();
	$('#menu ul li a').removeClass('on');
	$('#header').css("z-index","2"); //2017-02-15 레이어겹침 수정
	$('#bgLayer').css({"z-index":"9500", "position":"fixed"}).hide();//2017-12-01 딤추가
}

//어두운 백그라운드 레이어로 페이지를 덮는다.
function bgLayerH() {
	var wrapHeight = 0;

	//페이지 마다 Body 태그 바로 아래의 id가 다르게 정의되어 있어 해당 id를 여러번 지정함.
	wrapHeight = ($('#wrap').height() != null ? $('#wrap').height() : ($('#downWrap').height() != null ? $('#downWrap').height() : ($('#wrapper').height() != null ? $('#wrapper').height() : 0)));

	//alert($('#downWrap').height() + " | " + wrapHeight);

	var h = wrapHeight + 175;
	var makeBg = $('<div id="bgLayer"></div>');

	$('body').css('height', 'auto'); //% height 값을 px height 값으로 설정
	h = $('body').height() + 100; // body의 height값으로만 처리하면 어두운 백그라운드 레이어가 전체 화면을 덮지 못하는 현상 발생하여 임의로 100을 더함.(심원보, 20151105)

	if( $('#bgLayer').length == 0 ) { $('body').append(makeBg);	}

	if( $('#bgLayer').css('display') != 'block' ) {
		$('#bgLayer').height(h);
		$('#bgLayer').show().css({'opacity':0.5});
	}else {
		$('#bgLayer').hide();
	}
}

function bgLayerClose() {
	$('#bgLayer').hide();
}

//백그라운드 레이어의 높이를 재설정한다. ajax 호출로 페이지 내용이 늦게 뿌려지는 경우 재설정 필요.
function bgLayerResize() {
	if ($('#bgLayer').length > 0) {
		$('#bgLayer').height($('body').height());
	}
}

//개정교육과정 팝업 오픈
function eduClassOpen(url, popName){
	var popup = window.open(url, popName, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, channelmode=no");
	var w = 1070;
	var h = screen.height;

	popup.moveTo(0,0);
	popup.resizeTo(w, h);
}

//윈도우 팝업 : 높이 100% (url, 넓이)
function popOpenFull (url, w){
	var popup = window.open(url, '', "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes");
	popup.moveTo(0,0);
	popup.resizeTo(w+32, screen.height);
}


//레이어팝업 (fixed)
function popFixed(obj,val)
{
	if(val==0)
	{
		$("#"+obj).css("height","auto");
		$("#"+obj).css("display","none");
		bgLayerClose();
	} else {
		var winH = $(window).innerHeight();
		var winH2 = winH - 20;
		var popH = $("#"+obj).innerHeight();

		if (winH < popH) {
			$("#"+obj).css({"height": winH2, "margin-top": -winH2/2 });
		} else {
			$("#"+obj).css({"margin-top": -popH/2 });
		}
		$("#"+obj).css({"display": "block"});
		bgLayerH();
	}
}

//레이어팝업 (show-hide)
function popLayerView(obj,val,bg)
{
	if(val==0)
	{
		$("#"+obj).css("height","auto");
		$("#"+obj).css({"display": "none", "z-index": "1"});
		bgLayerClose();
	} else {
		$("#"+obj).css({"display": "block", "z-index": "9600"});
		// bg 가 1 일 경우에 배경 생략
		if(!bg==1)
		{
			bgLayerH();
		}
	}
}

//통합회원 혜택 자세히 보기 팝업
$(function(){
	$("#btnPopIntegrated a").on("click",function(){
		var target = $("#popIntegrated");

		var contTop = target.parent().offset().top;
		var contHeight = target.parent().innerHeight();
		var layerPos =  contHeight - $(this).offset().top;


		target.show().css({bottom: layerPos});
		target.find("img").hide();

		if ($(this).hasClass("vivasam"))
		{
			target.find("img.vivasam").show();

		} else if ($(this).hasClass("tschool"))
		{
			target.find("img.tschool").show();
		}

		var layerTop = target.offset().top;

		$(window).scrollTop(layerTop);

		return false;
	});
	$("#popIntegrated").find(".layer_mask").on("click", function(){
		$("#popIntegrated").hide();
	});
	$("#popIntegrated").find(".btn_close").on("click", function(){
		$("#popIntegrated").hide();
		return false;
	});
});

//2020년 신학기 개편
function open_chatroom(){
    var width_size = window.outerWidth;
    var duration = 300;
    var durationtype02 = 100;
    var $pseudo = $(".pseudo");
    var $quick =  $(".quick_menu_visual");
    var $sidebar = $('.sidebar');
	var $quickevt = $('.quickevt_banner'); //퀵메뉴 이벤트 배너
    if (width_size <= 1599) {
    	$sidebar .attr('class','sidebar');
        $sidebar.stop(true).animate({right: '-106px'}, duration, 'linear');
        $pseudo.css('z-index', 30).css('display', 'block').animate({opacity: '1'}, durationtype02, 'linear');
        $quick.css('z-index', 30).animate({opacity: '1'}, 0, durationtype02, 'linear');
		$quickevt.animate({ right: '65px' }, duration, 'linear');
    }else{
        $sidebar .attr('class','sidebar q_open');
        $sidebar.stop(true).animate({right: '0px'}, duration, 'linear');
        $pseudo.css("opacity","0").css('z-index', 0).css('display', 'none');
        $quick.css("opacity","0").css('z-index', 0);
		$quickevt.animate({ right: '170px' },0, duration, 'linear');
    }
}

$(function(){
    var duration = 300;
    var durationtype02 = 100;
	var $quickevt = $('.quickevt_banner'); //퀵메뉴 이벤트 배너
    var $pseudo = $(".pseudo");
    var $quick =  $(".quick_menu_visual");
    var $sidebar = $('.sidebar');

	//2023-06-12 초등 개편 6월 선반영
	$sidebar .attr('class','renew06');

    var $sidebarButton = $sidebar.find('button.btn_side, .btnLogin').on('click', function(){
        $sidebar.toggleClass('q_open');
        $pseudo.animate({opacity: '0'}, durationtype02, 'linear');
        $quick.animate({opacity: '0'}, durationtype02, 'linear');
        if($sidebar.hasClass('q_open')){
        	localStorage.quickMenuV ="open";
            $sidebar.stop(true).animate({right: '0px'}, duration, 'linear');
            $pseudo.css("opacity","0").css('z-index', 0).css('display', 'none');
            $quick.css("opacity","0").css('z-index', 0);
			//퀵메뉴 이벤트 배너
			$quickevt.animate({ right: '170px' }, duration, 'linear');
        }else{
        	localStorage.quickMenuV ="close";
            $sidebar.stop(true).animate({right: '-106px'}, duration, 'linear');
            $pseudo.css('z-index', 30).css('display', 'block').animate({opacity: '1'}, durationtype02, 'linear');
            $quick.css('z-index', 30).animate({opacity: '1'}, durationtype02, 'linear');
			//퀵메뉴 이벤트 배너
			$quickevt.animate({ right: '65px' }, duration, 'linear');
        };
    });

	//퀵메뉴 이벤트 배너 닫기
	$(".banner_close").click(function(){
		$quickevt.hide();
	});

    //체크퀵메뉴
	if(localStorage.getItem("quickMenuV") == 'close'){
		var $quickMenu = $('#quickMenu');
		$quickMenu.toggleClass('q_open');
		// $quickMenu.find('.pseudo').animate({ opacity: '0' }, 100, 'linear');
		// $quickMenu.find('.quick_menu_visual').animate({ opacity: '0' }, 100, 'linear');
		$quickMenu.stop(true).animate({ right: '-106px' }, 0, 'linear');
		$quickMenu.find('.pseudo').css('z-index', 30).css('display', 'block').animate({ opacity: '1' }, 0, 'linear');
		$quickMenu.find('.quick_menu_visual').css('z-index', 30).animate({ opacity: '1' }, 0, 'linear');
		$quickevt.stop(true).animate({ right: '65px' }, 0, 'linear');
	}
});