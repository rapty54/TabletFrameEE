$(function () {


});

/*qr 레이어 팝업*/
function qrShare(lnbMenuSeq) {
	Layer.openLayer({
		url: '/themeplace/qrCode/main?lnbMenuSeq='+ lnbMenuSeq,
		callback: function(_$div) {
		}
	});
}


/* 링크 버튼 주소 복사 */
function urlBtn(){
	var urlShare = window.location.href;
	if($(".science_btn_share").data('shorturl')){
		urlShare = $(".science_btn_share").data('shorturl');
	}
	var urlText = document.createElement("input");
	document.body.appendChild(urlText);
	urlText.value = urlShare;
	urlText.select();
	document.execCommand("copy");
	document.body.removeChild(urlText);
	alert("링크 주소를 복사하였습니다. 붙여넣기 (Ctrl+V)하여 사용해 주세요.");

	$('.share_box .pop_btn_share').siblings('span').addClass('on');
};