$(function () {
	// 레이어팝업 닫기
	$('.pop_close').click(function(){
		$(this).parents('.layerPop').hide();
	});

	// swiper
	var swiper = new Swiper('.librarySwiper', {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 4,
		initialSlide: 8,
		autoplay: {
			delay: 4000,
		},
		pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
	});
});