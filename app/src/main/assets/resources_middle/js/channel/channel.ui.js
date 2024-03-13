$(document).ready(function() {
	$(".swiper-container").each(function(index, element){
		var $this = $(this);
		var swiper = new Swiper(this, {
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			paginationClickable: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
				clickable: true
			}
		});
	});

	

	
	$('.pop_channel .pop_control > label').on('click', function() {
		if ($(this).hasClass('on')) {
			$(this).prev().find('input').prop('checked', true);
			$(this).removeClass('on');
		}
		else {
			$(this).prev().find('input').prop('checked', false);
			$(this).addClass('on');
			
		}
		return false;
	});
});


