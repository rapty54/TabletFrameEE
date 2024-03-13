/* 체험단 모집 */
$(window).load(function() {
	var docH = $(document).height();
	var winH = $(window).height();
	var footH = $('#footer').height();
	var objH = $('.bnRegist').height();
	var fix = (docH - winH) - footH;

	$(window).resize(function() {
		winH = $(window).height();
		fix = (docH - winH) - footH;
		objSet($(this));
	})

	$(window).scroll(function() {
		objSet($(this));
	});

	function objSet(win) {
		var scrT = $(win).scrollTop();
		if(scrT > fix) {
			$('.bnRegist').css('bottom', (scrT - fix)+'px');
		} else {
			$('.bnRegist').css('bottom', '0px');
		}
	}
});

 /* 동영상 탭 */
$(function() {
	$('#player .tab>li>a').click(function() {
		$('#player .tab>li>a').removeClass('on');
		$('#player .tab>li>ul').hide();
		$('#player .tab>li>ul>li>a').removeClass('on');
		$(this).addClass('on').next().show();
		$(this).next().find('li>a').first().addClass('on');
	})

	$('#player .tab>li>ul>li>a').click(function() {
		$(this).closest('ul').find('>li>a').removeClass('on');
		$(this).addClass('on');
	})
});


 /* 동영상 */
 function video_pop(mov){

	var install_html = "";
	install_html += "<object id=\"flash_fallback_2\" class=\"vjs-flash-fallback\" width=\"720\" height=\"400\" type=\"application/x-shockwave-flash\" data=\"http://www.vivasam.com/images/common/flowplayer-3.2.7.swf\">";
	install_html += "<param name=\"movie\" value=\"http://www.vivasam.com/images/common/flowplayer-3.2.7.swf\" />";
	install_html += "<param name=\"allowfullscreen\" value=\"true\" />";
	install_html += "<param name=\"wmode\" value=\"transparent\" />";
	install_html += "<param name=\"flashvars\" value='config={\"playlist\":[\""+mov.href+"\", {\"url\":\""+mov.href+"\",\"autoPlay\":false,\"autoBuffering\":true}]}' />";
	install_html += "<img src=\"/images/banner/thum_img.png\" width=\"720\" height=\"400\"/>";
	install_html += "</object>";

	var filter = "win16|win32|win64|mac";

	if( navigator.platform  ){
		if( filter.indexOf(navigator.platform.toLowerCase())<0 ) {
			$(".player").empty();
			$(".player").append(install_html);
		}else{
			$(".player").empty();
			$(".player").append(install_html);
		}
	}
}