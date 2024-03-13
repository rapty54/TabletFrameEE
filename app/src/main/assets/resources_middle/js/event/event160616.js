//v매거진 1주년 이벤트

$(function(){
	//신청팝업
	$(".eventVmag .btn_apply").click(function() {
		$("#vmagApply").show();
		//applyView();
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
	
	//참여하기팝업
	$(".eventVmag .btn_entry").click(function() {
		$("#vmagEntry").show();
	});
	
	//팝업닫기
	$(".eventVmag .close").click(function() {
		$(this).parent().parent().parent().hide();
		//$(".btn_faq").find("img").attr("src","../../../images/event/event160314/btn_faq_off.png");
		return false;
	});
	
	//우편번호 팝업
	$("#search_address").click(function() {
		$("#addressFindPop").show();
		return false;
	});
	//우편번호 팝업 닫기
	$(".eventVmag .pop_close").click(function() {
		$("#addressFindPop").hide();
		return false;
	});
});	