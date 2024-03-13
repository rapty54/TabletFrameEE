var pageCon;
var pageCon2;
var clickCon;

var videoCon;
var fileName = 'dummy'; // 영상, 자막 파일명

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
});

function contentScript(_idx, _page){
    if(typeof(videoCon) != 'undefined'){videoCon.stop();};
    switch(_idx){
        case 0:
            pageCon = new pageingContents(_page.find('.pageWrap'));
            pageCon.init();

            pageConEvent_1(pageCon.page.eq(0));
            pageCon.wrap.find(".prev, .next, .dot").bind('click',function(){
                pageConEvent_1(pageCon.page.eq(pageCon.currentPage));
            });
        break;
    }
}

function pageConEvent_1(_page){ // 공통으로 실행될 함수
    switch(_page.index()){ //page마다 기능이 다를 경우 사용
        case 0:
            clickCon = new clickContents(1, _page, 2);
            clickCon.init();
            
            popCon = new popupContents(_page, 1);
            popCon.init();
        break;
        case 1:
            clickCon = new clickContents(2, _page, 2);
            clickCon.init();
            
            popCon = new popupContents(_page, 1);
            popCon.init();
        break;
    }
}






