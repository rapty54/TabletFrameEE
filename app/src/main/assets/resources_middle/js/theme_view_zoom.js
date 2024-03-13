$(document).ready(function(){
	//이미지 로드 체크
	IMG_resize_fn();
	//인포 버튼
	info_btnOn();
	
	$(window).resize( function(){
		resize_img();		
		//슬라이드
		$('#slide_container').find('.slide_wrap').css({
			width : ($(window).width() - 80)
		});
	});
	
	//줌 슬라이드바 동작
	//type1 
	/*
	$( "#slider-vertical" ).slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value : 0 
	}).bind({
		slidestart  : function(event,ui){
			$('#zoom_tag_layer').show().css("opacity","1");
		},
		slidestop   : function(event,ui) {
			var value = $( "#slider-vertical" ).slider( "option", "value" );
			
			if ( 25 >= value){
				$( "#slider-vertical" ).slider( "option", "value", 0 );
				zoom_img( 100 );
				drag_reset('off');
			}
			else {
				if (  75 >= value && value >= 26){
					$( "#slider-vertical" ).slider( "option", "value", 50 );
					zoom_img( 150 );
					drag_text();
				}
				else {
					if ( value >= 76){
						$( "#slider-vertical" ).slider( "option", "value", 100 );
						zoom_img( 200 );
						drag_text();
					}
				}
			}
		}
	});
	
	$( "#screen_zoom_btn" ).click( function() {
		drag_reset('off');
		zoom_img( 100 );
		IMG_top();
	});
	*/
	
	//type2 왜바꾸는겨 ㅜㅜ
	$('#ZoomType2').find('.btn1').click( function(obj){
		drag_reset('off');
		zoom_img( 100 );
		
		obj = $(this);
		ZoomBtnReset(obj);
	});
	/*
	$('#ZoomType2').find('.btn3').click( function(){
		
	});
	*/
	$('#ZoomType2').find('.btn4').click( function(obj){
		drag_reset('off');
		zoom_img( 100 );
		
		obj = $(this);
		ZoomBtnReset(obj);
	});
	$('#ZoomType2').find('.btn5').click( function(obj){
		drag_text();
		zoom_img( 150 );
		
		obj = $(this);
		ZoomBtnReset(obj);
	});
	$('#ZoomType2').find('.btn6').click( function(obj){
		drag_text();
		zoom_img( 200 );
		
		obj = $(this);
		ZoomBtnReset(obj);
	});
	
	function ZoomBtnReset(obj){
		$('#ZoomType2').find('a').removeClass('on');
		$(obj).addClass('on');
	}
	
});

//브라우저 열렸을때 값
var brw_width = $(window).width();
var brw_height = $(window).height();

//이미지 위드
var img_w = $("#view_image").width();

//줌기능
function drag_text(){
	$( "#view_image" ).draggable({ disabled : false });
}

//줌 테그 조절
function zoom_img( val ){
	if( 100 == val){
		img_zoom( '100' );
		$( "#zoom_tag_layer" ).find('.zoom_tag').removeClass('on');
		$( "#zoom_tag_layer" ).find('.zoom_tag').eq(2).addClass('on');
		$('#zoom_tag_layer').animate({
			opacity: 0.25
		}, 500, function() {
			$('#zoom_tag_layer').hide();
		});
	}
	if( 150 == val){
		img_zoom( '150' );
		$( "#zoom_tag_layer" ).find('.zoom_tag').removeClass('on');
		$( "#zoom_tag_layer" ).find('.zoom_tag').eq(1).addClass('on');
		$('#zoom_tag_layer').animate({
			opacity: 0.25
		}, 500, function() {
			$('#zoom_tag_layer').hide();
		});
	}
	if( 200 == val){
		img_zoom( '200' );
		$( "#zoom_tag_layer" ).find('.zoom_tag').removeClass('on');
		$( "#zoom_tag_layer" ).find('.zoom_tag').eq(0).addClass('on');
		$('#zoom_tag_layer').animate({
			opacity: 0.25
		}, 500, function() {
			$('#zoom_tag_layer').hide();
		});
	}
}

//버튼 줌 fn 
function img_zoom( val ){
	if(val == 100 ){
		imgMagnification = 10 ;
	} else
	if(val == 150 ){
		imgMagnification = 15 ;
	} else
	if( val == 200 ){
		imgMagnification = 20 ;
	} 
	
	var img_size_w = $( "#view_image" ).width();
	var img_size_h = $( "#view_image" ).height();
	var img_scale = $( "#view_image" ).attr('scale');

	if( img_size_h <= img_size_w ){
		$( "#view_image" ).css({
			"width" :  (img_size_w / img_scale) * imgMagnification
			,"height" : "auto"
			,"margin-left" : - ((img_size_w / img_scale) * imgMagnification /2)
			,"top" : 0
			,"left" : "50%"
		});
		$( "#view_image" ).attr("scale",imgMagnification);
		IMG_top();
	}else{
		$( "#view_image" ).css({
			"width" : "auto"
			,"height" :   (img_size_h / img_scale) * imgMagnification
			,"top" : 0
			,"left" : "50%"
		});
		$( "#view_image" ).css({
			"margin-left" : - ($( "#view_image" ).width() / 2)
		});
		$( "#view_image" ).attr("scale",imgMagnification);
		IMG_top();
	}		
}

//줌기능 리셋
//드래그 기능 온 오프 기능
function drag_reset(fn){
	if( fn ==  'off' ){
		$( "#view_image" ).draggable({ disabled : true });
		IMG_resize_fn();
		IMG_top();
	}else{
		false;
	}
	if( fn == 'on' ){
		$( "#view_image" ).draggable({ disabled : false });
		IMG_resize_fn();
	}else{
		false;
	}
}


//이미지 리사이즈 및 로드
function IMG_resize_fn(){
	$('#view_image').load(function(){
		
		//원본 이미지 값
		var img_width = $(this).width();
		var img_height = $(this).height();	
		

		//980 740
//		drag_reset('off');
//		$(this).attr('scale','10');
//		obj = $('#ZoomType2').find('.btn4');
//		ZoomBtnReset(obj);
		
		if(img_width >= 980 &&  img_height >= 740){
			if( brw_width <= img_width || brw_height <= img_height){
			
				resizeImgWidth = 980 * 0.8;
				marginleft = resizeImgWidth / 2;
				
				
				if( brw_width <= 980 || brw_height <= 740 ){
					//우선 넓이값을 넣어주고
					$('#view_image').css({
						"width" : resizeImgWidth
						, "margin-left" : - marginleft
						,"visibility" : "visible"
					});
					
					IMG_top();
					
					resizeImgHeight = $(this).height();
					
					//만약 넓이값을 넣어줬는데 높이값이 크면 다시 리사이징
					
					if( 740 <= resizeImgHeight ){
						$('#view_image').css({
							"width" : "auto" 
							,"height" : brw_height * 0.7							
						});
						
						//다시 넓이값 구해서 왼쪽??
						$('#view_image').css({
							"margin-left" : - ($('#view_image').width() / 2)
							,"visibility" : "visible"
						});
						
						IMG_top();
					}else{
						$('#view_image').css({
							"visibility" : "visible"
						});
						
						IMG_top();
					}			
				}else{
					resize_img();
					$('#view_image').css({
						//"top" : (brw_height / 2) - ( $('#view_image').height() / 2),
						"visibility" : "visible"
					});
					
					IMG_top();
				}
				$("#wrap").data('spinner').stop();
				return false;
			}else{
				resize_img();
				$('#view_image').css({
					//"top" : (brw_height / 2) - ( $('#view_image').height() / 2),
					"visibility" : "visible"
				});
				
				IMG_top();
				$("#wrap").data('spinner').stop();
				return false;
			}
		}else{
			//둘다 작은넘
			marginleft = img_width / 2;
			
			$('#view_image').css({
				"width" : 'auto'
				,"visibility" : "visible"
				, "margin-left" : - marginleft
			});
			IMG_top();
			$("#wrap").data('spinner').stop();
			return false;
		}
	})
	.error(function(){
		alert('error img load');
		if ( isIE ) {
		       var thisImg = this;
		       setTimeout(function() {
		          if ( ! thisImg.complete ) {
		        	  IMG_resize_fn();
		          }
		       },250);
		    } else {
		    	IMG_resize_fn();
		 }
	});
}

//resize 함수
function resize_img(){
	
	var brw_width = $(window).width();
	var brw_height = $(window).height();
	
	var resize_img_w =  brw_width * 0.8 ;
	
	if(brw_width >= 980  &&  brw_height >= 740){
		$('#view_image').css({
			"width" : resize_img_w
			,"height" : "auto"
		});
		resize_img_h = $('#view_image').height();
		
		$('#view_image').css({
			"margin-left" : - (resize_img_w / 2)
		});
		
		IMG_top();
		
		if( $('#view_image').height() >= brw_height*0.7 ){
			$('#view_image').css({
				"width" : "auto"
				,"height" : brw_height*0.7
			});
			$('#view_image').css({
				"margin-left" : - ($('#view_image').width() / 2)
			});
			IMG_top();
		}else{
			IMG_top();
			return false;
		}
		return false;
		
	}else{
		IMG_resize_fn();
	}
}

//높이값
function IMG_top(){
	var img_height = $('#view_image').height();
	var img_top = (brw_height / 2) - ( img_height / 2) - 25;
	$('#view_image').css({
		'top' : img_top
	});
}

//정보
function info_btnOn(){
	$("#info_btn").click(function(){
		
		if( $(this).hasClass('on') ){
			$("#info_layer").stop().animate({
				'left' : -318
			},500);
			$(this).removeClass('on').addClass('off');
		}else{
			$("#info_layer").stop().animate({
				'left' : 0
			},500);
			$(this).removeClass('off').addClass('on');
		}
	});
}