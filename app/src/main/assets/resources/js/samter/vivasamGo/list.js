// $(function(){
//
//     // App.init();
//     // 팝업 이벤트 등록
//     // setApplyPopEvent();
//     // 학교 검색 팝업 이벤트 등록
//     // setSchoolSearchPop();
//
// });
//
// // 신청하기
// /*
// function showApply () {
//     if (!prerequisite()) {
//         return;
//     }
//
//     Ajax.execute({
//         data : {
//             'eventId' : eventId
//         },
//         url : '/samter/vivasam/go/apply.json',
//         success : function(data) {
//             if(data.response == 'success') {
//                 $('#vivasamGoApply').show();
//             }
//         }
//     });
//     console.log(123);
//     $('#vivasamGoApply').show();
// }
// */
//
// var App = {
//     eventId: null,
//     availableBtnApply: true, /*[- 신청하기 버튼 클릭 가능여부 -]*/
//     mLevel: null,   /*[- 회원등급 -]*/
//     schLvlCd: null, /*[- 학교급 -]*/
//     teacherCertifiedYn: null,   /*[- 회원 교사 인증 여부 -]*/
//     eventJoinYn: null,  /*[- 이벤트 신청여부 -]*/
//     progressing: null,  /*[- 이벤트 신청가능여부 -]*/
//     // mySubjectMode: true,
//     init: function () {
//
//         this.mLevel = /*[[${@sessionUtils.getMember() != null ? @sessionUtils.getMember().mLevel : null}]]*/ '';
//         this.schLvlCd = /*[[${@sessionUtils.getMember() != null ? @sessionUtils.getMember().schCode : null}]]*/ '';
//         this.teacherCertifiedYn = /*[[${teacherCertifiedYn}]]*/ 'N';
//         /*[- 단일이벤트 이미 신청여부 -]*/
//         this.eventJoinYn = /*[[${eventJoinYn}]]*/ 'N';
//         this.eventId = $('#eventId').val();
//         /*[- 단일이벤트 진행여부 -]*/
//         this.progressingYn = $('#eventProgressingYn').val();
//
//         /*[- 입력글자 제한 -]*/
//         $('#opinions').on('input', this.onKeyupEvtComment1);
//
//         /*[- 등록 양식 보이기 -]*/
//         $('#btnShowForm').on('click', this.showApplyForm);
//         /*[- 등록 양식 감추기 -]*/
//         $('#popup_close1').on('click', this.hideApplyForm);
//         // 입력양식 변경
//         $(':radio[name="schInfo"]').on('click', this.changeInputType);
//         // 학교 검색
//         $('#btnSearchSchool').on('click', this.searchSchool);
//         // 주소 찾기 팝업 리턴받을 callbackJuso(data) 함수가 전역공간에 설정 필요
//         $('#btnSearchAddr').on('click',function() {
//             Popup.openSamterJuso();
//         });
//
//         $('#scClass01, #phone01, #phone02, #phone03, #teacherCareer').on('keydown', this.onKeydownOnlyNumber);
//
//         $('#btnShowForm').on('click', App.save);
//         // 학년선택 셋팅
//         // App.gradeSetting(this.schLvlCd);
//
//         $('#gradeSub1').on('click', App.gradeSub1Click);
//     },
//
//     // 전제
//     prerequisition: function () {
//         if (this.progressingYn !== 'Y'){
//             alert("이벤트 기간이 아니거나 종료된 이벤트입니다.");
//             return false;
//         }
//
//         // 로그인 안됐을 경우 처리
//         if (!window.globals.login) {
//             location.href = "/member/login?goURL=" + location.pathname;
//             alert('로그인 후 참여해 주세요.');
//             return false;
//         }
//
//         //교사 인증 체크
//         if (this.teacherCertifiedYn !== 'Y') {
//             alert("교사 인증 후 이벤트에 참여해 주세요.");
//             return false;
//         }
//
//         // 준회원
//         if (!this.mLevel || this.mLevel === 'AU400'){
//             alert("준회원은 이용이 불가능합니다. \n비바샘으로 문의해 주세요. (1544-7714)");
//             return false;
//         }
//
//         // 이미 신청 여부
//         if (this.eventJoinYn !== 'N') {
//             alert("이미 신청하셨습니다.");
//             return false;
//         }
//
//         return true;
//     },
//
//     changeInputType: function (e) {
//         var $el = $(e.target);
//
//         var $schCode = $('#schCode');
//         var $schNm = $('#schNm');
//         var $schZipCd = $('#schZipCd');
//         var $schAddress01 = $('#schAddress01');
//         var $schAddress02 = $('#schAddress02');
//
//         if ($el.val() === '1') {
//             // 개인정보 불러오기
//             $('#btnSearchSchool, #searchSchoolMsg').show();
//             $('#btnSearchAddr').hide();
//
//             var schName = $schNm.data('old');
//             $schCode.val( $schCode.data('old'));
//             $schNm.val(schName).prop('readonly', true);
//             $schZipCd.val($schZipCd.data('old'));
//             $schAddress01.val($schAddress01.data('old'));
//             $schAddress02.val(schName).prop('readonly', true);
//             App.gradeSetting(App.schLvlCd);
//         }
//         else if ($el.val() === '2') {
//             // 직접 입력
//             $('#btnSearchSchool, #searchSchoolMsg').hide();
//             $('#btnSearchAddr').show();
//
//             $('#schNm').val('').prop('readonly', false);
//             $schCode.val('');
//             $schNm.val('').prop('readonly', false);
//             $schZipCd.val('');
//             $schAddress01.val('');
//             $schAddress02.val('').prop('readonly', false);
//             // 직접입력시 초 중 고 구분이 안되기때문에 학년 모두 노출
//             App.gradeSetting(App.schLvlCd);
//         }
//     },
//
//     searchSchool: function (e) {
//         e.preventDefault();
//         Layer.openLayerSchoolSearchForEvent(function(data) {
//             //학교 정보 세팅
//             $('#schCode').val(data.code);
//             $('#schNm').val(data.name);
//             $('#schZipCd').val(data.zip);
//             $('#schAddress01').val(data.addr);
//             $('#schAddress02').val(data.name);
//             App.gradeSetting(data.tab);
//         });
//     },
//
//     callbackSearchAddr: function(data) {
//         $('#schZipCd').val(data.zip);
//         $('#schAddress01').val(data.addr);
//     },
//
//     // 유효성 평가
//     validate: function () {
//         //
//         var $schCode = $('#schCode');
//         var $schNm = $('#schNm');
//         var $schZipCd = $('#schZipCd');
//         var $schAddress01 = $('#schAddress01');
//         var $schAddress02 = $('#schAddress02');
//
//         var $phone01 = $('#phone01');
//         var $phone02 = $('#phone02');
//         var $phone03 = $('#phone03');
//
//         var $lb_dream_03 =$('#lb_dream_03'); // 참여 인원
//
//         var $datepicker1 = $('#datepicker1'); // 방문희망일1
//         var $datepicker2 = $('#datepicker2'); // 방문희망일3
//
//         var $reason = $('input[name="reason"]:checked'); // 신청이유
//
//         var $opinions = $('#opinions'); // 자세한 이유
//
//         //비상교과서 채택여부
//         var $visangTbYN = $(':radio[name="visangTbYN"]:checked');
//
//         var $scClass01 = $('#scClass01');
//         var $scClass02 = $('#scClass02');
//         var $scEtc = $('#scEtc');
//
//         var $phone01 = $('#phone01');
//         var $phone02 = $('#phone02');
//         var $phone03 = $('#phone03');
// /*
//
//         if (!$schNm.val()) {
//             alert("재직학교를 입력해주세요.");
//             $schNm.focus();
//             return false;
//         }
// */
//
// /*        if (!$schZipCd.val() || !$schAddress01.val()) {
//             alert("학교주소를 입력해 주세요.");
//             $schZipCd.focus();
//             return false;
//         }*/
// /*
//         if (!$schAddress02.val()) {
//             alert("학교 상세주소를 입력해 주세요.");
//             $schAddress02.focus();
//             return false;
//         }*/
//
//         // 참여인원 #lb_dream_03
//         // if(App.mySubjectMode && ($mSubjectCd.val() == '' || $mSubjectCd.val() == null)){
//         //     alert("내 교과를 선택해주세요.");
//         //     $mSubjectCd.focus();
//         //     return false;
//         // }
//
//
//         // option __ reason  신청이유!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//         if(App.mySubjectMode && ($reason.val() == '' || $reason.val() == null)){
//             alert("신청 이유 선택해주세요.");
//             $reason.focus();
//             return false;
//         }
//
//
//         if (!$phone01.val() || $phone01.val().length !== 3) {
//             alert("휴대전화번호를 입력해 주세요.");
//             $phone01.focus();
//             return false;
//         }
//
//         if (!$phone02.val() || $phone02.val().length <= 2) {
//             alert("휴대전화번호를 입력해 주세요.");
//             $phone02.focus();
//             return false;
//         }
//
//         if (!$phone03.val() || $phone03.val().length !== 4) {
//             alert("휴대전화번호를 입력해 주세요.");
//             $phone03.focus();
//             return false;
//         }
//
//         //지원분야
//         var gradeSub = '';
//         if($('input[name="gradeSub"]:checked').length == 0){
//             alert("비바새미 지원 분야를 선택해 주세요.");
//             return false;
//         }
//
//
//         $('input[name="gradeSub"]:checked').each(function (idx,obj){
//             if($('input[name="gradeSub"]:checked').length == (idx + 1)) {
//                 if ($(obj).val() == '초등 교과') {
//                     gradeSub += $(obj).val() + "-" + $(':radio[name="subject"]:checked').val();
//                 }else{
//                     gradeSub += $(obj).val();
//                 }
//             }else{
//                 if ($(obj).val() == '초등 교과') {
//                     gradeSub += $(obj).val() + "-" + $(':radio[name="subject"]:checked').val() + ",";
//                 }else{
//                     gradeSub += $(obj).val() + ",";
//                 }
//             }
//         });
//
//         //신청사연
// /*
//         $('#opinions').on('keyup',function(){
//             if ($('#opinions').val().length > 500) {
//                 alert("500자 이내로 입력해주세요.");
//                 $('#opinions').val($('#opinions').val().substring(0,500));
//             }
//             $('#count1').text($('#opinions').val().length);
//         });
//  */
//         if($('#evtComment2').val().length <= 0 || $.trim($('#evtComment2').val()) == ""){
//             alert("개인 활동 내역을 입력해 주세요.");
//             return false;
//         }
//
//         if(!$("input:checkbox[id='evtAgree']").is(':checked')){
//             alert("필수 동의 선택 후 이벤트 신청을 완료해 주세요.");
//             $("#evtAgree").focus();
//             return false;
//         }
//
//         // //담당학년
//         // var myGrade = '';
//         // $('input[name="myGrade"]:checked').each(function (idx,obj){
//         // 	if($('input[name="myGrade"]:checked').length == (idx + 1)){
//         // 		myGrade += $(obj).val();
//         // 	}else{
//         // 		myGrade += $(obj).val() + ",";
//         // 	}
//         // });
//         // if(myGrade == ''){
//         // 	alert("담당학년을 선택해 주세요.");
//         // 	return false;
//         // }
//         //
//         // //내 교과
//         // var mySubject = $('#mSubjectCd').val();
//         // if(this.mySubjectMode && mySubject == ''){
//         // 	alert("내 교과를 선택해주세요.");
//         // 	return false;
//         // }
//         // if(mySubject == '전과목(초등)'){
//         // 	mySubject = '';
//         // }
//         // //경력
//         // var teacherCareer = $('#teacherCareer').val();
//         // if(teacherCareer == ""){
//         // 	alert("선생님의 경력 년 수를 입력해 주세요.");
//         // 	$('#teacherCareer').focus();
//         // 	return false;
//         // }
//         //
//         // //비상교과서 채택 여부
//         // var visangTbYN = $(':radio[name="visangTbYN"]:checked').val();
//         // if(visangTbYN == undefined){
//         // 	alert("비상교과서 채택여부를 선택해 주세요.");
//         // 	return false;
//         // }
//
//         return true;
//     },
//
//     // 자세한 이유
//     onKeyupEvtComment1: function (e) {
//         if (!App.prerequisition()) return;
//         var $el = $(e.target);
//         var comment = $el.val();
//         if(comment.length >= 200){
//             comment = comment.substr(0, 200);
//             $('#opinions').val(comment);
//         }
//         // $('#evtCommentTextCnt1').html(comment.length);
//         $('#opinions').html(comment.length);
//     },
//
//
//     onKeydownOnlyNumber: function (e) {
//         var keyCode = e.keyCode;
//         // 특수키 허용
//         if (keyCode === 8 || keyCode === 9 || keyCode === 46 || keyCode === 37 || keyCode === 39 ) {
//             return;
//         }
//
//         // 숫자키 입력 허용
//         if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
//             var $el = $(e.currentTarget);
//             if (!$el.attr("maxlength") || $el.attr("maxlength") >= $el.val().length) {
//                 return;
//             }
//         }
//
//         // 문자 입력시 또는 최대길이 이상 입력시 입력 금지
//         e.preventDefault();
//     },
//
//     save: function (e) {
//         /*[-  event 처리에서는 App. 으로 객체변수나 함수 참조 할것.  -]*/
//         e.preventDefault();
//         if (!App.availableBtnApply) return;    // 저장 버튼 클릭 상태면 연속클릭 무시
//
//         if (!App.validate()) {
//             return;
//         }
//
//
//         var $schCode = $('#schCode');
//         var $schNm = $('#schNm');
//         var $schZipCd = $('#schZipCd');
//         var $schAddress01 = $('#schAddress01');
//         var $schAddress02 = $('#schAddress02');
//
//
//         var $phone01 = $('#phone01');
//         var $phone02 = $('#phone02');
//         var $phone03 = $('#phone03');
//         var phone = $phone01.val() + '-' + $phone02.val() + '-' + $phone03.val();
//
//         var $inputType = $(':radio[name="schInfo"]:checked');
//
//         //담당학년
//         var myGrade = '';
//         $('input[name="myGrade"]:checked').each(function (idx,obj){
//             if($('input[name="myGrade"]:checked').length == (idx + 1)){
//                 myGrade += $(obj).val();
//             }else{
//                 myGrade += $(obj).val() + ",";
//             }
//         });
//         //내 교과
//         var mySubject = $('#mSubjectCd').val();
//         if(mySubject == '전과목(초등)'){
//             mySubject = '';
//         }
//
//         //비상교과서 채택 여부
//         var visangTbYN = $(':radio[name="visangTbYN"]:checked').val();
//         //지원분야
//         var gradeSub = '';
//         $('input[name="gradeSub"]:checked').each(function (idx,obj){
//             if($('input[name="gradeSub"]:checked').length == (idx + 1)) {
//                 if ($(obj).val() == '초등 교과') {
//                     gradeSub += $(obj).val() + "-" + $(':radio[name="subject"]:checked').val();
//                 }else{
//                     gradeSub += $(obj).val();
//                 }
//             }else{
//                 if ($(obj).val() == '초등 교과') {
//                     gradeSub += $(obj).val() + "-" + $(':radio[name="subject"]:checked').val() + ",";
//                 }else{
//                     gradeSub += $(obj).val() + ",";
//                 }
//             }
//         });
//         // 담당학년, 내교과, 교사경력, 비상교과서채택여부
//         var receiveInfo = $inputType.data('value')+'/'+$schNm.val()+'/'+$schAddress01.val()+' '+$schAddress02.val()+'/'+$schZipCd.val()+'/담당 학년 : '+myGrade;
//
//         if(App.mySubjectMode) {
//             receiveInfo += '/내 교과 : '+mySubject;
//         }
//         receiveInfo += '/교사 경력 : '+teacherCareer+'/비상교과서 채택 여부 : '+visangTbYN+'/'+phone;
//
//         // 자세한 이유
//         var opinions = $.trim($('#opinions').val());
//
//
//         var answer = gradeSub + '^||^' +opinions;
//
//         var params = {
//             eventId: App.eventId,
//             receiveInfo : receiveInfo,
//             answer : answer,
//             inputType : $inputType.val(),
//             schCode : $schCode.val()
//         };
//
//         App.availableBtnApply = false;
//         Ajax.execute({
//             url: '/samter/vivasam/go/register.json',
//             data: params,
//             type: 'post',
//             dataType: 'json',
//             success: function(data) {
//                 if(data.code === 'SUCCESS') {
//                     alert('신청이 완료되었습니다.');
//                 } else {
//                     alert(data.message);
//                 }
//                 // location.reload();
//                 location.href="/samter/vivasam/go/main";
//             },
//             error: function (xhr, status, err) {
//                 alert('오류가 발생했습니다.');
//                 console.log(err);
//                 App.availableBtnApply = false;
//             }
//
//         });
//
//     },
//
//     /* 지원분야 */
// /*
//     gradeSetting: function (schLvlCd) {
//         console.log('schLvlCd: '+schLvlCd);
//         if(schLvlCd == 'ES' || schLvlCd == 'E'){
//             $('#grade2').show();
//             $('#mySubject').hide();
//             App.mySubjectMode = false;
//             $('#gradeSub1').prop('disabled', false);
//             $('#gradeSub2').prop('disabled', true);
//             $('#gradeSub2').prop('checked', false);
//             $('#allSubject').hide();
//         }else if(schLvlCd == 'HS' || schLvlCd == 'H' || schLvlCd == 'MS' || schLvlCd == 'M'){
//             $('#grade2').children('checkbox').prop("checked",false);
//             $('#grade2').hide();
//             $('#mySubject').show();
//             App.mySubjectMode = true;
//             App.mySubjectSetting('');
//             $('#gradeSub1').prop('disabled', true);
//             $('#gradeSub1').prop('checked', false);
//             $('input[name=subject]').prop('checked', false);
//             $('#gradeSub2').prop('disabled', false);
//
//         }else{
//             $('#grade2').show();
//             $('#mySubject').show();
//             App.mySubjectMode = true;
//             App.mySubjectSetting('all');
//             $('#gradeSub1').prop('disabled', false);
//             $('#gradeSub2').prop('disabled', false);
//         }
//     }
// */
//
//
//
//
// }
//
//
//
// /* ##############################################################################  */
// /* ##############################################################################  */
// /* ##############################################################################  */
// /* ##############################################################################  */
//
