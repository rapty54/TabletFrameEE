	/////////////////////////////////////
	//롤링 배너
	//ex) object.rollingBanner(시간, 네비게이션);
	//시간 적지 않으면 롤링되지 않음
	//네비게이션이 없을 경우에만 false
	/////////////////////////////////////
	$.fn.rollingBanner = function(time, navi) {
		var o = $(this);
		var bannerLength = o.find('ul li').length;
		var idx = 0;
		var setTime;

		if( bannerLength > 1 ) {

			if(navi == false){
				o.find('ul li').hide();
				o.find('ul li').eq(0).show();
				o.find('ol li').eq(0).find('a').addClass('on');
			} else {
				o.append('<ol></ol>');

				for(var i=0; i<bannerLength; i++) {
					if( i == 0) {
						o.find('ol').append('<li><a href="#" class="on">' + i + '</a></li>');
					}else {
						o.find('ol').append('<li><a href="#">' + i + '</a></li>');
						o.find('ul li').eq(i).hide();
					}
				}
			}


			if( time != undefined ) {
				setTime = setTimeout(roll, time);

				o.mouseover(function() {
					clearTimeout(setTime);
				})
					.mouseout(function() {
						setTime = setTimeout(roll, time);
					});
			}

			o.find('ol li a').click( function() {
				var n = $(this).parent().index();
				bannerPage(n);
				return false;
			});
		}

		function bannerPage(n) {
			o.find('ol li a').removeClass('on');
			o.find('ol li').eq(n).find('a').addClass('on');
			o.find('ul li').eq(idx).hide();
			idx = n;
			o.find('ul li').eq(n).show();
		}

		function roll() {
			o.find('ul li').eq(idx).hide();

			if(idx > bannerLength-2) { idx = 0; }
			else { idx++; }

			bannerPage(idx);
			o.find('ul li').eq(idx).show();

			if( time != undefined ) {
				setTime = setTimeout(roll, time);
			}
		}
	}

	/////////////////////////////////////
	//롤링 배너 세로방향
	/////////////////////////////////////
	$.fn.verticalSlide = function(time){
		var item = $(this).find("li");
		var itemLength = item.length;
		var itemHeight = $(this).outerHeight();
		var idx = 0;
		var setTime;

		//reset
		item.css({top:itemHeight}).eq(0).css({top:0});

		//배너가 1개 이상일 경우에 실행
		if( itemLength > 1 ) {
			if( time != undefined ) {
				setTime = setTimeout(roll, time);
				item.mouseover(function() {
					clearTimeout(setTime);
				})
					.mouseout(function() {
						setTime = setTimeout(roll, time);
					});
			}
		}

		function roll(){
			item.eq(idx).animate({top:-itemHeight});
			item.eq(idx).siblings().css({top:itemHeight});

			if (idx > itemLength-2){
				idx = 0;
			} else {
				idx++;
			}

			item.eq(idx).animate({top:0});
			setTime = setTimeout(roll, time);
		}
	}

	var vStatusFlag = false;
    var isLogging = false;
    var isPopPlus = false;
	var isReqStatus = false; //모달팝업 관련 전역변수

	function callDown(type, keyVal)
	{
		//console.log("type : "+type + "keyVal : "+keyVal);
		// 교사 인증체크
		var loginChk = loginStateCheck("certify");
		if (loginChk == "fail") {
			return;
		}

	    var width   = 700;
	    var height  = 510;

	    var left    = (screen.width  - width)/2;
	    var top    = (screen.height - height)/2;

		//var url = "https://www.vivasam.com/file/download/dext.popup";
 		/*
			2023-02-28 강남구
			다운로드 기능 변경 -> 팝업 -> 즉시 다운로드
		*/
		if(type == 'url'){
			downloadClient(keyVal);
		}else {
			var fileList = keyVal.split(",");
			for (var i = 0; i < fileList.length; i++) {
				var contentGubun = fileList[i].split("-")[0];
				var contentId = fileList[i].split("-")[1];
				$.ajax({
					type: "POST",
					url: CONTEXTPATH + "/common/content.do",
					cache: false,
					async: false,
					dataType: "json",
					data: {contentGubun: contentGubun, contentId: contentId, vivasamformat: "json"},
					success: function (data) {
						var href = window.globals.siteCdnDomain + data.filePath + data.saveFileName;
						downloadClient(href);
					},
					error: function (xhr, ajaxOptions, thrownError) {//
					},
					complete: function (xhr, textStatus) {
					}

				});
			}
		}
		/*
		var url = window.globals.siteUrlCommon + '/file/download/dext.popup';
		if($("iframe[id='down_iframe']").length){
			$("iframe[id='down_iframe']").remove();
		}
		var fileList = keyVal.split(",");
		for (var i = 0; i < fileList.length; i++) {
			var html = "<iframe id=down_iframe' style='display:none;' src='"+url+"?files="+type+"," + fileList[i] + "&ufiles='></iframe>";
			$("body").append(html);
		}
		*/
		/*
		var fileList = keyVal.split(",");
		for (var i = 0; i < fileList.length; i++) {
			var contentGubun = fileList[i].split("-")[0];
			var contentId = fileList[i].split("-")[1];
			$.ajax({
				type: "POST",
				url: CONTEXTPATH+"/common/content.do",
				cache: false,
				async: false,
				dataType: "json",
				data: { contentGubun : contentGubun, contentId : contentId, vivasamformat : "json" },
				success: function(data) {
					downloadClient(data);
				},
				error: function (xhr, ajaxOptions, thrownError){//
				},
				complete:function (xhr, textStatus){
				}

			});
		}
		*/
		/*
		var url = window.globals.siteUrlCommon + '/file/download/dext.popup';
	    var newWindow = window.open("/fountain_html/autoReload.html", "downloadwin", "left="+left+",top="+top+",width="+width+", height="+height+",scrollbars=no,toolbar=no,resizable=no,location=no");

	    if (!newWindow) return false;

	    var html = "";
	    html += "<html><head></head><body><form id='formid' method='post' action='" + url +"'>";
	    html += "<input type='hidden' name='files' value='" + type+","+keyVal + "'/>";
	    html += "<input type='hidden' name='ufiles' value=''/>";

	    html += "</form><script type='text/javascript'>document.getElementById(\"formid\").submit()</sc"+"ript></body></html>";

	    newWindow.document.write(html);
	    return newWindow;
	    */
	}

	// 파일 다운로드 a tag 붙이기 & 다운로드
	function downloadClient(href){
		//직접 다운로드 처리
		if (href.indexOf('soobakc.com') > -1 || href.indexOf('VisangUpload') > -1 || href.indexOf('vivasamfiledir') > -1) {
			if($("iframe[id='down_iframe']").length){
				$("iframe[id='down_iframe']").remove();
			}
			/*
			//dext.popup - URL에서 사용하던 방식
			var uri = href.replace('https://', '').split('/');
			var orgFileName = '';
			var saveFileName = '';
			var saveFilePath = '/';
			if (uri != undefined && uri.length > 0) {
				orgFileName = uri[uri.length - 1];
				saveFileName = href;
				for (var i = 1; i < uri.length - 1; i++) {
					saveFilePath += uri[i] + '/';
				}
			}
			var url = '/common/vivasamUrlDownload.do?orgFileName='+orgFileName+'&saveFileName='+saveFileName+'&saveFilePath='+saveFilePath;
			*/
			var url = '/common/vivasamUrlDownload.do?saveFileName='+href;
			var html = "<iframe id=down_iframe' style='display:none;' src='"+url+"'></iframe>";
			$("body").append(html);
		}else {
			var a = document.createElement("a"); // a 태그 create
			a.href = href
			document.body.appendChild(a);
			a.click();
			sleep(300);
			document.body.removeChild(a);
		}
	}
	function sleep(ms) {
		const wakeUpTime = Date.now() + ms;
		while (Date.now() < wakeUpTime) {}
	}

	//티스쿨 제휴 배너 정보 조회
	function getPartnerShipBannerInfo(textbookCd){
		var pathname = location.pathname;

	    $.ajax({
	        type: "POST",
	        url: CONTEXTPATH+"/common/getPartnerShipBannerInfo.do",
	        cache: true,
	        async: true,
	        dataType: "json",
	        data: { textbookCd : textbookCd , pathname: pathname, vivasamformat : "json" },
	        success: function(data){
	            var code = data.code;
	            var message = data.msg;
	            var result = data.result;
	            var html ="";

	            if(data.code == "0000"){
	            	if(result.length > 0){
	            		var item;

			            for(var i =0 ; i < result.length; i++){
			            	item = data.result[i];

			            	html += "<li><a href=\"" + item.url + "\" onclick=\"gtag('event', '티스쿨배너', {'event_category': '배너', 'event_label': " + item.bannerTitle + ", 'value': 1});\" ";
			                html += "target='_blank'>";
			                html += "<img src=\"" + item.imagePath + "\" alt=\"제휴 배너\">";
			                html += "</a></li>";
			            }
	            	}
	            }

	            if (html != "")
	            	$("#partnerBanner").html(html);

	        },
	        error: function (xhr, ajaxOptions, thrownError){
	       //     alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
	        },
	        complete:function (xhr, textStatus){
	            // 교과서 조회 호출
	 //           alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
	        }
	    });
	}

	// LNB 배너 조회
	function getLnbBannerList(menuType, textbookCd){
		if(menuType == null || menuType == '') {
			return null;
		}
		if(menuType == 'TEXTBOOK') {
			if(textbookCd == null || textbookCd == '') {
				return null;
			}
		}

		$.ajax({
	        type: "POST",
	        url: CONTEXTPATH+"/common/getLnbBannerList.do",
	        cache: true,
	        async: true,
	        dataType: "json",
	        data: { menuType : menuType, textbookCd : textbookCd, vivasamformat : "json" },
	        success: function(data){
	            var code = data.code;
	            var message = data.msg;
	            var result = data.result;
				var normalLnbHtml = "";
	            var adLnbHtml = "";
				var html ="";
	            


	            if(data.code == "0000"){
	            	if(result.length > 0){
			            for(var i =0 ; i < result.length; i++){
			            	var item = data.result[i];

			            	if(item.bannerType == 'N') {
								normalLnbHtml += '<a href="'+item.url+'"';
								if(item.linkType == 'N') {
									normalLnbHtml += "target='_blank'>";
								} else {
									normalLnbHtml += "target='_self'>";
								}
								normalLnbHtml += '<img src="'+item.imagePath+item.imageName+'" alt="'+item.bannerTitle+'">';
								normalLnbHtml += '<p>' + item.bannerTitle + '</p>';
								normalLnbHtml += "</a>";
							} else if(item.bannerType == '8') {
								adLnbHtml += '<a href="'+item.url+'"';
								if(item.linkType == 'N') {
									adLnbHtml += "target='_blank'>";
								} else {
									adLnbHtml += "target='_self'>";
								}
								adLnbHtml += '<img src="'+item.imagePath+item.imageName+'" alt="'+item.bannerTitle+'">';
								adLnbHtml += '<p>' + item.bannerTitle + '</p>';
								adLnbHtml += "</a>";
							} else {
								html += '<a href="'+item.url+'"';
								if(item.linkType == 'N') {
									html += "target='_blank'>";
								} else {
									html += "target='_self'>";
								}
								html += '<img src="'+item.imagePath+item.imageName+'" alt="'+item.bannerTitle+'">';
								html += '<p>' + item.bannerTitle + '</p>';
								html += "</a>";
							}

			            }
	            	}
	            }

	            if (normalLnbHtml != "") {
					$(".banner").append(normalLnbHtml);
				}
	            if (adLnbHtml != "") {
					$(".banner_prom").append(adLnbHtml);
				}


	        },
	        error: function (xhr, ajaxOptions, thrownError){

	        }
	    });
	}


	$(document).ready(function() {

		// 공통 단축 URL 클릭 이벤트
		$('body').on('click', '.btn-short-url', function() {

			if (!window.globals.login) {
				alert('로그인이 필요한 서비스입니다.');
				location.href = window.globals.addUrlSiteUrlCommon('/member/login', location.href);
			} else {
				var shortUrl = $(this).data().shortUrl;
				if (shortUrl == '') {
					alert('복사할 링크 주소가 없습니다.');
					return false;
				}
				CopyShortUrl.copy(window.globals.shortUrlDomain + shortUrl);
			}

		});

		if (document.domain.indexOf("/create") != -1) {
			if (document.domain.indexOf("vivasam.com") != -1) {
				document.domain = "vivasam.com";
			}
		}

		//LOGIN_ID는 vivasam_common.jsp에 정의되어 있음
    	if ("${LOGIN_ID}" != "") {
    		//로그인한 사용자의 폴더목록 조회
        	getFolderList();
    	}

		/*********************************** 로그인 처리 *******************************************************/
		//alert("header || " + $.cookie('user_id'));
		if ($.trim(($.cookie('user_id') != 'null' && $.cookie('user_id') != 'undefined' ? $.cookie('user_id') : '')) != '') {
	        $("form[id=loginFrmGnb]").find('input:text').val(($.cookie('user_id') != 'null' && $.cookie('user_id') != 'undefined' ? $.cookie('user_id') : ''));
	        $('#loginFrmGnb #IdSave').attr('checked','checked');
	        $('#loginFrmGnb #IdSave').parent().addClass('on');
	    }

		$('form[id=loginFrmGnb]').find('input:text').focus(function() {
	       if ($.trim(($.cookie('user_id') != 'null' && $.cookie('user_id') != 'undefined' ? $.cookie('user_id') : '')) == '' && $(this).val() == '아이디' ) {
	           $(this).val('');
	       }
	   	});

	   	$('form[id=loginFrmGnb]').find('input:password').focus(function() {
	           $(this).val('');
	   	});

	   	$('form[id=loginFrmGnb]').find('input:text').blur(function() {
	        /*
	   		if ($(this).val() == '') {
	        	if($(this).attr('name') == 'userPwd'){
	        		$(this).prop("type", "text");
	        		$(this).val('비밀번호');
	        	}else{
	        		$(this).val('아이디');
	        	}

	        }
	        */
	        //$(this).val('아이디');
	   	});

	    if ($.trim(($.cookie('user_id') != 'null' && $.cookie('user_id') != 'undefined' ? $.cookie('user_id') : '')) != '') {
			$("form[id=loginFrmPop]").find('input:text').val(($.cookie('user_id') != 'null' && $.cookie('user_id') != 'undefined' ? $.cookie('user_id') : ''));
			$('#loginFrmPop #IdPopSave').attr('checked','checked');
	        $('#loginFrmPop #IdPopSave').parent().addClass('on');
	    }

	    $('form[id=loginFrmPop]').find('input:text').focus(function() {
	        if ($.trim(($.cookie('user_id') != 'null' && $.cookie('user_id') != 'undefined' ? $.cookie('user_id') : '')) == '' && $(this).val() == '아이디' ) {
	            $(this).val('');
	        }
	    });

		$('form[id=loginFrmPop]').find('input:password').focus(function() {
	            $(this).val('');
	    });

	    $('form[id=loginFrmPop]').find('input:text').blur(function() {
	         if ($(this).val() == '') {
	        	 $(this).val('아이디');
	         }
	    });

		$("#loginFrmGnb #userId").keypress(function(e){
	        if (e.keyCode == 13) {
	            $("#loginFrmGnb #logPw").focus();
	            return false;
	        }
		});

		$("#loginFrmPop #userPopId").keypress(function(e){
	        if (e.keyCode == 13) {
	            $("#loginFrmPop #logPopPw").focus();
	            return false;
	        }
		});

		$("#loginFrmGnb #logPw,#loginFrmGnb #loginBtn").keypress(function(e){
	        if (e.keyCode == 13) {
	        	_login('loginFrmGnb');
	            return false;
	        }
		});

		$("#loginFrmPop #logPopPw,#loginFrmPop #loginBtn").keypress(function(e){
	        if (e.keyCode == 13) {
	        	_login('loginFrmPop');
	            return false;
	        }
		});
		/*********************************** 로그인 처리 *******************************************************/

		/*********************************** 통합 검색 처리 *****************************************************/

		$("#mainsearchBtn").keypress(function(e){
	        if (e.keyCode == 13) {
	            runsearch();
	            return false;
	        }
		});

		$("#keyword,#mainsearchBtn2").keypress(function(e){
	        if (e.keyCode == 13) {
	            runsearch2();
	            return false;
	        }
		});

		// 이슈 키워드 클릭 이벤트
		$('#issuekeyword').on('click', 'a', function(e) {
			e.preventDefault();
			location.href = "/opendata/issueChannel2015.do";
		});
		// 검색 영역 클릭 이벤트
		$('#mainsearch').on('click', function(e) {
			e.preventDefault();
			$('#issuekeyword').hide();
		});

		/*********************************** 통합 검색 처리 *****************************************************/

		/*********************************** 사용자 폴더 및 담기 *******************************************************/
		//		2013.09.13 : eoraptor
        //	컨텐츠 담기 팝업에서 새 폴더 만들때
        //	신규 생성 input box 에 클릭이벤트 발생시 "새 폴더"란 값이 있으면 값을 지운다!!!
        $("#nFolderNm").on("click",function(){
        	var chkVal = $.trim( $(this).val() );
        	if ( chkVal == "새 폴더" ) {
        		$(this).val("");
        	}
        });

        //	새 폴더 만들기 : 엔터키 일경우 작동!!!
        $("#nFolderNm").on("keypress", function(event){
            if (event.keyCode == 13) {
            	makeFolder();
            }
        });
        /*********************************** 사용자 폴더 및 담기 *******************************************************/

	});

	/*********************************** 로그인 처리 *******************************************************/
	function _login(formId) {
	    if (isLogging) return;

	    isLogging = true;

	    var id = $.trim($('form[id=' + formId + ']').find('input:text').val());
	    var pwd = $('form[id=' + formId + ']').find('input:password').val();

	    if (id == '' || id == '아이디') {
	        isLogging = false;
	        alert('회원 아이디를 입력해 주시기 바랍니다.');

	        if (formId == "loginFrmGnb")
	        	$("#" + formId + " #userId").focus();
		    else
		    	$("#" + formId + " #userPopId").focus();

	        return;
	    }
	    if (pwd == '') {
	        isLogging = false;
	        alert('회원 비밀번호를 입력해 주시기 바랍니다.');

	        if (formId == "loginFrmGnb")
	        	$("#" + formId + " #logPw").focus();
		    else
		    	$("#" + formId + " #logPopPw").focus();

	        return;
	    }

	    $('form[id=' + formId + ']').append().spin('small');

	    $('#' + formId).find('input:text').val(id);
	    $('#' + formId).find('input:password').val(pwd);

	    if (formId == "loginFrmGnb") {
	    	if ($('#' + formId + ' #IdSave').is(':checked')) {
		        $.cookie('user_id', id, { expires: 30 });
		    } else {
		        $.cookie('user_id', '');
		    }
	    }
	    else {
	    	if ($('#' + formId + ' #IdPopSave').is(':checked')) {
		        $.cookie('user_id', id, { expires: 30 });
		    } else {
		        $.cookie('user_id', '');
		    }
	    }

	    $('#' + formId).submit();
	}
	/*********************************** 로그인 처리 *******************************************************/

	/*********************************** 교과 GNB 교육 과정에 따른 토글 처리 *******************************************************/
	function eduYearCourseChange(gubun, eduYear) {
		if (eduYear == "2015" && $("#" + gubun + "Book2015").css("display") != "block") {
			$("#" + gubun + "Book2015").show();
			$("#" + gubun + "Book2009").hide();

			$("#" + gubun + "EduYearImg2015").attr("src", $("#" + gubun + "EduYearImg2015").attr("src").replace("new.gif","new_on.gif"));
			$("#" + gubun + "EduYearImg2009").attr("src", $("#" + gubun + "EduYearImg2009").attr("src").replace("new_on.gif","new.gif"));
		}

		if (eduYear == "2009" && $("#" + gubun + "Book2009").css("display") != "block") {
			$("#" + gubun + "Book2015").hide();
			$("#" + gubun + "Book2009").show();

			$("#" + gubun + "EduYearImg2015").attr("src", $("#" + gubun + "EduYearImg2015").attr("src").replace("new_on.gif","new.gif"));
			$("#" + gubun + "EduYearImg2009").attr("src", $("#" + gubun + "EduYearImg2009").attr("src").replace("new.gif","new_on.gif"));
		}
	}
	/*********************************** 교과 GNB 교육 과정에 따른 토글 처리 *******************************************************/

	/**
    * 주석작성자 : 김남배
    * 주석작성일 : 2014.01.14
    * 내    용 : 메인 상단 통합검색
    */
    function runsearch()
    {
    	var keyword = $.trim(document.getElementById("mainsearch").value);

    	if (keyword == "선생님을 위한 스마트 교수 지원 서비스" || keyword == "") {
    		alert("검색어를 입력해주세요.");
    		$("#mainsearch").focus();
    		return;
    	}

        location.href = CONTEXTPATH  + "/search/search_main.do?searchword="+encodeURI(keyword);
	}

    function runsearch2()
    {
    	var keyword = $.trim(document.getElementById("keyword").value);

    	if (keyword == "선생님을 위한 스마트 교수 지원 서비스" || keyword == "") {
    		alert("검색어를 입력해주세요..");
    		$("#mainsearch").focus();
    		return;
    	}

        location.href = CONTEXTPATH  + "/search/search_main.do?searchword="+encodeURI(keyword);
    }

	function onPlayer(type, url) {
		var winPop = window.open('', '_blank', 'width=640, height=480');
		if( type === 'dn') {
			winPop.document.write('<html><head></head><title>비바샘</title></head><body style="margin:0;background:#000;"><video id="video" width="100%" height="100%" src="' + url + '" controls="controls"></video></body></html>');
		} else {
			winPop.document.write('<html><head></head><title>비바샘</title></head><body style="margin:0;background:#000;"><iframe width="100%" height="100%" src="' + url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></body></html>');
		}
	}

    /**
     * 작 업 자 : 임재근
     * 주석작성자 : 김남배
     * 주석작성일 : 2014.01.14
     * 내    용 : 파일다운로드 호출 함
     *           멀티다운로드 - LG에서 제공한 멀티다운로드 ActiveX 를 이용하여 구현된것 호출 (IE7에서만 지원함)
     *           단일다운로드 - Java에서 다운로드 기능 구현된것 호
     */
    function go_DownloadFileAll(type, keyVal){

    	if (fnMobile()) {
    		alert("자료를 다운로드 하시려면 비바샘 PC 및 모바일앱을 이용해 주세요.");
    		return;
    	} else

        if("${LOGIN_ID}" == ''){
            alert('로그인이 필요한 서비스입니다.');
            return;
        }
        else {
			// 필수정보 누락시 알럿알림 후 개인정보 수정 유도 ( 학교정보 없을 시)
			if(SCH_NAME == ''){
				alert("자료 다운로드는 개인정보 입력 후 가능합니다.\n자료는 ‘학교 및 교육기관의 수업’ 목적을 위해서만\n한정하여 사용되도록 저작권법의 보호를 받고 있습니다.");
				if(opener){
					opener.	location.href = '/myinfo/myinfoModify.do';
					window.close();
				}else{
					var isInIframe = (window.location != window.parent.location);
					if(isInIframe == true){
						// iframe 일 경우
						parent.location.href = '/myinfo/myinfoModify.do';
					}else{
						// iframe 아닐 경우
						location.href = '/myinfo/myinfoModify.do';
					}
				}
				return;
			}

        	// var msg = '';
            // msg = "다운로드하시는 자료는 '학교 및 교육기관의 수업' 목적을 위해서만 한정하여 사용되도록 저작권법의 보호를 받고 있습니다.\n수업 외의 목적으로 사용되지 않도록 주의 부탁드립니다.";
			//
            // alert(msg);
 	   }

		if (fnMobile()){
			alert("복수 파일 다운로드는 PC에서만 지원합니다.");
			return;
		}else{
			callDown(type, keyVal);
		}

		/*
        var Arr_keyVal = keyVal.split(",");
        // 여려개를 선택해서 다운로드 받는 경우 익스플로어가 아닌경우에 경고문구 처리
        if(Arr_keyVal.length > 1 && fnMobile()){
        */
        	/**
        	* 수 정 자 : 심원보 (2013.12.30)
        	* 주석작성자 : 김남배
        	* 주석작성일 : 2014.01.14
        	* 내    용 : IE11 버젼이 출시되면서 브라우져 체크하는 방법이 변경되어 추가한 내역임
        	*           IE6~10 : $.browser.msie 로 체크
        	*           IE11 : isIE() 에서 체크
        	*/
		/*
        	if (fnMobile())
        	{
        	    alert("복수 파일 다운로드는 PC에서만 지원합니다.");
        		return;
        	}
        	if(isIE()) {
        		callDown(type, keyVal);
            }else{
                alert("복수 파일 다운로드는 인터넷 익스플로러에서만 지원합니다.");
            }
        }else{
			callDown(type, keyVal);
        }
		*/
    }

	function go_DownloadFile(type, keyVal, downyn) {
		if (fnMobile()) {
			alert("자료를 다운로드 하시려면 비바샘 PC 및 모바일앱을 이용해 주세요.");
			return;
		} else if (!window.globals.login) {
			alert('로그인이 필요한 서비스입니다.');
			location.href = window.globals.addUrlSiteUrlCommon('/member/login', location.href);
			return;
		} else {
			// 교사 인증체크
			var loginChk = loginStateCheck("certify");

			if (loginChk == "fail") {
				return;
			}

			// if (downyn != 'N') {
			// 	var msg = '';
			// 	msg = "다운로드하시는 자료는 '학교 및 교육기관의 수업' 목적을 위해서만 한정하여 사용되도록 저작권법의 보호를 받고 있습니다.\n수업 외의 목적으로 사용되지 않도록 주의 부탁드립니다.";
			//
			// 	alert(msg);
			// }
		}

		if (fnMobile()) {
			alert("복수 파일 다운로드는 PC에서만 지원합니다.");
			return;
		}else {
			callDown(type, keyVal);
		}

		//var Arr_keyVal = keyVal.split(",");
		// 여려개를 선택해서 다운로드 받는 경우 익스플로어가 아닌경우에 경고문구 처리
		//if (Arr_keyVal.length > 1 && fnMobile()) {
			/**
			 * 수 정 자 : 심원보 (2013.12.30)
			 * 주석작성자 : 김남배
			 * 주석작성일 : 2014.01.14
			 * 내    용 : IE11 버젼이 출시되면서 브라우져 체크하는 방법이 변경되어 추가한 내역임
			 *           IE6~10 : $.browser.msie 로 체크
			 *           IE11 : isIE() 에서 체크
			 */

			//if (fnMobile()) {
				//alert("복수 파일 다운로드는 PC에서만 지원합니다.");
				//return;
			//}
			/*
			if (isIE()) {
				callDown(type, keyVal);
			} else {
				alert("복수 파일 다운로드는 인터넷 익스플로러에서만 지원합니다.");
			}
			*/
			//callDown(type, keyVal);
		//} else {
			//alert("callDown");
			//callDown(type, keyVal);
		//}
	}

    //20170809, 비바샘 로그인 상태 체크(서버값)
    function loginStateCheck(chkGubun) {
    	var flag;

    	$.ajax({
			type : "POST",
			url : "/doCheckLogin.do",
			cache : false,
			async : false,
			dataType : "json",
			data : {
				chkGubun : chkGubun,
				vivasamformat : "json"
			},
			success : function(data) {
				//로그인 상태가 아닌 경우
				if (data == "FALSE") {
					flag = false;
				}
				//로그인 세션은 존재하는 상황
				else {
					//교사 인증 여부는 확인하지 않고 로그인 상태만 확인하는 경우
					if (chkGubun != "certify") {
						flag = true;
					}
					//교사 인증 여부까지 확인하는 경우
					else {
						//로그인 유지 상태
						flag = data; //기존 TRUE로 리턴하던 로직을 인증(Y), 미인증(N) 상태값 리턴으로 수정, shimwb, 20190807

						//flag = "N"; //교사 미인증 테스트시 주석 해제

						//교사 미인증
						if (flag != "Y") {
							if (confirm("교사 인증을 해 주세요. 지금 인증을 진행하시겠습니까?")) {
								location.href = window.globals.siteUrlCommon + '/member/memberReCertify';
								flag = "fail";
							}
							else
								flag = "fail";
						}
						//교사 인증
						else
							flag = true;
					}
				}
			},
			error : function(xhr, ajaxOptions, thrownError) {//
				flag = false;
			},
			complete : function(xhr, textStatus) {
			}
		});

    	return flag;
    }

    //20200319, 비바샘 로그인 상태 체크(서버값) 및 교사인증 팝업형태
    function loginStateCheckForPopup(chkGubun) {
    	var flag;

    	$.ajax({
			type : "POST",
			url : "/doCheckLogin.do",
			cache : false,
			async : false,
			dataType : "json",
			data : {
				chkGubun : chkGubun,
				vivasamformat : "json"
			},
			success : function(data) {
				//로그인 상태가 아닌 경우
				if (data == "FALSE") {
					flag = false;
				}
				//로그인 세션은 존재하는 상황
				else {
					//교사 인증 여부는 확인하지 않고 로그인 상태만 확인하는 경우
					if (chkGubun != "certify") {
						flag = true;
					}
					//교사 인증 여부까지 확인하는 경우
					else {
						//로그인 유지 상태
						flag = data; //기존 TRUE로 리턴하던 로직을 인증(Y), 미인증(N) 상태값 리턴으로 수정, shimwb, 20190807

						//flag = "N"; //교사 미인증 테스트시 주석 해제

						//교사 미인증
						if (flag != "Y") {
							flag = false;
						}
						//교사 인증
						else
							flag = true;
					}
				}
			},
			error : function(xhr, ajaxOptions, thrownError) {//
				flag = false;
			},
			complete : function(xhr, textStatus) {
			}
		});

    	return flag;
    }

	//이벤트참여확인
	function chkEventJoin( memberId, eventId ) {
		var chkVal = "";

		if ( memberId == "" ) {
			alert("로그인 후 참여하실 수 있습니다.");
		} else {
			$.ajax({
				type : "POST",
				url : "<%=webRoot %>/event/chkEventJoin.do",
				async : false,
				cache : false,
				dataType : "json",
				data :  {memberId : memberId, eventId : eventId, vivasamformat : "json"},
				success : function(data){
					chkVal = data.code;
				},
				error: function (xhr, ajaxOptions, thrownError){
				},
				complete:function (xhr, textStatus){
				}
			});
		}

		return chkVal;
	}

	/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////교과 목록에 사용되는 기능 버튼 펑션들 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	*/
    function _isChecked(id){

        var checkeditems = $("input[name='check" + id + "']:checked");
        var checkeditemslength = checkeditems.length;

        if(checkeditemslength == 0){
            return false;
        }else{
            return true;
        }
    }

    //########################################## 담기 기능 스크립트 #######################################################
    /**
     * 선택한 파일 담기 popup open
     * goUrl 은 educourse.js 상단에 정의됨.
     */
    function insertFolder(pId, loc, type){
        if("${LOGIN_ID}" == ''){
            alert('로그인이 필요한 서비스입니다.');
            location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
            return;
        }

        if(type == 'single') {
        	viewFolder2015(pId, loc);

        	//pop_open('savePostionsetPop', pId);
        	//$("#savePositionsetPop > pop1SelVal").val(pId);
        }else{
            var keyVal = "";
            if( _isChecked(pId) ){
                // 선택한 컨텐츠의 키값 연결
                var len =$('input[name=check'+pId+']:checked').length;
                $('input[name=check'+pId+']:checked').each(function(index){
                    if ( index == len-1 ) {
                        keyVal += $(this).val();
                    } else {
                        keyVal += $(this).val()+",";
                    }
                });

                viewFolder2015(keyVal, loc);

                // 1. 폴더 팝업 레이어 열기 incHeader.jsp 에 있다.
                //pop_open('savePostionsetPop', keyVal);
                // 팝업 히든 필드에 선택한 키값 넣어줌
                //$("#savePositionsetPop > pop1SelVal").val(keyVal);
            }else{
                alert('자료를 먼저 선택해 주세요. ');
            }
        }

    }

    /**
     * 선택한 파일 담기 popup open
     * goUrl 은 educourse.js 상단에 정의됨.
     */
    function insertFolderMove(pId, loc, type){
        if("${LOGIN_ID}" == ''){
            alert('로그인이 필요한 서비스입니다.');
            location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
            return;
        }

        //multi 형식으로만 처리됨
        if(type == 'single') {
        	viewFolderMove(pId, loc);

        	//pop_open('savePostionsetPop', pId);
        	//$("#savePositionsetPop > pop1SelVal").val(pId);
        }else{
            var keyVal = "";
            var folderId = "";

            if( _isChecked(pId) ){
            	var count = 0;
            	var len = $('input[name=check'+pId+']:checked').length;

            	$("input[name=check"+pId+"]:checkbox").each(function(index){
        	   		if ( $(this).attr("checked") == "checked") {
        	   			folderId = $("input[name=folderId]").eq(index).val();

        	   			count++;

        	   			if ( len == count) {
                            keyVal += folderId + "-" + $(this).val();
                        } else {
                            keyVal += folderId + "-" + $(this).val()+",";
                        }
        	   		}
        	   	});

                viewFolderMove(keyVal, loc);
            }else{
                alert('자료를 먼저 선택해 주세요. ');
            }
        }

    }

    var FIDLIST  = "";
	var LNBPOS = "";
	function FolderappendOption(objname,code,val)
	{

		   $("#"+objname).append("<option value='"+ code +"'>"+ val +"</option>");

	}

	function end2015(val)
	{
		if(val=="1")
		{
			$('#folderData').hide(0);
		} else {

			$('#confirmPutData').hide(0);
		}



	}

	function FolderclearOption(objname)
	{
		   $("#"+objname).html("");
	}




	function addFolderST12015()
	{
		if (document.getElementById("newName1").style.display == "none")
		{
			document.getElementById("newName1").style.display = "";
			document.getElementById("newName2").style.display = "";

			document.getElementById("newName0").style.display = "none";
		}
		else {

			document.getElementById("newName0").style.display = "";

			document.getElementById("newName1").style.display = "none";
			document.getElementById("newName2").style.display = "none";

			$("#newName").val("한글, 영문 포함 10자 이내"); //디폴트 메세지
		}
	}

	function addFolderST22015()
	{
		//폴더  / 분류 추가
		if("${LOGIN_ID}" == ''){
	        alert('로그인이 필요한 서비스입니다.');
	        location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
	        return;
	    }

		// 교사 인증체크
		var loginChk = loginStateCheck("certify");
		if (loginChk == "fail") {
			return;
		}

		if($("#newName").val() == "" || $("#newName").val() == "한글, 영문 포함 10자 이내")
		{
			alert("분류명을 입력해주세요");
			$("#newName").focus();
			return;
		}

		$.ajax({
	        type: "POST",
	        url: "/common/folderList2015.do",
	        cache: false,
	        async: false,
	        dataType: "json",
	        data: {channel : "folderMake" , code1 : $("#newName").val()  ,  vivasamformat : "json"},
	        success: function(data){
	        	if (LNBPOS == "move") {
	        		viewFolderMove(FIDLIST);
	        	}
	        	else {
	        		viewFolder2015(FIDLIST);
	        	}

	        	addFolderST12015();
	        	document.getElementById("folder2015").value = data[0].code;
	        },
	        error: function (xhr, ajaxOptions, thrownError){//

	        },
	        complete:function (xhr, textStatus){

	        }
        });

	}

	function addFolderST32015(channel)
	{
		//담기 실행.
		//폴더  / 분류 추가
		if("${LOGIN_ID}" == ''){
	        alert('로그인이 필요한 서비스입니다.');
	        location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
	        return;
	    }

		// 교사 인증체크
		var loginChk = loginStateCheck("certify");
		if (loginChk == "fail") {
			return;
		}

		//위치 이동하려고 선택한 자료수
		var putDataCount = FIDLIST.split(",").length;
		var selectChannel = (channel == "" ? "addfolderContent" : "addfolderContentMove");

		$.ajax({
	        type: "POST",
	        url: "/common/folderList2015.do",
	        cache: false,
	        async: false,
	        dataType: "json",
	        data: {channel : selectChannel, code1 : document.getElementById("folder2015").value , code2 :  FIDLIST , code3 : LNBPOS , vivasamformat : "json"},
	        success: function(data){

	        	//메세지 레이어 박스의 안내 메세지 초기화
	        	$("#myPutDatacomment").html("<span>나의 교실 &gt; 자료관리 경로</span>에 자료가 추가되었습니다.<br />지금 확인하시겠습니까?");

	        	if (selectChannel == "addfolderContent") {
	        		//담으려는 자료수와 담겨져 있는 자료가 같은 경우
	        		if (data[0].code == "DUPL" && putDataCount == Number(data[0].name)) {
	        			$("#myPutDatacomment").html("<span>이미 나의 교실에 자료가 담겨져 있습니다.</span>");
	        		}
	        		else if (data[0].code == "DUPL" && putDataCount > data[0].name) {
	        			$("#myPutDatacomment").html("<span>이미 담겨진 자료를 제외한 " + (putDataCount - data[0].name) + "건의 자료가 담겼습니다.</span>");
	        		}
	        		else {
	        			//선택한 모든 자료가 새롭게 담긴 경우
	        		}
	        	}
	        	//나의 교실 > 담은 자료 > 자료 위치 이동 기능 처리시 호출
        		else if (selectChannel == "addfolderContentMove") {
        			//alert(putDataCount + " | " + data[0].name);
        			//이동하려는 자료수와 이동하고자 하는 분류에 담겨져 있는 자료가 같은 경우
	        		if (data[0].code == "DUPL" && Number(putDataCount) == Number(data[0].name)) {
	        			$("#myPutDatacomment").html("<span>이동하려는 분류에 이미 자료가 담겨져 있습니다.</span>");

	        			$("#myPutDataMove").hide();
	        		}
	        		else if (data[0].code == "DUPL" && putDataCount > Number(data[0].name)) {
	        			$("#myPutDatacomment").html("<span>이미 담겨진 자료를 제외한 " + (putDataCount - Number(data[0].name)) + "건의 자료가 이동되었습니다.</span>");

	        			$("#myPutDataMove").hide();
	        			$("#myPutDataClose").attr("href", "/myclass/myPutDataList.do?folderId=" + document.getElementById("folder2015").value);
	        		}
	        		else {
	        			//선택한 모든 자료가 이동된 경우
	        			$("#myPutDatacomment").html("<span>자료의 위치가 이동되었습니다.</span>");

	        			$("#myPutDataMove").hide();
	        			$("#myPutDataClose").attr("href", "/myclass/myPutDataList.do?folderId=" + document.getElementById("folder2015").value);
	        		}
        		}

	        	$('#folderData').hide(0);
        		$('#confirmPutData').show(0);
	        },
	        error: function (xhr, ajaxOptions, thrownError){//

	        },
	        complete:function (xhr, textStatus){

	        }
        });


	}

	// ids : contentGubun-contentId,contentGubun-contentId   <-- 요형식으로...
	//담기 레이어 팝업에 자료명 뿌리기
	function viewFolder2015(idList,lnbPos)
	{
			FIDLIST = idList;
			LNBPOS = lnbPos;

		 	if("${LOGIN_ID}" == ''){
		        alert('로그인이 필요한 서비스입니다.');
		        location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
		        return;
		    }

		 	// 교사 인증체크
			var loginChk = loginStateCheck("certify");
			if (loginChk == "fail") {
				return;
			}

			var idListCnt = 1;
			//자료명
			idList = "S,"+idList;
			var _code = idList.split(",")[1];
			idListCnt = idList.split(",").length-2;

			var oID =  _code.split("-")[1];
			var oGUBUN =  _code.split("-")[0];


		    $.ajax({
		        type: "POST",
		        url: "/common/folderList2015.do",
		        cache: false,
		        async: false,
		        dataType: "json",
		        data: {channel : "folderlist" , code1 : oID ,code2 : oGUBUN ,  vivasamformat : "json"},
		        success: function(data){

		        	if (idListCnt==0) {
		        		$("#contentTitle").html("<span id=\"metaname\">" + data[0].name + "</span>");
		        	} else  {
		        		$("#contentTitle").html("<span id=\"metaname\">" + data[0].name + "</span> 외 " + idListCnt + "건");
		        	}

		        	FolderclearOption("folder2015");
		        	for (var i=1;i < data.length;i++)
		        	{
		        		FolderappendOption("folder2015",data[i].code,data[i].name);
		        	}
		        	$('#folderData').show(0);

		        },
		        error: function (xhr, ajaxOptions, thrownError){//

		        },
		        complete:function (xhr, textStatus){

		        }
	        });

	}

	//나의 교실 > 자료 관리 > 담은 자료 메뉴에서 위치이동시 호출, 심원보
	//담기 레이어 팝업에 자료명 뿌리기
	function viewFolderMove(idList,lnbPos)
	{
			FIDLIST = idList; //folder ID정보도 포함되어 있음(contentGubun, contentId 외에)
			LNBPOS = lnbPos;

		 	if("${LOGIN_ID}" == ''){
		        alert('로그인이 필요한 서비스입니다.');
		        location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
		        return;
		    }

		 	// 교사 인증체크
			var loginChk = loginStateCheck("certify");
			if (loginChk == "fail") {
				return;
			}

			var idListCnt = 1;
			//자료명
			idList = "S,"+idList;
			var _code = idList.split(",")[1];
			idListCnt = idList.split(",").length-2;

			var oID =  _code.split("-")[2];
			var oGUBUN =  _code.split("-")[1];
			var folderId =  _code.split("-")[0];

			//alert(oGUBUN + " | " + oID + " | " + folderId);

		    $.ajax({
		        type: "POST",
		        url: "/common/folderList2015.do",
		        cache: false,
		        async: false,
		        dataType: "json",
		        data: {channel : "folderlist" , code1 : oID, code2 : oGUBUN, vivasamformat : "json"},
		        success: function(data){

		        	if (idListCnt==0) {
		        		$("#contentTitle").html("<span id=\"metaname\">" + data[0].name + "</span>");
		        	} else  {
		        		$("#contentTitle").html("<span id=\"metaname\">" + data[0].name + "</span> 외 " + idListCnt + "건");
		        	}

		        	FolderclearOption("folder2015");
		        	for (var i=1;i < data.length;i++)
		        	{
		        		FolderappendOption("folder2015",data[i].code,data[i].name);
		        	}

		        	//기존 onclick 이벤트 함수를 지정한 형식으로 변경함.
		        	//나의 교실 > 자료 관리 > 담은 자료 메뉴에서 위치이동할 경우 최종 확인클릭시 호출, 심원보
		        	$("#addFolderContentId").attr('onclick', '').unbind('click');
		        	$("#addFolderContentId").bind("click", function(){
		        		addFolderST32015("addfolderContentMove");
			        });


		        	$('#folderData').show(0);

		        },
		        error: function (xhr, ajaxOptions, thrownError){//

		        },
		        complete:function (xhr, textStatus){

		        }
	        });

	}

	//########################################## 담기 기능 스크립트 #######################################################

    //파일 다운로드
    function downloadFile(pId, type, downyn){
		/*
		* IE11 버전, 호환성보기 체크 되어 있는 사용자에게는 alert 표시
		* 2021-09-27 김인수

		if(navigator.userAgent.indexOf("Trident/7.0") > -1 || (navigator.userAgent.indexOf('trident') > -1 && navigator.userAgent.indexOf('msie 7') > -1)) {
			alert("IE11 브라우저 또는 호환성 보기 설정을 통해서는 정상 다운로드가 안될 수 있습니다. \n" +
				"크롬이나 IE 엣지 이상의 브라우저를 통해 다운로드를 진행해 주세요.");
		}
*/
     if(type == 'single'){
         go_DownloadFile("ID", pId, downyn);
     }
     else{

         var keyVal = "";

         if( _isChecked(pId) ){
             // 선택한 컨텐츠의 키값 연결
             var len =$('input[name=check'+pId+']:checked').length;
             $('input[name=check'+pId+']:checked').each(function(index){
                     if ( index == len-1 ) {
                         keyVal += $(this).val();
                     } else {
                         keyVal += $(this).val()+",";
                     }
             });

             go_DownloadFile("ID", keyVal);

         }else{
             alert('자료를 먼저 선택해 주세요. ');
         }
     }
    }

    //티칭노트 호출
    function callTeachingNote(id, eduCourseId , type){
    	if("${LOGIN_ID}" == ''){
            alert('로그인이 필요한 서비스입니다.');
            location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
            return;
        }

    	if(type == "single"){
    		go_TeachingNote(eduCourseId, id);
    	}else{

    	    var keyVal = "";

    	    if( _isChecked(id) ){
    	        // 선택한 컨텐츠의 키값 연결
    	        var len =$('input[name=check'+id+']:checked').length;
    	        $('input[name=check'+id+']:checked').each(function(index){
    	                if ( index == len-1 ) {
    	                    keyVal += $(this).val();
    	                } else {
    	                    keyVal += $(this).val()+",";
    	                }
    	        });

    	        go_TeachingNote(eduCourseId, keyVal);

    	    }else{
    	        alert('자료를 먼저 선택해 주세요.');
    	    }
    	}

    }

    //전체 선택
    function chkAll(id){
    	if($('input[name=AllSelect'+id+']:checkbox').is(':checked')){
            $('input[name=check'+id+']:checkbox').each(function(error, element){
                $(this).attr('checked',true);
            });
        }else{
            $('input[name=check'+id+']:checkbox').each(function(){
              $(this).attr('checked',false);
            });
    	}
    }

    // 선택 취소
    function deCheck(id){
        $('input[name=check'+id+']:checkbox').each(function(error, element){
            $(this).attr('checked',false);
        });
        $('input[name=AllSelect'+id+']:checkbox').attr('checked',false);
    }

   	//사이트맵
   	function _siteMap() {
     	//
 		$("#siteMap").load(CONTEXTPATH + "/common/siteMap.do");///template/TextSiteMap.jsp
 		pop_open('siteMap');
   	}

	/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////교과 목록에 사용되는 기능 버튼 펑션들 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	*/

   	/**
    * 공통 팝업 열기 ( 레이어의 아이디, 선택한 키값 )
    */
   	function pop_open(){
  	 if (arguments.length == 0) return;

  	 var pop_id = arguments[0];

  	 var keyVal;
  	 var type;

  	 if (arguments.length > 1) {
           keyVal = arguments[1];
  	 } else if (arguments.length > 2) {
           type = arguments[2];
  	 }

       var layer_id = "#" + pop_id;

       // 담기 팝업의 경우에 폴더 목록을 조회하도록 함
       if(pop_id == 'savePostionsetPop') {
      	 if (location.href.indexOf("/commonviewer/viewercontent.do") != -1) {
      		 $("#savePostionsetPop").css("left", "80%");
      	 }

      	 getFolderList();
       }
       // 2013-02-17 이홍 수정 끝

       var layer_height = $(layer_id).outerHeight(true);
       var layer_width  = $(layer_id).outerWidth(true);
       scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

       if (arguments.length >= 2 && arguments.length <= 3) {
           if(keyVal != undefined){
               $("#p_"+pop_id).val(keyVal);
           }
       }

       //var layer_top = $(window).height() / 3;
		 var layer_top = $(window).height() / 3;

       // 전체메뉴보기 팝업은 화면의 상단에 올려붙도록 수정요청함 (양준석cp 2013-02-18 이홍 수)
       if(pop_id == 'siteMap'){
      	 layer_top =175;
       }
       // 2013-02-18 수정

       $(layer_id).draggable({
      	 zIndex: 100,
      	 handle : '.pop_handle'
       });
       $(layer_id).show().css({
           top : scrollTop + layer_top,
           "margin-left" : - 500
       });
   	}

    function pop_close() {
   	 if (arguments.length == 0) return;

	   	var pop_id = arguments[0];
	   	var layer_id = "#" + pop_id;

	   	$(layer_id).hide();
    }

    /*********************************** 사용자 폴더 및 담기 *******************************************************/
   	/**
     * 사용자의 폴더 목록 조회
     */
    function getFolderList(selId){
		return false;
         if(selId == undefined){
         	selId = '';
         }

         $.ajax({
             type: "POST",
             url: "/common/getFolderList.do",
             cache: false,
             async: true,
             dataType: "json",
             data: {  vivasamformat : "json" },
             success: function(data){
                 var code = data.code;
                 var message = data.msg;
                 var result = data.result;
                 var html = "";
                 var html2= "";

                 if(code == '0000'){

                 	if(result.length > 0){
                         for(var i =0; i < result.length; i ++){
                             var folderId = result[i].folderId;
                             var folderName = result[i].folderName;
                             var pFolderId = result[i].pFolderId;

                             if(selId == ''){ // 내자료홈 디폴트
                                 if(pFolderId == "0"){
                                     $("#p_selFolderId").val(folderId); // 디폴트 폴더 선택은 루트로
                                     $("#p_rootId").val(folderId);
                                     html += "<a href=\"javascript:void(0)\"  class=\"folder on\"></a><span contenteditable=\"false\" id=\"f1\" class=\"on\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this , 'move');\">"+folderName+"</span>";
                                 }else{
                                     html += "<div class=\"deps1\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span contenteditable=\"false\" id=\"f1\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this, 'move');\">"+folderName+"</span></div>";
                                 }
                             }else{
                                 if(pFolderId == "0"){
                                 	$("#p_selFolderId").val(selId); // 디폴트 폴더 선택은 넘어온 폴더아이디로
                                     $("#p_rootId").val(folderId);
                                     html += "<div class=\"deps1\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span contenteditable=\"false\" id=\"f1\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this, 'move');\">"+folderName+"</span></div>";
                                 }else if(selId == folderId){
                                 	html += "<a href=\"javascript:void(0)\"  class=\"folder on\"></a><span contenteditable=\"false\" id=\"f1\" class=\"on\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this , 'move');\">"+folderName+"</span>";
                                 }else{
                                 	html += "<div class=\"deps1\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span contenteditable=\"false\" id=\"f1\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this, 'move');\">"+folderName+"</span></div>";
                                 }


                             }


                         }
                 	}

                     $("#myFolderDiv").html(html);

                     if(result.length > 0){
                         for(var i =0; i < result.length; i ++){
                             var folderId = result[i].folderId;
                             var folderName = result[i].folderName;
                             var pFolderId = result[i].pFolderId;

                             if(pFolderId == "0"){
                                 $("#p_selFolderId").val(folderId); // 디폴트 폴더 선택은 루트로
                                 html2 += "<a href=\"javascript:void(0)\"  class=\"folder on\"></a><span contenteditable=\"false\" id=\"f1\" class=\"on\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this ,'save');\">"+folderName+"</span>";
                             }else{
                             	html2 += "<div class=\"deps1\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span contenteditable=\"false\" id=\"f1\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this, 'save');\">"+folderName+"</span></div>";
                             }
                         }
                     }

                     $("#saveFolderDiv").html(html2);


                 }
             },
             error: function (xhr, ajaxOptions, thrownError){
            //     alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
             },
             complete:function (xhr, textStatus){
      //           alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
             }
       	});
    }

    //담기위치 설정에서의 새폴더 생성
    function addSingleFolder(){
    	if($("#newDiv").length >0 ){
    		alert('새폴더 생성은 하나씩 가능합니다.');
    		return;
    	}
    	$("span[id^='f1']").removeClass("on");


    	//var newF = "<div class=\"deps1\" id=\"newDiv\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span contenteditable=\"false\" id=\"nFolderSpan\"><input type=\"text\" name=\"nFolderNm\" id=\"nFolderNm\"  value=\"새 폴더\"/></span></div>";
    	var newF = "<div class=\"deps1\" id=\"newDiv\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span id=\"nFolderSpan\"><input type=\"text\" name=\"nFolderNm\" id=\"nFolderNm\" value=\"새 폴더\">&nbsp;<a href=\"javascript:makeFolder()\"><img src=\"" + IMG_DOMAIN + "/images/common/button/btn_ok.png\"></a></span></div>";
    	$("#myFolderDiv").append(newF);
    	$("#nFolderNm").focus();
    }

    // 저장폴더선택
    function selFolder(id, name,  obj, type){
    	$("span[id^='f1']").removeClass("on");

    	$(obj).addClass("on");
    	if(type == 'move'){
    		$("#p_selFolderId").val(id);
    	}else{
    		$("#p3_selFolderId").val(id);
    		$("#p3_selFolderName").val(name);
    	}

    }

    // 저장폴더 레이어닫기
    function cancelFolderContents(type){
    	if(type == 'move'){
    	      $("span[id^='f1']").removeClass("on");
    	        $("#p_selFolderId").val('');
    	        $("#p_savePostionsetPop").val('');
    	        $("#p_type").val('');

    	        $("#savePostionsetPop").hide();
    	}else{
    	      $("span[id^='f1']").removeClass("on");
    	        $("#p3_selFolderId").val('');
    	        $("#p3_selFolderName").val('');

    	        $("#saveFolderPop").hide();
    	}

    }

    // 선택 폴더 저장폴더로 이동
    function selectFolder(){
    	$("#p3_folderid").val($("#p3_selFolderId").val())
    	$("#p3_foldernm").text($("#p3_selFolderName").val());
    	cancelFolderContents('save');
    }

    // 저장폴더에 컨텐츠 담기
    function insertFolderContents(){
    	var type = $("#p_type").val();
    	var folderId = $("#p_selFolderId").val();
    	if(folderId == ''){
    		alert('저장하실 폴더를 선택해 주십시오.');
    		return;
    	}
    	var param = $("#p_savePostionsetPop").val();

	       $.ajax({
	           type: "POST",
	           url: CONTEXTPATH  + "/mydata/moveFolder.do",
	           cache: false,
	           async: true,
	           dataType: "json",
	           data: { insertType: 'I' , folderId: folderId, targetFolderId: '', contentsData: param, vivasamformat : "json" },
	           success: function(data){
	               var code = data.code;
	               var message = data.msg;
	               var result = data.result;

	               if(code == '0000'){
	                   alert('저장 되었습니다');
	                   $("#p_selFolderId").val('');
	                   $("#p_savePostionsetPop").val('');
	                   $("#p_type").val('');
	               }else{
	               }
	           },
	           error: function (xhr, ajaxOptions, thrownError){
	          //     alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
	               vStatusFlag = false;
	           },
	           complete:function (xhr, textStatus){
	    //           alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
	               vStatusFlag = false;
	               $("#savePostionsetPop").hide();

	           }
	           });
    }

    //	2013.09.13 : eoraptor
    //	새 폴더 만들기 : 함수!!!
    //	기존 로직을 분리해서 함수로 만들었다!
    //	기존에는 엔터키 이벤트를 받아서 작동하도록 되어있던 부분이다!!!
    function makeFolder() {

    	var nFolderNm = $("#nFolderNm").val();
    	var nRootId = $("#p_rootId").val();

    	if(nFolderNm ==''){
    		if(confirm("폴더명을 입력하지 않은 경우 폴더가 생성되지 않습니다.\n새폴더 생성을 취소하시겠습니까?")){
    			// 추가한 새폴더 삭제
    			$("#newDiv").remove();
    		}else{
    			$("#nFolderNm").focus();
    		}
    	}else{
            if(confirm("입력하신 이름으로 폴더를 생성하시겠습니까?")){
                // 입력한 이름으로 폴더 생성 확인
			        var ajaxData = {folderName : nFolderNm
			                        , pFolderId : nRootId
			                        , depth :  "2"
			                        , educourseId :  ""
			                        , vivasamformat : "json" };

			        $.ajax({
			            type: "POST",
			            url: CONTEXTPATH + "/common/addNewFolder.do",
			            cache: false,
			            async: true,
			            dataType: "json",
			            data: ajaxData,
			            success: function(data){
			                var code = data.code;
			                var message = data.msg;
			                var result = data.result; //생성된 폴더아이디
			                if(code == '0000'){
			                	$("#nFolderNm").hide(); // input box hide
			                	$("#nFolderSpan").text(nFolderNm).addClass("on"); // nFolderNm insert to span tag
			                	$("#p_selFolderId").val(result); // added folderid into param

			                }
			            },
			            error: function (xhr, ajaxOptions, thrownError){
			            },
			            complete:function (xhr, textStatus){
			            }
			            });
                // 폴더 생성후 선택되도록 함

            }
    	}
    }

    /*********************************** 사용자 폴더 및 담기 *******************************************************/

    /*********************************** 티칭노트 *******************************************************/
    /**
     * 티칭노트 연결 (keyVal : CN070-LPID) - 신규교안으로 생성하여 연결
     *
     * 작 업 자 : 이홍
     * 주석작성자 : 김남배
     * 주석작성일 : 2014.01.13
     * 내    용 : 티칭노트 뷰어 호출 - 임시 교안 생성하여 보여주기
     *           go_TeachingNoteIfr()는 checkTN.jsp 파일에 정의되어 있음
     *           내부에서 회원 로그인 체크하는 로직 붙어있음
     * 사 용 법 : go_TeachingNote(educourseId, 'CN070-1000,CN070-2000')
     *          교안번호 여러개 , 로 구분해서 사용가능함 - 이 경우 신규 교안코드 하나에 슬라이드들이 합쳐져 보여짐
     */
    function go_TeachingNote(educourseId, keyVal){
         var iframe_Id = $('#ifrTn').attr('id');// incFooter.jsp 안에 체크하는 jsp 있다.
         document.getElementById(iframe_Id).contentWindow.go_TeachingNoteIfr(educourseId, keyVal);
    }

    /**
     * 티칭노트 연결 (에디터)
     *
     * 작 업 자 : 이홍
     * 주석작성자 : 김남배
     * 주석작성일 : 2014.01.13
     * 내    용 : 티칭노트 에디터 호출 - 내교안 수정으로 바로 이동함
     *           go_TeachingNoteEditorIfr()는 checkTN.jsp 파일에 정의되어 있음
     *           근데 인자값이 다름, 여기서는 educourseId 를 넘겨주는 것으로 되어 있는데 받는부분은 교안번호(lp_id)를 받는것을 되어 있음 (확인필요함)
     *           내부에서 회원 로그인 체크하는 로직 붙어있음
     */
    function go_TeachingNoteEditor(lpid){
         var iframe_Id = $('#ifrTn').attr('id');// incFooter.jsp 안에 체크하는 jsp 있다.
         document.getElementById(iframe_Id).contentWindow.go_TeachingNoteEditorIfr(lpid);
    }

    /**
     * 티칭노트 연결 (나의 교안 뷰어)
     *
     * 작 업 자 : 이홍
     * 주석작성자 : 김남배f
     * 주석작성일 : 2014.01.13
     * 내    용 : 티칭노트 뷰어 호출 - 전달된 교안번호의 소유주로 인식함
     *           go_TeachingNoteViewer()는 checkTN.jsp 파일에 정의되어 있음
     *           근데 인자값이 다름, 여기서는 educourseId 를 넘겨주는 것으로 되어 있는데 받는부분은 교안번호(lp_id)를 받는것을 되어 있음 (확인필요함)
     *           내부에서 회원 로그인 체크하는 로직 붙어있음
     */
    function go_TeachingNoteViewer(lpid){
         var iframe_Id = $('#ifrTn').attr('id');// incFooter.jsp 안에 체크하는 jsp 있다.
         document.getElementById(iframe_Id).contentWindow.go_TeachingNoteViewer(lpid);
    }

    /**
      * 열린 샘터 에서 사용할 티칭노트 (****)뷰어(****) 연결
      *
      * 작 업 자 : 이홍
      * 주석작성자 : 김남배
      * 주석작성일 : 2014.01.13
      * 내    용 : 열린샘터와 같이 관리자에서 글의 내부에서 티칭노트를 열어야 할때 사용되는 용도로 제작된 것으로 파악됨
      *           go_TeachingNoteIfr()는 checkTN.jsp 파일에 정의되어 있음
      *           넘겨주는 인자값 '999999' 는 티칭노트에서 사용할 비교과 단원코드 임 (티칭노트 내부의 비교과 단원코드 처리내용 파악 필요할듯)
      *           함수명은 에디터 인데 실제 동작부분은 뷰어로 연결되는 것임 (추수 명칭 변경 필요할 것으로 사료됨) - 여기서의 에디터는 관리자 Html Editer를 의미함
      *           내부에서 회원 로그인 체크하는 로직 붙어있음 (인자값의 userid 는 필요없는듯하나 과거에 입력된것이 있어 유지되고 있음)
      *           인자값을 조합하여 기존 정의된 함수인 go_TeachingNote() 로 전달하도록 수정함
      */
    function go_TeachingNote4Editor(lpid, userid){
          //var iframe_Id = $('#ifrTn').attr('id');// incFooter.jsp 안에 체크하는 jsp 있다.
          var keyVal = "CN070-"+lpid;
          //document.getElementById(iframe_Id).contentWindow.go_TeachingNoteIfr('999999', keyVal);

          go_TeachingNote('999999', keyVal);
    }
    /*********************************** 티칭노트 *******************************************************/


    /*********************************** 헤더 상단의 중고등 교과 메뉴 클릭시 처리 *******************************************************/
    //중학 과목 조회
    function getGnbSub(gubun) {
       $.ajax({
           type: "POST",
           url: CONTEXTPATH + "/courseinfo/getSubjectGroupList.do",
           cache: true,
           async: true,
           dataType: "json",
           data: { gubun : gubun , vivasamformat : "json" },
           success: function(data){
               var code = data.code;
               var message = data.msg;
               var result = data.result;

               makeSubjectGrp(result, gubun);
           },
           error: function (xhr, ajaxOptions, thrownError){
          		//     alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
               vStatusFlag = false;
           },
           complete:function (xhr, textStatus){
           	// 교과서 조회 호출
    			// alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
           	//getTextbookList(defaultTextbook, 'MS', '');
               vStatusFlag = false;
           }
		});
   	}

    String.prototype.right = function(length){
        if(this.length <= length){
           return this;
        } else {
           return this.substring(this.length - length, this.length);
        }
     }

	/**
    * 교과 과목 html 그리기
    */
    function makeSubjectGrp(result, gb){
    	var html = "";
    	var classOn = "";
    	var classOnLi = "";
        var selSubject = "";
        if (gb != 'ES' && gb != 'NES') {
        	selSubject = result[0].subject;
        } else {
        	var chkMemberGrade = (memberGrade != null && memberGrade != '') ? memberGrade.right(1) : '';
        	var ranNum = (chkMemberGrade != '') ? chkMemberGrade : Math.floor(Math.random()*(6-1+1)) + 1;
        	//alert("TEST makeSubJectGrp : " + memberGrade + " / " + chkMemberGrade + " / " + ranNum);
        	selSubject = "ES" + ranNum;
        	result = [];
        }

    	for(var i=0 ; i < result.length; i ++){
			// 첫번째 탭 선택 처리, userMainSubjectCd는 incHeaderNew.jsp 에 선언되어 있음.
            if(result[i].cafesubject == userMainSubjectCd){
                selSubject = result[i].subject;
                classOn = "on";
            }
            else{
                classOn = "";
            }
            if(result[i].newIconViewYn == "Y"){
                classOnLi = "new";
            }
            else{
            	classOnLi = "";
            }

            if(gb == 'ES') {
	//			 	html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('"+result[i].subject+"', '"+gb+"', this);\"><a href=\"javascript:void(0);\" id="+result[i].subject+" class=\""+classOn+"\">" + result[i].subjectnm + "</a></li>";
	        }
            else if(gb == 'MS'){
            	if (
            			(result[i].subject == "SC304" || result[i].subject == "SC307" || result[i].subject == "SC324")
            			|| (result[i].subject == "SC310" || result[i].subject == "SC345")
            			|| (result[i].subject == "SC333" || result[i].subject == "SC334" || result[i].subject == "SC335")
            	){
            		if (result[i].subject == "SC304") html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('"+ "_" + result[i].subject + "_" +"', '"+gb+"', this);\"><a href=\"javascript:void(0);\" id="+"_" + result[i].subject + "_"+" class=\""+classOn+"\">" + "사회,역사,도덕" + "</a></li>";
            		else if (result[i].subject == "SC310") html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('"+ "_" + result[i].subject + "_" +"', '"+gb+"', this);\"><a href=\"javascript:void(0);\" id="+"_" + result[i].subject + "_"+" class=\""+classOn+"\">" + "기술∙가정,정보" + "</a></li>";
            		else if (result[i].subject == "SC333") html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('"+ "_" + result[i].subject + "_" +"', '"+gb+"', this);\"><a href=\"javascript:void(0);\" id="+"_" + result[i].subject + "_"+" class=\""+classOn+"\">" + "음악,미술,체육" + "</a></li>";
            	} else {
            		html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('"+result[i].subject+"', '"+gb+"', this);\"><a href=\"javascript:void(0);\" id="+result[i].subject+" class=\""+classOn+"\">" + result[i].subjectnm + "</a></li>";
            	}
    		}
    		else{
    			if (
            			(result[i].subject == "SC315" || result[i].subject == "SC323" || result[i].subject == "SC318")
            			|| (result[i].subject == "SC347" || result[i].subject == "SC348")
            			|| (result[i].subject == "SC349" || result[i].subject == "SC350" || result[i].subject == "SC351")
            	){
            		if (result[i].subject == "SC315") html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('"+ "_" + result[i].subject + "_" +"', '"+gb+"', this);\"><a href=\"javascript:void(0);\" id="+ "_" + result[i].subject + "_" +" class=\""+classOn+"\">" + "사회,역사,도덕" + "</a></li>";
            		else if (result[i].subject == "SC347") html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('"+ "_" + result[i].subject + "_" +"', '"+gb+"', this);\"><a href=\"javascript:void(0);\" id="+ "_" + result[i].subject + "_" +" class=\""+classOn+"\">" + "기술∙가정,정보" + "</a></li>";
            		else if (result[i].subject == "SC349") html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('"+ "_" + result[i].subject + "_" +"', '"+gb+"', this);\"><a href=\"javascript:void(0);\" id="+ "_" + result[i].subject + "_" +" class=\""+classOn+"\">" + "음악,미술,체육" + "</a></li>";
            	} else {
            		html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('"+result[i].subject+"', '"+gb+"', this);\"><a href=\"javascript:void(0);\" id="+result[i].subject+" class=\""+classOn+"\">" + result[i].subjectnm + "</a></li>";
            	}
    		}
    	}

//    	if (gb == 'ES') {
//    		html += "<li class=\"new\" onclick=\"javascript: ESAddedList('ES_KL');\"><a href=\"javascript:void(0);\" id=\"ES_KL\" class=\"on\">국어</a></li>" +
//			"<li class=\"new\" onclick=\"javascript: ESAddedList('ES_MT');\"><a href=\"javascript:void(0);\" id=\"ES_MT\" class=\"on\">수학</a></li>" +
//			"<li class=\"new\" onclick=\"javascript: ESAddedList('ES_HT');\"><a href=\"javascript:void(0);\" id=\"ES_HT\" class=\"on\">사회</a></li>" +
//			"<li class=\"new\" onclick=\"javascript: ESAddedList('ES_SC');\"><a href=\"javascript:void(0);\" id=\"ES_SC\" class=\"on\">과학</a></li>";
//    	}
    	if(gb == 'ES') { // 2020 개편 테이블 수정을 피하기 위해 학년은 하드코딩함
        	html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('ES1', 'ES', this);\"><a href=\"javascript:void(0);\" id=\"ES1\" class=\""+classOn+"\">1학년</a></li>";
        	html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('ES2', 'ES', this);\"><a href=\"javascript:void(0);\" id=\"ES2\" class=\""+classOn+"\">2학년</a></li>";
        	html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('ES3', 'ES', this);\"><a href=\"javascript:void(0);\" id=\"ES3\" class=\""+classOn+"\">3학년</a></li>";
        	html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('ES4', 'ES', this);\"><a href=\"javascript:void(0);\" id=\"ES4\" class=\""+classOn+"\">4학년</a></li>";
        	html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('ES5', 'ES', this);\"><a href=\"javascript:void(0);\" id=\"ES5\" class=\""+classOn+"\">5학년</a></li>";
        	html += "<li class=\""+classOnLi+"\" onclick=\"javascript: selectSbujectTab('ES6', 'ES', this);\"><a href=\"javascript:void(0);\" id=\"ES6\" class=\""+classOn+"\">6학년</a></li>";
        }

    	$("#" + gb + "SubTab").html(html);

    	selectSbujectTab(selSubject, gb, $("#" + selSubject));
    }

    function ESAddedList(addedCode) {
//    	$(".subTab li > a").removeClass("on");
//    	$("#"+addedCode).addClass("on");

    	$(".subTab ul li").each(function(){
            $(this).removeClass("on");
        });
    	$("#" + addedCode).parent().addClass("on");

    	$(".ESAddedLayout").each(function(){
            $(this).hide();
        });
    	$("#originBooklist").hide();

    	$("#" + addedCode + "_layout").show();
    }

    //교과목별 관련 컨텐츠 링크 이미지 버튼 처리
    var incHearderValueSubjectCode = "";
    function selectSbujectTab(subject, gb, obj){

    	var tempUserMainSubjectCd = "";
        if (subject == "SC304" || subject == "SC307" || subject == "SC324") tempUserMainSubjectCd = "_SC304_";
 		else if (subject == "SC310" || subject == "SC345") tempUserMainSubjectCd = "_SC310_";
 		else if (subject == "SC333" || subject == "SC334" || subject == "SC335") tempUserMainSubjectCd = "_SC333_";
 		else if (subject == "SC315" || subject == "SC323" || subject == "SC318") tempUserMainSubjectCd = "_SC315_";
 		else if (subject == "SC347" || subject == "SC348") tempUserMainSubjectCd = "_SC347_";
 		else if (subject == "SC349" || subject == "SC350" || subject == "SC351") tempUserMainSubjectCd = "_SC349_";
 		else tempUserMainSubjectCd = subject;

    	//교과목 클릭시 클릭한 과목으로 교과서 목록 상단 좌측의 명칭 변경
    	if ($(obj).text() != "") {
    		$("#" + gb + "SubjectNm").html($(obj).text());
    	}

    	if (subject == "SC322") {
    		$(".targetService").eq(1).css("display","block"); //고등 > 과학 > 수능기출문제
    	}
    	else {
    		$(".targetService").eq(1).css("display","none"); //고등 > 과학 > 수능기출문제
    	}

    	incHearderValueSubjectCode = subject; //문제은행, 수박씨->온리원 추천 강의 교과목 비교를 위해 전역 변수로 사용

    	//수박씨->온리원 추천 강의 hidden 처리(디폴트)
    	//$("#soobakcRecomLec").hide();

    	getTextbookList(tempUserMainSubjectCd, gb, '');
    }

    /**
    * 교과목에 해당하는 교과서 목록 조회
    */
    function getTextbookList(subjectGrpCd, gb, mdValue){
//    	$(".subTab li > a").removeClass("on"); // 전체 교과목명 선택 초기화
//    	$("#"+subjectGrpCd).addClass("on");
    	$(".subTab ul li").each(function(){
            $(this).removeClass("on");
        });
    	$("#" + subjectGrpCd).parent().addClass("on");
    	// 초등 임시 교과 히든 처리
    	$(".ESAddedLayout").each(function(){
            $(this).hide();
        });
    	$("#originBooklist").show();



    	//교육 과정 버튼 초기화(새로운 교과서 정보 뿌려주기 전에...)
//    	eduYearCourseChange(gb, '2015'); //교육 과정 년도 2009로 설정, 기존 2007로 선택했다 교과목을 클릭하면 2007이 유지되는 현상 해결 위해 2009로 초기화
    	//$("#" + gb + "EduYearImg2007").parent().show(); //2007 교육 과정 숨김 처리된 경우가 있어 보이는 것으로 초기화

        $.ajax({
            type: "POST",
            url: CONTEXTPATH + "/courseinfo/getTextbookListbyGrpCd.do",
            cache: true,
            async: true,
            dataType: "json",
            data: { subjectGrpCd : subjectGrpCd , mdValue: mdValue, vivasamformat : "json" },
            success: function(data){
                var code = data.code;
                var message = data.msg;
                var result = data.result;

                makeTextbook2019(result, gb, mdValue);
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

    /**
    * 교과서 그리기
    */
    function makeTextbook(result, gb, mdValue){
        var group2015_1 = "";
        var group2015_2 = "";
		var group2015_3 = "";
		var group2015_4 = "";
		var group2015_5 = "";

        var group2009_1 = "";
        var group2009_2 = "";
        var group2009_3 = "";


        var sideCd = '';
        //교육 과정 년도별 교과서 목록 만들기
        for(var i=0 ; i < result.length; i ++){
            var eduImage = "";
            var newImage = "";

            //교과명 우측에 new 이미지 버튼 표시
            if(result[i].newIconViewYn == 'Y'){
            	newImage = "<img src=\"" + IMG_DOMAIN + "/images/new/ico_new_05.gif\" alt=\"\" />";
            }

            var css = "";
            var click = CONTEXTPATH + '/educourse/index.do?textbookCd='+result[i].textbook;

            var newCodeList = ['106243','106245','106246','106247','106248','106269','106270','106273','106274','106275','106278','106279','106280','106281','106282','106287','106288','106289','106290','106291','106292'];
        	// '106271','106272','106277','106286' USE_YN 이 Y 처리되면 그냥 보임, 위 리스트와 아래 IF문 활성화 // 1차 오픈
        	// '106276','106283','106284','106285' 배열에서 제거 // 2차 오픈
            // '106243','106245','106246','106247','106248' 기존에 비공개 처리되있던 코드 3차 오픈
            // '106243','106245','106246','106247','106248','106269','106270','106273','106274','106275','106278','106279','106280','106281','106282','106287','106288','106289','106290','106291','106292' // 3차 전체 코드

            if ($.inArray(result[i].textbook, newCodeList) != -1) {
//            	css = 'class="soon"';
//        		click = 'javascript:useYn3Alert();'
//            	newImage = "<img src=\"" + IMG_DOMAIN + "/images/new/ico_new_05.gif\" alt=\"\" />";
            }

            if(result[i].useYn == 'N'){
            	css = 'class="soon"';
            	if (result[i].textbook == '106243' || result[i].textbook == '106245' || result[i].textbook == '106246' || result[i].textbook == '106247' || result[i].textbook == '106248' || result[i].textbook == '106292') { // Use_YN이 N 인데 준비중 상태로 놓을 코드를 기입
            		click = 'javascript:useYn3Alert(\''+result[i].textbooknm+'\');';
            	} else {
            		click = 'javascript:useYn2Alert(\''+result[i].textbooknm+'\');';
            		css = 'style="display:none"';
            	}
            }

            if(result[i].useYn == 'R'){
            	css = 'class="soon"';
            	click = 'javascript:useYn2Alert(\''+result[i].textbooknm+'\');';

            }

            if(result[i].eduYear == '2015'){
            	if(result[i].groupNo == '1'){
            		group2015_1 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href=\""+click+"\">";
            		group2015_1 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            	}
            	if(result[i].groupNo == '2'){
            		group2015_2 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
            		group2015_2 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            	}
            	if(result[i].groupNo == '3'){
            		group2015_3 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
            		group2015_3 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            	}
				if(result[i].groupNo == '4'){
					group2015_4 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
					group2015_4 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
				}
				if(result[i].groupNo == '5'){
					group2015_5 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
					group2015_5 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
				}
            }
            /*
            else if(result[i].eduYear == '2009' && (result[i].textbook == '106071' || result[i].textbook == '106072' || result[i].textbook == '106046' || result[i].textbook == '106047'
           	 	|| result[i].textbook == '106094' || result[i].textbook == '106109' || result[i].textbook == '106110')) {

            	if(result[i].textbook == '106071' || result[i].textbook == '106072' || result[i].textbook == '106046' || result[i].textbook == '106047'
               	 	|| result[i].textbook == '106094' || result[i].textbook == '106109' || result[i].textbook == '106110'){

            		group2009_1 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
        			group2009_1 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";

            	}else{
            		if(result[i].groupNo == '1' ){
            			group2009_1 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
            			group2009_1 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            		}
            		if(result[i].groupNo == '2'){
            			group2009_2 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
            			group2009_2 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            		}
            		if(result[i].groupNo == '3'){
            			group2009_3 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
            			group2009_3 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            		}
            	}

            }
			*/
            var cnt = 0;
            //교과서별 사이드 버튼 메뉴 뿌리기
            if (i == 0 && result[i].sideMenuCd != "") {
            	$('.textbookSideMenu').each(function(){
                    if (result[i].sideMenuCd.indexOf($(this).attr("id")) != -1) {
                    	$(this).show();
                    	cnt++;
                    	sideCd = result[i].sideMenuCd;
                    }
                    else {
                    	$(this).hide();
                    }
                });

            }
            else if (i == 0 && result[i].sideMenuCd == "") {
            	//메뉴 클릭으로 노출된 정보가 있을 수 있어 모두 숨김 처리
            	$('.textbookSideMenu').each(function(){
                    $(this).hide();
                });
            }
        }

    	if(sideCd.length > 4){
    		$('.workBook').addClass("wide");;
    	}else{
    		$('.workBook').removeClass("wide");
    	}

        //교육 과정 년도별 교과서 목록 뿌리기
        $("#" + gb + "Book2015").html('');
        $("#" + gb + "Book2009").html('');

        var cnt = 0;
        var cnt1 = 0;

        if (group2015_1 !=  "") {
    		$("#" + gb + "Book2015").html("<ul>" + group2015_1 + "</ul>");
    		cnt++;
    	}
    	if (group2015_2 !=  "") {
    		$("#" + gb + "Book2015").append("<ul>" + group2015_2 + "</ul>");
    		cnt++;
    	}
    	if (group2015_3 !=  "") {
    		$("#" + gb + "Book2015").append("<ul>" + group2015_3 + "</ul>");
    		cnt++;
    	}
		if (group2015_4 !=  "") {
			$("#" + gb + "Book2015").append("<ul class=\"list4\">" + group2015_4 + "</ul>");
			cnt++;
		}
		if (group2015_5 !=  "") {
			$("#" + gb + "Book2015").append("<ul class=\"list5\">" + group2015_5 + "</ul>");
			cnt++;
		}

    	//2007은 기본 hide
    	if (group2009_1 !=  "") {
    		$("#" + gb + "Book2009").html("<ul>" + group2009_1 + "</ul>");
    		cnt1++;
    	}
    	if (group2009_2 !=  "") {
    		$("#" + gb + "Book2009").append("<ul>" + group2009_2 + "</ul>");
    		cnt1++;
    	}
    	if (group2009_3 !=  "") {
    		$("#" + gb + "Book2009").append("<ul>" + group2009_3 + "</ul>");
    		cnt1++;
    	}



    	if (group2009_1 == "") {
    		$("#" + gb + "Book2009").html('');
    		$("#" + gb + "EduYearImg2009").parent().hide(); //2007년 교육 과정 없을 경우 숨김
    	}
    	else {
    		$("#" + gb + "EduYearImg2009").parent().show();
    	}

    	if(cnt > 0 && cnt1 == 0){
    		$("#" + gb + "Book2009ara").css('margin-top', '15px');
    		$("#" + gb + "Book2009tit").css('top', '16px');
    		$("#" + gb + "Book2009").css('border-top', '0px dashed #d5d5d5');
    		$("#" + gb + "Book2009").css('padding-top', '15px');
    	}else if(cnt == 0 && cnt1 > 0){
    		$("#" + gb + "Book2009area").css('margin-top', '0px');
    		$("#" + gb + "Book2009tit").css('top', '0px');
    		$("#" + gb + "Book2009").css('border-top', '0px dashed #d5d5d5');
    		$("#" + gb + "Book2009").css('padding-top', '0px');
    	}else{
    		$("#" + gb + "Book2009area").css('margin-top', '15px');
    		$("#" + gb + "Book2009tit").css('top', '16px');
    		$("#" + gb + "Book2009").css('border-top', '1px dashed #d5d5d5');
    		$("#" + gb + "Book2009").css('padding-top', '15px');
    	}
	}

    function makeTextbook2019(result, gb, mdValue){
        var group2015_1 = "";
        var group2015_2 = "";
        var group2015_3 = "";
		var group2015_4 = "";
		var group2015_5 = "";

        var group2009_1 = "";
        var group2009_2 = "";
        var group2009_3 = "";


        var sideCd = '';
        //교육 과정 년도별 교과서 목록 만들기
        for(var i=0 ; i < result.length; i ++){
            var eduImage = "";
            var newImage = "";

            //교과명 우측에 new 이미지 버튼 표시
            if(result[i].newIconViewYn == 'Y'){
            	newImage = "<img src=\"" + IMG_DOMAIN + "/images/new/ico_new_05.gif\" alt=\"\" />";
            }

            var css = "";
            var click = "";
            if (result[i].school != 'NES') {
            	click = CONTEXTPATH + '/educourse/index.do?textbookCd='+result[i].textbook;
            } else {
//            	click = CONTEXTPATH + '/educourse/eleIndex.do?schoolYear='+result[i].grade+'&schoolTerm='+result[i].term+'&courseCd='+result[i].course+'&textbookCd='+result[i].textbook;
            	click = CONTEXTPATH + '/educourse/index.do?textbookCd='+result[i].textbook;
            }

            var newCodeList = ['106243','106245','106246','106247','106248','106269','106270','106273','106274','106275','106278','106279','106280','106281','106282','106287','106288','106289','106290','106291','106292'];
        	// '106271','106272','106277','106286' USE_YN 이 Y 처리되면 그냥 보임, 위 리스트와 아래 IF문 활성화 // 1차 오픈
        	// '106276','106283','106284','106285' 배열에서 제거 // 2차 오픈
            // '106243','106245','106246','106247','106248' 기존에 비공개 처리되있던 코드 3차 오픈
            // '106243','106245','106246','106247','106248','106269','106270','106273','106274','106275','106278','106279','106280','106281','106282','106287','106288','106289','106290','106291','106292' // 3차 전체 코드
            if ($.inArray(result[i].textbook, newCodeList) != -1) {
//            	css = 'class="soon"';
//        		click = 'javascript:useYn3Alert();'
//            	newImage = "<img src=\"" + IMG_DOMAIN + "/images/new/ico_new_05.gif\" alt=\"\" />";
            }

            // 2020년 1차 검수코드 숨김
            /*
            var hideCodeList = ['106312','106315','106316','106317','106318','106319']; // '106313','106314','106320','106321', 1차 오픈
            if($.inArray(result[i].textbook, hideCodeList) != -1){
//            	css = 'class="soon"'; // GNB에서 비활성처리 (CSS 수정 필요)
            	css = 'style="display:none"'; // GNB에서 안보이게
            	click = "javascript:useYn2Alert(\'"+result[i].textbooknm.replace(/ /gi, "")+"\');";
            }*/
            // 2020년 1차 검수코드 숨김

            if(result[i].useYn == 'N'){
            	css = 'class="soon"';
            	if (result[i].textbook == '106243' || result[i].textbook == '106245' || result[i].textbook == '106246' || result[i].textbook == '106247' || result[i].textbook == '106248' || result[i].textbook == '106292') { // Use_YN이 N 인데 준비중 상태로 놓을 코드를 기입
            		click = 'javascript:useYn3Alert(\''+result[i].textbooknm+'\');';
            	} else {
            		click = 'javascript:useYn2Alert(\''+result[i].textbooknm+'\');';
            		css = 'style="display:none"';
            	}
            }

            if(result[i].useYn == 'R'){
            	css = 'class="soon"'; // GNB에서 비활성처리 (CSS 수정 필요)
//            	css = 'style="display:none"'; // GNB에서 안보이게
            	click = "javascript:useYn2Alert(\'"+result[i].textbooknm.replace(/ /gi, "")+"\');";
            }

            if(result[i].eduYear == '2015'){
            	if(result[i].groupNo == '1'){
            		group2015_1 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
            		group2015_1 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            	}
            	if(result[i].groupNo == '2'){
            		group2015_2 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
            		group2015_2 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            	}
            	if(result[i].groupNo == '3'){
            		group2015_3 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
            		group2015_3 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            	}
				if(result[i].groupNo == '4'){
					group2015_4 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
					group2015_4 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
				}
				if(result[i].groupNo == '5'){
					group2015_5 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
					group2015_5 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
				}
            }
            /*
            else if(result[i].eduYear == '2009' && (result[i].textbook == '106071' || result[i].textbook == '106072' || result[i].textbook == '106046' || result[i].textbook == '106047'
            	 || result[i].textbook == '106094' || result[i].textbook == '106109' || result[i].textbook == '106110')) {

            	if(result[i].textbook == '106071' || result[i].textbook == '106072' || result[i].textbook == '106046' || result[i].textbook == '106047'
               	 || result[i].textbook == '106094' || result[i].textbook == '106109' || result[i].textbook == '106110'){

        			group2009_1 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
        			group2009_1 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";

            	}else{
            		if(result[i].groupNo == '1'){
            			group2009_1 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
            			group2009_1 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            		}
            		if(result[i].groupNo == '2'){
            			group2009_2 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
            			group2009_2 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            		}
            		if(result[i].groupNo == '3'){
            			group2009_3 += "<li id=\""+result[i].textbook+"\" "+css+"\"><a href="+click+">";
            			group2009_3 += result[i].textbooknm + newImage + eduImage + "</a>" + "</li>";
            		}
            	}
            }
            */
        }

        //교육 과정 년도별 교과서 목록 뿌리기
        $("#" + gb + "Book2015").html('');
        $("#" + gb + "Book2009").html('');

        var cnt = 0;
        var cnt1 = 0;

        if (group2015_1 !=  "") {
    		$("#" + gb + "Book2015").html("<ul class=\"list1\">" + group2015_1 + "</ul>");
    		cnt++;
    	}
    	if (group2015_2 !=  "") {
    		$("#" + gb + "Book2015").append("<ul class=\"list2\">" + group2015_2 + "</ul>");
    		cnt++;
    	}
    	if (group2015_3 !=  "") {
    		$("#" + gb + "Book2015").append("<ul class=\"list3\">" + group2015_3 + "</ul>");
    		cnt++;
    	}
		if (group2015_4 !=  "") {
			$("#" + gb + "Book2015").append("<ul class=\"list4\">" + group2015_4 + "</ul>");
			cnt++;
		}
		if (group2015_5 !=  "") {
			$("#" + gb + "Book2015").append("<ul class=\"list5\">" + group2015_5 + "</ul>");
			cnt++;
		}

    	//2007은 기본 hide
    	if (group2009_1 !=  "") {
    		$("#" + gb + "Book2009").html("<ul class=\"list1\">" + group2009_1 + "</ul>");
    		cnt1++;
    	}
    	if (group2009_2 !=  "") {
    		$("#" + gb + "Book2009").append("<ul class=\"list2\">" + group2009_2 + "</ul>");
    		cnt1++;
    	}
    	if (group2009_3 !=  "") {
    		$("#" + gb + "Book2009").append("<ul class=\"list3\">" + group2009_3 + "</ul>");
    		cnt1++;
    	}

    	if (group2009_1 == "") {
    		$("#" + gb + "Book2009").html('');
    		$("#" + gb + "EduYearImg2009").parent().hide(); //2007년 교육 과정 없을 경우 숨김
    		$("#" + gb + "Book2009Title").hide();
    	}
    	else {
    		$("#" + gb + "EduYearImg2009").parent().show();
    		$("#" + gb + "Book2009Title").show();
    	}

//    	alert("Test gnb data : " + gb + " : " + group2015_1 + " / " + group2015_2 + " / " + group2009_1 + " / " + group2009_2);

//    	if(cnt > 0 && cnt1 == 0){
//    		$("#" + gb + "Book2009ara").css('margin-top', '15px');
//    		$("#" + gb + "Book2009tit").css('top', '16px');
//    		$("#" + gb + "Book2009").css('border-top', '0px dashed #d5d5d5');
//    		$("#" + gb + "Book2009").css('padding-top', '15px');
//    	}else if(cnt == 0 && cnt1 > 0){
//    		$("#" + gb + "Book2009area").css('margin-top', '0px');
//    		$("#" + gb + "Book2009tit").css('top', '0px');
//    		$("#" + gb + "Book2009").css('border-top', '0px dashed #d5d5d5');
//    		$("#" + gb + "Book2009").css('padding-top', '0px');
//    	}else{
//    		$("#" + gb + "Book2009area").css('margin-top', '15px');
//    		$("#" + gb + "Book2009tit").css('top', '16px');
//    		$("#" + gb + "Book2009").css('border-top', '1px dashed #d5d5d5');
//    		$("#" + gb + "Book2009").css('padding-top', '15px');
//    	}
	}

    function useYnAlert(obj){
    	alert(obj+'교과서는 1월 중 오픈될 예정입니다.\n자세한 일정은 비바샘 공지사항을 확인해 주세요.\n감사합니다.');
    	return;
    }

    function useYn2Alert(obj){
    	alert('준비중 입니다.');
    	return;
    }

    function useYn3Alert(){
    	alert('빠른 시일 내에 오픈 예정입니다.');
    	return;
    }

    //온리원 추천강의(중학)
    function gosoobakc(subjectCd)
    {
    	if ( "${LOGIN_ID}" == "" ) {
    		//alert('로그인이 필요한 서비스입니다.');
    		location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
    		return;
    	}

    	if (MEMLEVEL == "AU400") {
    		memLevelAlert('soobakc');
    		return;
    	}

    	if (subjectCd != null && subjectCd != "")
    		incHearderValueSubjectCode = subjectCd;

        if (incHearderValueSubjectCode == "SC301")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMain.do?textbookCd=106048";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMain.do?textbookCd=106048','_blank');
        }
        else if (incHearderValueSubjectCode == "SC302")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMain.do?textbookCd=106066";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMain.do?textbookCd=106066','_blank');
        }
        else if (incHearderValueSubjectCode == "SC303")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMain.do?textbookCd=106073";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMain.do?textbookCd=106073','_blank');
        }
        else if (incHearderValueSubjectCode == "SC304")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMain.do?textbookCd=106069";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMain.do?textbookCd=106069','_blank');
        }
        else if (incHearderValueSubjectCode == "SC305")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMain.do?textbookCd=106076";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMain.do?textbookCd=106076','_blank');
        }
        else if (incHearderValueSubjectCode == "SC306")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMain.do?textbookCd=106084";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMain.do?textbookCd=106084','_blank');
        }
        else if (incHearderValueSubjectCode == "SC307")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMain.do?textbookCd=106071";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMain.do?textbookCd=106071','_blank');
        }
        else if (incHearderValueSubjectCode == "SC308")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMain.do?textbookCd=106081";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMain.do?textbookCd=106081','_blank');
        }
        else if (incHearderValueSubjectCode == "SC309")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMain.do?textbookCd=106083";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMain.do?textbookCd=106083','_blank');
        }
        else if (incHearderValueSubjectCode == "SC310")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMain.do?textbookCd=106079";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMain.do?textbookCd=106079','_blank');
        }
        else if (incHearderValueSubjectCode == "SC324")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMain.do?textbookCd=106089";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMain.do?textbookCd=106089','_blank');
        }
    }

    //수박씨->온리원 추천강의(고등)
    function gosoobakcH(subjectCd)
    {
    	if ( "${LOGIN_ID}" == "" ) {
    		//alert('로그인이 필요한 서비스입니다.');
    		location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
    		return;
    	}

    	if (MEMLEVEL == "AU400") {
    		memLevelAlert('soobakc');
    		return;
    	}

    	if (subjectCd != null && subjectCd != "")
    		incHearderValueSubjectCode = subjectCd;

        if (incHearderValueSubjectCode == "SC311")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMainH.do?textbookCd=106029";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMainH.do?textbookCd=106029','_blank');
        }
        else if (incHearderValueSubjectCode == "SC314")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMainH.do?textbookCd=106085";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMainH.do?textbookCd=106085','_blank');
        }
        else if (incHearderValueSubjectCode == "SC321")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMainH.do?textbookCd=106098";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMainH.do?textbookCd=106099','_blank');
        }
        else if (incHearderValueSubjectCode == "SC315")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMainH.do?textbookCd=106037";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMainH.do?textbookCd=106098','_blank');
        }
        else if (incHearderValueSubjectCode == "SC322")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMainH.do?textbookCd=106041";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMainH.do?textbookCd=106041','_blank');
        }
        else if (incHearderValueSubjectCode == "SC323")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMainH.do?textbookCd=106038";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMainH.do?textbookCd=106038','_blank');
        }
        else if (incHearderValueSubjectCode == "SC318")
        {
            //location.href = CONTEXTPATH  + "/soobakc/soobakcMainH.do?textbookCd=106040";
    		window.open(CONTEXTPATH  + '/soobakc/soobakcMainH.do?textbookCd=106040','_blank');
        }

    }

    //문제은행
    function goqbank()
    {
    	//alert(incHearderValueSubjectCode);
    	var openUrl = "";

    	if ( "${LOGIN_ID}" == "" ) {
    		location.href = CONTEXTPATH + "/qbank/qbank_subject.do";
    		return;
    	}

    	if (MEMLEVEL == "AU400") {
    		memLevelAlert('qbank');
    		return;
    	}

    	//중학
    	if (incHearderValueSubjectCode == "SC301") //  중학
    	{
    		//국어
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=mid_kor';
    	}
    	else if (incHearderValueSubjectCode == "SC302")
    	{
    		//영어
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=mid_eng';
    	}
    	else if (incHearderValueSubjectCode == "SC303")
    	{
    		//수학
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=mid_math';
    	}
    	else if (incHearderValueSubjectCode == "SC304")
    	{
    		//사회
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=mid_soc';
    	}
    	else if (incHearderValueSubjectCode == "SC305")
    	{
    		//과학
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=mid_sci';
    	}
    	else if (incHearderValueSubjectCode == "SC306")
    	{
    		//한문
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=mid_chi';
    	}
    	else if (incHearderValueSubjectCode == "SC307")
    	{
    		//역사
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=mid_his';
    	}
    	else if (incHearderValueSubjectCode == "SC310")
    	{
    		//기술.가정
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=mid_tech';
    	}
    	else if (incHearderValueSubjectCode == "SC333")
    	{
    		//음악
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=mid_music';
    	}
    	else if (incHearderValueSubjectCode == "SC334")
    	{
    		//미술
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=mid_art';
    	}
    	else if (incHearderValueSubjectCode == "SC335")
    	{
    		//체육
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=mid_excer';
    	}
    	else if (incHearderValueSubjectCode == "SC326" || incHearderValueSubjectCode == "SC327"  || incHearderValueSubjectCode == "SC328" || incHearderValueSubjectCode == "SC329") //  초등
    	{
    		//수학
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=ele_math';

    	}else{
    		openUrl = CONTEXTPATH  + '/qbank/qbank_subject.do?subject=col';
    	}

    	window.open(openUrl, '');

    }

    //개념+유형 pdf 자료
    function go_refView(){
    	if("${LOGIN_ID}" == ''){
    		//백그라운드 전체를 어둡게 처리
	 		bgLayerH();

			//로그인 레이어 팝업
			popDim('layerLogin');
    	}else{
    		popGuide(CONTEXTPATH  + '/courseinfo/educourseRefPopup.do', 'refPopup', '788', '788', 'no');
    	}
    }


    //모바일 채크
    function fnMobile()
    {
    	if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
    	  //PC에서만 실행 될 스크립트
    		return false;
    	}

    	var filter = "win16|win32|win64|mac";
    	if( navigator.platform  ){
            if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
            	// moblie
               return true;
            }else{
            	// pc
               return false;
            }
        }
    	// moblie
    	return true;
    }

    /**
     * 오늘의 이슈 ajax 처리 이윤호
     */
     function _issueThisMonthContents(){

         $.ajax({
             type: "POST",
             url: CONTEXTPATH + "/main/newIssueThisMonthContentsList.do",
             cache: true,
             async: true,
             dataType: "json",
             data: {vivasamformat : "json" },
             success: function(data){
                 var list_str="<ul>";

                 for (var i=0; i< data.length; i++) {
                     //데이터 합성
                     var url = CONTEXTPATH + "/opendata/issueChannel2015.do?month="+data[i].issueMm+"&issueId="+data[i].issueId;
                     var subject = data[i].subject;
                     var issueMm = data[i].issueMm;
                     var issueDd = data[i].issueDd;
                     var issueId = data[i].issueId;
                     var subj = subject;
                     if(subject.length > 20){
                    	 subj = subject.substr(0,20)+"...";
                     }
                     if(issueDd == null || issueDd == 'null' || issueDd == '' ){
                    	 issueDd = "";
                    	 issueMm = issueMm+"월"
                     }else{
                    	 issueDd = "."+issueDd;
                     }
                     //리스트 HTML코드 제네레이트
                     list_str += "<li>" + "<a href='"+url+"' title='"+subject+"' onclick=\"gtag('event', '이슈키워드', {'event_category': '헤드', 'event_label': '이슈키워드', 'value': 1})\"><b>"+issueMm.replace(/(^0+)/, "")+issueDd+"</b><span>"+subj+"</span></a></li>";
                 }
                 list_str += "</ul>";
                 //list_str += "<div class=\"btn\"><a href=\"#\" class=\"btn_prev\"><span class=\"blind\">이전</span></a><a href=\"#\" class=\"btn_next\"><span class=\"blind\">다음</span></a></div>";


	             var query = ($.trim($('#mainsearch').val()) == "" ? $('#mainsearch').attr('placeholder') : $.trim($('#mainsearch').val()));

	             //query가 있을때는 issuekeyword 숨겨줘야됨.
	             if (typeof(query) == 'undefined'){
		             $("#header #issuekeyword").html(list_str);
		             $('#header #issuekeyword').rollingBanner(5000, false);
	             }

             },
             error: function (xhr, ajaxOptions, thrownError){
             },
             complete:function (xhr, textStatus){
             }
        });
     }


    /*********************************** 헤더 상단의 중고등 교과 메뉴 클릭시 처리 *******************************************************/


    /*
     * 비바샘 통합검색 관련 스크립트 추가 20180705
     * 메이팜소프트__하유영
     *
     */

     // 쿠키 관련 전역변수
     var searchHistory;
     var cookieDelimiter = '##@@##';
     var cookieName = "${LOGIN_ID}" + '_vivasam_history';
     var maxHistory = 7;

    // 메인 서치박스 실행
	function goMainSearch(){
		var query = ($.trim($('#mainsearch').val()) == "" ? $('#mainsearch').attr('placeholder') : $.trim($('#mainsearch').val()));
		var query_label = $.trim($('#mainsearch_label').text());
		if ($('#issuekeyword').css('display') != 'none') {
			var url = null;
			$('#issuekeyword li').each(function() {
				if ($(this).css('display') != 'none') {
					url = $(this).find('a').attr('href');
				}
			});
			if(url != null && url != undefined) {
				location.href = url;
				return false;
			}
		}
		if(!query){
			if(!query_label){
				alert('검색어를 입력해주세요');
				return false;
			}
			query = query_label;
		}

		goSearch('total',query);
	}


	// 검색시 사용됨
	function goSearch(type, query){

		//$('#mainsearch_label').css('visibility','hidden');
		$('#mainsearch_label').text(query);

		if(!type)
			type = 'total';

		if("${LOGIN_ID}" != "" && query != "")
			saveCookie(query, true);

		query = encodeURIComponent(query);	// 메이팜소프트__구나율 추가
		location.href = '/search/search2018_main.do?'+encodeURI('type='+type)+'&query='+query;  // 메이팜소프트__구나율 수정
	}

	var keyIdx = -1;
	var wrap_mode = 'cookie';
//    // 쿠키, 자동완성 목록 표시를 위한 이벤트
	function autocompleteAndCookieEvent(){
		$("#top .search_wrap input").focusin(function(){
			$(".search_wrap").addClass("open");
			if("${LOGIN_ID}" != "" && $(this).val() == ""){
				setSearchHistory();
				$('ul.history').css('display', '');
				$('.btn_del_all').css('display', '');
			} else if("${LOGIN_ID}" == "" && $(this).val() == ""){
				wrap_mode = 'cookie';
				$(".search_wrap").removeClass("open");
				$('#issuekeyword').show();
			} else {
				var e = $.Event( "keydown", { keyCode: 36 } );
				$('#mainsearch').trigger( e );
				$('.btn_del_all').css('display', 'none');
			}
		})
		.blur(function(){
			setTimeout(function(){
				$(".search_wrap").removeClass("open");
				if($('#mainsearch').val() == "") {
					$('#issuekeyword').show();
				}
			}, 200);
		})
		.keydown(function(e){
			e.stopPropagation();
			e.cancelBubble = true;

			var target_cookie = ".search_layer ul.history li";
			var target_autocomplete = ".search_layer ul li.ui-menu-item";

			var target = wrap_mode == 'cookie' ? target_cookie : target_autocomplete;

			var keyCode = e.keyCode
			var liLen = $(target).length -1;

			// 엔터 키 감지
			if(keyCode == 13){
				goMainSearch();
				return false;
			}else if(keyCode == 40 && liLen > -1){
				keyIdx++;

				if(keyIdx > liLen){
					keyIdx = liLen;
					return ;
				}

				$(target+'.on').removeClass('on');
				$(target).eq(keyIdx).addClass('on');
				var onQuery = $(target+'.on').attr('q-data');
				$('#mainsearch').val(onQuery);
//				e.stopImmediatePropagation();
				e.preventDefault();

			} else if(keyCode == 38){

				keyIdx--;

				if(keyIdx < 0){
					keyIdx = -1;
					$(target+'.on').removeClass('on');
					return;
				}

				$(target+'.on').removeClass('on');
				$(target).eq(keyIdx).addClass('on');

				var onQuery = $(target+'.on').attr('q-data');
				$('#mainsearch').val(onQuery);
//				e.stopImmediatePropagation();
				e.preventDefault();
			} else {
				wrap_mode = 'auto';
				keyIdx = -1;
			}


		})
		.keyup(function(e){

			if($(this).val() == "" && "${LOGIN_ID}" == ""){
				$(".search_wrap").removeClass("open");
				$('#issuekeyword').show();
				return;
			}

			if($(this).val() != "" && wrap_mode != 'cookie'){
				$(".search_wrap").addClass("open");
				$('ul.history').css('display', 'none');
				$('.btn_del_all').css('display', 'none');
			} else {
				wrap_mode = 'cookie';
				setSearchHistory();
				if(keyIdx != -1)
					$('.search_layer ul.history li').eq(keyIdx).addClass('on');
				$('ul.history').css('display', '');
				if($('ul.history li').length > 0)
					$('.btn_del_all').css('display', '');
				$('.ui-widget-content').html('');
			}
		});
	}

	function searchKey (){
		var $target = $(".search_wrap");
		var $item = $target.find(".search_layer ul li");
		var lastItem = $item.size()-1;
		var keyIdx = -1;

		$target.keydown(function(event){
			if (event.keyCode==38)
			{
				if (keyIdx > 0)
				{
					keyIdx = keyIdx - 1;
					$item.removeClass("on").eq(keyIdx).addClass("on").find("a").eq(0).focus();
				} else if (keyIdx == 0)
				{
					keyIdx = -1;
					$item.removeClass("on");
					$target.removeClass("open").find("input").focus();
				}
				event.preventDefault();
			} else if (event.keyCode==40)
			{
				if (!(keyIdx == lastItem))
				{
					keyIdx = keyIdx + 1;
					$item.removeClass("on").eq(keyIdx).addClass("on").find("a").eq(0).focus();
				}
				event.preventDefault();
			}
		});
	}

    // 쿠키 저장
	// 인자1 : 저장할 쿼리
	// 인자2 : true : 저장 / false : 쿠키 내용 비움
    function saveCookie(query, isAdd){
        var currData;

        if(query && isAdd) {
            var getData = $.cookie(cookieName);

            // 빈 쿠키라면
            if(!getData)
                currData = [];
            else
                currData = getData.split(cookieDelimiter);

            // 이미 있는 값이면 이전에 입력된 값을 지운다
            if(currData.indexOf(query) != -1)
            	currData.splice(currData.indexOf(query), 1);

			currData.push(query);
	        // 8개 이상이면 맨 앞에 하나를 지운다.
            if(currData.length > maxHistory)
                currData.splice(0,1);
        } else // 쿠키 삭제모드면 여기만 실행
        	currData = searchHistory;

        $.cookie(cookieName, currData.join(cookieDelimiter), {expires : 365, path : '/'});
    }

    // 쿠키 정보 가져오기
    function getSearchHistoryCookie(){
        searchHistory = $.cookie(cookieName);

        // 히스토리가 없거나 길이가 0이면
        if(!searchHistory || searchHistory.length == 0)
            return false;

        searchHistory = searchHistory.split(cookieDelimiter);
    }

    // 검색창 선택시 쿠키 목록 세팅
    function setSearchHistory(){
    	if(!searchHistory)
    		return false;

    	$('ul.history').html('');
        searchHistoryLength = searchHistory.length;
        for(var i=searchHistoryLength-1; i>=0; i--){
            var query = searchHistory[i];
            $('<li>')
    			.append($('<span>')
    				.append($('<a>').attr('href', 'javascript:goSearch(null, "' + query + '")').html(query)))
    			.append($('<a>').attr('href', 'javascript:deleteHistory('+i+')').addClass('btn_del').attr('id', 'history_'+i).val(i)
    				.append($('<span>').addClass('blind').html('삭제'))
    				.mousedown(function(e){
    					deleteHistory($(this).val());
    					e.preventDefault();
    					e.stopPropagation();
    				}))
    			.attr('q-data', query)
    			.mousedown(function(e){
    				goSearch(null, $(this).attr('q-data'));
					e.preventDefault();
					e.stopPropagation();
    			})
    			.appendTo('ul.history');
        }
    }

    // 히스토리 쿠키 삭제
    function deleteHistoryCookie(){
    	console.log(cookieName);
        $.removeCookie(cookieName, {path : '/'});

        searchHistory = "";
        $('ul.history').html('');
    }

    // 히스토리 키워드 삭제
    function deleteHistory(idx){
    	searchHistory.splice(idx, 1);
    	setSearchHistory();
    	saveCookie(null, false);
    }


    /************************* 비바샘 통합검색 관련 스크팁트 END **********************************************/

/**
 * 댓글 세션 관련 유틸 클래스
 */
var SessionUtils = {
	/**
	 * 로그인 체크
	 * @param redirectURL
	 * @param msg
	 */
	isAccessLevel: function (kind) {
		// 준회원 제한
		if (window.globals.mLevel == 'AU400') {
			if (kind == "eleEvalDataAllDownNo") {
				alert("전체 다운로드 자료에 평가자료가 포함되어 있습니다.\n준회원은 이용이 불가능합니다.\n비바샘으로 문의해 주세요. (1544-7714)");
			} else {
				alert("준회원은 이용이 불가능합니다.\n비바샘으로 문의해 주세요. (1544-7714)");
			}
			return false;
		}
		return true;
	},
	// 교사 인증 여부
	isValidMember: function() {
		return window.globals.validYn == 'Y';
	},
};


/**
 * 단축 URL
 */
var CopyShortUrl = {
	/**
	 * URL 클립보드에 복사
	 */
	copy: function (url) {
		var textarea = document.createElement('textarea');
		textarea.value = url;
		document.body.appendChild(textarea);
		textarea.select();
		textarea.setSelectionRange(0, 1000);
		document.execCommand('copy');
		document.body.removeChild(textarea);
		alert("링크 주소를 복사하였습니다.\n붙여넣기 (Ctrl+V)하여 사용해 주세요.");},

};
