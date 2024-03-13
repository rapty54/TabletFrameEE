	var isLogging = false;
    var isReqStatus = false; //모달팝업 관련 전역변수, /include/incFooter.jsp에 사용됨    
	
	function eventSend(gubun) {
 		if ("<%=LOGIN_ID%>" == "") {
			alert("로그인 후 이용해주세요.");
			_login();
			return;
		}
 		
 		if (gubun == "1") {
 			goLinkTwitter(getMessage(), getUrl());
 		}
 		else if (gubun == "2") {
 			goLinkFaceBook(getMessage(), getUrl(), "비바샘만의 스마트 교육 지원 프로그램! TeachingNote!!", "http://www.vivasam.com/images/closeBeta/tnote.png");
 		}
 		else if (gubun == "3") {
 			goLinkM2day(getMessage(), getUrl());
 		}
 		
 		return;
 	}
 	
 	function getMessage() {
 		var msg;
 		
 		msg = "비바샘 스마트 교육 지원 프로그램 ‘티칭노트 ver2’ close beta 오픈";
 		
 		return msg;
 	}
 	
 	function getUrl() {
 		var url;
 		
 		url = "http://www.vivasam.com/tnote/home.do";
 		
 		return url;
 	}
    
  	//페이스북 연동
 	function goLinkFaceBook(msg, url, title, image) {
  		var title = "&p[title]=" + encodeURIComponent(title);
  		if (image != "") {
  			image = "&p[images][0]=" + image;
  		}
  		var summary = "&p[summary]=" + encodeURIComponent(msg);
 	 	var sLink = "http://www.facebook.com/sharer.php?s=100&p[url]=" + encodeURIComponent(url) + title + image + summary;
 	 	var a = window.open(sLink, 'facebook', '');
 	 
 	 	if(a) {
 	         a.focus();
 	    }
 	 	return ;
 	}
 	
 	//트위터 연동
 	function goLinkTwitter(msg,url) {
 	 	var sLink = "http://twitter.com/home?status="+encodeURIComponent(url)+" "+ encodeURIComponent(msg);
 	 	var a = window.open(sLink, 'twitter', '');
 	 
 	 	if( a ) {
 	         a.focus();
 	    }
 	 
 	 	return ;
 	}
 	
 	//미투데이 연동
	function goLinkM2day(msg,url) {
	 	var sLink = "http://me2day.net/posts/new?new_post[body]="+encodeURIComponent(url) + " " + encodeURIComponent(msg);
	 	var a = window.open(sLink, 'me2day', '');

	 	if( a ) {
	         a.focus();
	    }

	 	return ;
	}
	
	function video_pop(){
        var broswer_w = $(window).width();
        var broswer_h = $(window).height();
        var height = $(document).height();
        var scrollTop = $(document).scrollTop();

        var top = ((document.body.clientHeight - 522)/2) + scrollTop;
        var left = ( broswer_w - 762)/2;

        var install_html = "";
        install_html += "<div class=\"useguide_ad_wrap\" id=\"useguideAdWrap\" style='top:"+ top +"px;left:" + left + "px; z-index:9999;' >";
        install_html += "<div class=\"ad_layer\">";
        install_html += "<object id=\"flash_fallback_1\" class=\"vjs-flash-fallback\" width=\"720\" height=\"480\" type=\"application/x-shockwave-flash\" data=\"<%=webRoot%>/video/flowplayer-3.2.7.swf\">";
        install_html += "<param name=\"movie\" value=\"<%=webRoot%>/video/flowplayer-3.2.7.swf\" />";
        install_html += "<param name=\"allowfullscreen\" value=\"true\" />";
        install_html += "<param name=\"flashvars\" value='config={\"playlist\":[\"<%=webRoot%>/video/video_thumb.png\", {\"url\": \"http://vivasam-visangtextdn2.x-cdn.com/VS/TeachingNote/vivasam_B.flv\",\"autoPlay\":false,\"autoBuffering\":true}]}' />";
        install_html += "<img src=\"<%=webRoot%>/video/video_thumb.png\" width=\"720\" height=\"480\"/>";
        install_html += "</object>";
        install_html += "<p class=\"close\" id=\"useguideAdWrapClose_btn\">";
        install_html += "<img src=\"<%=webRoot%>/images/button/btn_close_03.gif\" alt=\"닫기\" />";
        install_html += "</p>";
        install_html += "</div>";
        install_html += "</div>";
        install_html += "<div class=\"install_bg\" id=\"install_bg\" style='height:"+ height +"px;'></div>";
        $("body").append(install_html);
	        
	    $('#useguideAdWrapClose_btn').live('click',function(){
	       $('#flash_fallback_1').each(function() {
	           $(this).remove();
	       });
	       $('#install_bg').remove();
	       $('#useguideAdWrap').remove();
	    });        
        
    }