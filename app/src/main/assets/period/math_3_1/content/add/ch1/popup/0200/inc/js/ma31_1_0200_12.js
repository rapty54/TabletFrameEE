var stampCon;

$(window).on('load', function () {
	$('.contents').eq(0).show();

	stampCon = new stampContents($('.contents').eq(0));
	stampCon.init();
});
