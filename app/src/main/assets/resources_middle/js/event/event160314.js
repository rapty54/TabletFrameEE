// 브로마이드 신청

$(function(){
	//신청팝업
	$(".evntBromide .btn_apply").click(function() {
		//$("#popbromideApply").show();
		applyView();
	});
	
	$("#schoolnName01").click(function() {
		$("#schName").val($("#orgSchName").val());
		$("#schAddr01").show();
		$("#schAddr02").hide();
	});
	
	$("#schoolnName02").click(function() {
		$("#schName").val('');
		$("#schAddr01").hide();
		$("#schAddr02").show();
	});
	
	//FAQ팝업
	$(".evntBromide .btn_faq").click(function() {
		if ($(this).next().is(":hidden")) {
			$(this).next().show();
			//$(this).find("img").attr("src","../../../images/event/event160314/btn_faq_on.png");
			$(this).next().next().show();
		}
		return false;
	});
	$(".dimed").click(function() {
		$(this).hide();
		$(this).prev().hide();
	});

	//팝업닫기
	$(".evntBromide .close").click(function() {
		$(this).parent().parent().parent().hide();
		//$(".btn_faq").find("img").attr("src","../../../images/event/event160314/btn_faq_off.png");
		$(".dimed").hide();
		return false;
	});
	
	//우편번호 팝업
	$("#search_address").click(function() {
		$("#addressFindPop").show();
		return false;
	});
	//우편번호 팝업 닫기
	$(".evntBromide .pop_close").click(function() {
		$("#addressFindPop").hide();
		return false;
	});
});	