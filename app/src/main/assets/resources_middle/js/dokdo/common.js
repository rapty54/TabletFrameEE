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

//  navi menu 인식 
$('document').ready(function(){  	
	if(typeof afterJQueryInit == 'function') { 
   afterJQueryInit();
  }
}); 

function gnb_navi(a1){ 
	$('#gnb li').eq(a1).addClass('on');  
}


// ie 저버젼 png 이미지
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
	for (i in $("body#wrap img")) {
		if ($("body#wrap img")[i].src) {
			var imgSrc = $("body#wrap img")[i].src;
			if (imgSrc.substr(imgSrc.length-4) === '.png' || imgSrc.substr(imgSrc.length-4) === '.PNG') {
				$("body#wrap img")[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src='" + imgSrc + "')";
			}
		}
	}
}


$(function(){ 
	//  index visual	
	$("#bird1").stop().css({'opacity' : 0}).delay(2000).animate({'opacity': 1, 'top':35, 'right':97}, 500).delay(0).animate({'top':30, 'right':100 }, 400);
	$("#bird2").stop().css({'opacity' : 0}).delay(2400).animate({'opacity': 1, 'top':190, 'left':72}, 600).delay(0).animate({'top':195, 'left':65 }, 500); 	
	
	//   슬로건
	$("#slogan1").stop().css({'opacity' : 0}).delay(700).animate({'opacity': 1, 'left':215}, 500);
	$("#slogan2").stop().css({'opacity' : 0}).delay(1000).animate({'opacity': 1, 'left':215}, 500); 
	$("#slogan3").stop().css({'opacity' : 0}).delay(1300).animate({'opacity': 1, 'left':440}, 500); 
	$("#slogan4").stop().css({'opacity' : 0}).delay(1600).animate({'opacity': 1, 'top':210}, 500); 
	
	setInterval(function () { 	
		$("#bird1").delay(100).animate({'top':35, 'right':97}, 500).delay(0).animate({'top':30, 'right':100 }, 600);
		$("#bird2").delay(500).animate({'top':190, 'left':72}, 600).delay(0).animate({'top':195, 'left':65 }, 700);
		$("#slogan1").delay(5000).animate({'opacity': 0, 'left':235}, 500).delay(1500).animate({'opacity': 1, 'left':215}, 500);
		$("#slogan2").delay(5000).animate({'opacity': 0, 'left':205}, 500).delay(1500).animate({'opacity': 1, 'left':215}, 500);
		$("#slogan3").delay(5000).animate({'opacity': 0, 'left':450}, 500).delay(1500).animate({'opacity': 1, 'left':440}, 500);
		$("#slogan4").delay(5000).animate({'opacity': 0, 'top':220}, 500).delay(1500).animate({'opacity': 1, 'top':210}, 500);
	}, 500); 
		
	// 전체자료실 tab
	$(".tab_menu li a").click(function(){
		var n = $(".tab_menu li a").index($(this));
		$(".tab_menu li").removeClass().eq(n).addClass("on"); 
		//$("#main_container>div").hide().eq(n).fadeIn(150);
		$("#main_container .data_List").removeClass("Nth"); 
	});
	$(".tab_menu li:first a").click(function(){
		$("#main_container .data_List:first").addClass("Nth"); 
	});

	
});




