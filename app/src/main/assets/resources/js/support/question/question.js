$(document).ready(function() {
	$('#qnaSchLvlCd').on('change',function(){ getQnaSubjectCd(); });
	getQnaSubjectCd();

	$('#qnaCd').on('change',function(){
		qnaCdChange($(this));
	});
	$('#formSave').on('click',formSave);
	// 분류 값을 파라메터로 가져오는 경우
	if (parameter != null && StringUtils.isNotEmpty(parameter.qnaCd)) {
		$('#qnaCd').trigger('change');	
	}

	privateSettingCheck();
});

//학년에 따른 교과 목록 조회 
function getQnaSubjectCd() {
	//select2를 이용한 selectBox조회
	var schLvlCd = $('#qnaSchLvlCd').val();
	$('#qnaSubjectCd').html('').select2({data: [{id: '', text: '선택해주세요.'}]});
	$('#qnaSubjectCd').select2({ minimumResultsForSearch: -1 });
	if (schLvlCd == ''){
		return false;
	}
	$('#qnaSubjectCd').empty();
	Select2Binder.bindAjax({
		placeholder: '선택해주세요.', 
		url: '/support/question/subject.json', 
		data: {
			"schoolCd": schLvlCd
		}, 
		id: 'qnaSubjectCd'
	});	
}

//특정 분류 선택 시 교과 항목 비활성화
function qnaCdChange(_this) {

	var chkQnaCd = $('#qnaCd').val();

	/* 교사 인증 체크 */
	if(chkQnaCd != "" && chkQnaCd != 'QA001' && chkQnaCd != 'QA003'){
		if (teacherCertifiedYn !== 'Y') {
			if (!confirm('교사 인증 후 이용 가능합니다. 지금 인증을 진행하시겠습니까?')) {
				$('#qnaCd').val("").prop("selected", true);
				$('#select2-qnaCd-container').text("선택해주세요.");
				return;
			} else {
				location.href='/member/memberReCertify';
			}
		}
	}

	// 사이트 이용 문의, 회원가입.인증,
	//모바일 이용, 개인정보 변경, 이벤트 문의, 프로그램 오류 문의 
	//선택 시 교과 비활성화

	switch (chkQnaCd) {
		case 'QA001':
		case 'QA003':
		case 'QA014':
		case 'QA015':
		case 'QA016':
		case 'QA018':
			jQuery('#reqDataDisplay').hide();
			$('#qnaSchLvlCd').val('').trigger('change');
			$('#qnaSchLvlCd').addClass('disabled');
			$('#qnaSchLvlCd').attr('disabled', true);
			$('#qnaSubjectCd').val('').trigger('change');
			$('#qnaSubjectCd').addClass('disabled');
			$('#qnaSubjectCd').attr('disabled', true);
		break;
		case 'QA019':
			jQuery('#reqDataDisplay').show();
			$('#qnaSchLvlCd').removeClass('disabled');
			$('#qnaSchLvlCd').attr('disabled', false);
			$('#qnaSubjectCd').removeClass('disabled');
			$('#qnaSubjectCd').attr('disabled', false);
			break;
		default :
			jQuery('#reqDataDisplay').hide();
			$('#qnaSchLvlCd').removeClass('disabled');
			$('#qnaSchLvlCd').attr('disabled', false);
			$('#qnaSubjectCd').removeClass('disabled');
			$('#qnaSubjectCd').attr('disabled', false);
		break;
	}

	privateSettingCheck();
}

//파일선택시 파일명 바인딩
function fileChk(fileUrl) {
	var fileValue = fileUrl.split("\\");
	var fileName = fileValue[fileValue.length-1]; // 파일명
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
		$("#questionAgree").focus();

		return false;
	}

	Ajax.executeUpload({
		target: $form,
		url: "/support/question/save.json",
		success: function(response) {
			if (confirm('문의해 주신 내용은 검토 후 답변 드리며, 내 문의함에서 확인하실 수 있습니다. 확인을 선택하시면 내 문의함으로 이동됩니다.')) {
				location.href = "/my/classroom/question/list";
			}
			else {
				window.location.reload();
			}
		}
	});
	$form.submit();
}

//파일 업로드 -> placholder 클릭 이벤트 추가하기
function fileUploadEvent(){
	$('#fileUpload').trigger('click');
}

//자료요청시에만 공개여부 사용
function privateSettingCheck() {
	if($('#qnaCd').val() === 'QA019') {
		$('#public_open').prop('checked', false);
		$('.private_setting').show();
	} else {
		$('#public_open').prop('checked', true);
		$('.private_setting').hide();
	}
}
