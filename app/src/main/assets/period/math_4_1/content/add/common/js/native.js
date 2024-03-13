//인터페이스 기본
var main = {};function command(command, url, callback){var json={command:command,url:btoa(url), callback:callback};window.external.callviewer(JSON.stringify(json));}main.callviewer = command;
function strcallback(value){
	console.log(value);
}

//전체화면 변경 시 이벤트
$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e)
{
	console.log("window width : " + window.innerWidth);
	console.log("screen width : " + screen.width);
	console.log("window width : " + window.innerHeight);
	console.log("screen width : " + screen.height);
    //do something;
	if((window.fullScreen) ||
	   (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
		setFullscreen(true);
	} else {
		setFullscreen(false);
	}
});
function setFullscreen(value){
	command('fullScreen', value, '');
}

//차시 타이틀 세팅
function setTitleHeader(value){
	$("#ifHeader").contents().find(".title").html(decodeURIComponent(value));
}

//페이지구성 변경으로 인해 얘는 이제 안쓴다..
function setTitle(value){
	$(".title").html(decodeURIComponent(value));
}

//페이지넘버 세팅
function setPage(curpage, lastpage, tocIndex, tocSubIndex){
		if(curpage == 1) {
		$("#left").prop("disabled", true);
	}
	else
		$("#left").prop("disabled", false);
	if(curpage == lastpage){
		$("#right").prop("disabled", true);
	}
	else
		$("#right").prop("disabled", false);
	$("#curPage").text(curpage);
	$("#totalPage").text(lastpage);
	$(".tocItem").removeClass("on");
	$($(".tocItem")[tocIndex]).addClass("on");
}

//컨텐츠영역 iframe 로딩
function setContent(value){
	var data = JSON.parse(decodeString(value));
	if(data.PDFPage.length == 1){
		$("#ifHeader").contents().find("#ebookpage").text(data.PDFPage[0]);
	}
	else if(data.PDFPage.length > 1){
		$("#ifHeader").contents().find("#ebookpage").text(data.PDFPage[0] + "~" + data.PDFPage[data.PDFPage.length - 1] );
	}
	
	//깜빡임을 줄이기 위해..
	var frame = $('#ifContent').clone();
	$(frame).css('visibility', "hidden");
	$(frame).attr("id", "ifContent_copy");
	$("body").append(frame);
	$(frame).on("load", function(){
		$(this).css('visibility', "");
		$('#ifContent').remove();
		$(this).attr('id', "ifContent");
	});
$(frame).attr('src', data.url);


	
}

function decodeString(str){

	if(str.indexOf("+") > 0){
		return decodeURIComponent(decodeURI(str).replace(/\+/g, " "));
	} else {
		return decodeURIComponent(decodeURI(str));
	}
}

//섹션 버튼 생성
function setToc(value){
console.log(value);
var val = decodeString(value);
var data = JSON.parse(val);
var html = "";


         
		 
	for(var i=0;i<data.length;++i){
		html += '<button type="button" class="tocItem " id="' +data[i].Page +'"><div class="btnTop"></div><div style="display:flex;width:max-content;"><div class="btnLeft"></div><div class="btnContent"><span>'+data[i].Text+'</span></div><div class="btnRight"></div></div></button>';
	}

	var winsize = $("#footer").outerWidth() - $("#toc").outerWidth(true) - $("#menu").outerWidth() - $(".tocLeft").outerWidth() - $(".tocRight").outerWidth() - 30;

	$(".tocWindow").css("max-width", winsize  + "px");

	$(".tocTable").html(html);
	$(".tocItem").on('click', function(){
		command('page', this.id, '');
	});
	setEventTocItem();

}
var position=0; //tocTable x좌표
var positionDiff = 150; //한번에 이동하는 위치
var tocAniTime = 200; //슬라이드 애니메이션 타임
//섹션 이동
function prevToc(){

	if(position>=0){
		$(".tocBtnLeft").prop("disabled", true);
		return;
	}
	var startposition = position;
	position += positionDiff;
	if(position>=0)
		position = 0;
	var target = document.querySelector('.tocTable');


	target.animate([
	  {"transform": 'translateX('+startposition+'px)'},
	  {"transform": 'translateX('+position+'px)'}
	], tocAniTime);

	$(".tocTable").css("transform",  "translateX(" + position +"px)" );
	if(position >= 0){
		$(".tocBtnLeft").prop("disabled", true);
	}else{
		$(".tocBtnLeft").prop("disabled", false);
	}
	$(".tocBtnRight").prop("disabled", false);
}
function nextToc(){
	var width = $(".tocTable").get(0).scrollWidth -$(".tocWindow").width() ;
	if(position-positionDiff<=-width){
	$(".tocBtnRight").prop("disabled", true);
		return;
	}
	var startposition = position;
	position -=positionDiff;
	if(position<-width)
		position = -width;
	var target = document.querySelector('.tocTable');


	target.animate([
	  {"transform": 'translateX('+startposition+'px)'},
	  {"transform": 'translateX('+position+'px)'}
	], tocAniTime);


	$(".tocTable").css("transform" , "translateX(" + position +"px)" );
	if(position<=-width){
		$(".tocBtnRight").prop("disabled", true);
	}
	else
		$(".tocBtnRight").prop("disabled", false);
	$(".tocBtnLeft").prop("disabled", false);
}


//섹션버튼에 이벤트 걸기
function setEventTocItem(){
	$(".tocItem").on("click", function(){
		$(".tocItem").removeClass("on");
		$(this).addClass("on");
	});

	$(".tocTable").on("resize", function(){
		setTOCBtnState();
	});
	$(window).on("resize", function(){
		setTOCBtnState();
	});
	setTOCBtnState();
}

//섹션 좌우버튼의 enable/disable 상태 계산
function setTOCBtnState(){
	var winsize = $("#footer").outerWidth() - $("#toc").outerWidth(true) - $("#menu").outerWidth() - $(".tocLeft").outerWidth() - $(".tocRight").outerWidth() - 30;

	$(".tocWindow").css("max-width", winsize  + "px");

	numberPattern = /-?\d+\.?\d*/g;



	if(position == 0)
		$(".tocBtnLeft").prop("disabled", true);
	else 
		$(".tocBtnLeft").prop("disabled", false);
	var width = $(".tocWindow").css("max-width").replace("px", "");
	if(width - ($(".tocTable").outerWidth() +position) > 0) 
	
	{
		var dif = width - ($(".tocTable").outerWidth() +position);
		position += dif;
		if(position > 0)
			position = 0;
		$(".tocTable").css("transform",  "translateX(" + position +"px)" );
		$(".tocBtnRight").prop("disabled", true);
	}
	//
	else
		$(".tocBtnRight").prop("disabled", false);

}