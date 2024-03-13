//	쿠키값 가저오기 (main 에있던 스크립트를 common.js 로 옮겼다.)
//	2013년 04월 09일 : eoraptor
function getCookie( name ) {
    var nameOfCookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length ) {
        var y = (x+nameOfCookie.length);
        if ( document.cookie.substring( x, y ) == nameOfCookie ) {
            if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
                endOfCookie = document.cookie.length;
            return unescape( document.cookie.substring( y, endOfCookie ) );
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 )  break;
    }
    return "";
}

//	쿠키값 저장하기 (main 에있던 스크립트를 common.js 로 옮겼다.)
//	2013년 04월 09일 : eoraptor
function setCookie( name, value, expiredays ){
   var todayDate = new Date();
   todayDate.setDate( todayDate.getDate() + expiredays );
   document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

//	2013년 04월 09일 : eoraptor
//	현재 날짜 가져오기 yyyy-mm-dd 형식이다.
function getNowDate() {
	
	var systemDate = new Date();
	
	var yyyy = systemDate.getFullYear();
	var mm = systemDate.getMonth()+1;
	if ( mm < 10 ) {
		mm = "0"+mm;
	}
	var dd = 일 = systemDate.getDate();
	if ( dd < 10 ) {
		dd = "0"+dd;
	}
	var nowDate = yyyy+"-"+mm+"-"+dd;
	
	return nowDate;
}

//팝업 가운데 정렬
function pop(idVal) {
	var winH = $(window).height(); //브라우저 높이
	var idVal = '#'+idVal //아이디
	var popW = $(idVal).outerWidth();
	var popH = $(idVal).outerHeight();

	var mgW = popW/2; //가로 가운데 정렬
	var posY = (winH - popH)/2; //세로 가운데 정렬
	var scrY = $(window).scrollTop(); //스크롤 위치

	$(idVal).css({
		'display' : 'block',
		'margin-left' : -mgW+'px',
		'top' : (scrY+posY)+'px',
		'left' : '50%',
		'position' : 'absolute'
	});
};

//팝업 가운데 정렬 dim
function popDim(idVal) {
	var docH = $(document).height(); //브라우저 높이
	var winH = $(window).height(); //브라우저 높이

	var idVal = '#'+idVal //아이디
	var popW = $(idVal).outerWidth();
	var popH = $(idVal).outerHeight();

	var mgW = popW/2; //가로 가운데 정렬
	var posY = (winH - popH)/2; //세로 가운데 정렬
	var scrY = $(window).scrollTop(); //스크롤 위치

	$(idVal).css({
		'display' : 'block',
		'margin-left' : -mgW+'px',
		'top' : (scrY+posY)+'px',
		'left' : '50%',
		'position' : 'absolute'
	});

	$('#wrap').append('<div class="dim"></div>');
	$('.dim').css({
		'height' : docH+'px',
		'opacity' : 0.8,
		'z-index' : '100',
		'position' : 'fixed'
	});
};

//팝업 창닫기
function popClose(myPop) {
	$(myPop).parent().hide();
	$('.dim').remove()
}

/* system popup */
function popGuide(url, popName, w, h, scroll) {
	var positionL = (screen.width - w) / 2;
	var positionT = (screen.height - h) / 2;
	var feat = "width=" + w + ", height=" + h +", top=" + positionT + ", left=" + positionL + ", scrollbars=" + scroll +", resizable=no, status=no"
	window.open(url, popName, feat);
}

function pageCenter() {
	/*
	$('.paging').css('width', '');
	$('.pageCnt').each(function(i) {
		var pageW = $('.pageCnt').eq(i).outerWidth(true);
		$('.paging').eq(i).css('width', pageW+'px');
	});
	*/
};


/*iframe autoResize*/
/*
	부모창에서 iframe 자동리사이즈
	리사이즈해줘야돼는 iframe에서 onload="autoResize(i)"
	걸어주세요
*/
function autoResize(i){
    var iframeHeight=
    	(i).contentWindow.document.body.scrollHeight;
    	(i).height=iframeHeight;
}
/*
	자식창에서 레이어 변화 이벤트시 걸어줘야 돼는 fn
	clickResize("해당 iframe의 #아이디")를 걸어주세요
*/
function clickResize(id){
    var iframeHeight=$(id).contents().find("body")[0].scrollHeight;
    $(id).height(iframeHeight);
}

function _makeDirectLink() {
    var plh = parent.location.href;

    var lh = location.href;

    var baseWork = CONTEXTPATH;
    var baseIdx = 14;

    if (CONTEXTPATH.length == 0) {
    	baseWork = VivasamConstant.SITE_DOMAIN;
    	baseIdx = 15;
    }
    var idx = plh.indexOf(baseWork);
    var directLink = plh.substr(idx+baseIdx);

	idx = directLink.indexOf('subUrl=');

	if (idx != -1) {
		directLink = directLink.substring(0,idx-1);
	}

    idx = lh.indexOf(baseWork);

    var subLink = lh.substr(idx+baseIdx);
    if (subLink.length > 0) {
        if (directLink.indexOf('.do?') == -1) {
            directLink += '?';
        } else {
            directLink += '&';
        }

        directLink += 'subUrl=' + encodeURIComponent(subLink);
    }

    return directLink;
}

//	다른 선생님의 교실을 보러 간다!!!
function showRoom(toMemberId) {
	//	return;

	if (toMemberId == '') {
		return;
	}

	parent.location.href = CONTEXTPATH + '/troom/tRoomMain.do?toMemberId=' + toMemberId;
}

function commDataContentView(contentGubun, contentId) {
	var action;
	//CN020
	if (contentGubun == VivasamConstant.BRT_TITLE) {
		action = "/commdata/contentHeadWordType.do"
	}
	else {
		action = "/commdata/contentTreeInfoList.do"
	}

	$.ajax({
        type: "POST",
        url:CONTEXTPATH + action,
        cache: false,
        async: false,
        dataType: "json",
        data: {contentGubun: contentGubun, contentId: contentId, vivasamformat : "json"},
        success: function(data){

        	actCommDataContentView(contentGubun, contentId, data);
        },
        error: function (xhr, ajaxOptions, thrownError){
                          //     alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
        },
        complete:function (xhr, textStatus){
                         // alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
        }
    });
}

function actCommDataContentView(contentGubun, contentId, data) {
	var result = data.result;

	if (contentGubun == VivasamConstant.BRT_TITLE) {
		alert(result);
	}
	else {
		class1Cd = result[0].id;
		class2Cd = result[1].id;
		class3Cd = result[2].id;

		alert(class1Cd, class2Cd, class3Cd)
	}
}


/*******************************************************************************************************************
아래의 함수 중 모든 페이지 혹은 대다수의 페이지에서 사용하지 않고 특정 메뉴 혹은 페이지 에서만 사용하는 함수가 있다면
해당 메뉴/페이지로 옮겨주시기 바랍니다.

common.js는 파일명 그대로 공통으로 사용하는 함수 혹은 기능만 존재해야 합니다.

이 주석부분 아래에 구현된 소스 중 본인이 만든 함수가 있으신 경우 그 함수를 사용하는 메뉴 혹은 페이지로 옮겨주시기 바랍니다.
(js를 추가로 만들어서 메뉴/페이지에서 사용한다던가 특정 페이지의 <script>부분으로 소스를 옮긴다던가 하는 방식을 취하시면 될것 같습니다.)
*******************************************************************************************************************/


/* 탭메뉴 4번에 클래스 추가 */
$(function() {
	$('.toggleType .unitData .tab li').each(function(i) {
		if((i+1)%4 == 0) {
			$(this).addClass('last');
		};
	});
});

//quickMenu
$(function() {
	$(window).scroll(function() {
		var quickPos=$(window).scrollTop();
		$('.sky').stop(true, false).animate({'top' : quickPos+'px'}, 400);
	});

	$('.posTop').click(function() {
		$('html, body').animate({scrollTop : '0'}, 260);
		return false;
	})
});

/* paging */
$(function() {
	$('.paging').each(function(i) {
		$(this).find('span a').eq(0).addClass('first');
	});
});

/* 패밀리 사이트 / incFooter.jsp에 사용됨 */
$(function() {
	$('.familysite > .toggle').click(function() {
		$('.familyList').slideDown();
	})

	$('.familysite').mouseleave(function() {
		$('.familyList').slideUp();
	})
})

/* 로그인 */
$(function() {
	$('#logPw').focus(function() {
		$(this).addClass('on');
	});
	$('#logPwP').focus(function() {
		$(this).addClass('on');
	});
	$('#logPwL').focus(function() {
		$(this).addClass('on');
	});
	/*
	$('#logPw').blur(function() {
		$(this).removeClass('on');
	});
	*/
});

/* 아이디 저장 */
$(function() {
	$('.chkBg').toggle(
		function() {
			$(this).addClass('on');
			$(this).find('.chk').attr('checked', true);
		},
		function() {
			$(this).removeClass('on');
			$(this).find('.chk').attr('checked', false);
		}
	)
})


/*Gnb / incHeader.jsp에 사용됨 */
$(function() {

	$('#gnbArea > .menu > li > a').click(function() {
		var idVal = $(this).attr('id');

		$('#gnbArea > .menu > li > a').removeClass('on');
		$(this).addClass('on');

		if($(this).hasClass('gnbSub') || $(this).hasClass('highSub')) {
			$(idVal).show();
//			$('.gnbMenu').hide();
			$('#personal').slideUp();
			return false;
		}
	});

	$('.gnbMenu .close').click(function() {
		$(this).parents('.gnbMenu').hide();
		$('#gnbArea > .menu > li > a').removeClass('on');
	});

});

$(function() {
	$("a.page_mark").live("click",function(){
		var bookmarkUrl = this.href;
		var bookmarkTitle = this.title;

		if ($.browser.mozilla) { // For Mozilla Firefox Bookmark
			window.sidebar.addPanel(bookmarkTitle, bookmarkUrl,"");
		} else if($.browser.msie) { // For IE Favorite
			window.external.AddFavorite( bookmarkUrl, bookmarkTitle);
		} else if($.browser.opera ) { // For Opera Browsers
			$(this).attr("href",bookmarkUrl);
			$(this).attr("title",bookmarkTitle);
			$(this).attr("rel","sidebar");
			$(this).click();
		} else {
			alert('단축키 \"CTRL+D\"를 눌러 즐겨찾기 추가하세요.');
		}
		return false;
	});
});


/* 개인정보 보기: header */
$(function() {
	$('.userInfo > .userName').click(function() {
		$('#personal').slideDown();
		$('.gnbMenu').hide();
	});

	$('#personal .close').click(function() {
		$(this).parent().slideUp();
	})
});

/* navy_menu */
$(function () {
	$('#navy_menu .deps1 > ul > li:last').addClass('last');

	$('#navy_menu .navy_btn').find('span').live("click", function() {
		$(this).parent().find('.dep2').show();
	});
	$('#navy_menu .navy_btn').live("mouseleave",function() {
		$(this).find('.dep2').hide();
	});
});

//newsSetList 라인 제거
$(function() {
	$('.newsSetList .replyWrap:first dl').css('border-top', 'none');
})

//style js
$(document).ready(function(){
	$('#navy_menu > div > ul > li:last').css({
		'background-image' : 'none'
	});

	$('.data_page_head > div > ul > li:last').css({
		'background-image' : 'none'
	});
});

$(function () {
	$('.data_page_head .deps1 > ul > li:last').addClass('last');

	$('.data_page_head .navy_btn').click(function() {
		$(this).find('.dep2').show();
	});

	$('.data_page_head .navy_btn').mouseleave(function() {
		$(this).find('.dep2').hide();
	});
});


/*
$(window).load(function() {
	pageCenter();
});
*/

$(function() {
	//$('.section.toggleType .unitData').hide()
	$('.section.toggleType>.toggleBar>a').click(function() {
		$(this).toggleClass('on');
		$(this).parent().next().toggle();

		//$(this).parents('.section').find('.paging').css('width', '');
		pageCenter();
		$("iframe", parent.document).attr("height",$("#content").height());
		return false;
	});
});


$(function() {
	/*공통팝업 디자인1 닫기 버튼*/
	$('.msgPop .close').click(function() {
		$(this).parent().hide();
	});

});

/* 파일찾기 */
$(function() {
	$('.file').css('opacity', '0');
	$('.inputFile .file').change(function() {
		var fileUrl = $(this).val();
		$(this).parent().find('.text').val(fileUrl);
	});
});

/* textTab */
$(function() {
	//클릭시 활성화
	$('.textTab li').click(function() {
		var idx = $('.textTab li').index(this);

		$('.textTab li').removeClass('on');
		$(this).addClass('on');

		$('.textTab li img').each(function(i) {
			var img = $('.textTab li').eq(i).find('img');
			if(i == idx) {
				img.attr('src', img.attr('src').replace('_off.gif', '_on.gif'));
			} else {
				img.attr('src', img.attr('src').replace('_on.gif', '_off.gif'));
			}
		});
		return false;
	});

	//오버시 활성화
	$('.textTab li:not(.on)').hover(
		function() {
			var overImg = $(this).find('img');
			$('.textTab li').removeClass('over');
			$(this).addClass('over');
			overImg.attr('src', overImg.attr('src').replace('_off.gif', '_on.gif'));
		},
		function() {
			var overImg = $(this).find('img');
			$('.textTab li').removeClass('over');
			overImg.attr('src', overImg.attr('src').replace('_on.gif', '_off.gif'));
		}
	);
});

/* textTab1 */
$(function() {
	//클릭시 활성화
	$('.textTab1 li').click(function() {
		var idx = $('.textTab1 li').index(this);

		$('.textTab1 li').removeClass('on');
		$(this).addClass('on');

		$('.textTab1 li img').each(function(i) {
			if(i == idx) {

			} else {

			}
		});
		return false;
	});
});

/* lnb: subMenu */
$(function() {
	$('#left_menu li > .dep1').live("click", function() {
		var max = $(this).parent().find('.dep2').length;

		$('#left_menu li > .dep1 ').removeClass('on');
		$(this).addClass('on');
		// 2013-04-10 교과자료 lnb에서 단원별자료와 유형별 자료 모두 볼수 있도록 하기 위해 주석처리함 이홍 
		//$('#left_menu .dep2').hide();
		$(this).next().show();

		if(max == 0) {
			/* 하위 메뉴 없을때 처리 */
			//alert('하위 메뉴가 없음');
		}
	});

	$('#left_menu li .dep2 a').live("click", function() {
		$(this).parents('li').find('.dep1').addClass('on');
		$('#left_menu li .dep2 a').removeClass('on');
		$(this).addClass('on');
	});

	$('#left_menu .dep1').each(function(i) {
		if($(this).next('.dep2').length > 0) {
			$(this).append('<span></span>');
		};
	});

	$('#left_menu li > .on').live("click", function() {
		$(this).removeClass('on');
		$(this).next().hide();
	});
});

/* 관련 단원 자료 */
$(function() {
	$('.dataList > li').click(function() {
		var numMax = $(this).find('.num').length
		$(this).parents('.dataList').find('li').removeClass('on').end().end().addClass('on');
		$('.dataList > li .fileList').hide();

		if(numMax > 0) {
			$(this).find('.fileList').show();
		}
	});
});

/* 수박씨 추천강의 */
$(function() {
	$('#recommend .tit').click(function() {
		var lectureCnt = $(this).parents('tr').next('.lectureCnt');

		if(lectureCnt.is(':hidden')) {
			$('#recommend .lectureCnt').hide();
			$('#recommend .tit').removeClass('on')
			$(this).addClass('on')
			lectureCnt.show();
		} else {
			$(this).removeClass('on')
			lectureCnt.hide();
		}
	});
});

/* 메인 */
	/* 메인: 소통 */
	$(function() {
		$('.vivasamTalk>ul>li:gt(1)').hide();
		$('.eduInfo>ul>li:gt(4)').hide();

		$('.mutalMore').toggle(
			function() {
				$('.vivasamTalk>ul>li').show();
				$('.eduInfo>ul>li').show();
				$(this).addClass('extension')
			},
			function() {
				$('.vivasamTalk>ul>li:gt(1)').hide();
				$('.eduInfo>ul>li:gt(4)').hide();
				$(this).removeClass('extension')
			}
		);
	});

	/* #slideNotice */
	$(document).ready(function() {
		var noticeH = -$('#slideNotice ul li').height();

		$('#slideNotice > .move > .prev').click(function() {
			rollPrev();
			return false;
		});

		$('#slideNotice > .move > .next').click(function() {
			rollNext();
			return false;
		});

		function rollPrev() {
			$('#slideNotice ul').css('margin-top' , noticeH+'px');
			$('#slideNotice ul').prepend($('#slideNotice ul').find('li:last').clone(true));
			$('#slideNotice ul').stop(true, false).animate({'margin-top' : 0 * 1}, 600);
			$('#slideNotice ul').find('li:last').remove();
			clearTimeout(msgTime)
			msgTime = setTimeout(function() {rollNext()}, 5000);
		}

		function rollNext() {
			$('#slideNotice ul').stop(true, false).animate({'margin-top' : noticeH * 1}, 600, function() {
				$(this).append($(this).find('li:lt(1)').clone(true));
				$(this).find('li:lt(1)').remove();
				$(this).css('margin-top' , '0');
			});
			clearTimeout(msgTime)
			msgTime = setTimeout(function() {rollNext()}, 5000);
		}
		msgTime = setTimeout(function() {rollNext()}, 5000);
	});

	/* #iconSlide */
	$(document).ready(function() {
		var iconW = -$('#iconSlide ul li').width();
		var btn_prev = $('#iconSlide a').hasClass('prev');

		$('#iconSlide .btn.prev').click(function(){
			var btn_info = $('#iconSlide a.btn').hasClass('disable');
			if(btn_info){
				return false;
			}else{
				disable_button()
				rollPrev();
			}
		});

		$('#iconSlide .btn.next').click(function(){
			var btn_info = $('#iconSlide a.btn').hasClass('disable');
			if(btn_info){
				return false;
			}else{
				disable_button()
				rollNext();
			}
		});

		/*
			if(btn_prev){
				alert(2)
				disable_button()
				rollPrev();
			}else{
				alert(3)
				disable_button()
				rollNext();
			}
			*/


		function rollPrev() {
			$('#iconSlide ul').prepend($('#iconSlide ul').find('li:last').clone(true));
			$('#iconSlide ul').css('margin-left' , iconW+'px');

			$('#iconSlide ul').stop(true, false).animate({'margin-left' : 0 * 1}, 500, function() {
				$('#iconSlide ul').find('li:last').remove();
			});
		}
		function rollNext() {
			$('#iconSlide ul').append($('#iconSlide ul').find('li:first').clone(true));
			$('#iconSlide ul').stop(true, false).animate({'margin-left' : iconW * 1}, 500, function() {
				$(this).find('li:first').remove();
				$(this).css('margin-left' , '0');
			});
		}

		function disable_button(){
			$('#iconSlide .btn').addClass('disable')

			setTimeout(function() {
				$('#iconSlide .btn').removeClass('disable')
			}, 700);
		}
	});

	/* 나도 세포 디자이너 */
	$(document).ready(function() {
		var tabIdx = 0;
		var rollMax = $('.cellDesign li').length; //이미지 갯수
		var visualW = $('.cellDesign li').width(); //이미지 width

		$('.cellDesign').append('<span class="circlePage"></span>');
		$('.cellDesign ul li').each(function(i) {
			$('.cellDesign .circlePage').append('<a href="javascript: void(0)"></a>')
		})

		$('.cellDesign .circlePage a').click(function() {
			var tabIdx = $('.cellDesign .circlePage a').index(this);
			visualRoll(tabIdx);
			return false;
		});

		function visualRoll(tabIdx) {
			$('.cellDesign ul li').fadeOut();
			$('.cellDesign ul li').eq(tabIdx).fadeIn();

			$('.cellDesign .circlePage a').removeClass('on');
			$('.cellDesign .circlePage a').eq(tabIdx).addClass('on');

			tabIdx < rollMax-1 ? tabIdx = tabIdx +1 : tabIdx = 0;

			clearTimeout(visualTime);
			visualTime = setTimeout(function() {visualRoll(tabIdx)}, 8000);
		}
		visualTime = setTimeout(function() {visualRoll(tabIdx)}, 0);

		if(rollMax == 1) {
			clearTimeout(visualTime);
			$('.cellDesign .circlePage').hide();
			$('.cellDesign ul li').show();
		}
	});

	/* 슬라이드 배너 */
	 $(document).ready(function() {
		var tabIdx1 = 0;
		var rollMax1 = $('.slideBanner li').length; //이미지 갯수
		var visualW = $('.slideBanner li').width(); //이미지 width

		$('.slideBanner').append('<span class="circlePage"></span>');
		$('.slideBanner ul li').each(function(i) {
			$('.slideBanner .circlePage').append('<a href="javascript: void(0)"></a>')
		})

		$('.slideBanner .circlePage a').click(function() {
			var tabIdx1 = $('.slideBanner .circlePage a').index(this);
			visualRoll1(tabIdx1);
			return false;
		});

		function visualRoll1(tabIdx1) {
			$('.slideBanner ul li').fadeOut();
			$('.slideBanner ul li').eq(tabIdx1).fadeIn();

			$('.slideBanner .circlePage a').removeClass('on');
			$('.slideBanner .circlePage a').eq(tabIdx1).addClass('on');

			tabIdx1 < rollMax1-1 ? tabIdx1 = tabIdx1 +1 : tabIdx1 = 0;

			clearTimeout(visualTime1);
			visualTime1 = setTimeout(function() {visualRoll1(tabIdx1)}, 8000);
		}

		visualTime1 = setTimeout(function() {visualRoll1(tabIdx1)}, 0);

		if(rollMax1 == 1) {
			clearTimeout(visualTime1);
			$('.slideBanner .circlePage').hide();
			$('.slideBanner ul li').show();
		}
	});

	/* 나의교실: 소식설정 */
	$(document).ready(function() {
		var newsSet = -$('.listWrap .list a').height();

		function setNext1() {

			$('.listWrap .list').stop(true, false).animate({'margin-top' : newsSet * 1}, 500, function() {
				$(this).append($(this).find('a:lt(1)').clone(true));
				$(this).find('a:lt(1)').remove();
				$(this).css('margin-top' , '0');
			});
			clearTimeout(msgTime1)
			msgTime1 = setTimeout(function() {setNext1()}, 3000);
		}
		msgTime1 = setTimeout(function() {setNext1()}, 3000);
	});


/* 메인 */


/* 선생님 공유자료
$(function() {
	$('.teachData').click(function() {
		var posY = $(this).offset().top - 100;
		$('#publicTeach').css({
			'top' : posY+'px',
			'display' : 'block'
		})
		pageCenter();
		return false;
	})

	$('.msgPop1 .close').click(function() {
		$(this).parent().hide();
		return false;
	});
})
*/
	

	/* faq */
	$(function() {
		$('.cntList4 .que a').click(function() {
			var answer = $(this).parents('tr').next()
			if(answer.is(':hidden')) {
				$('.cntList4 .answer').hide();
				$(this).parents('tr').next().show();
			} else {
				$(this).parents('tr').next().hide();
			};

			$("iframe", parent.document).attr("height",$("#content").height());
		});
	});


	//슬라이드
	//슬라이드
	(function($) {                                          // Compliant with jquery.noConflict()
		$.fn.jCarouselLite = function(o) {
			o = $.extend({
			btnPrev: null,
			btnNext: null,
			btnGo: null,
			mouseWheel: false,
			auto: null,

			speed: 200,
			easing: null,

			vertical: false,
			circular: true,
			visible: 3,
			start: 0,
			scroll: 1,
			over: false,
			fnInterval: null,
			title: null,

			beforeStart: null,
			afterEnd: null
			}, o || {});

			return this.each(function() {                           // Returns the element collection. Chainable.

				var running = false, animCss=o.vertical?"top":"left", sizeCss=o.vertical?"height":"width";
				var div = $(this), ul = $("ul", div), tLi = $("li", ul), tl = tLi.size(), v = o.visible;
				if(o.circular) {
					ul.prepend(tLi.slice(tl-v-1+1).clone())
					.append(tLi.slice(0,v).clone());
					o.start += v;
				}
				var li = $("li", ul), itemLength = li.size(), curr = o.start;

				div.css("visibility", "visible");

				li.css({overflow: "hidden", float: o.vertical ? "none" : "left"});
				ul.css({margin: "0", padding: "0", position: "relative", "list-style-type": "none", "z-index": "1"});
				div.css({overflow: "hidden", position: "relative", "z-index": "2", left: "0px"});

				var liSize = o.vertical ? height(li) : width(li);   // Full li size(incl margin)-Used for animation
				var ulSize = liSize * itemLength;                   // size of full ul(total length, not just for the visible items)
				var divSize = liSize * v;                           // size of entire div(total length for just the visible items)

				li.css({width: li.width(), height: li.height()});
				ul.css(sizeCss, ulSize+"px").css(animCss, -(curr*liSize));

				div.css(sizeCss, divSize+"px");                     // Width of the DIV. length of visible images

				if(o.btnPrev)
				$(o.btnPrev).click(function() {
				return go(curr-o.scroll);
				});
				if(o.btnNext)
				$(o.btnNext).click(function() {
				return go(curr+o.scroll);
				});
				if(o.btnGo)
				$.each(o.btnGo, function(i, val) {
				$(val).click(function() {
				return go(o.circular ? o.visible+i : i);
				});
				});

				if(o.mouseWheel && div.mousewheel)
				div.mousewheel(function(e, d) {
				return d>0 ? go(curr-o.scroll) : go(curr+o.scroll);
				});

				if(o.auto){
				o.fnInterval  = setInterval(function() {
				go(curr+o.scroll);
				}, o.auto+o.speed);


				if(o.over){
					div.hover(function(){
					clearInterval(o.fnInterval);
					}, function(){
					o.fnInterval  = setInterval(function() {
					go(curr+o.scroll);
					}, o.auto+o.speed);
					});

					$(o.btnNext).hover(function(){
					clearInterval(o.fnInterval);
					}, function(){
					o.fnInterval  = setInterval(function() {
					go(curr+o.scroll);
					}, o.auto+o.speed);
					});

					$(o.btnPrev).hover(function(){
					clearInterval(o.fnInterval);
					}, function(){
					o.fnInterval  = setInterval(function() {
					go(curr+o.scroll);
					}, o.auto+o.speed);
					});
				}


				}

				function vis() {
				return li.slice(curr).slice(0,v);
				};

				function go(to) {
				if(!running) {

				if(o.beforeStart)
				o.beforeStart.call(this, vis());

				if(o.circular) {            // If circular we are in first or last, then goto the other end
				if(to<=o.start-v-1) {           // If first, then goto last
				ul.css(animCss, -((itemLength-(v*2))*liSize)+"px");
				// If "scroll" > 1, then the "to" might not be equal to the condition; it can be lesser depending on the number of elements.
				curr = to==o.start-v-1 ? itemLength-(v*2)-1 : itemLength-(v*2)-o.scroll;
				} else if(to>=itemLength-v+1) { // If last, then goto first
				ul.css(animCss, -( (v) * liSize ) + "px" );
				// If "scroll" > 1, then the "to" might not be equal to the condition; it can be greater depending on the number of elements.
				curr = to==itemLength-v+1 ? v+1 : v+o.scroll;
				} else curr = to;
				} else {                    // If non-circular and to points to first or last, we just return.
				if(to<0 || to>itemLength-v) return;
				else curr = to;
				}                           // If neither overrides it, the curr will still be "to" and we can proceed.

				running = true;

				if (o.title){
					var imgPath = li.eq(curr).children("img").attr("src");
					var length = imgPath.length;
					var file_name = imgPath.substring(0, length-4);
					jQuery(o.title).fadeOut(300, function(){
						jQuery(o.title).attr("src",file_name + "_title.gif");
					}).fadeIn(300);
				}

				ul.animate(
				animCss == "left" ? { left: -(curr*liSize) } : { top: -(curr*liSize) } , o.speed, o.easing,
				function() {
				if(o.afterEnd)
				o.afterEnd.call(this, vis());
				running = false;
				}
				);
				// Disable buttons when the carousel reaches the last/first, and enable when not
				if(!o.circular) {
				$(o.btnPrev + "," + o.btnNext).removeClass("disabled");
				$( (curr-o.scroll<0 && o.btnPrev)
				||
				(curr+o.scroll > itemLength-v && o.btnNext)
				||
				[]
				).addClass("disabled");
				}

				}
				return false;
				};
				});
				};

				function css(el, prop) {
				return parseInt($.css(el[0], prop)) || 0;
				};
				function width(el) {
				return  el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight');
				};
				function height(el) {
				return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom');
				};

		})(jQuery);
	
	

	/* 키워드 점선 제거 */
	$(function() {
		$('.keyWord a').focus(function() {
			this.blur();
		});
	});

	/* 상세뷰 티칭노트보기 투명 버튼 보기 */
	$(function() {
		$('.slideContain,.txtSubScript').mouseenter(function() {
			$(".tView").show();
		}),
		$('.slideContain,.txtSubScript').mouseleave(function() {
			$(".tView").hide();
		});
	});

	/* 파워샘 */
	$(function() {
		$(window).load(function() {
			var max = $('.powerSam').length;
			if(max > 0) {
				var samY = $('.introTxt dd:first').position().top;
				$('.viewCnt .powerSam').css({'top' : samY-10+'px'});
				$('.powerSam').show();

			} else {
				return false;
			}

			if($('.acGuide').text() == '') {
				$('.acGuide').css('background', 'none')
			} else {
				return false;
			}
		})
	});

	/* 열림샘터 메인 */
	$(document).ready(function() {
		var tabIdx = 0;
		var rollMax = $('.hot_content').length; //이미지 갯수
		var visualTime;

		$('.knowledge_title').prepend('<span class="circlePage"></span>');
		$('#hotIssue .hot_content').each(function(i) {
			$('.knowledge_title .circlePage').append('<a href="javascript: void(0)"></a>')
		})

		$('.knowledge_title .circlePage a').click(function() {
			var tabIdx = $('.knowledge_title .circlePage a').index(this);
			visualRoll(tabIdx);
		});

		function visualRoll(tabIdx) {
			$('#hotIssue .hot_content').fadeOut();
			$('#hotIssue .hot_content').eq(tabIdx).fadeIn();

			$('.knowledge_title .circlePage a').removeClass('on');
			$('.knowledge_title .circlePage a').eq(tabIdx).addClass('on');

			tabIdx < rollMax-1 ? tabIdx = tabIdx +1 : tabIdx = 0;

			clearTimeout(visualTime);
			visualTime = setTimeout(function() {visualRoll(tabIdx)}, 8000);
		}

		if(rollMax > 1) {
			visualTime = setTimeout(function() {visualRoll(tabIdx)}, 0);
		} else {
			$('.knowledge_title .circlePage').remove();
		}
	});

	/* 추천 파워샘 */
	$(document).ready(function() {
		var tabIdx = 0;
		var rollMax = $('#powerWrap .pCnt').length; //이미지 갯수
		var visualTime;

		$('.step1').prepend('<span class="circlePage"></span>');
		$('#powerWrap .pCnt').each(function(i) {
			$('.step1 .circlePage').append('<a href="javascript: void(0)"></a>')
		})

		$('.step1 .circlePage a').click(function() {
			var tabIdx = $('.step1 .circlePage a').index(this);
			visualRoll(tabIdx);
		});

		function visualRoll(tabIdx) {
			$('#powerWrap .pCnt').fadeOut();
			$('#powerWrap .pCnt').eq(tabIdx).fadeIn();

			$('.step1 .circlePage a').removeClass('on');
			$('.step1 .circlePage a').eq(tabIdx).addClass('on');

			tabIdx < rollMax-1 ? tabIdx = tabIdx +1 : tabIdx = 0;

			clearTimeout(visualTime);
			visualTime = setTimeout(function() {visualRoll(tabIdx)}, 8000);
		}

		if(rollMax > 1) {
			visualTime = setTimeout(function() {visualRoll(tabIdx)}, 0);
		} else {
			$('.step1 .circlePage').remove();
			$('#powerWrap .pCnt').show();
		}
	});

		/***********************************************
	* moveContents
	************************************************/
	(function($) {

		$.fn.moveContents = function(options){
			return this.each(function(){
				var opts = $.extend({}, $.fn.moveContents.defaults, options || {});
				options = options || {};
				var $cont = $(this);																			//이동컨텐츠 전체 element
				var $contEventEl = opts.iconFlag? $cont.find(opts.eventEl) : null;		//클릭이벤트 element
				var $contEventCon = $cont.find(opts.conEl);										//실제 변경컨텐츠 element
				var $contConCnt = $contEventCon.length;											//변경컨텐츠갯수
				var $contSelIndex = opts.defaultIndex;												//현재선택된 컨텐츠의 index값
				var $contTimer;																				//오토플레이 시간변수
				var $btnPrev = $cont.find(opts.btnPrev);											//이전버튼
				var $btnNext = $cont.find(opts.btnNext);											//다음버튼
				var $btnPlay = $cont.find(opts.btnPlay);											//사용자컨트롤 플레이버튼
				var $btnStop = $cont.find(opts.btnStop);											//사용자컨트롤 정지버튼
				var $moveMode = true;																		//오토플레이 slide시 자동변경 방향
				var $playMode = true;																		//사용자 컨트롤러에 의한 애니메이션 상태
				var $oldSelIndex;																				//선택된 컨텐츠 이전 선택 index값
				var $iconMode;																				//아이콘클릭이벤트일때만 true

				if(opts.slideValue){
					var $slideValue = opts.slideValue;
				}
				else{
					if(opts.slideFor=="left" || opts.slideFor=="right") var $slideValue = $contEventCon.eq(0).outerWidth();
					else var $slideValue = $contEventCon.eq(0).outerHeight();
				}

				if(opts.addContain) $cont.addClass(opts.addContain);

				/*********************************************************
				//컨텐츠갯수가 복수일때 이벤트 설정(하나일때는 아이콘 버튼 미출력)
				**********************************************************/
				if($contConCnt>1){

					/* 디스플레이 초기화 - effect : slide */
					if(opts.effect=="slide"){
						$contEventCon.each(function(){
							var new_position = newPosition($(this));
							switch(opts.slideFor)
							{
								case "right":
								$(this).css({"right":new_position});
								break;

								case "top":
								$(this).css({"top":new_position});
								break;

								case "bottom":
								$(this).css({"bottom":new_position});
								break;

								default:
								$(this).css({"left":new_position});
								break;
							}

							if($contEventEl) $contEventEl.eq($contSelIndex).addClass(opts.onClass);
						});

					/* 디스플레이 초기화 - effect : circle  */
					}else if(opts.effect=="circle"){
						$contEventCon.eq(0).addClass("on");
						var viewSize = opts.circleSide;
						var $sideDeps = Math.floor(($contConCnt+2)/3);

						$cont.css("width",$contEventCon.eq(0).outerWidth()+(($contConCnt-1)*viewSize));

						//출력사이즈 정보
						var $circle_info = new Array();

						$circle_info[0] = new Array();
						$circle_info[0]["width"] = $contEventCon.eq(0).width();
						$circle_info[0]["height"] = $contEventCon.eq(0).height();
						$circle_info[0]["left"] = opts.circleSide*$sideDeps;
						$circle_info[0]["top"] = 0;
						$circle_info[0]["z-index"] = $contEventCon.eq(0).css("z-index");

						for(i=1;i<=$sideDeps;i++){
							$circle_info[i] = new Array();
							$circle_info[i]["width"] = $circle_info[i-1]["width"]*opts.circleRatio;
							$circle_info[i]["height"] = $circle_info[i-1]["height"]*opts.circleRatio;
							$circle_info[i]["top"] = ($circle_info[0]["height"]-$circle_info[i]["height"])/2;
							$circle_info[i]["left_prev"] = $circle_info[0]["left"]-viewSize*i;
							$circle_info[i]["left_next"] = $circle_info[0]["left"]+$circle_info[0]["width"]-($circle_info[i]["width"]-viewSize*i);

							//깊이별 컨텐츠 가로사이즈 = 상위deps 가로사이즈 * 축소비율
							//깊이별 컨텐츠 세로사이즈 = 상위deps 세로사이즈 * 축소비율
							//깊이별 컨텐츠 Top 좌표 = (최상위컨텐츠 높이값 - 자기자신 높이값) /2
							//깊이별 좌측 컨텐츠 Left 좌표  = 상위컨텐츠 좌측좌표값 - (좌측 보여지는 영역 가로사이즈 * deps)
							//깊이별 우측 컨텐츠 Left 좌표  = 최상위컨텐츠 좌측좌표값 + 최상위컨텐츠 가로사이즈 - (자기자신 전체가로사이즈 - 우측 보여지는 영역 가로사이즈)
						}
						moveAni_circle();

						$contEventCon.bind("click",function(){
							$contSelIndex = $contEventCon.index($(this));
							moveAni_circle();
						});

					/* 디스플레이 초기화 - effect : accordion */
					}else if(opts.effect=="accordion"){
						var $accordionMax = opts.accordionMax?opts.accordionMax:$contEventCon.eq(0).outerWidth();
						$cont.css("width",($contConCnt-1)*opts.accordionMin+$accordionMax);
						$contEventCon.bind(opts.conEvent,function(){
							$contSelIndex = $contEventCon.index($(this));
							moveAni_accordion();
						});

						if(opts.autoPlay && opts.conEvent=="mouseover"){
							$contEventCon.hover(function(){
								clearTimeout($contTimer);
							},function(){
								$contTimer = setTimeout(moveIndexPlus,opts.changeTimer);
							});
						}
						moveAni_accordion();

					/* 디스플레이 초기화 - effect : show , fade */
					}else{
						$cont.each(function(){
							$contEventCon.hide();
							$contEventCon.eq($contSelIndex).show();
							if($contEventEl) $contEventEl.eq($contSelIndex).addClass(opts.onClass);
						});
					}

					/* 아이콘버튼 디스플레이 */
					if(opts.iconFlag) displayIcon();

					/* 이동버튼(이전,다음) 디스플레이 및 이벤트설정*/
					if(opts.btnFlag){
						moveContentsBtn();
						if($contConCnt>opts.slideView){
							$btnNext.bind("click",function(){
								if(!$(this).hasClass(opts.btnNextOff))moveIndexPlus();
								//<<<<<<
								//alert('next')

								// 다음 버튼을 클릭하면 클릭하기 전에 선택된 항목의 다음 항목이 선택된 상태로 바뀌게 된다
								// 이러한 상태에서 li 태그의 클래스가 on이 된 것을 찾아서 그것을 클릭한 이벤트 효과를 나타낸다
								$("#menu_ul > li").each(function(){
									if($(this).hasClass("on")){
										$(this).find("a").trigger("click");
									}
								});
							});
							$btnPrev.bind("click",function(){
								if(!$(this).hasClass(opts.btnPrevOff)) moveIndexMinus();
								//<<<<<<
								//alert('prev')

								// 이전 버튼을 클릭하면 클릭하기 전에 선택된 항목의 이전 항목이 선택된 상태로 바뀌게 된다
								// 이러한 상태에서 li 태그의 클래스가 on이 된 것을 찾아서 그것을 클릭한 이벤트 효과를 나타낸다
								$("#menu_ul > li").each(function(){
									if($(this).hasClass("on")){
										$(this).find("a").trigger("click");
									}
								});
							});
						}
					}else{
						$btnPrev.hide();
						$btnNext.hide();
					}

					/* $contEventEl 이벤트설정 */
					if(opts.iconFlag){
						$contEventEl.bind(opts.iconFlagEvent,function(){
							$moveMode = $contEventEl.index($(this))-$contSelIndex>0? true : false;
							$iconMode=true;
							$oldSelIndex = $contSelIndex;
							$contSelIndex = $contEventEl.index($(this));
							moveContentsAnimation();
							return opts.eventReturn;
						});
					}else{
						if($contEventEl) $contEventEl.hide();
					}

					/* 오토플레이 이벤트 설정(컨텐츠 오버시 오토플레이 일시멈춤) */
					$contEventCon.hover(function(){
						clearTimeout($contTimer);
					},function(){
						if($playMode && opts.autoPlay) callAnimation();
					});

					/* delayTimer에 의한 자동애니메시션 설정*/
					if($playMode && opts.autoPlay) setTimeout(callAnimation,opts.delayTimer);

					/* 플레이 컨트롤러 설정 */
					if(opts.controlFlag){
						$btnPlay.bind("click",function(){
							$playMode = true;
							$contTimer = setTimeout(moveIndexPlus,opts.changeTimer);
						});
						$btnStop.bind("click",function(){
							$playMode = false;
							clearTimeout($contTimer);
						});
					}

					/* 콜백함수설정 */
					if(opts.conCallBack){
						$contEventCon.bind("click",function(){
							$contEventCon.removeClass("sel");
							$(this).addClass("sel");
							opts.conCallBack();
						});
					}
				}else{
//					$contEventEl.hide();
					$btnPrev.hide();
					$btnNext.hide();
				}

				/********************************************************
				//다음컨텐츠보기
				********************************************************/
				function moveIndexPlus(){
					$moveMode = true;
					$oldSelIndex = $contSelIndex;
					$contSelIndex++;
					if($contSelIndex>$contConCnt-1) $contSelIndex=0;
					moveContentsAnimation();
				}

				/*********************************************************
				//이전컨텐츠보기
				*********************************************************/
				function moveIndexMinus(){
					$moveMode = false;
					$oldSelIndex = $contSelIndex;
					$contSelIndex--;
					if($contSelIndex<0) $contSelIndex = $contConCnt-1;
					moveContentsAnimation();
				}

				/*********************************************************
				//오토플레이 호출 함수
				*********************************************************/
				function callAnimation(){
					clearTimeout($contTimer);
					$contTimer = setTimeout(moveIndexPlus,opts.changeTimer);
				}

				/*********************************************************
				//아이콘버튼 디스플레이함수
				*********************************************************/
				function displayIcon(){
					$contEventCon.each(function(){
						if($contEventCon.index($(this))!=$contSelIndex){
							$contEventEl.eq($contEventCon.index($(this))).removeClass(opts.onClass);
							if(opts.onImage){
								$contEventEl.eq($contEventCon.index($(this))).find('img').attr('src', function() {return $(this).attr("src").replace("_on", "_off");});
							}
						}else{
							$contEventEl.eq($contEventCon.index($(this))).addClass(opts.onClass);
							if(opts.onImage){
								$contEventEl.eq($contEventCon.index($(this))).find('img').attr('src', function() {return $(this).attr("src").replace("_off", "_on");});
							};
						}
					});
				}

				/*********************************************************
				//버튼 디스플레이 설정 함수
				*********************************************************/
				function moveContentsBtn(){
					if(opts.btnFlagDisabled){
						if($contSelIndex<1 && !opts.btnFlagAll) $btnPrev.addClass(opts.btnPrevOff);
						else $btnPrev.removeClass(opts.btnPrevOff);

						if($contSelIndex+opts.slideView>=$contConCnt && !opts.btnFlagAll) $btnNext.addClass(opts.btnNextOff);
						else $btnNext.removeClass(opts.btnNextOff);
					}else{
						if($contSelIndex<1 && !opts.btnFlagAll) $btnPrev.hide();
						else $btnPrev.show();

						if($contSelIndex>=$contConCnt-1 && !opts.btnFlagAll) $btnNext.hide();
						else $btnNext.show();
					}
				}

				/*********************************************************
				//선택된 index에 따른 새 위치값 계산
				*********************************************************/
				function newPosition(obj){
					var value = $contEventCon.index(obj) - $contSelIndex;
					if(opts.slideRepeat && !$iconMode){
						if($moveMode){
							if(value>=opts.slideView) value = value - $contConCnt;
							if(value<-1) value = value + $contConCnt;
						}else{
							if(value>opts.slideView) value = value - $contConCnt;
							if(value<=(-1)*($contConCnt-opts.slideView)) value = value + $contConCnt;
						}
					}
					value = value * $slideValue;
					return value;
				}

				/*********************************************************
				//Animation - effect : show일때
				*********************************************************/
				function moveAni_show(){
					$contEventCon.each(function(){

						if($contSelIndex==$contEventCon.index($(this))) $(this).addClass(opts.onClass);
						else $(this).removeClass(opts.onClass);

						if($contEventCon.index($(this))!=$contSelIndex) $(this).hide();
						else $(this).show();
					});
				}

				/*********************************************************
				//Animation -effect : fade일때
				*********************************************************/
				function moveAni_fade(){
					$contEventCon.each(function(){

						if($contSelIndex==$contEventCon.index($(this))) $(this).addClass(opts.onClass);
						else $(this).removeClass(opts.onClass);

						if($contEventCon.index($(this))!=$contSelIndex) $(this).fadeOut(opts.aniTimer);
						else $(this).fadeIn(opts.aniTimer);
					});
				}

				/*********************************************************
				//Animation - effect : slide일때
				*********************************************************/
				function moveAni_slide(){

					/* 슬라이드반복설정일때 애니메이션 효과를 위한 시작위치 재설정 */
					if(opts.slideRepeat){
						$contEventCon.each(function(){
							var value = Number($(this).css(opts.slideFor).replace("px",""))/$slideValue;
							if($moveMode){
								if(value<0) value = value + $contConCnt;
							}
							else{
								if(value>=opts.slideView) value = value - $contConCnt;
							}
							value = value*$slideValue;
							$(this).css(opts.slideFor,value);
						});
					}

					/* 새위치설정 */
					$contEventCon.each(function(){

						var new_position = newPosition($(this));

						if($contSelIndex==$contEventCon.index($(this))) $(this).addClass(opts.onClass);
						else $(this).removeClass(opts.onClass);

						switch(opts.slideFor)
						{
							case "right":
							$(this).stop().animate({"right":new_position}, opts.aniTimer, opts.easing);
							break;

							case "top":
							$(this).stop().animate({"top":new_position}, opts.aniTimer, opts.easing);
							break;

							case "bottom":
							$(this).stop().animate({"bottom":new_position}, opts.aniTimer, opts.easing);
							break;

							default:
							$(this).stop().animate({"left":new_position}, opts.aniTimer, opts.easing);
							break;
						}
					});
				}

				/*********************************************************
				//Animation - effect : circle일때
				*********************************************************/
				function moveAni_circle(){
					$contEventCon.eq($contSelIndex)
						.addClass("on")
						.css("z-index",$circle_info[0]["z-index"])
						.animate({
							"opacity" : 1,
							"left" : $circle_info[0]["left"],
							"top" : $circle_info[0]["top"],
							"width" : $circle_info[0]["width"],
							"height" : $circle_info[0]["height"]
						}, opts.aniTimer, opts.easing);
					for(i=1;i<=$sideDeps;i++){
						prevIndex = $contSelIndex-i;
						if(prevIndex<0) prevIndex = prevIndex+$contConCnt;

						nextIndex = $contSelIndex+i;
						if(nextIndex>=$contConCnt) nextIndex = nextIndex-$contConCnt;

						var newIndex = $circle_info[0]["z-index"]-(i*2);
						if($moveMode){
							var newIndex_prev = newIndex-1;
							var newIndex_next = newIndex-2;
						}else{
							var newIndex_prev = newIndex-2;
							var newIndex_next = newIndex-1;
						}

						$contEventCon.eq(prevIndex)
							.removeClass("on")
							.css("z-index",newIndex_prev)
							.animate({
								"opacity" : opts.circleOpacity,
								"left" : $circle_info[i]["left_prev"],
								"top" : $circle_info[i]["top"],
								"width" : $circle_info[i]["width"],
								"height" : $circle_info[i]["height"]
							}, opts.aniTimer, opts.easing);

						$contEventCon.eq(nextIndex)
							.removeClass("on")
							.css("z-index",newIndex_next)
							.animate({
								"opacity" : opts.circleOpacity,
								"left" : $circle_info[i]["left_next"],
								"top" : $circle_info[i]["top"],
								"width" : $circle_info[i]["width"],
								"height" : $circle_info[i]["height"]
							}, opts.aniTimer, opts.easing);
					}
				}

				/*********************************************************
				//Animation - effect : accordion일때
				*********************************************************/
				function moveAni_accordion(){
					$contEventCon.each(function(){
						var new_position = opts.accordionMin*$contEventCon.index($(this));
						if($contSelIndex<$contEventCon.index($(this))) new_position = new_position + ($accordionMax-opts.accordionMin);

						$(this).stop(true).animate({
							"left" : new_position
						}, opts.aniTimer, opts.easing);

						if($contEventCon.index($(this))==$contSelIndex) $(this).addClass(opts.onClass);
						else $(this).removeClass(opts.onClass);
					});
				}

				/*********************************************************
				//컨텐츠 디스플레이 함수
				*********************************************************/
				function moveContentsAnimation(){

					clearTimeout($contTimer);

					switch(opts.effect)
					{
						case "fade":
						moveAni_fade();
						break;

						case "slide":
						moveAni_slide();
						break;

						case "circle":
						moveAni_circle();
						break;

						case "accordion":
						moveAni_accordion();
						break;

						default:
						moveAni_show();
						break;
					}

					//아이콘버튼 재설정
					if(opts.iconFlag) displayIcon();

					//이동버튼출력 재설정
					if(opts.btnFlag) moveContentsBtn();

					//오토플레이 재설정
					if(opts.autoPlay && $playMode) callAnimation();

					//콜백함수
					if(opts.changeCallBack) opts.changeCallBack();

					$iconMode = false;
				}
			});
		};

		$.fn.moveContents.defaults = {
			eventEl : ">ul a",
			conEl : ">div",
			defaultIndex : 0,
			addContain : null,
			onClass : "on",
			onImage : false,
			iconFlag : true,
			iconFlagEvent : "click",
			btnFlag : false,
			btnFlagAll : false,
			btnFlagDisabled : false,
			btnPrev : ".btn-prev",
			btnNext : ".btn-next",
			btnPrevOff : "btn-prev-off",
			btnNextOff : "btn-next-off",
			autoPlay : false,
			delayTimer : 0,
			changeTimer : 2000,
			controlFlag : false,
			btnPlay : ".btn-play",
			btnStop : ".btn-stop",
			effect : "show",
			easing : "linear",
			aniTimer : 600,
			slideFor : "left",
			slideValue : null,
			slideView : 1,
			slideRepeat : false,
			circleRatio : 0.8,
			circleSide : 20,
			circleOpacity : 0.9,
			accordionMin : 50,
			accordionMax : null,
			conEvent : "click",
			changeCallBack : null,
			conCallBack : null,
			eventReturn : false
		};

	})(jQuery);
