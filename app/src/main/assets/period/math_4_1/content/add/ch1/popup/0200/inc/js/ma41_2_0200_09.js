$(function(){

	$('.clickItem').on('click', function(){
		var idx = $(this).index();
		var num = $('.clickItem').length;

		playSoundClick();
		$(this).addClass('on');

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
		} else {
			$(this).addClass('re');
			$('.clickItem').addClass('on');
		}
	});
	

})