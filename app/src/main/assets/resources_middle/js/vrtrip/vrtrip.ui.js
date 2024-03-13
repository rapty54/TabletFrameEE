$(window).scroll(function(){
	var scrollValue = $(window).scrollTop();

	if (scrollValue == 0)
	{
		$("#btnTop").hide().animate({opacity:0});
	} else {
		$("#btnTop").show().animate({opacity:1});
	}
});

$(function(){
	//top버튼
	$("#btnTop button").click(function(){
		$(window).scrollTop(0);
	});

	//레이어팝업
	$(".openLayer").click(function(){
		var target = $(this).attr("id");

		layerOpen(target);

		return false;
	});
	$(".layer_wrap").find(".btn_close").click(function(){
		layerClose();
	});
	$(".layer_mask").click(function(){
		layerClose();
	});
	
	//lnb 실행
	lnbMap();
});

//lnb메뉴
var lnbMenu ;
var lnbSpot ;
function lnbMap(){
	$("#lnbTrip").addClass("menu_" + lnbMenu);
	$("#lnbTrip").find(".map").addClass("spot_"+lnbSpot);
	
	$("#lnbTrip").find("a").removeClass("on");
	if (lnbSpot == 0)
	{
		$("#lnbTrip > ul > li").eq(lnbMenu-1).find(" > a").addClass("on");
	} else {
		if (lnbMenu == 3)
		{
			$("#lnbTrip > ul > li").eq(lnbMenu-1).find("a").eq(lnbSpot-1).addClass("on");
		} else {
			$("#lnbTrip > ul > li").eq(lnbMenu-1).find("li").eq(lnbSpot-1).find(" > a").addClass("on");
		}
	}

	//서브파노라마 전체보기 버튼
	setTimeout(btnFull, 8000);
	function btnFull(){
		$(".openfullScreen").show().animate({opacity: 1},0)
	}
	$(".openfullScreen").click(function(){
		var _target = $(this).siblings("iframe").attr("src");
		
		winPopOpen (_target, 0);
	});
}

//레이어팝업
var $btnLayer;
//레이어팝업 열기
function layerOpen(_target){
	var _this = $("#layer-"+_target);
	var winHeight = $(window).height();
	var mgTop;
	var mgLeft;
	
	$btnLayer = $("#"+_target);
	
	_this.find(".layer_content").css({"max-height" : winHeight - 300});

	mgTop = _this.height()/2;
	mgLeft = _this.width()/2;

	_this.css({"margin-top" : -mgTop, "margin-left" : -mgLeft}).prepend("<div class='layer_mask'></div>").attr("tabindex", 0).show().focus();

	$(".layer_mask").click(function(){
		layerClose();
	});
}
//레이어팝업 닫기
function layerClose(){
	$(".layer_wrap").hide().find(".layer_mask").remove();

	if ($btnLayer == undefined)
	{	
		$("#wrap").find("a").eq(0).focus();
	} else {
		$btnLayer.focus()
	}
}

//윈도우팝업
function winPopOpen(_target, w){
	var wX = document.body.clientWidth;
	var wY = document.body.clientHeight;
	var winX = window.screenX || window.screenLeft || 0;// 현재창의 x좌표
	var winY = window.screenY || window.screenTop || 0; // 현재창의 y좌표
	if (!w == 0)
	{
		wX = (w+38);
		wY = (wY-138);
	}
	window.open(_target, "title", "left="+ winX + ",top=" + winY +",width="+ wX + ",height=" + wY +", menubar=no, scrollbars=no, status=yes, resizable=no, direction=no, location=no, menubar=no, toolbar=no, titlebar=no, channelmode=yes");
}

//메인 스크립트
function mainAction(){
	var $mainMask = $("#mainMask");
	var $mainMap = $("#map");
	var $spotGoseong = $mainMap.find(".goseong");
	var $spotJeju = $mainMap.find(".jeju");
	var $mainLayer = $(".mainLayer");
	
	// 메인 애니메이션
	$mainMask.animate({opacity: 1}, 100, function(){
		$mainMap.show().animate({
			top: "132px" ,
			right : "7px",
			opacity : 1
			}, 1800, "easeOutQuint");

		setTimeout(mainAni, 1000);

		function mainAni (){
			$spotGoseong.show().animate({
				top: "350px",
				opacity: 1
			}, 1200, "easeOutBounce");
			$spotJeju.show().animate({
				top: "478px",
				opacity: 1
			}, 1200, "easeOutBounce", function(){
				mainLayer("Jeju", 1500);
			});
		}
	});

	var mainSpot;
	//메인 버튼 애니메이션
	function spotAni(){
		$mainMap.find("button").animate({"margin-top" : "-40px"}, 200).animate({"margin-top" : 0}, 1000, "easeOutBounce");
	}

	//메인 레이어 오픈
	function mainLayer(_spot, _time){
		var $spot = $("#"+_spot);
		var $layerMap = $("#layer"+_spot);
		var time = _time;
		
		clearInterval(mainSpot);

		$mainMap.find("button").removeClass("active");

		$spot.siblings().find("button").stop().animate({opacity : 1, "margin-top" : 0});
		$spot.find("button").stop().animate({opacity : 0, "margin-top" : 0}, time);

		$spot.siblings().find(".open").stop().animate({opacity : 0,}, time, "easeOutCubic").hide();
		$spot.find(".open").show().stop().animate({opacity : 1}, time, "easeOutCubic");

		$layerMap.siblings(".mainLayer").stop().animate({opacity: 0}, time, "easeOutCubic").hide();
		$layerMap.show().stop().animate({opacity: 1}, time, "easeOutCubic", function(){
			$mainMap.find("button").addClass("active");
		});

		mainSpot = setInterval(spotAni, 2000);
	}

	//메인 버튼
	$mainMap.find("button").mouseover(function(){
		var spot = $(this).parent().attr("id");

		if ($(this).hasClass("active"))
		{
			mainLayer(spot, 500);
		}
	});

	//메인 레이어
	$mainLayer.mouseover(function(){
		$(this).find("img").animate({"width" : "102%"}, 400).animate({
			"width" : "100%"
		}, 600, "easeOutCubic");
	}).mouseout(function(){
		$(this).find("img").stop().animate({"width" : "100%"});
	});
}

