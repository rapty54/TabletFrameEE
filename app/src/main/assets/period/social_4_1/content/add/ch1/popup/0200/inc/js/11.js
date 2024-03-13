var clickCon;
var choTxt1 = ["중심"];
var choTxt2 = ["버스\n\n\n터미널"];

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
            clickCon = new clickContents(1, _page, 2);
            clickCon.init();
            clickCon.cho(choTxt1, 2);
        break;
        case 1:
            clickCon = new clickContents(1, _page, 2);
            clickCon.init();
            clickCon.cho(choTxt2, 2);
        break;
    }
}








