$(function(){
	// var c = 1;

	// $('.clickItem').on('click',function(){
	// 	if($(this).hasClass('clickItem'+c)){
	// 		$('.clickItem'+c).hide();
	// 		$('.ritem'+c).fadeIn();
	// 		c++;
	// 		playSoundClick();

	// 		if(c == $('.clickItem').length){
				
	// 		}
	// 	}
	// });

	// $('.btnConfirm').on('click',function(){
	// 	c == $('.clickItem').length;
	// 	$('.clickItem').hide();
	// 	$('.ritem').fadeIn();
	// 	playSoundClick();
	// });

	$('.clickItem:not(.clickItem1)').addClass('evtN');

	$('.clickItem').on('click', function(){
		var idx = $(this).index();
		var num = $('.clickItem').length;

		playSoundClick();
		$(this).addClass('on');
		$('.ritem').eq(idx+1).show().siblings('.ritem').hide();
		
		$('.clickItem').eq(idx+1).removeClass('evtN');

		if($('.clickItem.on').length === num){
			$('.btnConfirm').addClass('re');
		}
	
	});

	$('.btnConfirm').on('click', function(){
		var r = $('.ritem').length;
		playSoundClick();

		if($(this).hasClass('re')){
			$(this).removeClass('re');
			$('.clickItem').removeClass('on');
			$('.ritem').hide();
			$('.ritem1').show();
			$('.clickItem:not(.clickItem1)').addClass('evtN');
			$('.ritem').removeClass('on');
		} else {
			$(this).addClass('re');
			$('.clickItem').addClass('on');
			$('.ritem').addClass('on');
		}
	});
	

})