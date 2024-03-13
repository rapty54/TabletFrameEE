

/*********************************** 메인 레이어 팝업 배너 띄우기/닫기 ***************************************/
/*레이어 팝업 띄우기 onload에서 호출, "오늘 하루 보지 않기" 클릭하지 않은 경우만 show*/
/*다시 보지 않기로 설정한 경우 365일동안 쿠키정보가 남아 있는 형태로 작업된다. 혹시 배너가 안보이는 경우엔 아래 쿠키 셋팅명을 변경해서 해결....*/
function fnPopup(cookieMatterYn){
	try {
		for(var i = 1; i <= 2; i++) {
			//cookieMatterYn = "N" 이면 쿠키 설정 정보와 상관없이 레이어 배너 팝업 띄움, 심원보, 20160310
			if (cookieMatterYn == "N") {
				$("#main_pop"+i).addClass("sub");
				$("#main_pop"+i).show();				
			}
			else {
				if (cookieMatterYn == "M") {
					$("#main_pop"+i).removeClass("sub");
					$("#main_pop"+i).show();
				}
				else {
					if (getCookie( "mainLayerBannerNew"+i ) != "done" ) {
						$("#main_pop"+i).removeClass("sub");
						$("#main_pop"+i).show();
					}
				}
			}			
		}
	}
	catch(e) {
		
	}
}

/* 레어어 팝업 창닫기 클릭(새로고침하면 레이어 팝업이 다시 뜸) */
function close_pop(pop){
	$(pop).parents('.main_pop').css({
		'display' : 'none'
	});
}

/* 레어어 팝업 "오늘 하루 보지 않기" 클릭(새로고침하면 레이어 팝업이 다시 안 뜸) */
function close_popup_guide(idx, bool, closeTp){
	if(bool){
		if(closeTp == "D"){
			setCookie( "mainLayerBannerNew"+idx, "done" , 1);
		}else if(closeTp == "F"){
			setCookie( "mainLayerBannerNew"+idx, "done" , 365);
		}
	}
	
	$("#main_pop"+idx).hide();
}
/*********************************** 메인 레이어 팝업 배너 띄우기/닫기 ***************************************/


//ie 브라우저 체크, 심원보
function isIE() { 
   	return ((navigator.appName == 'Microsoft Internet Explorer') 
   			|| ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); 
}

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
   document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

// Lnb 메뉴 제어용, 심원보
function setJQCookie(){
	var name = arguments[0];
    var value = arguments[1];
    var expiredays = arguments[2];

    //alert("setJQCookie");

	//$.cookie(name, null);
	$.cookie(name, value, { path: '/'});
	//$.cookie(name, value, { path: '/', expires: 10 });
}

function setJQSession(){
	var name = arguments[0];
    var value = arguments[1];

	$.session.set(name, value);
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
	var idObject = '#'+idVal; //아이디
	var popW = $(idObject).outerWidth();
	var popH = $(idObject).outerHeight();

	var mgW = popW/2; //가로 가운데 정렬
	var posY = (winH - popH)/2; //세로 가운데 정렬
	var scrY = $(window).scrollTop(); //스크롤 위치

	$(idObject).css({
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

	var idObject = '#'+idVal; //아이디
	var popW = $(idObject).outerWidth();
	var popH = $(idObject).outerHeight();

	var mgW = popW/2; //가로 가운데 정렬
	var posY = (winH - popH)/2; //세로 가운데 정렬
	var scrY = $(window).scrollTop(); //스크롤 위치
	
	$(idObject).css({
		'display' : 'block',
		'margin-left' : -mgW+'px',
		'top' : (scrY+posY)+'px',
		'left' : '50%',
		'position' : 'absolute'
	});
	
	/* 20150324, 심원보 주석 처리
	if ($('#wrap').length > 0) {
		$('#wrap').append('<div class="dim"></div>');
	}
	else if ($('#downWrap').length > 0) { //교과서CD 다운로드
		$('#downWrap').append('<div class="dim"></div>');
	} 

	$('.dim').css({
		'height' : docH+'px',
		'opacity' : 0.8,
		'z-index' : '100',
		'position' : 'fixed'
	});
	*/
};

//팝업 창닫기
function popClose(myPop) {
	$(myPop).parent().hide();
	$('.dim').remove();
}

/* system popup */
function popGuide(url, popName, w, h, scroll) {
	var positionL = (screen.width - w) / 2;
	var positionT = (screen.height - h) / 2;
	var feat = "width=" + w + ", height=" + h +", top=" + positionT + ", left=" + positionL + ", scrollbars=" + scroll +", resizable=no, status=no";
	window.open(url, popName, feat);
}

function popCenter(url, popName, w, h, scroll) {
	var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
	width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
	
	var positionL = ((width / 2) - (w / 2)) + dualScreenLeft;
	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
		var positionT = ((height / 2) - (h / 2)) + dualScreenTop - 30;
	}else{
		var positionT = ((height / 2) - (h / 2)) + dualScreenTop
	}
	
	var feat = "width=" + w + ", height=" + h +", top=" + positionT + ", left=" + positionL + ", scrollbars=" + scroll +", resizable=no, status=no";
	window.open(url, popName, feat);	
	
}

function _popupOpen(url, objId, param) {
    var winPop = window.open(url, objId, param);
    winPop.focus();
}

function _popupOpen2(url, objId) {
	var param = "menuBar=false; toolbar=false; width=" + screen.width + "; height=" + screen.height + ";  scrollbars=yes;";
	
    var winPop = window.open(url, objId, param);
    winPop.focus();
}

function _popupOpenCenter(url, objId, w, h) {
	// Fixes dual-screen position                          Most browsers       Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
 
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
 
    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, objId, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
 
    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
    
    return newWindow;
}

function _popupOpenFull(url, objId) {
	var winW = $(window).width();
	
	if (winW <= 1280) {
		var winPopFull = window.open(url, objId, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes');
		winPopFull.moveTo(0, 0);
		winPopFull.resizeTo(screen.width, screen.height);	
						
	} else {
		var width  = 1280;
		var height = 720;
		var top = 0;
		var left = 0;
		
		var param = 'width=' + width + ', height=' + height +',top='+ top +',left='+ left +',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes';
		var winPop = window.open(url, objId, param);
		winPop.focus();
	}

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
	try{
	    var iframeHeight=	((i).contentWindow || (i).contentDocument).document.body.scrollHeight;
	    //alert(iframeHeight);
	    (i).height=iframeHeight;
	}catch(e){}
}
/*
	자식창에서 레이어 변화 이벤트시 걸어줘야 돼는 fn
	clickResize("해당 iframe의 #아이디")를 걸어주세요
*/
function clickResize(id){
    var iframeHeight=$(id).contents().find("body")[0].scrollHeight;
    $(id).height(iframeHeight);
}

/*
 * 심원보, 2014.03.26
 * session 정보가 있어야 하는 팝업창에서 session이 날라간 경우 부모창이 로그인 인터셉터(loginPopupIntercpetor)에 의해 로그인 페이지로 이동된다.
 * 이때 로그인 후 이동할  goUrl을 넘겨줘야 하는데 getOpenerUrl()가 그 역활을 담당한다.
 */
function getOpenerUrl() {
	var url;
	
	try {
		url = opener.window.location.href.replace("http://", ""); //location.href에는 http://가 붙어서 리턴됨.
		/**
		 * replace 한 값을 저장하지 않아 url.substr에서 정상적인 url 리턴 X  
		 */
		//url = opener.window.location.href.replace("https://", ""); //location.href에는 https://가 붙어서 리턴됨.
		url = url.replace("https://", ""); //location.href에는 https://가 붙어서 리턴됨.
		
		url = url.substr(opener.window.location.host.length); //location.host에는 http:// 가 없이 리턴됨.
		
		return url;
	}
	catch(e) {
		url = "";
		
		return url;
	}
}

function _makeDirectLink() {
    var plh = parent.location.href;

    var lh = location.href;

    var baseWork = CONTEXTPATH;
    var baseIdx = 14;

    if (CONTEXTPATH.length == 0) {
    	//baseWork = VivasamConstant.SITE_DOMAIN;
    	baseWork = location.host;
    	//baseIdx = 15;

    	baseIdx = baseWork.length;
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
	if (toMemberId == '') {
		return;
	}

	parent.location.href = CONTEXTPATH + '/troom/tRoomMainNew.do?loginReturnType=1&toMemberId=' + toMemberId;
}

/* 패밀리 사이트 / incFooter.jsp에 사용됨 */
$(function() {
	$('.familysite > .toggle').click(function() {
		$('.familyList').slideDown();
	});

	$('.familysite').mouseleave(function() {
		$('.familyList').slideUp();
	});
});

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
	);
});

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

/* 개인정보 보기: header */
$(function() {
	$('.userInfo > .userName').click(function() {
		$('#personal').slideDown();
		$('.gnbMenu').hide();
	});

	$('#personal .close').click(function() {
		$(this).parent().slideUp();
	});
});

//준회원 접근 제한 관련 function 정의 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*준회원 접근 제한 안내 메세지*/
function memLevelAlert(kind) {
	if (kind == "eleEvalDataAllDownNo") {
		alert("전체 다운로드 자료에 평가자료가 포함되어 있습니다.\n준회원은 이용이 불가능합니다.\n비바샘으로 문의해 주세요. (1544-7714)");
	} else {
		alert("준회원은 이용이 불가능합니다.\n비바샘으로 문의해 주세요. (1544-7714)");
	}
} 

/*문제은행 선택 과목 바로가기 */
function qBankMoveSubject(target) {
	if (MEMLEVEL == "AU400") {
		memLevelAlert('qbank');
		return;
	}
	
	var subject = $("#qBankSelect span").attr("id");

	if (subject == undefined) {
		if (target != "_blank") {
			$(location).attr("href", CONTEXTPATH + "/qbank/qbank_subject.do");
		}
		else {
			window.open(CONTEXTPATH + "/qbank/qbank_subject.do");
		}
	}
	else {
		$(location).attr("href", CONTEXTPATH + "/qbank/qbank_subject.do?subject=" + subject);
	}
}

function moveQBank(gubun) {
	if (MEMLEVEL == "AU400") {
		memLevelAlert('qbank');
		return;
	}
	
	if (gubun == "1") {
		$(location).attr("href", CONTEXTPATH + "/qbank/qbankTestPaperList.do");
	}
	else if (gubun == "2") {
		$(location).attr("href", CONTEXTPATH + "/qbank/qbankScrapList.do");
	}
}

//메인 온리원 추천 강의 
function soobakcRecomLec(gubun, target) {
	if ( LOGIN_ID == "" ) {
		//alert('로그인이 필요한 서비스입니다.');
		var url = CONTEXTPATH + "/member/login.do?goURL=" + CONTEXTPATH + "/soobakc/soobakcMain.do";
		$(location).attr("href", url);
		return;
	}
	
	if (MEMLEVEL == "AU400") {
		memLevelAlert('soobakc');
		return;
	}
	
	if (gubun == "ES") {
		if (target != "_blank") {
			$(location).attr("href", CONTEXTPATH + "/soobakc/soobakcMainE.do");
		}
		else {
			window.open(CONTEXTPATH + "/soobakc/soobakcMainE.do");
		}		
	}
	else if (gubun == "MS") {
		if (target != "_blank") {
			$(location).attr("href", CONTEXTPATH + "/soobakc/soobakcMain.do");
		}
		else {
			window.open(CONTEXTPATH + "/soobakc/soobakcMain.do");
		}
	}
	else if (gubun == "HS") {
		if (target != "_blank") {
			$(location).attr("href", CONTEXTPATH + "/soobakc/soobakcMainH.do");
		}
		else {
			window.open(CONTEXTPATH + "/soobakc/soobakcMainH.do");
		}
	}else{
		if (target != "_blank") {
			$(location).attr("href", CONTEXTPATH + "/soobakc/soobakcMain.do");
		}
		else {
			window.open(CONTEXTPATH + "/soobakc/soobakcMain.do");
		}
	}
}

/*초등 평가자료 > 상단 GNB 초등교과 메뉴 클릭시*/
function moveEleEvalData(target) {
	if ( LOGIN_ID == "" ) {
		//alert('로그인이 필요한 서비스입니다.');
		var url = CONTEXTPATH + "/member/login.do?goURL=" + CONTEXTPATH + "/educourse/eleEvalDataList.do";
		$(location).attr("href", url);
		return;
	}
	
	if (MEMLEVEL == "AU400") {
		memLevelAlert('eleEvalData');
		return;
	}
	
	if (target != "_blank") {
		$(location).attr("href", CONTEXTPATH + "/educourse/eleEvalDataList.do");
	}
	else {
		window.open(CONTEXTPATH + "/educourse/eleEvalDataList.do");
	}
}

//준회원 접근 제한 관련 function 정의 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*초등 국정 교과 자료 바로가기*/
function moveEleEducourse(target) {
	if (target != "_blank") {
		$(location).attr("href", CONTEXTPATH + "/educourse/eleIndex.do");
	}
	else {
		window.open(CONTEXTPATH + "/educourse/eleIndex.do");
	}
}

/* navy_menu -> ex)HOME > 고등교과 > 영어 */
$(function () {
	$('#navy_menu .deps1 > ul > li:last').addClass('last');

	$('#navy_menu .navy_btn').find('span').on("click", function() {
		$(this).parent().find('.dep2').show();
	});
	$('#navy_menu .navy_btn').on("mouseleave",function() {
		$(this).find('.dep2').hide();
	});

	$('#navy_menu > div > ul > li:last').css({
		'background-image' : 'none'
	});
});

/* 서브페이지 북마크 */
$(function() {
	$("a.page_mark").on("click",function(){
		var bookmarkUrl = this.href;
		var bookmarkTitle = this.title;

		if ($.browser.mozilla) { // For Mozilla Firefox Bookmark
			window.sidebar.addPanel(bookmarkTitle, bookmarkUrl,"");
		} else if(isIE()) { // For IE Favorite
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

/*공통팝업 디자인1 닫기 버튼*/
$(function() {
	$('.msgPop .close').click(function() {
		$(this).parent().hide();
	});
});

/* lnb: subMenu */
$(function() {
	$('#left_menu li > .dep1').on("click", function() {
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

	$('#left_menu li .dep2 a').on("click", function() {
		$(this).parents('li').find('.dep1').addClass('on');
		$('#left_menu li .dep2 a').removeClass('on');
		$(this).addClass('on');
	});

	$('#left_menu .dep1, #left_menu2 .dep1').each(function(i) {
		if($(this).next('.dep2').length > 0) {
			$(this).append('<span></span>');
		};
	});

	$('#left_menu li > .on').on("click", function() {
		$(this).removeClass('on');
		//	$(this).next().hide();
	});
});

/* 관련 단원 자료 */
$(function() {
	$('.dataList > li').click(function() {
		var numMax = $(this).find('.num').length;
		$(this).parents('.dataList').find('li').removeClass('on').end().end().addClass('on');
		$('.dataList > li .fileList').hide();

		if(numMax > 0) {
			$(this).find('.fileList').show();
		}
	});
});

/* 스크랩 */
function scrap(scr) {
	var posY = $(scr).position().top;
	var posX = $(scr).position().left;

	$('#sns').css({
		'display' : 'block',
		'top' : posY+'px',
		'left' : posX+'px'
	})
}

/* 교과정보 등록 */
function subToggle(tog){
	var $this = $(tog).next();

	if($this.is(':hidden')) {
		$('#subjectPop dl dt').removeClass('on');
		$(tog).addClass('on');
		$('#subjectPop dd').hide();
		$this.show();
	} else {
		$('#subjectPop dl dt').removeClass('on');
		$('#subjectPop dd').hide();
	}
}

function subTxt(txVal){
	var txt = $(txVal).text();
	$(txVal).parents('dd').prev().find('span').text(txt);
}


//newsSetList 라인 제거: 차후 확인 후 삭제 하겠음
/*
myclass 의 5개 jsp에서 사용 중임
*/
$(function() {
	$('.newsSetList .replyWrap:first dl').css('border-top', 'none');
});

//숫자 3자리 단위마다 콤마 찍기, 심원보, 20160229 
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//숫자만 입력 가능하도록 체크(IE11 에서는 input 박스에  style="ime-mode:disabled" 추가해야 한글 입력되는 것을 막을 수 있음), 심원보, 20160307
function numberValidation(e) {
	if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		// Allow: Ctrl+A, Command+A
        (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            //alert("1 : " + e.keyCode);
        	return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false; //IE 8이하버전에서 e.preventDefault()가 안먹힐때
    }
}


/*******************************************************************************************************************
아래의 함수 중 모든 페이지 혹은 대다수의 페이지에서 사용하지 않고 특정 메뉴 혹은 페이지 에서만 사용하는 함수가 있다면
해당 메뉴/페이지로 옮겨주시기 바랍니다.

common.js는 파일명 그대로 공통으로 사용하는 함수 혹은 기능만 존재해야 합니다.

이 주석부분 아래에 구현된 소스 중 본인이 만든 함수가 있으신 경우 그 함수를 사용하는 메뉴 혹은 페이지로 옮겨주시기 바랍니다.
(js를 추가로 만들어서 메뉴/페이지에서 사용한다던가 특정 페이지의 <script>부분으로 소스를 옮긴다던가 하는 방식을 취하시면 될것 같습니다.)
*******************************************************************************************************************/
/* 파일찾기 input:file  */
$(function() {
	$('.file').css('opacity', '0');
	$('.inputFile .file').change(function() {
		var fileUrl = $(this).val();
		$(this).parent().find('.text').val(fileUrl);
	});
});

/* 토크리스트 설정 */
function setOpt(op) {
	var posY = $(op).position().top;
	var objClassName = "." + $(op).next().attr("class");
	$(objClassName).hide();
	$(op).next().css({
		'top' : posY+'px',
		'display' : 'block'
	});
}

function setClose(cls) {
	$(cls).parent().css('display', 'none');
	return false;
}

/* 토크리스트 얼럿 */
function msgClose(cls) {
	$(cls).parent().css('display', 'none');
}

function goPopupJuso(val){
    // 듀얼모니터에서 팝업 중앙으로 스크립트
	//var path = CONTEXTPATH.replace("https://", "http://");
    //var url = path+"/common/jusoPopup.do?obj="+val;
    var url = "/common/jusoPopup.do?obj="+val;
	//var url = "http://localhost/common/jusoPopup.do?obj="+val;
    
	var popWidth  = '520'; // 파업사이즈 너비
	var popHeight = '578'; // 팝업사이즈 높이
	var winWidth  = document.body.clientWidth;  // 현재창의 너비
	var winHeight = document.body.clientHeight; // 현재창의 높이
	var winX      = window.screenX || window.screenLeft || 0;// 현재창의 x좌표
	var winY      = window.screenY || window.screenTop || 0; // 현재창의 y좌표
	var w = winX + (winWidth - popWidth) / 2;
	var h = winY + (winHeight - popHeight) / 2;
	
	 
    var pop = window.open(url,"pop",'width=520,height=578, scrollbars=no, resizable=yes, top='+h+', left='+w);
    pop.focus(); 
}

//전체스크린팝업
function popupFullScreen (url, objId) {
	var winPopFull = window.open(url, objId, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes');
	winPopFull.moveTo(0, 0);
	winPopFull.resizeTo(screen.width, screen.height);	
	winPopFull.focus();
}


//url 분기
function contentLinkUrl(val, obj){ // URL 분기 스크립트
	var commonCkeckUrl = window.location.hostname; //URL기반
	var siteDomainElementary = "${_config.siteDomainElementary}";

	if(obj) {
		var $classObj = $(obj).closest('.arrlinkparents').parent();
		var $object = siteDomainElementary.indexOf(commonCkeckUrl) != -1 ? $classObj.find(".arreslinkurl li").eq(val) : $classObj.find(".arrcomlinkurl li").eq(val);
	} else {
		var $object = siteDomainElementary.indexOf(commonCkeckUrl) != -1 ? $(".arreslinkurl li").eq(val) : $(".arrcomlinkurl li").eq(val);
	}

	var $linkUrl = $object.text().replace(/"/gi, "");
	/*var activeEnv = window.globals.activeEnv;
	if(activeEnv != "prod") {
		if ($linkUrl.indexOf("https://e.vivasam.com") != -1) {
			$linkUrl = $linkUrl.replace("e.vivasam.com", "dev-e.vivasam.com");
		} else if ($linkUrl.indexOf("https://v.vivasam.com") != -1) {
			$linkUrl = $linkUrl.replace("v.vivasam.com", "dev-v.vivasam.com");
		}
	}*/

	$object.data("target") == "blank" ? window.open($linkUrl) : location.href = $linkUrl;
}

function setCookie1(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

function updateMyClass(mainSubject, secondSubject){

	$.ajax({
		type: "POST",
		url: "/myclass/updateMyClass.do",
		cache: false,
		async: false,
		data : { mainSubject : mainSubject, secondSubject : secondSubject},
		dataType: "json",
		success: function (data) {
			if (data.code == "0000") {
				alert("저장되었습니다.");
				location.reload();
			}  else {
				alert("저장하지 못했습니다.\n잠시후 다시 이용해 주세요.");
			}

		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}

var mainSubject = ''; // 첫 번째 과목 저장할 변수
var secondSubject = ''; // 두 번째 과목 저장할 변수

$(function(){
	$(".subject_list input[type='checkbox']").on('click', function() {
		var checkedLen = $(".subject_list input[type='checkbox']:checked").length;
		mainSubject = ''; // 과목 초기화
		secondSubject = ''; // 과목 초기화

		if ($(this).is(':checked') && checkedLen > 2) {
			$(this).prop('checked', false);
		}

		$(".subject_list input[type='checkbox']:checked").each(function(i){
			if(i==0) mainSubject = $(this).val();
			if(i==1) secondSubject = $(this).val();
		});
	});

	if (window.location.href.indexOf('/educourse/index.do?textbookCd=') !== -1) {
		const url = window.location.href;
		let textbookCd = url.split('?textbookCd=')[1]; // 파라미터 부분 추출

		if(textbookCd.indexOf('&') !== -1) textbookCd = textbookCd.split('&')[0];

		if (textbookCd != "") setCookie1('textbookCd', textbookCd, 7);
	}

	$('#myClassConfirm').on('click',function() {
		var checkedLen = $(".subject_list input[type='checkbox']:checked").length;

		if(checkedLen === 0){
			alert("선택 된 과목이 없을 경우, 저장되지 않습니다.");
			return;
		}
		updateMyClass(mainSubject, secondSubject);
	});

	$('.gnb_subject_wrap .main').click(function(){
		$('#setGoClass2').hide();
		$('#setGoClass').show();
	});

	$('.gnb_subject_wrap .second').click(function(){
		$('#setGoClass').hide();
		$('#setGoClass2').show();
	});
});