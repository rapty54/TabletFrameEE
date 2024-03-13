//레이어팝업
function openPop(){
	$(".layerWrap").show();
	bgLayerH();
}

function closePop(){
	$(".layerWrap").hide();
	bgLayerClose();
}

$(document).ready(function() {
	browserCheck();
	
	//input
	$('.magWrite dl dd').find('input:text').focus(function() {
		if ($(this).val() == '30자 이내로 의견을 남겨 주세요' ) {
			$(this).val('');
		}
	});
	$('.magWrite dl dd').find('input:text').blur(function() {
	   if ($(this).val() == '') {
		   $(this).val('30자 이내로 의견을 남겨 주세요');
	   }
	});
	
	//input clear common
	$('.inputClear').find('input:text').focus(function() {
		if ($(this).val() == '30자 이내로 의견을 남겨 주세요' ) {
			$(this).val('');
		}
	});
	$('.inputClear').find('input:text').blur(function() {
	   if ($(this).val() == '') {
		   $(this).val('30자 이내로 의견을 남겨 주세요');
	   }
	});
	
	//tab
	$(".tabBox ul li a").click(function(){
		$(".tabBox ul li").removeClass("on");
		$(".tabCont").hide();
		var index = $(this).parent().addClass("on").index();
		var selector="#tabCont0"+(index+1);
		$(selector).show();
		return false;
	});
	
	//main gnb
	$(".gnbMain li a").mouseenter(function(){
		 $(this).find("> img").hide();
		 $(this).find("span").show();
	});
	$(".gnbMain li a").mouseleave(function(){
		 $(this).find("> img").show();
		 $(this).find("span").hide();
	});
	
	//seriesList
	$(".seriesList > ul > li > input[type='radio']").click(function () {
		if ($(this).is(":checked")) {
			$(this).parent().addClass("on");
			$(this).parent().siblings().removeClass("on");
		}
		else {
			$(this).parent("li").removeClass("on");
			
		}
	});
	$(".seriesList .thumbBox").click(function () {
		if ($(this).parent().hasClass("on")) {}
		else {
			$(this).parent().addClass("on");
			$(this).parent().siblings().removeClass("on");
			$(this).next("input").prop("checked", true);
		}
	});
	
});

function browserCheck() {
	if( $.browser.msie ){
		if( parseInt($.browser.version) < 9 ) {
			$('.main #wrap').each(function() {
				$(this).append('<img src="../../images/companion/bg_main_02.jpg" alt="" class="mbg">');
			});
		}
	}
}