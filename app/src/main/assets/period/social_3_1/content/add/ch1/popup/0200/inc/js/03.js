var objectCon;

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
            objectCon = new objectiveContents(_page);
            objectCon.init();
        break;
    }
}