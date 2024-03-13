var MainGoLink = {
	rnd : null,
	init : function(login) {
		if(!login) {
			this.random();
			$('#main .link ul.go1 > li').eq(this.rnd[0]).addClass('on');
			$('#main .link ul.go1 > li.on > a').addClass('on');
			$('#main .link ul li.on ul.go2 > li').eq(this.rnd[1]).addClass('on');
			$('#main .link ul li.on ul.go2 > li.on > a').addClass('on');
			//$('#main .link ul li.on ul.go2 > li.on ul li:first-child a').addClass('on');
		}

		$('#main .link ul.go1 > li > a, #main .link ul.go2 > li > a').bind('click', MainGoLink.menu);
	},
	random : function() {
		var sub1 = Math.floor(Math.random() * 3);
		var sub2 = Math.floor(Math.random() * 5);

		this.rnd = [sub1, sub2];
	},
	menu : function() {
		$(this).parent().parent().find('li, a').removeClass('on');
		$(this).parent().addClass('on');
		$(this).addClass('on');
		//$(this).parent().find('ul li:first-child, ul li:first-child a').addClass('on');

		return false;
	}
};

$(function() {
	$('.resultWrap td.tooltip').mouseover(function() {
		$(this).addClass('on');
	})
	.mouseout(function() {
		$(this).removeClass('on');
	});
	
	$('.menu li > a').click(function(e) {
		var li = $(this).parent();
		var slt = $($(this).parent().has('div')).length;

		if( slt != 0 && li.find('.sub').attr('class').indexOf('on') == -1 ) {
			$('.menu ul li .sub').removeClass('on');
			li.find('.sub').addClass('on');
			$('#headerWrap .subBg').show();
		}else {
			$('.menu ul li .sub').removeClass('on');
			$('#headerWrap .subBg').hide();
		}

		return false;
	});
	$('.menu .close').click(function(e) {
		$('.menu ul li .sub').removeClass('on');
		$('#headerWrap .subBg').hide();
		e.stopPropagation();

		return false;
	});

	$('.imgList .thumb').click(function() {
		var h = $('#contents').height() + 310;
		var bg = $('<div id="layerBg" style="height:' + h + 'px;"></div>');

		//현재 선택된 이미지 index
		curNum = $("img", this).attr("class");
		
		//선택된 이미지 정보를 레이어 팝업에 반영
		getImgViewInfo(curNum);
		
		$('body').append(bg);
		
		return false;
	});

	$('.layerPop .close').click( function() {
		$('.layerPop').hide();
		$('#layerBg').remove();
		return false;
	});

	$('.layerPop .image .prev').click( function() {
		//이전 이미지자료 조회하여 레이어에 정보 셋팅
		getPrevNextImgViewInfo(curNum, "P");
		
		return false;
	});
	$('.layerPop .image .next').click( function() {
		//다음 이미지자료 조회하여 레이어에 정보 셋팅
		getPrevNextImgViewInfo(curNum, "N");
		
		return false;
	});
});

var curNum = "", curDataFlag = "", curThumbFileUrl = "", curBoardCd = "", curDataType = "";
function getImgViewInfo(num) {
	if (num != "") {
		$('.layerPop').spin('main');
		
		$.post(CONTEXTPATH + "/library/textbookImageInfo.do ",
                {number : num, vivasamformat : "json", contentType: "application/json; charset=utf-8"},
                function(data){
                    var html = '';
                    if(data.code == "0000"){
                    	//var item = data.result;
                    	//alert(num + " | " + data.number);
                        if(num == data.number){
                        	curBoardCd = data.fkBoard;
                        	curDataType = data.fkDataType;
                        	curDataFlag = data.d_Flag;
                        	curThumbFileUrl = data.fileName;
                        	curThumbTitle = data.thumbName.substring(data.thumbName.lastIndexOf("/")+1, data.thumbName.length);
                        	//alert(data.thumbName + " | " + curThumbTitle);
                        	
                        	//이미지 사이즈 노출을 위한 처리
                        	var imgObj = new Image();
                        	$(imgObj).load(function() {
                        		//console.log(this.width);
                        		$(".layerPop .l").html("사이즈 : <span>" + this.width + "(w) * " + this.height + "(h)</span>");
                        	});
                        	
                        	if (data.d_Flag == "T") {
                        		$("#curImgSrc").attr("src", "http://visangtextdn.x-cdn.com" + data.fileName); //화면에 보여주는 처리
                        		imgObj.src= "http://visangtextdn.x-cdn.com" + data.fileName; //화면 노출은 안되고 이미지 객체의 로딩용으로만 쓰임
                        	}
                        	else {
                        		$("#curImgSrc").attr("src", "http://www.visang.com/upload" + data.fileName);
                        		imgObj.src= "http://www.visang.com/upload" + data.fileName;
                        	}
                        	
                        	if(data.grades != "" || data.brand != "" || data.unit != "") {
                        		var str = "";
                        		if (data.grades != "")
                        			str = data.grades + " ";
                        		if (data.brand != "")
                        			str += data.brand;
                        		if (data.unit != "") {
                        			if (str != "")
                        				str += " > " + data.unit;
                        			else
                        				str += data.unit;
                        		}	
                        		
                        		$("#curImgUnit").text(str);
                        	}
                        	$(".layerPop .tit").text(data.d_Title);
                        	$(".layerPop .r").html("자료년도 : <span>" + data.d_Year + "년</span>");
                        	
                        	$('.layerPop').show().css({top: $(window).scrollTop() + ($(window).height()/2 - 276)}); //레이어가 현재 화면에 중앙에 항상 보이도록 설정
                        }else{
                        }
                    }else{
                        alert("정보를 조회하지 못했습니다.\n잠시후 다시 이용해 주세요");
                        return;
                    }
                    
                    $('.layerPop').data().spinner.stop();
                },
                "json"
        );
	}
}

//이전, 다음 이미지자료 처리
function getPrevNextImgViewInfo(num, gubun) {
	var ol = $(this).parent().find('ol');
	var li = $(this).parent().find('li:eq(0)');
	
	if (num != "" && gubun != "") {
		$('.layerPop').spin('main');
		
		$.post(CONTEXTPATH + "/library/textbookPrevNextImageInfo.do ",
                {number : num, 
				 gubun : gubun, 
				 boardCode : curBoardCode,
				 schoolCode : curSchoolCode,
				 subjectCode : curSubjectCode,				 
				 brandCode : curBrandCode,
				 unitCode : curUnitCode,
				 dataYear : curDataYear,
				 searchWord : curSearchWord,
				 vivasamformat : "json", 
				 contentType: "application/json; charset=utf-8"},
                function(data){
                    var html = '';
                    //alert(data.code);
                    if(data.code == "0000"){
                    	//alert(num + " | " + gubun + " : " + data.number);
                        if(data.number != ""){
                        	curBoardCd = data.fkBoard;
                        	curDataType = data.fkDataType;
                        	curNum = data.number;
                        	curDataFlag = data.d_Flag;
                        	curThumbFileUrl = data.fileName;
                        	curThumbTitle = data.thumbName.substring(data.thumbName.lastIndexOf("/")+1, data.thumbName.length);
                        	//alert(data.thumbName + " | " + curThumbTitle);
                        	
                        	//이미지 사이즈 노출을 위한 처리
                        	var imgObj = new Image();
                        	$(imgObj).load(function() {
                        		//console.log(this.width);
                        		$(".layerPop .l").html("사이즈 : <span>" + this.width + "(w) * " + this.height + "(h)</span>");
                        	});
                        	
                        	if (data.d_Flag == "T") {
                        		$("#curImgSrc").attr("src", "http://visangtextdn.x-cdn.com" + data.fileName); //화면에 보여주는 처리
                        		imgObj.src= "http://visangtextdn.x-cdn.com" + data.fileName; //화면 노출은 안되고 사이즈를 얻기 위해 이미지 객체의 로딩용으로만 쓰임
                        	}
                        	else {
                        		$("#curImgSrc").attr("src", "http://www.visang.com/upload" + data.fileName);
                        		imgObj.src= "http://www.visang.com/upload" + data.fileName;
                        	}
                        	
                        	if(data.grades != "" || data.brand != "" || data.unit != "") {
                        		var str = "";
                        		if (data.grades != "")
                        			str = data.grades + " ";
                        		if (data.brand != "")
                        			str += data.brand;
                        		if (data.unit != "") {
                        			if (str != "")
                        				str += " > " + data.unit;
                        			else
                        				str += data.unit;
                        		}	
                        		
                        		$("#curImgUnit").text(str);
                        	}
                        	$(".layerPop .tit").text(data.d_Title);
                        	$(".layerPop .r").html("자료년도 : <span>" + data.d_Year + "년</span>");
                        	
                    		if (gubun == "P") {
                    			ol.css({'left': '-520px'});
                        		ol.animate({ left: '+=520px'});	
                        	}
                        	else {
                        		ol.css({'left': '520px'});
                        		ol.animate({ left: '-=520px'});
                        	}
                        }else{
                        }
                    }else{
                    	if (gubun == "P") {
                    		alert("처음 이미지 자료입니다.");	
                    	}
                    	else {
                    		alert("마지막 이미지 자료입니다.");
                    	}
                    }
                    
                    $('.layerPop').data().spinner.stop();
                },
                "json"
        );
	}
}

//교재자료실 메뉴 이동
function goMenu(gubun, brdCd, schCd, sbjtCd) {
	if (gubun == "T") {
		location.href = CONTEXTPATH + "/library/textbookList.do?boardCode=" + brdCd + "&schoolCode=" + schCd + "&subjectCode=" + sbjtCd;    		
	}
	else if (gubun == "L") {
		location.href = CONTEXTPATH + "/library/lectureList.do?boardCode=" + brdCd + "&schoolCode=" + schCd + "&subjectCode=" + sbjtCd;
	}
	else if (gubun == "I") {
		location.href = CONTEXTPATH + "/library/imageList.do?boardCode=" + brdCd + "&schoolCode=" + schCd + "&subjectCode=" + sbjtCd;
	}    	
}

//교재자료, 강의추가자료 다운로드(비바샘 다운로드 처리 방식)
function dn(filename, saveFilenname, flag, brdCd, number, dataType) {
    if (LOGIN_ID == "") {
    	alert("비바샘 회원에게 제공되는 서비스입니다.\n로그인 후 이용해주세요");
    }
    else {
    	
    	// URL encoding
	   	 var ff = saveFilenname.split("/");
		 var chff =  encodeURIComponent( ff[ff.length-1]);
		 saveFilenname = saveFilenname.replace(ff[ff.length-1],chff);
		 
    	
    	if (flag == "T") {
    		fileUrl = "http://visangtextdn.x-cdn.com" + saveFilenname;
    	}
    	else {
    		fileUrl = "http://www.vivasam.com/VisangUpload" + saveFilenname;
    	}
    	
    	//alert(fileUrl);
    	
    	if (brdCd != "" && number != "" && dataType != "") {
    		fileDownLog(brdCd, number, dataType);//다운로드 로그 쌓기	
    	}    	
    	
    	go_DownloadFile('url', fileUrl);
    }
}

//비상 사이트 다운로드 로직
function dn2(filename, saveFilenname, flag, brdCd, number, dataType) {
    if (LOGIN_ID == "") {
    	alert("비바샘 회원에게 제공되는 서비스입니다.\n로그인 후 이용해주세요");
    }
    else {
    	var fileUrl;
    	//uptDownCnt(number, dataType); 로그 처리해야 함
    	dnURL = "http://www.visang.com/book/Common/FileDownload.aspx?fn=" + escape(saveFilenname) + "&sn=" + escape(filename) + "&fd=&ft=&seq=";
    	location.href = dnURL;
    }
}

//이미지자료 다운로드
function fnDnImg() {            
	if (LOGIN_ID == "") {
    	alert("비바샘 회원에게 제공되는 서비스입니다.\n로그인 후 이용해주세요");
    }
    else  {
        var dnURL, fileUrl;
        
        
        
        
    	
    	// URL encoding
	   	 var ff = curThumbFileUrl.split("/");
		 var chff =  encodeURIComponent( ff[ff.length-1]);
		 curThumbFileUrl = curThumbFileUrl.replace(ff[ff.length-1],chff);
		 
		 
        if (curDataFlag == "T") {        	
            dnURL = "http://www.visang.com/book/Common/FileDownload3.aspx?fn=http://visangtextdn.x-cdn.com" + curThumbFileUrl + "&sn=" + curThumbTitle + "&fd=&ft=&seq=";
            fileUrl = "http://visangtextdn.x-cdn.com" + curThumbFileUrl;
        } else {
            dnURL = "http://www.visang.com/book/Common/FileDownload2.aspx?fn=http://www.visang.com/upload" + curThumbFileUrl + "&sn=" + curThumbTitle + "&fd=&ft=&seq=";
            fileUrl = "http://www.visang.com/upload" + curThumbFileUrl;
        }
        //alert(dnURL);
        //location.href = dnURL;
        
        if (curBoardCd != "" && curNum != "" && curDataType != "") {
        	fileDownLog(curBoardCd, curNum, curDataType);//다운로드 로그 쌓기(세션이 끊기 상태에서 다운로드한 경우 다운로드 로그는 쌓이지 않도록 수정, 20160322, 심원보)
        }
        
        go_DownloadFile('url', fileUrl);
    }
}

function fileDownLog(brdCd, number, dataType) {
	$.post(CONTEXTPATH + "/library/LibraryFileDownLog.do ",
            {boardCode : brdCd, 
			 number : number, 
			 dataTypeCode : dataType,
			 vivasamformat : "json", 
			 contentType: "application/json; charset=utf-8"},
            function(data){
                var html = '';
                //alert(data.code);
                if(data.code == "0000"){
                    
                }else{
                }
            },
            "json"
    );
}

//부록CD 팝업
function cdPopup(linkUrl) {
	var width   = 1044;
    var height  = 855;
    var left    = (screen.width  - width)/2;
    var top    = (screen.height - height)/2;
    
    if (linkUrl != "") {
    	//http를 담고 있지 않으면 추가해준다.
		if(linkUrl.indexOf("http") == -1){
			linkUrl = "http://" + linkUrl;
		}
    	
    	window.open(linkUrl, "cdPopup", "left="+left+",top="+top+",width="+width+", height="+height+",scrollbars=yes,toolbar=no,resizable=yes,location=no");
    }
}