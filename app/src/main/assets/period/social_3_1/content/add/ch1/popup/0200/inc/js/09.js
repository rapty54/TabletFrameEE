var aniCon;
var clickCon;

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
            var oxAns = ['O', 'X'];
            oxCon = new oxListContents(_page, oxAns);
            oxCon.init();
        break;
        case 1:
            var quizItem = {
                exp: ['월미산',
                    '우리 문구점',
                    '알뜰 슈퍼마켓',
                    '짜장면 박물관',
                    '신포 국제 시장'],
                ans: ['3'],
            };
            quizCon = new quizContents(_page, quizItem);
            quizCon.init();
        break;
        case 2:
            var quizItem = {
                exp: ['두 그림의 크기를 비교한다.',
                    '두 그림을 망원경으로 살펴본다.',
                    '두 그림을 그린 재료는 무엇인지 비교한다.',
                    '두 그림에 공통적으로 있는 장소를 찾아본다.',
                    '두 그림 중에 어느 한 그림에만 있는 장소를 찾아본다.'],
                ans: ['4', '5'],
            };
            quizCon = new quizContents(_page, quizItem);
            quizCon.init();
        break;
    }
}







