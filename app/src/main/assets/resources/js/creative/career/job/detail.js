$(function () {

	console.log("ctntGubunCdSub : ", $('input[name=ctntGubunCdSub]').val())
	var tabMenu = $(".tab_menu li a"),
	tabPanel = $(".typeView .article");
	
	// 직업 인터뷰 내용이 없을 경우 디폴트 탭 메뉴를 인터뷰 영상으로 설정 후 직업 인터뷰 탭을 비활성화 시킴
	if (_content != '') { //직업 인터뷰 탭 클릭
		$('#tabMenu1').trigger('click');
		tabMenu.click(function (e) {
			e.preventDefault();
			var current = $(this).attr("href");

			tabPanel.hide();
			if (current == '#articlev2') {
				$('#pprint').hide();
			} else {
				$('#pprint').show();
			}
			$(current).show();
			tabMenu.parent().removeClass("on")
			$(this).parent().addClass("on");
		});
	
	}
	else { //인터뷰 영상 클릭
		$('#tabMenu2').trigger('click');
		$('#tabMenu2').attr("href", "javascript:void(0);");
		
		$('#tabMenu1').attr("href", "javascript:void(0);");
		$('#tabMenu1').parent().attr('class', 'disabled');
	}
	
	// 댓글 로드
	loadReply(_idx, window.globals.menu, "replySection", window.globals.config.activeEnv, false);
	$(".data-replyCnt").text(ReplyInfo.totalCnt);


	window.addEventListener('message', function(e) {
		console.log('parent message');
		console.log(e.data); // { childData : 'test data' }
		console.log("e.origin : " + e.origin); //http://123.com(자식창 도메인)

	});

});



/*
	부모창에서 iframe 자동리사이즈
	리사이즈해줘야돼는 iframe에서 onload="autoResize(i)"
	걸어주세요
*/
function autoResize(i){
	var iframeHeight=	((i).contentWindow || (i).contentDocument).document.body.scrollHeight;
	//alert(iframeHeight);
	(i).height=iframeHeight;

}
/*	function autoResize(i){
		var height = $(document).height();
		$("iframe#UrlViewFrm").height(height);
		$("iframe#UrlViewFrm").width($(window).width());
	}*/

function goPlay(playNo) {
	if (SessionUtils.isLogin()) {
		//var url1= $('#video_contents' + playNo).attr("src").replaceAll('/common/starplayer.do?url=', '');
		var url1= $('#video_contents' + playNo).attr("src").replace("/common/starplayer.do?url=", '');
		var url2= url1.replace("&type=video", '');
		console.log("url2 : ", url2);
		Popup.openViewerStarplayer(url2);

	}
}



function print_preview(val){

	if (SessionUtils.isLogin()) {
		var width = $("#articlev1").width();
		var height = $("#articlev1").height();
		var x = width/2;
		var strFeature = "";
		strFeature += "left=" + width + ",width="+width+", height="+height+", all=no, scrollbars=yes";

		print();
	}
}


function copyToClipboard(txt) {
	var linkUrl = $('#video_contents1').attr('src');

	var start_pos = linkUrl.search("http:");
	var end_pos = linkUrl.search("&type");

	linkUrl = linkUrl.substring(start_pos, end_pos);

	linkUrl = linkUrl.replace("http://st", "http://dn");

	var t = document.createElement("textarea");
	document.body.appendChild(t);
	t.value = linkUrl;
	t.select();
	document.execCommand('copy');
	document.body.removeChild(t);
	alert("링크 주소를 복사하였습니다. 붙여넣기(Ctrl+V)하여 사용해 주세요.");
}

