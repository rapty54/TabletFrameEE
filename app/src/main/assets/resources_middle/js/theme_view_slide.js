$(document).ready(function(){
	//슬라이드 이미지 위치잡기
	slide_img_center();
	slide_count();
	//슬라이드 선택
	slide_select();
	
	 slide_btnOn();
	
	//슬라이드 구동
	slide_rail('1');
});

function slide_img_center(){
	$('.thum_layer').find('img').load(function(){
		//원본 이미지 값
		var img_width = $(this).width();
		var img_height = $(this).height();	
		
		if(img_width >= img_height){
			$(this).css({
				width : 85
				,height  : 'auto'
			});
			$(this).css({
				"margin-top" : (64 - $(this).outerHeight()) /2
				,"visibility" : "visible"
			});
		}else{
			$(this).css({
				height : 64
				,width : 'auto'
			});
			$(this).css({
				"margin-left" : (85 - $(this).outerWidth()) /2
				,"visibility" : "visible"
			});
		}
	});
}

function slide_count(){
	
	var max_number = $('.thum_layer').last().find('img').attr('number');
	$('#max_page').html(max_number);
	
	$('#slide_container').find('.slide_wrap').css({
		width : ($(window).width() - 80)
	});
}

function slide_select(){
	$('.thum_layer').on('click',function(){
		var img_src = $(this).find('img').attr('src');
		var img_number = $(this).find('img').attr('number');
		var img_title = $(this).find('.title').text();
		var imgtag = $('<img src="' + img_src + '" id="view_image"  style="visibility:hidden; display:block;" scale="10" number="'+ img_number +'"/>');
		
		$('#view_image').remove();
		$('#img_box').html(imgtag);
		$('#img_title').html(img_title);
		$('#live_page').html(img_number);
		$('.thum_layer').removeClass('on');
		$(this).addClass('on');
		IMG_resize_fn();
	});
}

//슬라이드
function slide_rail(sliding_num){
	var rail_width = $('.thum_layer').outerWidth(true);
	var thum_num = $('.thum_layer').last().find('img').attr('number');
	
	$('#slide_rail').css({
		width : rail_width * thum_num
		,'margin-left' : '0'
	});
	
	 if(rail_width * thum_num < $(window).width() - 80 ){
		$('.button').css({
			"display" : "none"
		});
	 }else{
		return false;
	 }
	 
	
	$('#next').click(function(){
		 var right_slide = rail_width * sliding_num;
		 
		 var slide_stop = $('#slide_rail').css('margin-left').replace('px','');
		 var max_left = (rail_width * thum_num) - rail_width;
		 
		 
		 if(slide_stop > -max_left && rail_width * thum_num > $(window).width() - 80 ){
			$('#slide_rail').stop().animate({
				'margin-left' : '-='+right_slide
			});
		 }else{
			return false;
		 }
	});
	
	$('#prev').click(function(){
		 var right_slide = rail_width * sliding_num;
		 
		 var slide_stop = $('#slide_rail').css('margin-left').replace('px','');
		 var max_left = (rail_width * thum_num) - rail_width;
		 
		 if(0 > slide_stop && rail_width * thum_num > $(window).width() - 80 ){
			$('#slide_rail').stop().animate({
				'margin-left' : '+='+right_slide
			});
		 }else{
			return false;
		 }
	});
}

function slide_btnOn(){
	$(".bottom_btn").click(function(){
		
		if( $(this).hasClass('on') ){
			$("#slide_layer").stop().animate({
				'bottom' : 0
			},500);
			$(this).removeClass('on').addClass('off');
		}else{
			$("#slide_layer").stop().animate({
				'bottom' : 98
			},500);
			$(this).removeClass('off').addClass('on');
		}
	});
}




