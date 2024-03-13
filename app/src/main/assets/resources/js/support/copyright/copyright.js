$(document).ready(function () {


	$('#formSave').on('click',formSave);
});

//파일선택시 파일명 바인딩
function fileChk(fileUrl) {
	var fileValue = fileUrl.split("\\");
	var fileName = fileValue[fileValue.length - 1]; // 파일명
	$('.fileName').val(fileName);
}

//등록버튼 이벤트 등록
function formSave(e) {

	e.stopPropagation();
	e.preventDefault();
	var $form = $("#ajaxform");

	if(!$('#questionAgree').is(':checked'))
	{
		alert("개인정보수집 및 이용에 대한 동의가 필요합니다.");
		$('#questionAgree').focus();
		return false;
	}
	Ajax.executeUpload({
		target: $form,
		url: "/support/copyright/save.json",
		success: function (response) {
			if(confirm('문의해 주신 내용은 검토 후 답변 드리며, 내 문의 내역에서 확인하실 수 있습니다. 확인을 클릭하시면 내 문의 내역으로 이동됩니다')){
				location.href="/my/classroom/question/list";
			}
			else {
				window.location.reload();
			}
		}
	});
	$form.submit();
}