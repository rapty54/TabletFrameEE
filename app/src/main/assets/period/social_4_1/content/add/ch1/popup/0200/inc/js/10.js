var pageCon;
var pageCon2;
var clickCon;
var initialCon;
var choTxt1 = ["경찰서","우체국","시청","시장",];
var popupCon;

$(window).on('load',function(){
	var cnt;
	bgColorChange("#000000");
    $('.contents').eq(0).show();
    contentScript(0, $('.contents').eq(0));
    
    $('.setContent li').bind('click', function () {
		var idx = $(this).index();
		var page = $('.contents').eq(idx);
        if(cnt != idx){
            cnt = idx;
            contentScript(idx, page);
        }
	});

    $('.popup_btn').on('click', function(){
        $('.ani1').addClass('on');
    })
    $('.close').on('click', function(){
        $('.ani1').removeClass('on');
    })
});

function contentScript(_idx, _page){
    if(typeof(videoCon) != 'undefined'){videoCon.stop();};
    switch(_idx){
        case 0:
            clickCon = new clickContents(4, _page, 2);
            clickCon.init();
            clickCon.cho(choTxt1, 2);

            popupCon = new popupContents(_page, 1)
            popupCon.init();
        break;
    }
}









