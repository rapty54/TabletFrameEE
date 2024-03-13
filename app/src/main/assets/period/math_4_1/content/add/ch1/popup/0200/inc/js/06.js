var clickCon1;
var clickPage;

$(window).on('load', function () {

	$('.contents').eq(0).show();
    makeClickItem(1, $('.clickPage1'));
    clickPage = $('.clickPage1');
    $('.ansbtn').hide();
 
    $('.setContent li').on('click', function () {
		var idx = $(this).index();
		var page = $('.contents').eq(idx);
        
        clickPage = page;
        
		if(page.attr('class').indexOf('clickPage1') > -1) {
			makeClickItem(1, page);
            $('.ansbtn').hide();
            
		}else if (page.attr('class').indexOf('clickPage2') > -1) {
			makeClickItem(1, page);
            $('.ansbtn').hide();
            
            $('.objWrap').hide();
            $('.objWrap').removeClass('ani');
            $('.obj').removeClass('ani');
            $('.btnCompare').removeClass('re');
            
		}
        
	});
    
});

// 4탭 비교하기 버튼
$(document).on('click','.btnCompare',function(){
    effectAdo('click');
    
    if($(this).hasClass('re')){
        $(this).removeClass('re');
        $(this).next().find('.obj').removeClass('ani');
        $(this).next().hide();
        
    }else{
        $(this).addClass('re');
        $(this).next().show();
        $(this).next().addClass('ani');
        $(this).next().find('.obj').addClass('ani');
        
    }
    
    
})
//클릭아이템 만들기
function makeClickItem(num, page){
    clickCon1 = new clickContents(num,page);
    clickCon1.init();
}





