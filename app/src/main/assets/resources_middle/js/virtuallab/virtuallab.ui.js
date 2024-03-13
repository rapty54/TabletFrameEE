$(function() {
	// s : main obj motion
	if ($("#wrap").hasClass("main_wrap"))
	{
		var mainObj01 = $(".main_virtuallab .item01");
		var mainObj02 = $(".main_virtuallab .item02");
		var mainObj03 = $(".main_virtuallab .item03");
		var mainObj04 = $(".main_virtuallab .item04");

		var objTime = 1000;
		var objEasing = "easeOutSine";
		
		setTimeout(mainAct01, 0);
		setTimeout(mainAct02, 2400);
		setTimeout(mainAct03, 1200);
		setTimeout(mainAct04, 3600);

		function mainAct01(){
			mainObj01.animate({
				opacity: 1,
				left: "345px",
				top: "102px"
			}, objTime, objEasing, function(){
				ending01($(this), 1000, -20, 5000);
			});
		}
		function mainAct02(){
			mainObj02.animate({
				opacity: 1,
				left: "310px",
				top: "195px"
			}, objTime, objEasing, function(){
				ending01($(this), 800, 25, 6000);
			});
		}
		function mainAct03(){
			mainObj03.animate({
				opacity: 1,
				right: "385px",
				top: "93px"
			}, objTime, objEasing, function(){
				ending01($(this), 600, 10, 6000);
			});
		}
		function mainAct04(){
			mainObj04.animate({
				opacity: 1,
				right: "318px",
				top: "202px"
			}, objTime, objEasing, function(){
				ending02($(this));
			});
		}

		function ending01(_this, _time, _angle, _end){
			var rTime = _time;
			var rAngle = _angle;
			var endTime = _end;

			var rotation = function (){
				_this.rotate({
					duration:rTime,
					angle:0,
					animateTo:rAngle,
					callback: function(){
						_this.rotate({
							duration:rTime,
							angle:rAngle,
							animateTo:0,
							callback: rotation,
							easing: function (x,t,b,c,d){return c*(t/d)+b;}
						});
					},
					easing: function (x,t,b,c,d){return c*(t/d)+b;}
				});
			}
			rotation();

			setTimeout(function(){
				_this.stopRotate();
			}, endTime);
		}
		
		function ending02(_this){
			_this.rotate({
				duration:6000,
				angle:0,
				animateTo:360,
				easing: function (x,t,b,c,d){return c*(t/d)+b;}
			});
		}

		function mainInfo (){
			var infoBG = $(".main_virtuallab .info_bg");
			infoBG.animate({
				opacity: 1
				}, 1500, function(){
					infoBG.animate({
					opacity: 0.4
				}, 1500, "linear", mainInfo);
			});
		} 
		setTimeout(function(){
			mainInfo();
		}, 4000);
	}
	// e : main obj motion

	//list hover
	$(".menu_list a").mouseover(function(){
		var viewCont = $(this).find("p span");
		var topValue = viewCont.height();
		viewCont.css({"margin-top":-topValue/2+"px","display":"block"});
	});

	//select design
	$(".select_box").click(function(){
		if ($(this).hasClass("active")){
			$(this).removeClass("active");
		} else {
			$(this).addClass("active");
		}
		$(this).children(".select_list").toggle();
		return false;
	});
	$(".select_box .select_list_view > li").click(function() {
		$(".select_box .select_list_view > li").each(function(){
			$(this).removeClass("on");
		});
		$(this).addClass("on");
		var txt = $(this).children(".list_text").html();
		$(".select_box > .list_text").html(txt);
	});
	
	//tab
	$(".tab_wrap > ul > li > h2 > a").click(function(){
		if($(this).parent().next().is(":hidden")){
			$(".tab_wrap .tab_cont").hide();
			$(".tab_wrap > ul > li > h2 > a").parents().removeClass("on");
			$(this).parents().addClass("on");
			$(this).parent().next().show();
			return false;
		} 
	});

	//tab2
	var infoTab = $(".step_wrap .tab");

	infoTab.find("li > a").click(function(){
		infoTab.find("li").removeClass("on");
		$(this).parent("li").addClass("on");

		return false;
	});


	//fixed layer
	var btnLayer = $(".layer_open");
	var btnClose = $(".layer_popup .btn_layer_close");
	
	btnLayer.click(function(){
		
		if(LoginCHK())
		{
			
			return;
		}
		
		layerOpen($(this));

		return false;
	});
	btnClose.click(function(){
		layerClose();

		return false;
	});
	$(".layer_popup_bg").click(function(){
		layerClose();

		return false;
	});

	function layerOpen(_this){
		
		var winHeight = $(window).outerHeight();

		var target = _this.attr("href");
		var targetHeight = $(target).outerHeight();
		var targetPadding = targetHeight - $(target).height();

		$("body").css("overflow-y","hidden");
		$(".layer_popup_bg").show();

		if (targetHeight > winHeight)
		{
			$(target).addClass("top");
		} else {
			$(target).removeClass("top");
		}

		$(target).show();
	}

	function layerClose(){
		$("body").css("overflow-y","auto");
		$(".layer_popup_bg").hide();

		$(".layer_popup").removeClass("top").hide();
	}
});
