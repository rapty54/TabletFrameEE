var timerID=0;

$(document).ready(function() {
	// 작가별 찾기 클릭 방지
	$(".search_list.author li a").click(function() {return false;})
	
	//작가 ID가 있는 경우만 처리됨(작가별 상세 정보 페이지에서 사용됨)
    if (curWriterId && curWriterId != "") {
		//작가별 LNB 메뉴 셋팅
		// setLnbMenu(curWriterId, curLnbMenuCd);	
    }
	// gnb 링크 정의
	$("#gnb_literature li a").on('click' , function(e){
		var targetId = $(this).attr("id");
		if(targetId && targetId != ""){
			if(targetId.indexOf('period') > -1){
				location.href = '/munhak/sub/'+targetId+'.do';
			}else{
				return false;
				location.href = '/munhak/sub/writerInfoView.do?writerId='+targetId;
			}
		}
	});
	
	$('#'+curWriterId).addClass("on")
	
	// 서브메인 
	$(".writer_list li a").on('click' , function(e){
		var targetId = $(this).attr("id");
		if(targetId && targetId != ""){
			return false;
			location.href = '/munhak/sub/writerInfoView.do?writerId='+targetId;
		}
	});
	
	// search_tap
	$("#search_tap li a").on('click' , function(e){
		// 모든탭 class 초기화
		$("#search_tap > li").each(function(i){
        	$(this).removeClass("on");
    	});
		// 선택한 탭 class 추가
		$(this).parent().addClass("on");
		
		// 작품리스트 숨김
		$("#tap_work_list > ul").each(function(i){
        	$(this).hide();
    	});
		
		// 해당 작품리스트 보여주기
		var targetId = $(this).attr("targetId");
		$('#'+targetId).show();
	});
}); 

//작가별 LNB 메뉴 셋팅, ajax로 처리 예정
function setLnbMenu(writerId, lnbMenuCd) {
	var menuHtml = "";
	var ajaxData = {writerId : writerId, vivasamformat : "json"};

    $.ajax({
        type: "POST",
        url: "/munhak/getMunhakLnbInfo.do",
        cache: false,
        async: true,
        dataType: "json",
        data: ajaxData,
        success: function(data){
        	var strLnbMunhakInfo = data.lnbMenuInfoMap.LNB_MENU_LIST;
        	var WRITER_NM = data.lnbMenuInfoMap.WRITER_NM;
        	var WRITER_ID = data.lnbMenuInfoMap.WRITER_ID;
        	var WRITER_DESC = data.lnbMenuInfoMap.WRITER_DESC;
        	
        	//  프로필
        	var profileHtml = "";
        	profileHtml += "<span class=\"mask\"></span>";
        	profileHtml += "<img src=\"/images/literature/profile_"+WRITER_ID+".jpg\" alt=\""+WRITER_NM+"\"/>";
        	profileHtml += "<p>"+WRITER_DESC+"</p>";
        	profileHtml += "<strong>"+WRITER_NM+"</strong>";
        	
        	$("#profile").html(profileHtml);
        	
        	// lnb
        	menuHtml += "<ul id ='lnb_ul'>";
        	if (strLnbMunhakInfo.indexOf("L06") > -1){
        		menuHtml += "		<li class=\"cateL06 munhakLnb\" id=\"L06\"><a href=\"javascript:void(0);\">작가 소개</a></li>";
        	}
        	if (strLnbMunhakInfo.indexOf("L01") > -1){
        		menuHtml += "		<li class=\"cateL01 munhakLnb\" id=\"L01\"><a href=\"javascript:void(0);\">작가 생애</a></li>";
        	}
        	if (strLnbMunhakInfo.indexOf("L03") > -1){
        		menuHtml += "		<li class=\"cateL03 munhakLnb\" id=\"L03\"><a href=\"javascript:void(0);\">문학 세계</a></li>";
        	}
        	if (strLnbMunhakInfo.indexOf("L02") > -1){
        		menuHtml += "		<li class=\"cateL02 munhakLnb\" id=\"L02\"><a href=\"javascript:void(0);\">주요 작품</a></li>";
        	}
        	if (strLnbMunhakInfo.indexOf("L04") > -1){
        		menuHtml += "	<li class=\"depth\" id=\"L04\"><a class=\"munhakLnb hideContent\" id=\"L04\">작품별 수업자료</a>";
	        	menuHtml += "		<ul>";

	        	for (var i = 0; i < data.result.length; i++) {
	        		menuHtml += "		<li class='ltry_work'>";
	        		
        			menuHtml += "			<a href=\"javascript:void(0);\" id=\"W" + data.result[i].split("|")[0] + "\" onclick=\"contentWorkView('" + writerId + "', '" + data.result[i].split("|")[0] + "')\">"+data.result[i].split("|")[1];
        			if(data.result[i].split("|")[2] != " "){
        				menuHtml += " ("+data.result[i].split("|")[2]+")";	        				        			
        			}
	        			
	        		menuHtml += "</span></a>";
	        		menuHtml += "		</li>";
	        	}
	        	menuHtml += "		</ul>";
	        	menuHtml += "	</li>";
        	}
        	
        	menuHtml += "</ul>";
        	
        	$("#lnb_ul").remove();
        	$("#lnb_literature").append(menuHtml);
        	
        	//Lnb 메뉴
            $("#lnb_ul .munhakLnb").on('click' , function(e){
            	e.preventDefault();
            	
            	if($(this).hasClass('hideContent')){
            		return;
            	}
            	
            	//대표작품 포커싱 모두 제거
            	$(".ltry_work").removeClass("on");
                
                var thisLnbMenuCd = $(this).attr("id");
                $("#lnb_ul li").each(function(i){
            		if ($(this).attr("id") == thisLnbMenuCd) {
            			$(this).addClass("on");
            		}
            		else {
            			$(this).removeClass("on");
            		}
            	});
                
                if(thisLnbMenuCd == "L04"){
                	//$('.ltry_work > a').eq(0).trigger('click');
                	return;
                }
                
                // contentView(writerId, thisLnbMenuCd);
            });
            
            $(".ltry_work > a").on('click' , function(e){
            	e.stopImmediatePropagation();
            	
            	if($(this).hasClass('hideContent')){
            		return;
            	}
            	
                // lnb class 삭제
            	$("#lnb_ul > li").each(function(i){
                	$(this).removeClass("on");
            	});
            	
            	var thisLnbMenuCd = $(this).attr("id");
            	$(".ltry_work > a").each(function(i){
            		if ($(this).attr("id") == thisLnbMenuCd) {
            			$(this).parent().addClass("on");
            			$('.depth').addClass("on");
            		}
            		else {
            			$(this).parent().removeClass("on");
            		}
            	});
            	
            	contentWorkView(writerId, thisLnbMenuCd.substring(1, 3));
            });            
            
        	//초기 lnb 메뉴 지정(미지정의 경우 첫번째 메뉴를 기본 지정)
        	if (lnbMenuCd == ""){
        		if(WORK_SEQ != ""){
        			lnbMenuCd = "W"+WORK_SEQ;
        			$("#lnb_ul > li").each(function(i){
        		    	$(this).removeClass("on");
        			});
        		    // 작품별 수업자료 class 추가
        			$('.depth').addClass("on");
        		}else{
        			lnbMenuCd = $("#lnb_ul li:first").attr("id");
        		}
        	}
        	
        	if (lnbMenuCd.substring(0, 1) == "L") {
        		//Lnb 메뉴 선택 스타일 지정
            	$("#lnb_ul li").each(function(i){
            		//alert($(this).attr("id") + " | " + writerId);
            		if ($(this).attr("id") == lnbMenuCd) {
            			$(this).addClass("on").children('a').addClass("on");
            		}
            		else {
            			$(this).removeClass("on").children('a').removeClass("on");
            		}
            	});
            	
            	contentView(writerId, lnbMenuCd);	
        	}
        	else if (lnbMenuCd.substring(0, 1) == "W") {
        		//Lnb 메뉴 선택 스타일 지정
        		$(".ltry_work").each(function(i){
            		if ($(this).attr("id") == lnbMenuCd) {
            			$(this).addClass("on");
            		}
            		else {
            			$(this).removeClass("on");
            		}
            	});
            	
            	contentWorkView(writerId, lnbMenuCd.substring(1, 3));
        	}
        },
        error: function (xhr, ajaxOptions, thrownError){
        	//alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
        },
        complete:function (xhr, textStatus){
        	//           alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
        }
        });
}

var isLoadingFlag = false;
var reCount = 0;

//Lnb 메뉴에 대한 상세 컨텐츠 페이지 불러오기(작가별 대표 작품 제외)
function contentView(writerId, menuCd) {
	if (isLoadingFlag) return;
	isLoadingFlag = true;
	
 	if (menuCd != "") {
		var url = (isLocal ? "http://" : "https://") + window.location.host + "/theme/munhak/munhak_" + writerId.substring(0, 1) + "/" + writerId.toUpperCase() + menuCd.toUpperCase() + ".html";
		//$(".infoBox").spin('main');

		$.ajax({
	        type: "POST",
	        url: "/commonviewer/Doc_Convert.do",
	        cache: true,
	        async: true,
	        dataType: "html",
	        data: { url : url},
	        success: function(data){
	            
	            if(data != ""){
                	$("#detail_div").html(data);

                	// 작가소개 페이지일 경우 영상처리
                	if (menuCd == "L06") {
						$('#shareVideo1').html('<video id="player" playsinline controls style="width:100%;height:100%;"></video>');

						// starplayer
						window.player = new StarPlyr('#player', {
							iconUrl: '/starplayer/1.0.0/starplyr.svg',
						});
                		var videoUrl = introVideoUrl;
                		var imgUrl = introImgUrl;
                		videoSet("shareVideo1", "860", videoUrl, "introA", "introImg",imgUrl);
                	}

                	reCount = 0;
                }
	            else {
	            	reCount++;
	            	
	            	//네트웍 문제로 정보를 불러오지 못한 경우 한번 더 호출하도록 처리
	            	if (reCount < 2) {
	            		contentView(writerId, menuCd);	
	            	}
	            }
	        },
	        error: function (xhr, ajaxOptions, thrownError){
	        	//alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
	        	isLoadingFlag = false;
	        },
	        complete:function (xhr, textStatus){
	        	//$(".infoBox").data().spinner.stop();
	        	//           alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
	        	isLoadingFlag = false;
	        }
		});	
	}	
}

function videoSet(targetId, size, videoUrl, clickTargerId, imgTargetId, imgUrl){
	$('#'+targetId).hide();
	$('#'+imgTargetId).attr("src", imgUrl);
	$('#'+clickTargerId).on("click", function(e){
		showPlayer(videoUrl);
	});
}

//작가별 대표 작품 View
function contentWorkView(writerId, workSeq) {
	return false;
	if (isLoadingFlag) return;
	isLoadingFlag = true;
    
    var templateType = "MunhakMainWorkText";

    var callbackId = "detail_div";
	
	//$('#' + callbackId).spin('main');
	
    var templateOption = {
            dataUrl : '/munhak/writerWorkView.do',
            returnType: 'html',
            callbackId : callbackId,
            dataCondition : {
            	writerId : writerId,
            	workSeq : workSeq,
                templateType : templateType,
                mLevel : MEMLEVEL
            }
        };

    $('#' + callbackId).vsTemplate(templateOption);
	$('html').stop().animate({scrollTop: 0}, 0);
	
	// 선택작품 class 추가
	$('#W'+workSeq).parent().addClass("on");

}

//templateOption에서 지정해주신 callbackId값이 그대로 넘어오게 됩니다.
function _templateDataSuccessCallback(callbackId, resultData) {
	//alert(resultData);
	//$('#' + callbackId).data('spinner').stop();
	
	if (resultData == "") {
		$('#' + callbackId).html('No Data!!!');
	}
	else {
		$('#' + callbackId).html(resultData);
		
		//동영상 플레이
//		$(".workBox .moviArea .playMovie").click(function(){
//			playMovieAction(this);
//	    });
	  	/*$("#playMovie").click(function(){
	       $('#video_contents').get(0).contentWindow.forcedPlay();
	    });*/
	  	
	  	//플래시 플레이
//	  	$(".workBox .moviArea .playFlash").click(function(){
//	  		playFlashAction(this);
//	    });
	}
	
	isLoadingFlag = false;
}

function _templateDataErrorCallback(callbackId) {
	isLoadingFlag = false;
}

function goWorkView(writerId, workSeq){
	return false;
	writerId = writerId.toUpperCase();
    // lnb class 삭제
	$("#lnb_ul > li").each(function(i){
    	$(this).removeClass("on");
	});
    // 작품별 수업자료 class 추가
	$('.depth').addClass("on");
	// 선택작품 class 추가
	$('#W'+workSeq).parent().addClass("on");
	contentWorkView(writerId, workSeq);
}

function showPlayerTarget(obj, videoId, imgId){
	
	if(fnMobile()){
		var _url2 = obj;
		var sp = StarPlayerApp;
		sp.license = "31856D1F-57EA-415A-8DDA-6B86C978788E";			
		sp.version = "1.0.0"; // iOS, Android에서 실행 가능한 StarPlayer앱의 최소 버전을 설정합니다.
		sp.android_version = "1.0.0"; // 실행 가능한 StarPlayer앱의 최소 버전을 설정합니다. (android 전용)
		sp.ios_version = "1.0.0"; // 실행 가능한 StarPlayer앱의 최소 버전을 설정합니다. (iOS 전용)
		sp.pmp = "true";
		var app = function(info_url) {
			sp.executeApp(info_url);
			return false;;
		}
		
		var starStreaming = "";
		starStreaming = window.location.hostname;
		
		if(window.location.port !== 80)
		{
			starStreaming += ":" + window.location.port;
		}
		
	    
		/// 테스트 st -> dn 으로 변경... 추후 오픈 시 st -> dn 변경 부분 삭제.
		_url2 =  _url2.replace("/common/playstarplayer.do?url=","");			                              
		_url2 =  _url2.replace("mi-visangst.xcdn.uplus.co.kr","msoobakc02-visangmobile01.x-cdn.com");
		_url2 =  _url2.replace("http://","*\\*http:*\\*");
		_url2 =  _url2.replace("//","/");			
		_url2 =  _url2.replace("*\\*http:*\\*","http://");
		

		app("http://"+starStreaming + '/mstarplayer/streaming.do?license=31856D1F-57EA-415A-8DDA-6B86C978788E&content_id=100&content=' + decodeURIComponent(_url2)  +'&test=1&test2=2');
		
	}else{
		
		$('#'+imgId).hide();
		$('#'+videoId).show();
		setTimeout(function(){ player.play(); }, 1000);
		
	}
}

function introDownload(){
	return false;
	downloadFile(introGubun+'-'+introCid, 'single');
}

function fnGoWorkList(writer_id, work_seq){
	return false;
	location.href = "/munhak/sub/writerInfoView.do?writerId="+writer_id+"&workSeq="+work_seq;
}

function flashPlay(hideBtnId, hideImgId, flashPlayAreaId) {
	$("#"+hideBtnId).hide();
    $("#"+hideImgId).hide();
    
    flashPlayWrite(flashPlayAreaId);
}

function flashPlayWrite(flashPlayAreaId) {
	var flashHtml = "";
	var url = $("#"+flashPlayAreaId).html();
	
	flashHtml = "<object type=\"application/x-shockwave-flash\" data=\"" + url + "\" quality=\"high\" wmode=\"opaque\" ";
	flashHtml += "  bgcolor=\"#ffffff\" width=\"415px\" height=\"262px\" align=\"middle\" allowscriptaccess=\"sameDomain\" ";
	flashHtml += "  pluginspage=\"http://www.macromedia.com/go/getflashplayer\">";
	flashHtml += "<param name=\"allowScriptAccess\" value=\"sameDomain\" />";
	flashHtml += "<param name=\"movie\" value=\"" + url + "\" />";
	flashHtml += "<param name=\"quality\" value=\"high\" />";
	flashHtml += "<param name=\"bgcolor\" value=\"#ffffff\" />";
	flashHtml += "<param name=\"wmode\" value=\"opaque\" />";
	flashHtml += "<embed type=\"application/x-shockwave-flash\" data=\"\" quality=\"high\" wmode=\"opaque\" bgcolor=\"#ffffff\" ";
	flashHtml += "  width=\"745px\" height=\"490px\" align=\"middle\" allowScriptAccess=\"sameDomain\" ";
	flashHtml += "  pluginspage=\"http://www.macromedia.com/go/getflashplayer\">";
	flashHtml += "<param name=\"allowScriptAccess\" value=\"sameDomain\" />";
	flashHtml += "<param name=\"movie\" value=\"" + url + "\" />";
	flashHtml += "<param name=\"quality\" value=\"high\" />";
	flashHtml += "<param name=\"bgcolor\" value=\"#ffffff\" />";
	flashHtml += "<param name=\"wmode\" value=\"opaque\" />";
	flashHtml += "<p>해당 컨텐츠를 보려면 <a href=\"http://www.macromedia.com/go/getflashplayer\">Flash Player</a>가 필요합니다.</p>";
	flashHtml += "</embed>";
	flashHtml += "</object>";
	
	$("#"+flashPlayAreaId).html(flashHtml);
				
	$("#"+flashPlayAreaId).css("display", "block");
}

// 영업용 태블릿 > 문학관 html에서 사용하는 함수 커스텀
function showMp4Player() {
	$("#shareVideo1 video")[0].play();
	$('#shareVideo2').hide();
	$('#shareVideo1').show();
}

function showLnbMenuContent(obj) {
	var _this = $(obj);
	var _id = _this.attr("id");

	if(_this.hasClass('hideContent')){
		return;
	}

	// 컨텐츠 노출
	$(".detail_div").hide();
	$(`#detail_div${_id}`).show();

	// lnb 제어
	$("#lnb_ul li, .ltry_work").removeClass("on");

	if(_this.hasClass("subMunhakLnb")) {
		// 서브메뉴
		_this.parent().addClass("on");
		_this.parents(".depth").addClass("on");
	} else {
		// 메인메뉴
		_this.parent().addClass("on");
	}
}
function lnbMenuClick(id) {
	$(`#${id}`).click();
}

function ContentView2015() {
	return false;
}