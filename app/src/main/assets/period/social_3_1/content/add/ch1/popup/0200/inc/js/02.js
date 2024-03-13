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
	});
});

function contentScript(_idx, _page){
    if(typeof(videoCon) != 'undefined'){videoCon.stop();};
    switch(_idx){
        case 0:
            pageCon = new pageingContents($('.pop0 .pageWrap'));
            pageCon.init();
            pageCon.setPopUp(_page, 0); //---팝업번호
        break;
        case 1:
            clickCon = new clickContents(2, _page, 2);
            clickCon.init();
        break;
    }
}