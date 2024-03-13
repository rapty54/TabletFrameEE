$(function() {
	/* select box */
	$('.slt p a').click(function() {
		//alert("!!!!");
		var obj = $(this).parent().parent();

		if ($(this).attr('class') == undefined || $(this).attr('class').indexOf('on') == -1) {
			obj.find('div').show();
			$(this).addClass('on');
			obj.css("z-index", "9000"); //2016-02-17 레이어겹침 수정
		} else {
			obj.find('div').hide();
			$(this).removeClass('on');
			obj.css("z-index", "8999"); //2016-02-17 레이어겹침 수정
		}
		return false;
	});

	// 드랍메뉴
	$('.label').click(function() {
		$(this).parents('.drop_menu').toggleClass('on');
	});
	$('.drop_menu .drop_list li').click(function() {
		$(this).parents('.drop_menu').removeClass('on');
	});
	$('.wrap, body, html').click(function() {
		$(this).parents('.drop_menu').removeClass('on');
	});

	// 탭 메뉴

	var tabMenu = $(".tab_menu:not(.tab_menu_event_ignore) li a"),
		tabPanel = $(".tab_conts");
	tabMenu.click(function(e) {
		if($(this).parents('.tab_menu').hasClass('move_url')){
			console.log(213);
		}else {
			e.preventDefault();
			var current = $(this).attr("href");
			tabPanel.hide();
			$(current).show();

			tabMenu.parent().removeClass("on")
			$(this).parent().addClass("on");
		}

	});

	function popup() {
		var popup = $('.alarm_wrap .popup_desc_wrap'),
			popOn = $('.alarm_wrap .popup_type01'),
			popCloz = $('.alarm_wrap .popup_close');

		// popup.hide();
		popOn.click(function() {
			$(this).addClass('on');
			popup.show();
		});
		popCloz.click(function() {
			popOn.removeClass('on');
			popup.hide();
		});
	}
	popup();

	// 레이어 팝업 닫기 버튼
	var cloz = $(".popup_wrap .popup_close");
	cloz.click(function(e) {
		e.preventDefault();
		$(".dimmed").hide();
		$(".pop_dimmed").hide();
		$(".popup_wrap").hide();
	})

});

//교사문화 프로그램 팝업
function programList() {
	$('.btn_programList').click(function() {
		$('.culture_pop_wrap').parent('div').show();
		$('.dimmed').show();
	})
};

function onPlayer(type, url) {
	var winPop = window.open('', '_blank', 'width=640, height=480');
	if( type === 'dn') {
		winPop.document.write('<html><head></head><title>비바샘</title></head><body style="margin:0;background:#000;"><video id="video" width="100%" height="100%" src="' + url + '" controls="controls" controlsList="nodownload"></video></body></html>');
	} else {
		winPop.document.write('<html><head></head><title>비바샘</title></head><body style="margin:0;background:#000;"><iframe width="100%" height="100%" src="' + url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></body></html>');
	}
}

//url 분기
function contentLinkUrl(val, obj){ // URL 분기 스크립트
	var commonCkeckUrl = window.location.hostname; //URL기반
	var siteDomainMiddleHigh = window.globals.config.siteDomainMiddleHigh;	// 중고등url

	if(obj) {
		var $classObj = $(obj).closest('.arrlinkparents').parent();
		var $object = siteDomainMiddleHigh.indexOf(commonCkeckUrl) == -1 ? $classObj.find(".arreslinkurl li").eq(val) : $classObj.find(".arrcomlinkurl li").eq(val);
	} else {
		var $object = siteDomainMiddleHigh.indexOf(commonCkeckUrl) == -1 ? $(".arreslinkurl li").eq(val) : $(".arrcomlinkurl li").eq(val);
	}

	var $linkUrl = $object.text().replace(/"/gi, "");
	/*var activeEnv = window.globals.config.activeEnv;
	if(activeEnv != "prod") {
		if ($linkUrl.indexOf("https://e.vivasam.com") != -1) {
			$linkUrl = $linkUrl.replace("e.vivasam.com", "dev-e.vivasam.com");
		} else if ($linkUrl.indexOf("https://v.vivasam.com") != -1) {
			$linkUrl = $linkUrl.replace("v.vivasam.com", "dev-v.vivasam.com");
		}
	}*/

	$object.data("target") == "blank" ? window.open($linkUrl) : location.href = $linkUrl;
}

//전자도서관으로 이동
function goLibrary() {
	if (SessionUtils.isLogin()) {
		window.open('', 'VIVASAM_LIBRARY');
		var f = document.fm;
		f.name.value = name;
		f.target = 'VIVASAM_LIBRARY';
		f.action = 'http://visang.bookcube.biz/FxLibrary/dependency/sso/sso.jsp';
		f.submit();
	}
}

function setQuickMenu(type) {
	localStorage.quickMenu = type;
}