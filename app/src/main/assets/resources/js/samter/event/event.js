//페이지 이동시 종료된 이벤트 보여주기 위함
$(document).ready(function (){
	if (pageMoveChk != '') {
		$(".tab_menu li a").trigger("click");
	}	
});