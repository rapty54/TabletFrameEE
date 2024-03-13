$(function() {
	$('.connection .toggle').click(function() {
		var connect = $(this).parent().next();
		if(connect.is(':hidden')) {

			$('.connection .toggle').removeClass('on');
			$(this).addClass('on');
			$('.connection dd').hide();
			connect.show();
		} else {
			$(this).removeClass('on');
			connect.hide();
		}
		return false;
	});
	$('.connection .toggle').triggerHandler('click');
});


/* 대표이미지
$(function() {

	$('.standImg a').eq(0).css('display', 'block')
	var imgW = $('.standImg a').outerWidth(true);
	$('.standImg').css('width', imgW+'px')


	$('.standImg').mouseenter(function() {
		var max = $('.standImg a').length;
		var imgW = $('.standImg a').outerWidth(true);
		$(this).css('width', imgW * max+'px')
		$('.standImg a').show();
	});

	$('.standImg').mouseleave(function() {
		var imgW = $('.standImg a').outerWidth(true);
		$('.standImg a').hide();
		$('.standImg a:first').show();
		$(this).css('width', imgW+'px')

	});
});
*/