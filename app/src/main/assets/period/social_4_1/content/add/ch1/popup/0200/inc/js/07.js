var popCon;
var pageCon;

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
        $('.map').removeClass('on');
        $('.page1 .ansbtn').removeClass('re');
	});

    $('.page1 .map').on('click',function(){
        effectAdo('click');
        $(this).addClass('on');
        if($('.map.on').length == 2){
            $('.page1 .ansbtn').addClass('re');
        }
    })

    $('.page1 .ansbtn').on('click',function(){
        effectAdo('click');
        $(this).toggleClass('re');
        $('.map').removeClass('on');
        if($('.page1 .ansbtn').hasClass('re')){
            $('.map').addClass('on');
        }
    })
});

function contentScript(_idx, _page){
    if(typeof(vidoCon) != 'undefined'){vidoCon.stop();};
    switch(_idx){
        case 0:
            popCon = new popupContents(_page, 1);
            popCon.init();
        break;
        case 1:
            pageCon = new pageingContents(_page.find('.pageWrap'));
            pageCon.init();

            popCon = new popupContents(_page, 1);
            popCon.init();

            pageConEvent_2(pageCon.page.eq(0));
            pageCon.wrap.find(".prev, .next, .dot").bind('click',function(){
                pageConEvent_2(pageCon.page.eq(pageCon.currentPage));
                $('.map').removeClass('on');
                $('.page1 .ansbtn').removeClass('re');
            });
        break;
    }
}

function pageConEvent_2(_page) { // 공통으로 실행될 함수
    switch (_page.index()) { //page마다 기능이 다를 경우 사용
        case 0:
            clickCon = new clickContents(2, _page, 2);
            clickCon.init();

            clickCon.wrap.find('.clickItem1').on('click', function () {
                if ($(this).css('opacity') === '0') {
                    effectAdo('anschk_O');
                    _page.find('.mark1').show();
                } else {
                    _page.find('.mark1').hide();
                }
            });
            clickCon.wrap.find('.clickItem2').on('click', function () {
                if ($(this).css('opacity') === '0') {
                    effectAdo('anschk_O');
                    _page.find('.mark2').show();
                } else {
                    _page.find('.mark2').hide();
                }
            });
            clickCon.wrap.find('.clickItem').on('click', function () {
                if ($('.ansbtn').hasClass('re')) {
                    _page.find('.wrong').hide();
                }else{
                    _page.find('.wrong').show();
                }
            });

            clickCon.ansbtn.on('click', function () {
                effectAdo('click');
                if ($(this).hasClass('re')) {
                    effectAdo('anschk_O');
                    _page.find('.mark').show();
                    _page.find('.wrong').hide();
                } else {
                    _page.find('.mark').hide();
                    _page.find('.wrong').show();
                }
            });
            _page.find('.mark').hide();
            _page.find('.wrong').show();
            _page.find('.wrong').unbind('click').on('click', function () {
                effectAdo('anschk_x');
            });

            $('.contents').eq(1).find('.popup_btn').show();
        break;
        case 1:
            clickCon = new clickContents(4, _page, 2);
            clickCon.init();

            $('.contents').eq(1).find('.popup_btn').hide();
        break;
        case 2:
            clickCon = new clickContents(3, _page, 2);
            clickCon.init();

            $('.contents').eq(1).find('.popup_btn').hide();
        break;
    }
}
