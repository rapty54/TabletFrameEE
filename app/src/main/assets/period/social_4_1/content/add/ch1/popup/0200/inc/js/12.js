var oxCon;
var quizCon;
var poppageCon;
var oxAns = ['O', 'O'];

var quizItem1 = {
    exp: [
        '시청',
        '시장',
        '과수원',
        '비닐하우스',
        '버스 터미널'
    ],
    ans: ['1','2','5']
};


var quizItem2 = {
    exp: [
        '밭에서 농사를 짓기 위해서',
        '과수원에서 과일을 재배하기 위해서',
        '높은 산에서 아름다운 경치를 보기 위해서',
        '버스 터미널을 통해 다른 지역에 가기 위해서',
        '시장에서 생활에 필요한 물건을 사기 위해서'
    ],
    ans: ['4','5']
};

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
            oxCon = new oxListContents(_page, oxAns);
            oxCon.init();
        break;
        case 1:
            quizCon = new quizContents(_page, quizItem1);
            quizCon.init();
        break;
        case 2:
            quizCon = new quizContents(_page, quizItem2);
            quizCon.init();
        break;
    }
}