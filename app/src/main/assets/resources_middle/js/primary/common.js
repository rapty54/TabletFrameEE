// go_top
$(function() {
	$('.go_top').click(function() {
		$("html, body", parent.parent.document).animate({'scrollTop' : 0}, 400);
			return false;
	});
});

// print
function printArea(){
		window.print();		
	}


// 브라우저 가운데 위치조정
function verticalMiddle(ele){
	Action(ele);
	var errorVM = setInterval(function(){Action(ele)}, 30);
 
	function Action(ele){
		var target = document.getElementById(ele);
		
		var screen_height = parseFloat(window.document.documentElement.clientHeight);
		var scroll_top = parseFloat(window.document.documentElement.scrollTop);
		
		var obj_height = parseFloat(target.offsetHeight);
		var center_height = (screen_height/2) - (obj_height/2) + scroll_top;
		if(center_height <= 0) center_height = 0;
 
		target.style.position = "absolute";
		target.style.top = center_height + "px";
		//target.style.display = "block";
	}
}

//  top menu 인식 
$('document').ready(function(){  	
	if(typeof afterJQueryInit == 'function') { 
   afterJQueryInit();
  }
}); 

function gnb_navi(a1){ 
	$('#gnb li').eq(a1).addClass('on');  
}

//
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
function pngSet(){
	var i;
	for (i in $("#container img")) {
		if ($("#container img")[i].src) {
			var imgSrc = $("#container img")[i].src;
			if (imgSrc.substr(imgSrc.length-4) === '.png' || imgSrc.substr(imgSrc.length-4) === '.PNG') {
				$("#container img")[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src='" + imgSrc + "')";
			}
		}
	}
}

$(function(){ 
	//  index visual	
	$("#index_container").stop().css({'opacity' : 0}).delay(100).animate({'opacity': 1}, 400);	
	$("#cloud1").stop().css({'opacity' : 0}).delay(300).animate({'opacity': 1, 'top':20}, 150).delay(0).animate({'top':-30}, 200).delay(0).animate({'top':0 }, 200);
	$("#cloud2").stop().css({'opacity' : 0}).delay(500).animate({'opacity': 1, 'top':30}, 150).delay(0).animate({'top':-40}, 200).delay(0).animate({'top':0 }, 200);
	$("#book").stop().css({'opacity' : 0}).delay(700).animate({'opacity': 1}, 500); 
	
	$("#naviM1").stop().css({'opacity' : 0}).delay(1000).animate({'opacity': 1, 'top':221}, 130).delay(0).animate({'opacity': 1, 'top':216}, 300);
	$("#naviM2").stop().css({'opacity' : 0}).delay(1700).animate({'opacity': 1, 'top':35}, 130).delay(0).animate({'opacity': 1, 'top':30}, 300);
	$("#naviM3").stop().css({'opacity' : 0}).delay(1200).animate({'opacity': 1, 'top':222}, 130).delay(0).animate({'opacity': 1, 'top':217}, 300);
	$("#naviM4").stop().css({'opacity' : 0}).delay(1500).animate({'opacity': 1, 'top':400}, 130).delay(0).animate({'opacity': 1, 'top':395}, 300);
	$("#naviM5").stop().css({'opacity' : 0}).delay(800).animate({'opacity': 1}, 500);
	$("#naviM6").stop().css({'opacity' : 0}).delay(1800).animate({'opacity': 1}, 500);		
	$("#naviM7").stop().css({'opacity' : 0}).delay(2800).animate({'opacity': 1}, 500);		
	
	
	//  index 슬로건
	$("#motto1").stop().css({'opacity' : 0}).delay(2000).animate({'opacity': 1, 'left':0}, 500);
	$("#motto2").stop().css({'opacity' : 0}).delay(2300).animate({'opacity': 1, 'left':0}, 500);
	
	/*var timer; 
	timer = setInterval(function () { */
	setInterval(function () { 	
		$("#cloud1").delay(100).animate({'opacity': 1, 'top':-10}, 500).delay(0).animate({'top':0 }, 400);
		$("#cloud2").delay(300).animate({'opacity': 1, 'top':-20}, 600).delay(0).animate({'top':0 }, 500);
		$("#motto1").delay(4000).animate({'opacity': 0, 'left':20}, 500).delay(1000).animate({'opacity': 1, 'left':0}, 500);
		$("#motto2").delay(4000).animate({'opacity': 0, 'left':-20}, 500).delay(1000).animate({'opacity': 1, 'left':0}, 500);
	}, 500);   
	/*function mmm(){ 
	   $("#cloud1").stop().delay(100).animate({'opacity': 1, 'top':-10}, 500).delay(0).animate({'top':0 }, 400);
	   $("#cloud2").stop().delay(100).animate({'opacity': 1, 'top':-20}, 600).delay(0).animate({'top':0 }, 500);
	};  
	document.onLoad = setTimeout("mmm()",500);  */
	
	//  sub object	
	$("#object1").stop().css({'opacity' : 0}).delay(300).animate({'opacity': 1, 'top':-20}, 150).delay(0).animate({'top':-50}, 200).delay(0).animate({'top':-30 }, 200);
	$("#object2").stop().css({'opacity' : 0}).delay(500).animate({'opacity': 1, 'top':-30}, 150).delay(0).animate({'top':-60}, 200).delay(0).animate({'top':-30 }, 200);
	$("#top_content h2").stop().css({'opacity' : 0}).delay(500).animate({'opacity': 1}, 500);
	$("#sub_img").stop().css({'opacity' : 0}).delay(1000).animate({'opacity': 1, 'top':-60}, 130).delay(0).animate({'opacity': 1, 'top':-52}, 300);
	$(".content_wrap>div").stop().css({'opacity' : 0}).delay(700).animate({'opacity': 1}, 500);
	//$(".content_wrap>div").show(700);
	
	setInterval(function () { 	
		$("#object1").delay(100).animate({'opacity': 1, 'top':-40}, 500).delay(0).animate({'top':-30 }, 400);
		$("#object2").delay(300).animate({'opacity': 1, 'top':-50}, 600).delay(0).animate({'top':-30 }, 500); 
	}, 500); 
	
	// pop_선생님 전용 자료실  _ sub
	$('#open_data').click(function(){   
		$('#pop_data_layer').fadeIn(200); 
	});  
	
	//  pop_ 창닫기
	$('.pop_close').click(function(){
		$('#popupWrapper').css('visibility','hidden');
		$('#pop_data_layer').fadeOut(200); 
		$('#pop_event_layer').fadeOut(200); 
		$('#pop_sample_layer').fadeOut(200); 
	}); 
	
	// sub tab 컨텐츠
	$('#tab_navi li a').click(function(){
		var n = $('#tab_navi li a').index($(this));
		$('#tab_navi li').removeClass().eq(n).addClass('on'); 
		$('.content_wrap>div').hide().eq(n).show(500);
	});   
	
});


//  index navi 애니메이션
/*setTimeout('rotate()', 2000); 
var sources = [
	{
		source : "/images/primary/common/index_navi_txt1.png",
		length : 8
	},
	{
		source : "/images/primary/common/index_navi_txt2.png",
		length : 8
	},
	{
		source : "/images/primary/common/index_navi_txt3.png",
		length : 8
	},
	{
		source : "/images/primary/common/index_navi_txt4.png",
		length : 8
	} 
];

function rotate(){		
	$(".motion").css({'opacity' : 0}).delay(2300).animate({'opacity': 1}, 500);
	$(".boxM").empty().append($(".boxT").html());
	
	var item = new Array();

	for (var i=0; i<4; i++) {
		var j = i+1;
		item[i] = new EFusionIPlayer({	
			mode : "serial",
			source : sources[i].source,
			length : sources[i].length,
			width : 160,
			height : 140,
			container : $(".boxM li[name="+ j + "]"),
			duration : 170
		});		
	}
	
	$(".boxM li").each(function(){
		var idx = $(this).attr("name");
		$(this).mouseover(function(){
			item[idx-1].rotate();
		});
		$(this).mouseleave(function(){
			item[idx-1].stop();
		});
	});	
}
$(function() {
	rotate();
});  */


//  음악 영상
function video_pop1(){
	var broswer_w = $(window).width();
	var broswer_h = $(window).height();
	var height = $(document).height();
	var scrollTop = $(document).scrollTop();
	var top = 183.5;
	var left = ( broswer_w - 720)/2;
	var left_m = ( broswer_w - 720)/2 + 106 ;

	var install_html = "";
	install_html += "<div class=\"useguide_ad_wrap\" id=\"useguideAdWrap\" style='top:"+ top +"px;left:" + left + "px; z-index:9999;' >";
	install_html += "<div class=\"ad_layer\">";
	install_html += "<object id=\"flash_fallback_1\" class=\"vjs-flash-fallback\" width=\"720\" height=\"400\" type=\"application/x-shockwave-flash\" data=\"http://www.vivasam.com/images/common/flowplayer-3.2.7.swf\">";
	install_html += "<param name=\"movie\" value=\"http://www.vivasam.com/images/common/flowplayer-3.2.7.swf\" />";
	install_html += "<param name=\"allowfullscreen\" value=\"true\" />";
	install_html += "<param name=\"wmode\" value=\"transparent\" />";
	install_html += "<param name=\"flashvars\" value='config={\"playlist\":[\"http://www.vivasam.com/images/banner/thum_img.png\", {\"url\" : \"http://download-visangtextdn.cdn.x-cdn.com/brochure/Moive/music.mp4\",\"autoPlay\":false,\"autoBuffering\":true}]}' />";
	install_html += "<img src=\"http://www.vivasam.com/images/banner/thum_img.png\" width=\"720\" height=\"400\"/>";
	install_html += "</object>";
	install_html += "<p class=\"close\" id=\"useguideAdWrapClose_btn\" onclick=\"$('#useguideAdWrap').remove(); $('#install_bg').remove();\">";
	install_html += "<img src=\"http://www.vivasam.com/images/common/btn_close_03.gif\" alt=\"닫기\" />";
	install_html += "</p>";
	install_html += "</div>";
	install_html += "</div>";
	install_html += "<div class=\"install_bg\" id=\"install_bg\" style='height:"+ height +"px;'></div>";

	var filter = "win16|win32|win64|mac";

	if( navigator.platform  ){
		if( filter.indexOf(navigator.platform.toLowerCase())<0 ) {
			$("body").append(install_html);
		}else{
			$("body").append(install_html);
		}
	}
};


//  미술 영상
function video_pop2(){
	var broswer_w = $(window).width();
	var broswer_h = $(window).height();
	var height = $(document).height();
	var scrollTop = $(document).scrollTop();
	var top = 183.5;
	var left = ( broswer_w - 720)/2;
	var left_m = ( broswer_w - 720)/2 + 106 ;

	var install_html = "";
	install_html += "<div class=\"useguide_ad_wrap\" id=\"useguideAdWrap\" style='top:"+ top +"px;left:" + left + "px; z-index:9999;' >";
	install_html += "<div class=\"ad_layer\">";
	install_html += "<object id=\"flash_fallback_1\" class=\"vjs-flash-fallback\" width=\"720\" height=\"400\" type=\"application/x-shockwave-flash\" data=\"http://www.vivasam.com/images/common/flowplayer-3.2.7.swf\">";
	install_html += "<param name=\"movie\" value=\"http://www.vivasam.com/images/common/flowplayer-3.2.7.swf\" />";
	install_html += "<param name=\"allowfullscreen\" value=\"true\" />";
	install_html += "<param name=\"wmode\" value=\"transparent\" />";
	install_html += "<param name=\"flashvars\" value='config={\"playlist\":[\"http://www.vivasam.com/images/banner/thum_img.png\", {\"url\" : \"http://download-visangtextdn.cdn.x-cdn.com/brochure/Moive/art.mp4\",\"autoPlay\":false,\"autoBuffering\":true}]}' />";
	install_html += "<img src=\"http://www.vivasam.com/images/banner/thum_img.png\" width=\"720\" height=\"400\"/>";
	install_html += "</object>";
	install_html += "<p class=\"close\" id=\"useguideAdWrapClose_btn\" onclick=\"$('#useguideAdWrap').remove(); $('#install_bg').remove();\">";
	install_html += "<img src=\"http://www.vivasam.com/images/common/btn_close_03.gif\" alt=\"닫기\" />";
	install_html += "</p>";
	install_html += "</div>";
	install_html += "</div>";
	install_html += "<div class=\"install_bg\" id=\"install_bg\" style='height:"+ height +"px;'></div>";

	var filter = "win16|win32|win64|mac";

	if( navigator.platform  ){
		if( filter.indexOf(navigator.platform.toLowerCase())<0 ) {
			$("body").append(install_html);
		}else{
			$("body").append(install_html);
		}
	}
};


//  체육 영상
function video_pop3(){
	var broswer_w = $(window).width();
	var broswer_h = $(window).height();
	var height = $(document).height();
	var scrollTop = $(document).scrollTop();
	var top = 183.5;
	var left = ( broswer_w - 720)/2;
	var left_m = ( broswer_w - 720)/2 + 106 ;

	var install_html = "";
	install_html += "<div class=\"useguide_ad_wrap\" id=\"useguideAdWrap\" style='top:"+ top +"px;left:" + left + "px; z-index:9999;' >";
	install_html += "<div class=\"ad_layer\">";
	install_html += "<object id=\"flash_fallback_1\" class=\"vjs-flash-fallback\" width=\"720\" height=\"400\" type=\"application/x-shockwave-flash\" data=\"http://www.vivasam.com/images/common/flowplayer-3.2.7.swf\">";
	install_html += "<param name=\"movie\" value=\"http://www.vivasam.com/images/common/flowplayer-3.2.7.swf\" />";
	install_html += "<param name=\"allowfullscreen\" value=\"true\" />";
	install_html += "<param name=\"wmode\" value=\"transparent\" />";
	install_html += "<param name=\"flashvars\" value='config={\"playlist\":[\"http://www.vivasam.com/images/banner/thum_img.png\", {\"url\" : \"http://www.vivasam.com/images/primary/athle2.mp4\",\"autoPlay\":false,\"autoBuffering\":true}]}' />";
	install_html += "<img src=\"http://www.vivasam.com/images/banner/thum_img.png\" width=\"720\" height=\"400\"/>";
	install_html += "</object>";
	install_html += "<p class=\"close\" id=\"useguideAdWrapClose_btn\" onclick=\"$('#useguideAdWrap').remove(); $('#install_bg').remove();\">";
	install_html += "<img src=\"http://www.vivasam.com/images/common/btn_close_03.gif\" alt=\"닫기\" />";
	install_html += "</p>";
	install_html += "</div>";
	install_html += "</div>";
	install_html += "<div class=\"install_bg\" id=\"install_bg\" style='height:"+ height +"px;'></div>";

	var filter = "win16|win32|win64|mac";

	if( navigator.platform  ){
		if( filter.indexOf(navigator.platform.toLowerCase())<0 ) {
			$("body").append(install_html);
		}else{
			$("body").append(install_html);
		}
	}
};


//실과 영상
function video_pop4(){
var broswer_w = $(window).width();
var broswer_h = $(window).height();
var height = $(document).height();
var scrollTop = $(document).scrollTop();
var top = 183.5;
var left = ( broswer_w - 720)/2;
var left_m = ( broswer_w - 720)/2 + 106 ;

var install_html = "";
install_html += "<div class=\"useguide_ad_wrap\" id=\"useguideAdWrap\" style='top:"+ top +"px;left:" + left + "px; z-index:9999;' >";
install_html += "<div class=\"ad_layer\">";
install_html += "<object id=\"flash_fallback_1\" class=\"vjs-flash-fallback\" width=\"720\" height=\"400\" type=\"application/x-shockwave-flash\" data=\"http://www.vivasam.com/images/common/flowplayer-3.2.7.swf\">";
install_html += "<param name=\"movie\" value=\"http://www.vivasam.com/images/common/flowplayer-3.2.7.swf\" />";
install_html += "<param name=\"allowfullscreen\" value=\"true\" />";
install_html += "<param name=\"wmode\" value=\"transparent\" />";
install_html += "<param name=\"flashvars\" value='config={\"playlist\":[\"http://www.vivasam.com/images/banner/thum_img.png\", {\"url\" : \"http://www.vivasam.com/images/primary/p.flv\",\"autoPlay\":false,\"autoBuffering\":true}]}' />";
install_html += "<img src=\"http://www.vivasam.com/images/banner/thum_img.png\" width=\"720\" height=\"400\"/>";
install_html += "</object>";
install_html += "<p class=\"close\" id=\"useguideAdWrapClose_btn\" onclick=\"$('#useguideAdWrap').remove(); $('#install_bg').remove();\">";
install_html += "<img src=\"http://www.vivasam.com/images/common/btn_close_03.gif\" alt=\"닫기\" />";
install_html += "</p>";
install_html += "</div>";
install_html += "</div>";
install_html += "<div class=\"install_bg\" id=\"install_bg\" style='height:"+ height +"px;'></div>";

var filter = "win16|win32|win64|mac";

if( navigator.platform  ){
	if( filter.indexOf(navigator.platform.toLowerCase())<0 ) {
		$("body").append(install_html);
	}else{
		$("body").append(install_html);
	}
}
};

