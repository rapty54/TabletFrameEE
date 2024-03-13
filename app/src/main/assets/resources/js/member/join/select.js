$(function() {
	$('#goNextBtn').on('click', function(){
		$('#joinSelectFrm').submit();
	});

	$(window).on('scroll', function(){
		//console.log($(this).scrollTop())
		if($(this).scrollTop() >= 250){
			$('.join_sns_scroll').fadeOut();
		}else{
			$('.join_sns_scroll').fadeIn();
		}
	});
});