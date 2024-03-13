/**
* 교과자료 화면에 사용되는 공통 스크립트.
*
*/

$(document).ready(function() {
	
	//교과 목록 메인 페이지  > 목록 컨텐츠 상단의 네비게이션 > selectbox 영역 선택한 리스트가 위에 뿌려지기
	$(".selectBox-L .selectBox-list > li").bind("click", function(){
		if($(this).attr('dataCnt') == "0"){
			return;
		}
		if(!$(this).hasClass('soon')){
			
			var idx = $(this).index();
			$(".selectBox-L .selectBox-list > li").each(function(){
				$(this).removeClass("on");
			});
			$(this).addClass("on");
			var txt = $(this).children("p.list-text").html();
			$(".selectBox-L > p.list-text").html(txt);
			
			//목록 상단 네비게이션 변경에 따른 교과 Lnb 메뉴 포지션 변경
			if ($(".selectBox-L").hasClass('gubunT')) {
				$("#lnbEduCourseType > li").each(function(){
					$(this).removeClass("on");
				});
				
				$("#lnbEduCourseType > li").eq(idx).addClass("on");
			}
			else {
				$("#lnbEduCourseUnit > li").each(function(){
					$(this).removeClass("on");
				});
				
				$("#lnbEduCourseUnit > li").eq(idx).addClass("on");	
			}
		}
	});
	$(".selectBox-R .selectBox-list > li").bind("click", function(){
		if($(this).attr('dataCnt') == "0"){
			return;
		}
		if(!$(this).hasClass('soon')){
			$(".selectBox-R .selectBox-list > li").each(function(){
				$(this).removeClass("on");
			});
			$(this).addClass("on");
			var txt = $(this).children("p.list-text").html();
		    $(".selectBox-R > p.list-text").html(txt);
		}
	});
	/*$(".selectBox-L .selectBox-list > li > p.list-text").bind("click", function(){
		var txt = $(this).html();
	    $(".selectBox-L > p.list-text").eq(0).html(txt);
	});
	$(".selectBox-R .selectBox-list > li > p.list-text").bind("click", function(){
		var txt = $(this).html();
		alert(txt);   
	    $(".selectBox-R > p.list-text").eq(0).html(txt);
	});*/
	
	//교과 목록 타입에 따른 페이징 영역 전체선택 기능 toggle
	//eduCourseListResize(getCourseListSizeType());
	
	$(".selectBox-L").click(function() {
		$(this).toggleClass( "selectBox-L-down", 500, "easeOutSine" );
		//$(this).toggleClass( "slideUp", 500, "easeOutSine" );
	});
	$(".selectBox-L-ES").click(function() {
		$(this).toggleClass( "selectBox-L-down-ES", 500, "easeOutSine" );
	});
	$(".selectBox-L-MS").click(function() {
		$(this).toggleClass( "selectBox-L-down-MS", 500, "easeOutSine" );
	});
	$(".selectBox-L-HS").click(function() {
		$(this).toggleClass( "selectBox-L-down-HS", 500, "easeOutSine" );
	});

	$(".selectBox-R").click(function() {
		if($(this).children("p.list-text").hasClass("non-subContents")){
			
		} else{
			$(this).toggleClass( "selectBox-R-down", 500, "easeOutSine" );
		}
	});


	$(".selectBox-L, .selectBox-R").click(function(){
		$(this).children(".box-selectBox-list").toggle();
	});



	//말풍선
	$(".toBubble-01").mouseover(function(){
		$(".speechBubble-01").show(100);
		$(".speechBubble-01").css("left",$(".descLine-2 h4 span").width()-48);
	}).mouseout(function(){
		$(".speechBubble-01").hide();
	});
	$(".toBubble-02").mouseover(function(){
		$(".speechBubble-02").show(100);
	}).mouseout(function(){
		$(".speechBubble-02").hide();
	});
	$(".toBubble-03").mouseover(function(){
		$(".speechBubble-03").show(100);
	}).mouseout(function(){
		$(".speechBubble-03").hide();
	});
	$(".toBubble-04").mouseover(function(){
		$(".speechBubble-04").show(100);
	}).mouseout(function(){
		$(".speechBubble-04").hide();
	});




	//스마트뷰 페이징
	$(".pagingSelect").bind("click", function(){
	    $(".pagingSelect ol").toggle();
	});
	$(".pagingSelect ol li a").bind("click", function(){
		var txt = $(this).html();
	    $(".pagingSelect span").html(txt);
	});

    
	//문제은행 클릭시
    $("#qbanklist").live("click",function(){
           if(LOGIN_ID == ''){
               alert('로그인이 필요한 서비스 입니다.');
               return;
           }else{
        	   //직유입 링크로 연결
               location.href = CONTEXTPATH+"/myclass/myBankList.do";
           }
    });
    
    
});
////////// ready end ///////////////////////////////////////////////////////////////////////////////////////////////////


//교과서 CD 다운로드  클릭시
function cdDownload(schoolLvlCd, textbookCd){
  //if(LOGIN_ID == ''){
  //    alert('로그인이 필요한 서비스 입니다.');
  //    return;
  //}else{
	popOpenFull(CONTEXTPATH+'/popup/downloadTextbookDVD.do?schoolLvlCd='+schoolLvlCd+'&subjectCd='+textbookCd, 984);
	//window.open(CONTEXTPATH+'/popup/downloadTextbookCD.do?schoolLvlCd='+schoolLvlCd+'&subjectCd='+textbookCd, '4', 'width=930, height=950,scrollbars=yes');
  //}
}

//초등 교과 lnb 제어
function lnbEleCourseView(obj, schoolYear, schoolTerm, courseCd) {
	/*var schoolYear = "";
	var courseCd = "";
		
	$(".eleCourseList li a").each(function(){
		if ($(this).hasClass("on")) {
			schoolYear = $(this).parent().attr("id");
			courseCd = $(this).parent().attr("class");	
		}
		
	});*/

	if (schoolYear != "" && schoolTerm != "" && courseCd != "") {
		location.href = "/educourse/eleIndex.do?schoolYear=" + schoolYear + "&schoolTerm=" + schoolTerm + "&courseCd=" + courseCd;	
	}
}

//중고등 교과 lnb 제어
function lnbCourseView(obj, gubun, code) {
	//교과자료
	var tidx = $(obj).index();

	//lnb의 li 아래 모든 이미지 off처리
	$(".tab-lnb li").each(function(){
		$(this).find("img").attr("src",$(this).find("img").attr("src").replace("on.png" , "off.png"));
	});
	$(obj).find("img").attr("src",$(obj).find("img").attr("src").replace("off.png" , "on.png"));

	//lnb의 모든 div 숨김
	$("#lnb > div").each(function(){
		$(this).css("display","none");
	});
	$("#lnb > div").eq(tidx).css("display","block");
}

//상세뷰 > 이전, 다음 이미지 버튼 노출 제어
function docBtnPrevNextControl(curPageNum, totPageNum) {
	$("#curDocPageNum").val(curPageNum);
	$(".pagingSelect span").html(curPageNum);
	
	//alert(curPageNum + " | " + totPageNum);
	if (curPageNum > 1 && totPageNum > 1) {
		if ($("#docPrev").css("display") == "none") {
			$("#docPrev").show();
		}
	}
	if (curPageNum < totPageNum) {
		if ($("#docNext").css("display") == "none") {
			$("#docNext").show();
		}
	}
	if (curPageNum == 1 && totPageNum > 1) {
		if ($("#docPrev").css("display") == "block") {
			$("#docPrev").hide();
		}
		if ($("#docNext").css("display") == "none") {
			$("#docNext").show();
		}
	}
	if (curPageNum == totPageNum) {
		if ($("#docNext").css("display") == "block") {
			$("#docNext").hide();
		}
	}
}

///////////////////////////////////////////////// 차시별 자료 /////////////////////////////////////////////////////////////
///////////////////////////////////////////////// 차시별 자료 /////////////////////////////////////////////////////////////
///////////////////////////////////////////////// 차시별 자료 /////////////////////////////////////////////////////////////

//차시별 자료 팝업
function periodPop(periodId, lnbCode) {

   	var availWidth = window.screen.availWidth;
    var availHeight = window.screen.availHeight-40;
    var browserLeftPos = window.screenLeft || window.screenX;
    var availLeft = window.screen.availLeft != undefined ? window.screen.availLeft : browserLeftPos > availWidth ? availWidth : 0;
    var availTop = window.screen.availTop != undefined ? window.screen.availTop : 0;
    
	// http 로 팝업 띄우게 고정
	var tempProtocol = window.location.protocol;
	var url = '';
	if(tempProtocol == 'http:'){
		url = '/period/periodPkgPop.do?periodId=' + periodId + '&lnbCode=' + lnbCode + '&resize=Y' + '&type=NES';
	}else{
		url = 'http://'+window.location.host+'/period/periodPkgPop.do?periodId=' + periodId + '&lnbCode=' + lnbCode + '&resize=Y' + '&type=NES';
	}
	
	var options = 'top='+availTop+',left='+availLeft+',width='+availWidth+',height='+availHeight+',screenX='+availLeft+',screenY='+availTop+',toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=1,scrolling=0,scrollbars=no';
		
	var periodPop = window.open(url, "periodPop", options);
	if (window.focus) {
		periodPop.focus();
	}
}

//차시별자료 (iPDF, HTML5 개별 뷰어)
function popViewer(contentGubun, contentId, lnbCode) {
   	var availWidth = window.screen.availWidth;
    var availHeight = window.screen.availHeight;
    var browserLeftPos = window.screenLeft || window.screenX;
    var availLeft = window.screen.availLeft != undefined ? window.screen.availLeft : browserLeftPos > availWidth ? availWidth : 0;
    var availTop = window.screen.availTop != undefined ? window.screen.availTop : 0;

		var url = '/period/popContentsViewer.do?contentGubun='+contentGubun+'&contentId='+contentId+'&lnbCode='+lnbCode;
		var options = 'top='+availTop+',left='+availLeft+',width='+availWidth+',height='+availHeight+',screenX='+availLeft+',screenY='+availTop+',toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=1,scrolling=0,scrollbars=no';
		
		var popViewer = window.open(url, "popViewer", options);
	if (window.focus) {
		popViewer.focus();
	}
}

//(차시별)문서 자료 다운, 담기 
function periodDocDownAndInsert(pId, loc, type){
	var obj = $("#period" + pId).find("input[name=checkPeriod]:checked" );
	var len = $(obj).length;
	var keyVal = "";
	
	if(len > 0){
		
	    // 선택한 컨텐츠의 키값 연결 
        $(obj).each(function(index){
        	
            if ( index == len-1 ) {
                keyVal += $(this).val();
            } else {
                keyVal += $(this).val()+",";
            }
            
        });
		
		if(type == "down"){
            go_DownloadFile("ID", keyVal);
		} else {
            viewFolder2015(keyVal, loc); 
		}
		
	} else {
		alert('자료를 먼저 선택해 주세요.');
	}

}

//단원별 자료 전체 다운로드 (여러개의 CID 자료 다운로드)
//fnSubClassDataDownAll('CN030-160974,CN030-160975,CN030-160976')
function fnSubClassDataDownAll(keyVal){
	if(keyVal == ''){
		return;
	}
	
	if("${LOGIN_ID}" == ''){
       	alert('로그인이 필요한 서비스입니다.');
       	location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
       	return;
  	}else{
  		// 교사 인증체크
		var loginChk = loginStateCheck("certify");
		if (loginChk == "fail") {
			return;
		}
  	}
	
	go_DownloadFile("ID", keyVal);
}






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// 개편 시점에 확인된 사용되는 스크립트 Functions 및 추가 Functions(위쪽) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 비바샘 활용가이드 링크 모두 삭제되어 사용 안함, 20180315, shimwb */
function viewEducourseGuide(subjectGrpCd) {
	if (subjectGrpCd != "") {
		
		//초등의 경우 파일 하나로 처리됨
		if (subjectGrpCd == "SC327" || subjectGrpCd == "SC328" || subjectGrpCd == "SC329") {
			subjectGrpCd = "SC326";
		}
		
		var url = "http://" + window.location.host + "/guide/educourseGuide/guide_" + subjectGrpCd + ".html";
		
		$.ajax({
	        type: "POST",
	        url: CONTEXTPATH+"/commonviewer/Doc_Convert.do",
	        cache: true,
	        async: true,
	        dataType: "html",
	        data: { url : url},
	        success: function(data){
	            var code = data.code;
	            var message = data.msg;
	            var result = data.result;
	            var html = "";
	            
	            if(data != ""){
                	
	            	//백그라운드 전체를 어둡게 처리
  	 				bgLayerH();
  	 				
                	$("#educourseGuide").html(data);
                	
                	/* 비바샘 활용가이드 닫기 활성화 */
                	$('#layerGuide .close').click(function() {
                		$('#bgLayer').hide();
                		$('#layerGuide').hide();		
                		
                		return false;
                	});
                	
                	/* 비바샘 활용가이드 인쇄 */
                	$(".printPre").on("click", function () {
                        var printWindow = window.open('', '', 'height=950,width=950');
                        printWindow.document.write('<html><head><title>비바샘 활용가이드</title>');
                        printWindow.document.write('</head>');          
                        printWindow.document.write('<body>');
                        printWindow.document.write($("#guidePrint").html());
                        printWindow.document.write('</body></html>');
                        printWindow.document.close();
                        printWindow.print();
                    });
                	
                	$("#educourseGuide").css("display", "block");
                }
	        },
	        error: function (xhr, ajaxOptions, thrownError){
	        	//     alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
	            vStatusFlag = false;
	        },
	        complete:function (xhr, textStatus){
	            // 교과서 조회 호출
	        	//           alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
	            vStatusFlag = false;
	        }
		});	
	}	
}

//영어교과의 대단원 명을 단어뜻으로 구분짓기 위해 만든 스크립트 2013-02-15 이홍
function getBrTitle(unit1Cd){
	var unitTitle ="";
	if( unit1Cd == '20100166' ){
		unitTitle ="See the Beauty<br/>&nbsp;&nbsp;&nbsp;Inside";
	}else if( unit1Cd == '20100168' ){
		unitTitle ="Put Yourself in Her<br/>&nbsp;&nbsp;&nbsp;Shoes ";
	}else if( unit1Cd == '20100169' ){
		unitTitle ="Are You a Smart<br/>&nbsp;&nbsp;&nbsp;Shopper?";
	}else if( unit1Cd == '20100171' ){
		unitTitle ="My First Visit to<br/>&nbsp;&nbsp;&nbsp;America";
	}else if( unit1Cd == '20100172' ){
		unitTitle ="You Can Be a<br/>&nbsp;&nbsp;&nbsp;Magician!";
    }else if( unit1Cd == '20100173' ){
        unitTitle ="Save Our<br/>&nbsp;&nbsp;&nbsp;Environment!";
    }else if( unit1Cd == '20100174' ){
        unitTitle ="What Are Friends<br/>&nbsp;&nbsp;&nbsp;For?";
	}else if( unit1Cd == '20100175' ){
		unitTitle ="Do You Believe <br/>&nbsp;&nbsp;&nbsp;Your Eyes?";
	}else if( unit1Cd == '20100178' ){
		unitTitle ="Do You Enjoy<br/>&nbsp;&nbsp;&nbsp;Chatting Online?";
	}else if( unit1Cd == '20100182' ){
		unitTitle ="Have You Heard of<br/>&nbsp;&nbsp;&nbsp;Boxing Day?";
	}else if( unit1Cd == '20100183' ){
		unitTitle ="Work Efficiently and<br/>&nbsp;&nbsp;&nbsp;Effectively";
	}else if( unit1Cd == '20100186' ){
		unitTitle ="Your Most<br/>Embarrassing Moment";
    }else if( unit1Cd == '20100192' ){
        unitTitle ="The Stuff Behind <br/>&nbsp;&nbsp;&nbsp;Stuff";
	}else if( unit1Cd == '20100193' ){
		unitTitle ="Art in Everyday<br/>&nbsp;&nbsp;&nbsp;Objects";
	}else if( unit1Cd == '20100376' ){
		unitTitle ="Are You a Book<br/>&nbsp;&nbsp;&nbsp;Lover?";
    }else if( unit1Cd == '20100373' ){
        unitTitle ="Let's Enjoy Our<br/>&nbsp;&nbsp;&nbsp;School Life";
    }else if( unit1Cd == '20100378' ){
        unitTitle ="Colors Are All <br/>&nbsp;&nbsp;&nbsp;Around Us";
    }else if( unit1Cd == '20100380' ){
        unitTitle ="What Do You Want<br/>&nbsp;&nbsp;&nbsp;to Be?";
	}else if( unit1Cd == '20100417' ){
        unitTitle ="Technology for a<br/>&nbsp;&nbsp;&nbsp;Better World";
    }else if( unit1Cd == '20100059' || unit1Cd == '20100048'){
        unitTitle ="문학 작품의 해석과<br/>비평";
    }else if( unit1Cd == '20100028' || unit1Cd == '20100039'){
        unitTitle ="우리의 생활을 바꾸는<br/>행동";
    }else if( unit1Cd == '20100347'){
        unitTitle ="생각과 마음을 나누는<br/>글";
    }else if( unit1Cd == '20100202'){
        unitTitle ="친구와 함께 그리는<br/>풍경";
    }else if( unit1Cd == '20100382'){
        unitTitle ="주변 환경과<br/>&nbsp;아름다움의 체험";
    }else if( unit1Cd == '20100386'){
        unitTitle ="느낌과 생각을<br/>&nbsp;자유롭게";
    }else if( unit1Cd == '20100206'){
        unitTitle ="오늘로 이어지는 한국<br/>문학";
    }else if( unit1Cd == '20100358'){
        unitTitle ="새로운 시각 새로운<br/>해법";
    }else if( unit1Cd == '20100359'){
        unitTitle ="언어를 알고 국어를<br/>보고";
    }else if( unit1Cd == '20100412'){
        unitTitle ="Ready to Start<br/>&nbsp;&nbsp;&nbsp;School?";
    }else if( unit1Cd == '20100413'){
        unitTitle ="Hobbies Bring You<br/>&nbsp;&nbsp;&nbsp;Joy";
    }else if( unit1Cd == '20100414'){
        unitTitle ="Any Room for<br/>&nbsp;&nbsp;&nbsp;Dessert?";
    }else if( unit1Cd == '20100422'){
        unitTitle ="Senses and<br/>&nbsp;&nbsp;&nbsp;Sensibilities";
    }else if( unit1Cd == '20100423'){
        unitTitle ="Mysteries of the<br/>&nbsp;&nbsp;&nbsp;World";
    }else if( unit1Cd == '20100424'){
        unitTitle ="Share and Live<br/>&nbsp;&nbsp;&nbsp;Better";
    }else if( unit1Cd == '20100425'){
        unitTitle ="The Uniqueness of<br/>&nbsp;&nbsp;&nbsp;Diverse Cultures";
    }else if( unit1Cd == '20100426'){
        unitTitle ="Looking for Green<br/>&nbsp;&nbsp;&nbsp;Energy";
    }else if( unit1Cd == '20100543'){
        unitTitle ="Love Makes the<br/>&nbsp;&nbsp;&nbsp;World Beautiful";
    }else if( unit1Cd == '20100544'){
        unitTitle ="How Did Ancient<br/>&nbsp;&nbsp;&nbsp;People Live?";    
    }else if( unit1Cd == '20100545'){
        unitTitle ="Interesting English<br/>&nbsp;&nbsp;&nbsp;Expressions";
    }else if( unit1Cd == '20100548'){
        unitTitle ="Food Around the<br/>&nbsp;&nbsp;&nbsp;World";
    }else if( unit1Cd == '20100551'){
        unitTitle ="The Challenges of<br/>&nbsp;&nbsp;&nbsp;Artists";
    }else if( unit1Cd == '20100637'){
        unitTitle ="How Special You<br/>&nbsp;&nbsp;&nbsp;Are!";
    }else if( unit1Cd == '20100638'){
        unitTitle ="The Green<br/>&nbsp;&nbsp;&nbsp;Movement";
    }else if( unit1Cd == '20100639'){
        unitTitle ="The Wonder of<br/>&nbsp;&nbsp;&nbsp;Animals";
    }else if( unit1Cd == '20100641'){
        unitTitle ="I Don’t Agree with<br/>&nbsp;&nbsp;&nbsp;You!";
    }else if( unit1Cd == '20100644'){
        unitTitle ="Symbols Around the<br/>&nbsp;&nbsp;&nbsp;World";
    }else if( unit1Cd == '20100645'){
        unitTitle ="Space: The<br/>&nbsp;&nbsp;&nbsp;Unknown World";
    }else if( unit1Cd == '20100646'){
        unitTitle ="The Beauty of<br/>&nbsp;&nbsp;&nbsp;Korean Culture";
    }


	return unitTitle ;
}

/*
* 교과서별로 대단원의 인덱스 값을 다르게 표현함.
*/
function getIndexType(textbook){
	// type = 1 : 로마자(기존형태)
	// type = 2 : 아라비아숫자
	// type = 3 : L01 형태
	// type = 4 : 01 형태
    var idx = "";

    switch (textbook){

        case '106048' : idx = '2';
        break;
        case '106054' : idx = '2';
        break;
        case '106060' : idx = '2';
        break;
        case '106005' : idx = '2';
        break;
        case '106006' : idx = '2';
        break;
        case '106007' : idx = '2';
        break;
        case '106008' : idx = '2';
        break;
        case '106009' : idx = '2';
        break;
        case '106010' : idx = '2';
        break;
        case '106011' : idx = '2';
        break;
        case '106012' : idx = '2';
        break;
        case '106029' : idx = '2';
        break;
        case '106030' : idx = '2';
        break;
        case '106049' : idx = '2';
        break;
        case '106055' : idx = '2';
        break;
        case '106061' : idx = '2';
        break;
        case '106066' : idx = '3';
        break;
        case '106014' : idx = '3';
        break;
        case '106085' : idx = '3';//고등영어 홍민표1
        break;
        case '106086' : idx = '3';//고등영어 홍민표2
        break;
        case '106015' : idx = '3';
        break;
        case '106067' : idx = '3';
        break;
        case '106082' : idx = '4';
        break;
        case '106050' : idx = '2';	//국어 ③(김태철)
        break;
        case '106056' : idx = '2'; //국어 ③(한철우)
        break;
        case '106062' : idx = '2'; //국어 ③(이관규)
        break;
        default       :  idx = '1';
    }

   return idx;
}

// 정오표 팝업 열기 
function getJungO(pId){
	 if(LOGIN_ID == ''){
		 alert('로그인이 필요한 서비스 입니다.');
		 return;
	 }else{
		 contentViewPop('CN030', pId, 'J');
	 }
}

//초중고 교과자료 lnb menu click 
function goEducourseMain(lnbType,lnbCode, textbookCd, schType, searchWord){
	if(typeof searchWord == 'undefined'){
		searchWord = '';
	}
    location.href= CONTEXTPATH+"/educourse/educourseMain.do?textbookCd="+textbookCd+"&schType="+schType+"&lnbType="+lnbType+"&lnbCode="+lnbCode+"&searchWord="+searchWord;
}

function changeSubject(subject, subjectnm, schType){

    $("#p_subjectnm").text(subjectnm);
    $("#p_textbooknm").text(":::   선택하세요   :::");
    
    _getTextbookList(subject, schType, '');
}    

function changeTextbook(textbookcd, schType){

    var url = CONTEXTPATH+"/educourse/educourseMain.do?textbookCd="+textbookcd+"&schType="+schType;
    location.href = url;
}

function _getTextbookList(subjectGrpCd, schType, mdValue){
    $.ajax({
        type: "POST",
        url: CONTEXTPATH+"/courseinfo/getTextbookListbyGrpCd.do",
        cache: true,
        async: true,
        dataType: "json",
        data: { subjectGrpCd : subjectGrpCd , mdValue: '', vivasamformat : "json" },
        success: function(data){
            var code = data.code;
            var message = data.msg;
            var result = data.result;
            var html ="";

            for(var i =0 ; i < result.length; i++){
                if(mdValue == result[i].subjectnm){
                    //html += "<li onclick=\"\" >"+result[i].subjectnm+"</li>";
                }else{
                    html += "<li onclick=\"changeTextbook('"+result[i].textbook+"', '"+schType+"')\" >"+result[i].textbooknm+"</li>";
                }
            }

            $("#sel_textbook").html(html);

        },
        error: function (xhr, ajaxOptions, thrownError){
       //     alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
            vStatusFlag = false;
        },
        complete:function (xhr, textStatus){
            // 교과서 조회 호출
 //           alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
            vStatusFlag = false;
        }
        });
}
  

//문서 뷰어 호출 (미리보기)
function callDocViewer(CID, title){
	if(LOGIN_ID == ''){
        alert('로그인이 필요한 서비스입니다.');
        return;
    }
	
	var url = CONTEXTPATH + "/commonviewer/mobile_pop_viewer_text.do?docPath=CID|" + CID + "&title=" + encodeURIComponent(title); 
	
	window.open(url, "DocViewer","scrollbars=yes,toolbar=0,location=no,resizable=1,status=0,menubar=0,width=930,height=950,left=0,top=0");
}

// 차시자료 - 보조교과서 오픈(국어활동,수학익힘,실험관찰)
function goSubDataChkLogin(targetUrl) {
	// 로그인 체크
	if(LOGIN_ID == ''){
       	alert('로그인이 필요한 서비스입니다.');
       	location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
       	return false;
  	}
	var win = window.open(targetUrl);
	return false;
}

function openEducourseAllDownPopup(textbookNm, textbookCd) {
	//이미 가져왔으면 팝업 보여지고 해당 함수 종료
	if($('.down_wrap .down_li_last .down_list2020_dim .down_list2020_wrap .down_list2020 div').length > 0) {
		$('.down_wrap .down_li_last .down_list2020_dim').css('display', 'block');
		return;
	}
	var param = {
		textbookNm : textbookNm,
		textbookCd : textbookCd
	}

	$.ajax({
		type: "POST",
		url: "/educourse/openEducourseAllDownPopupAjax.do",
		cache: false,
		async: true,
		dataType: "html",
		data: param,
		success: function(html){
			$('.down_wrap .down_li_last .down_list2020_dim .down_list2020_wrap .down_list2020').append(html);
			$('.down_wrap .down_li_last .down_list2020_dim').css('display', 'block');
		},
		error: function (xhr, ajaxOptions, thrownError){
		},
		complete:function (xhr, textStatus){
		}
	});
}

//유형분류 직유입시 사용
function goEducourseByContGroup() {
	var _this = $('[data-code="' + contGroup + '"]');
	var target = _this.attr("href");
	var data = _this.data();
	var type2CdList = [];

	if(contGroup2.indexOf('[')>=0) {
		var tmpContGroup2 = contGroup2.replace(/\[|\]| /g, '');
		type2CdList = tmpContGroup2.split(',');
		goEducourseDataListPrintForMultiType2(textbookCd, lnbCode, (firstCbcInfoGubunCd == 'T' ? '0' : educourseId), contGroup, type2CdList, firstCbcInfoGubunCd, 1, pageSize, "P", "html");
	} else {
		goEducourseDataListPrint(textbookCd, lnbCode, (firstCbcInfoGubunCd == 'T' ? '0' : educourseId), contGroup, contGroup2, firstCbcInfoGubunCd, 1, pageSize, "P", "html");
	}

	if (!data.load) {
		data.load = true;
	}

	// 리스트 영역 노출/숨김 처리
	$('#conts').find('div.group').hide();
	$(target).show();

	$('.tab_educourse').find('li').removeClass('on');
	_this.parent('li').addClass('on');
	return false;
}

//페이지 이동없이 유형분류1 & 유형분류2 선택시 URL 생성
function setUrlByContGroup(type1Cd, type2Cd) {
	var query = window.location.search;
	var param = new URLSearchParams(query);
	var url = window.location.href.split("?")[0];
	var contGroup1 = $('[data-code="' + type1Cd + '"]').closest('li').index() + 1;

	if(param.has("contGroup")) {
		param.set("contGroup", contGroup1);
	} else {
		param.append("contGroup", contGroup1);
	}

	if(typeof type2Cd === 'string') {
		var contGroup2 = $('input[value="'+type2Cd+'"]').closest('li').index();

		if(contGroup2 > 0) {
			if(param.has("contGroup2")) {
				param.set("contGroup2", contGroup2);
			} else {
				param.append("contGroup2", contGroup2);
			}
		} else {
			param.delete("contGroup2");
		}

	} else {
		var contGroup2 = [];
		type2Cd.map(function(element) {
			contGroup2.push($('input[value="'+element+'"]').closest('li').index());
		})
		if(contGroup2.length > 0) {
			if(param.has("contGroup2")) {
				param.set("contGroup2", contGroup2);
			} else {
				param.append("contGroup2", contGroup2);
			}
		} else {
			param.delete("contGroup2");
		}

	}


	history.pushState({}, null, url + "?" + param.toString());
}

//탭이동시 유형분류1,2 직유입 url 삭제
function deleteUrlQueryString() {
	var query = window.location.search;
	var param = new URLSearchParams(query);
	var url = window.location.href.split("?")[0];

	param.delete("contGroup");
	param.delete("contGroup2");

	history.pushState({}, null, url + "?" + param.toString());
}

/*
유형분류2탭 다중선택 클릭용 함수
23.03.02 수정 songth - 유형분류2가 모두 선택 해제되는 시점에는 '전체'가 클릭 되도록 수정
 */
function clickMultiType2(target, targetId, lnbCode, class2Cd, type1Cd, type2Cd, gubunCd, pageNo, pageSize, pageMove, returnType) {

	$('html, body').animate({scrollTop: 325},300)

	var $this = $(target);
	var $thisInput = $this.find('input:checkbox');
	var $all = $(target).closest('ul').find(' .type2_all input:checkbox');
	var $eachArr = $(target).closest('ul').find('.type2_each input:checkbox');

	console.log($thisInput.attr('id'))
	console.log($thisInput.prop('checked'))

	if($this.index() === 0) {
		//전체 버튼인 경우
		if($thisInput.prop('checked')) {
			return;
		} else {
			$thisInput.prop('checked', true);
			//나머지 버튼은 on 해제
			$eachArr.prop('checked', false);
		}
		//나머지 버튼인 경우
	} else {
		if($thisInput.prop('checked')) {
			$thisInput.prop('checked', false);
			if($(target).closest('ul').find('.type2_each input:checkbox:checked').length < 1) {
				$all.prop('checked', true);
			}
		} else {
			$thisInput.prop('checked', true);
			//전체 버튼은 on 해제
			if($all.prop('checked')){
				$all.prop('checked', false);
			}
		}
	}
	type2Cd = [];
	$eachArr.map(function() {
		if(this.checked) {
			type2Cd.push(this.value);
		}
	})
	if($(target).closest('ul').find('.type2_each input:checkbox:checked').length < 1) {
		goEducourseDataListPrint(targetId, lnbCode, class2Cd, type1Cd, "0", gubunCd, pageNo, pageSize, pageMove, returnType);
	} else {
		goEducourseDataListPrintForMultiType2(targetId, lnbCode, class2Cd, type1Cd, type2Cd, gubunCd, pageNo, pageSize, pageMove, returnType);
	}


}
