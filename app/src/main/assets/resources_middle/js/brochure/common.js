// go_top
$(window).scroll(function() {
	var pos = $(window).scrollTop();
	if (pos > 100) {
		$('#btn_top').stop(true, false).fadeIn();
	} else {
		$('#btn_top').fadeOut();
	}
});
$(function() {
	$('#btn_top').click(function() {
		//$("html, body", parent.parent.document).animate({'scrollTop' : 0}, 400);
		$(window).scrollTop(0);
		$(this).fadeOut();
		
		return false;
	});
});

function allowZoom(){
	document.getElementById('viewport').setAttribute('content', 'minimum-scale = 1, maximum-scale = 10, user-scalable=yes'); 
 }; 
 
$(function(){
	//    index_탭
	$(".tab_area li").click(function(){
		var n = $(".tab_area li").index($(this));
		$(".tab_area li").removeClass().eq(n).addClass("on"); 
		$("#container>div").hide().eq(n).fadeIn();
	});
	
	//   sub_list
	var List=$('.subject_list');
	List.find('>dl>dt').click(function(){
		if($(this).next('dd').hasClass('on')){
			$(this).removeClass('on');
			$(this).next('dd').removeClass('on');
			$(this).next('dd').slideUp(300);
			//return false;
		}else{
			List.find('dt').removeClass('on');
			List.find('dd').removeClass('on');
			List.find('dd').slideUp(300);
			$(this).addClass('on');
			$(this).next('dd').addClass('on');
			$(this).next('dd').slideDown(300);
			//return false;
		}
	});	
});


