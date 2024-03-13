
var clickCon1;

$(window).on('load', function () {

	$('.contents').eq(0).show();
    
    clickCon1 = new clickContents(2,$('.clickPage1'));
    clickCon1.init();
    
    
});
