var clickCon1;
var clickCon2;
var clickCon3;


$(window).on('load',function(){
    
	$('.contents').eq(0).show();

    reset($('.clickPage1 .objWrap'));

    $('.setContent li').bind('click',function(){
		var idx = $(this).index();
		var page = $('.contents').eq(idx);
        
		if(page.attr('class').indexOf('clickPage1') > -1){
            reset($('.clickPage1 .objWrap'));
            
            
        }else if(page.attr('class').indexOf('clickPage2') > -1){
            reset($('.clickPage2 .objWrap'));
            


		}else if(page.attr('class').indexOf('clickPage3') > -1){
            reset($('.clickPage3 .objWrap'));
            
            
		}
	});
    
    
    $('.rebtn').click(function(){
        effectAdo('click');
        var wrap = $(this).parent().find('.objWrap');
        reset(wrap);
        
    });

});

$(document).on('click','.line1',function(){
    var now = $(this).parent().parent();
    effectAdo('click');
        
    now.find('.objWrap .finger').removeClass('ani');
    now.find('.objWrap .finger').hide();
    now.find('.objWrap .line1').hide();
    now.find('.result').show();
})




function reset(wrap){
    var idx = wrap.parent().index();
    
    $('.finger').removeClass('ani');
    wrap.find('.finger').addClass('ani');
    wrap.find('.finger').show();
    wrap.find('.line1').show();
    wrap.parent().find('.result').hide();
}

