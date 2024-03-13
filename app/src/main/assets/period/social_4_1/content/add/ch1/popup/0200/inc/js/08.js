var videoCon;
var fileName = '4-1_37p_사람들이 많이 모이는 곳, 중심지'; // 영상, 자막 파일명
var fileName1 = 'dummy'
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
    if(typeof(vidoCon) != 'undefined'){vidoCon.stop()};
    switch(_idx){
        case 0:
            videoCon = new videoPlayer($('#videoFrame'));
            videoCon.src = 'inc/media/mp4/'+fileName+'.mp4';
            videoCon.init();
            videoCon.video.attr('poster','inc/media/mp4/'+fileName+'.png'); // 동영상 표지

            popCon = new popupContents(_page, 1);
            popCon.init();
        break;
    }
}
