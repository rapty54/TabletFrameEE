var pageCon;
var pageCon2;
var clickCon;
var videoCon;
var fileName = 'soc31_105_07'; // 영상, 자막 파일명

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
            popCon = new popupContents(_page, 1);
            popCon.init();

            _page.find(".popup_btn").bind('click', function(){
                clickCon = new clickContents(7, _page.find('.popup'), 1);
                clickCon.init();
            });
        break;
        case 1:
            clickCon = new clickContents(2, _page, 1);
            clickCon.init();
        break;
        case 2:
            videoCon = new videoPlayer($('#videoFrame'));
            videoCon.src = 'inc/media/mp4/'+fileName+'.mp4';
            videoCon.init();
            videoCon.video.attr('poster','inc/media/mp4/'+fileName+'.png'); // 동영상 표지
            
            popCon = new popupContents(_page, 1);
            popCon.init();
            
            _page.find(".popup_btn").bind('click', function(){
                if(typeof(videoCon) != 'undefined'){videoCon.stop();};
            });
        break;
    }
}







