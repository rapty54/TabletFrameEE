$(function(){
	// 이벤트 셋팅
	setEvent();
});

function setEvent(){
	// 작가 행 클릭 이벤트
	$('.authorTblWrap table tbody tr').unbind('click').bind('click',function(e) {
		e.stopPropagation();
		var authorIdx = $(this).data().authorIdx;
		location.href='/themeplace/localLibrary/authorHall/authorContentList?authorIdx='+authorIdx;
	});
}