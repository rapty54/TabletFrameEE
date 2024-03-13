
/*
설문조사 페이지 이동 함수이다
다음 설문으로 이동할때는 설문 문항 별 조건에 맡는 답을 했는지 확인하고 넘긴다.
이전으로 이동은 자유롭다!!!
*/
function goPage( orgClassName, goGlassName, type ) {

	showPage( orgClassName, goGlassName, type );

//	if ( type == "go" ) {	
//		if ( chkQuestion (orgClassName) ) {
//			showPage( orgClassName, goGlassName, type );
//			$(window).scrollTop(0);
//		}
//	} else {
//		showPage( orgClassName, goGlassName, type );
//		$(window).scrollTop(0);
//	}
}