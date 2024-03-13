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

	$(".menu .hs").bind({
        mouseleave: function() {
            $(this).parent("li").removeClass("on");
        },
        mouseenter: function() {
            $(this).parent("li").addClass("on");
        }
    });

	$(".layer_mask").click(function(){
		layerClose();
	});

	//lnb 실행
	lnbActive();
});

//lnb메뉴
var lnbMenu ;
function lnbActive(){
	var lnb = $("#lnb_vr");

	if (lnbMenu == 0)
	{
		lnb.find(".menu_info").addClass("on");
	} else {
		//lnb.find(".menu li").eq(lnbMenu-1).addClass("on");
		lnb.find("[data-menuid='sub"+lnbMenu+"']").addClass("on");
	}
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
	
	//_this.find(".layer_content").css({"max-height" : winHeight - 300});

	mgTop = _this.height()/2;
	mgLeft = _this.width()/2;

	_this.css({"margin-top" : -mgTop, "margin-left" : -mgLeft}).prepend("<div class='layer_mask'></div>").attr("tabindex", 0).show().focus();
	
	//타임슬립 영상 자동 재생
	if (_target == "timeSlip"){
		var video = document.getElementById("videoTimeslip")
		video.currentTime=0;
		video.play();
		_this.find(".btn_close").on("click",function(){
			video.pause();
		});
		$(".layer_mask").click(function(){
			video.pause();
		});
	}
	
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

//메인 배경
function vrResize(i){
	var iframeHeight = document.body.scrollHeight;
	(i).height=iframeHeight;
}

//메인 모션
function mainAction(){
	var $mainMask = $("#main_mask");
	var $main = $("#main");
	var $mainPop = $main.find(".main_popup2");
	var $mainSpot = [$main.find(".left1 .hs"), $main.find(".left2 .hs"), $main.find(".left3 .hs"), $main.find(".left4 .hs"), $main.find(".right2 .hs"), $main.find(".right1 .hs"), $main.find(".right3 .hs")]
	var time = 700; // 모션 편도 시간
	var endTime = time * 2 * 3; // 모션 왕복 시간 * 횟수
	var idx = 0; 
	var size = $mainSpot.length - 1;
	
	$mainMask.animate({opacity: 1}, 800, function(){
		$main.show().animate({opacity : 1}, 2000, "linear", function(){
			//$mainPop.show().animate({opacity : 1, top : 170, right : -10}, 1000, "easeOutCubic", function(){
			$mainPop.show().animate({opacity : 1}, 1000, "easeOutCubic", function(){
				motionStart();
			});
		});
	});

	function motionStart(){
		motion($mainSpot[idx]);
		setTimeout(motionStop, endTime);
	}

	function motionStop(){
		$main.find(".menu a").stop().css({"margin-bottom" : "0"});
		if (idx == size)
		{
			idx = 0;
		} else {
			idx = idx + 1;
		}
		motionStart();
	}

	function motion(_this){
		var easing = "easeOutQuad";
		_this.animate({"margin-bottom" : "-10px"}, time, easing).animate({"margin-bottom" : "0"}, time, easing, function(){motion(_this)});
	};
}