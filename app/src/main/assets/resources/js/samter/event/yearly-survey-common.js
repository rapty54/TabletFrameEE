/*연간 만족도 설문조사 공통 JS 영역 (공통이 아니면 함수로 만들어서 각자 뷰에 함수 내용 정의할 것)*/
$(function(){
    // 진입 시 현재 진행중인 페이지로 바로 이동
    initiate();

    $('.btnCloArea .close').click(function() {
        var msg = confirm('임시저장되었습니다.\n설문을 종료하시겠습니까?');
        if(msg) {
            window.open('','_self').close();
        }
    });

    //라디오 버튼 테이블 클릭 영역 확장
    $(".tblRdo table.type2 tbody td").click(function(){
        $(this).find("input:radio").prop("checked", true);
    });

    //브라우저에 따라서 textarea의 maxlength가 안 먹는 경우 필요
    $('.sectionQ textarea[maxlength]').on('keyup change', function() {
        var str = $(this).val();
        var mx = parseInt($(this).attr('maxlength'));

        if (str.length > mx) {
            $(this).val(str.substr(0, mx));
            return false;
        }
    });

    //Step1 만족도 선택시
    $("input.rdoInput, td.rdoArea2").click(function(){
        var tagName = $(this).prop("tagName");
        var eventSurveyDetailId = $(this).data("event-survey-detail-id");
        var currentPage = $(this).data("current-page");
        var questionNo = $(this).data("question-no");
        var surveyTypeCd = $(this).data("survey-type-cd");
        var choice = $(this).val();
        // 객관식(SA001) 결과 저장
        if (tagName === 'TD') {
            // 라디오 버튼을 눌러도 저장이 되게해야할때 호출
            eventSurveyDetailId = $(this).children().data("event-survey-detail-id");
            currentPage = $(this).children().data("current-page");
            questionNo = $(this).children().data("question-no");
            surveyTypeCd = $(this).children().data("survey-type-cd");
            choice = $(this).children().val();
        }
        saveCurrentAnswer(eventSurveyDetailId, currentPage, questionNo, surveyTypeCd, choice);
        childControl($(this).data("child-question-no"), $(this).data("child-control-type"));
    });

    // 순위 선택형
    $("td.rdoArea4").click(function(){
        var realThis = $(this).children("input");
        var rankLength = $(this).parent().parent().find("input[value='"+realThis.prop('value')+"']").length;
        $(this).parent().parent().find("input[value='"+realThis.prop('value')+"']").not(realThis).prop("checked", false);

        var valArr = [];
        var curItem;
        var hasChild = false;
        var childQuestionNo;
        var childControlType = '';
        for (var i = 1; i <= rankLength; i++) {
            curItem = $(this).parent().parent().find("[data-rank='"+i+"']:checked");
            valArr.push(curItem.val());
            if (curItem.data("child-question-no") !== undefined) { // 하위 컨트롤 항목이 있는 경우 체크
                hasChild = true;
                childQuestionNo = curItem.data("child-question-no");
                if (childControlType !== 'CT002') childControlType = curItem.data("child-control-type"); // 기타인 경우에는 무조건 하위항목 활성화
            }
        }

        if (hasChild) {
            // 기타 항목이 한개라도 체크된 경우 기타 텍스트박스 활성화
            childControl(childQuestionNo, childControlType);
        }

        if (valArr.contains(undefined)) {
            return;
        }

        // 객관식(SA002,다수선택형) 결과 저장
        var eventSurveyDetailId = curItem.data("event-survey-detail-id");
        var currentPage = curItem.data("current-page");
        var questionNo = curItem.data("question-no");
        var surveyTypeCd = curItem.data("survey-type-cd");
        saveCurrentAnswer(eventSurveyDetailId, currentPage, questionNo, surveyTypeCd, valArr.join('|'));
    });

    // Step3 기타 선택시 텍스트박스 활성화
    $("input.etcInclude").click(function(){
        var chkVal = $(this).val();
        var questionNo = $(this).data("question-no");
        var etcInput = $(this).data("etc-input");
        if( etcInput !== undefined && etcInput ){
            if($(this).is(':checked')){
                $(this).next().next().attr("disabled", false);
                $(this).next().next().attr("placeholder", $(this).next().next().data("placeholder"));
                $(this).next().next().focus();
            }

            if ($(this).next().next().val() === "") {
                return; // 기타를 선택했는데, 텍스트를 입력하지 않은 경우 저장하지 않음
            }
        } else {
            $("[data-question-no='"+questionNo+"']").last().next().next().val('');
            $("[data-question-no='"+questionNo+"']").last().next().next().attr("disabled", true);
            $("[data-question-no='"+questionNo+"']").last().next().next().attr("placeholder", "");
        }

        // 객관식(SA003,기타입력형) 결과 저장
        saveCurrentAnswer($(this).data("event-survey-detail-id"), $(this).data("current-page"), $(this).data("question-no"), $(this).data("survey-type-cd"), chkVal, $("[data-question-no='"+questionNo+"']").last().next().next().val());
    });

    //Step3 기타 결과 저장
    $("input.etcReason").blur(function () {
        if ($(this).val() === '') return;
        var pprev = $(this).prev().prev();

        if (pprev.data("survey-type-cd") === 'SA004') {
            // 체크박스 형
            var saveStr = [];
            $("input[name='"+pprev.prop('name')+"']:checked").each(function() {
                saveStr.push($(this).val());
            });
            saveCurrentAnswer(pprev.data("event-survey-detail-id"), pprev.data("current-page"), pprev.data("question-no"), pprev.data("survey-type-cd"), saveStr.join('|'), $(this).val());
        } else {
            // 라디오 형
            saveCurrentAnswer(pprev.data("event-survey-detail-id"), pprev.data("current-page"), pprev.data("question-no"), pprev.data("survey-type-cd"), pprev.val(), $(this).val());
        }
    });

    //Step3 체크박스 이벤트 처리
    $("input.checkType").click(function(){
        var chkVal = $(this).val();
        var questionNo = $(this).data("question-no");
        var realTitleNo = $(this).data("real-title-no");
        var maxCheckCount = $(this).data("max-check-count");
        var etcInput = $(this).data("etc-input");
        if(maxCheckCount !== undefined && $("[data-question-no='"+questionNo+"']:checked").length > maxCheckCount ) {
            alert(realTitleNo+"번 설문 항목은 "+maxCheckCount+"개 까지만 체크 가능합니다.");
            $(this).removeAttr('checked');
            return false;
        }
        if( etcInput !== undefined && etcInput ){
            if($(this).is(':checked')){
                $(this).next().next().attr("disabled", false);
                $(this).next().next().attr("placeholder", $(this).next().next().data("placeholder"));
                $(this).next().next().focus();

                if ($(this).next().next().val() === "") {
                    return; // 기타를 선택했는데, 텍스트를 입력하지 않은 경우 저장하지 않음
                }
            } else {
                $("[data-question-no='"+questionNo+"']").parent().find("input[type='text']").val('');
                $("[data-question-no='"+questionNo+"']").parent().find("input[type='text']").attr("disabled", true);
                $("[data-question-no='"+questionNo+"']").parent().find("input[type='text']").attr("placeholder", "");
            }
        }

        var saveStr = [];
        $("[data-question-no='"+questionNo+"']:checked").each(function() {
            saveStr.push($(this).val());
        });

        if (saveStr.length > 0) {
            // 객관식(SA004, 다수선택,기타입력형) 결과 저장
            saveCurrentAnswer($(this).data("event-survey-detail-id"), $(this).data("current-page"), $(this).data("question-no"), $(this).data("survey-type-cd"), saveStr.join('|'), $("[data-question-no='"+questionNo+"']").parent().find("input[type='text']").val());
        }
    });

    // 주관식(SA005)-멀티입력 한번에 결과 저장
    $("input.multiSubjection").blur(function () {
        var canSave = true;
        var aVals = [];
        $(this).closest("table").children().find("input.multiSubjection").each(function () {
            aVals.push($(this).val());
            if ($(this).val() === '') canSave = false;
        });

        if (!canSave) return;
        saveCurrentAnswer($(this).data("event-survey-detail-id"), $(this).data("current-page"), $(this).data("question-no"), $(this).data("survey-type-cd"), '', '', aVals.join('|'));
    });

    // 주관식(질문직접입력형)(SA006)-멀티입력 한번에 결과 저장
    $("input.multiSubjectionReason").blur(function () {
        var saveStr = [];
        var maxLength = 0;
        $("[data-question-no='"+$(this).data('question-no')+"']").each(function() {
            if ($(this).val() !== '') saveStr.push($(this).val());
            maxLength++;
        });
        if (saveStr.join('|') === '' || saveStr.length < maxLength) return;
        saveCurrentAnswer($(this).data("event-survey-detail-id"), $(this).data("current-page"), $(this).data("question-no"), $(this).data("survey-type-cd"), '', '', saveStr[0], saveStr[1]);
    });

    // 주관식(SA005) 결과 저장
    $("textarea").blur(function () {
        if ($(this).val() === '') return;
        saveCurrentAnswer($(this).data("event-survey-detail-id"), $(this).data("current-page"), $(this).data("question-no"), $(this).data("survey-type-cd"), '', '', $(this).val());
    });

    // 없음 버튼 클릭 시 기존 선택 모두 비활성화 및 disabled 토글
    $(".nothing").click(function () {
        var questionNo = $(this).data('question-no');
        var nothingTargetQno = $(this).data('nothing-target-qno');
        var disableTf;
        if($(this).is(':checked')){
            saveCurrentAnswer($(this).data("event-survey-detail-id"), $(this).data("current-page"), $(this).data("question-no"), $(this).data("survey-type-cd"), $(this).val());
            disableTf = true;
        } else {
            disableTf = false;
        }

        // disabled 대상 처리
        var nothingTargets = String(nothingTargetQno).split(',');
        for (var qNo of nothingTargets) {
            var nowQNo = $("[data-question-no='" + qNo +"']").not('.nothing');
            nowQNo.prop("checked",false);
            disableEffectAreaFromName(nowQNo, disableTf, true, questionNo);
        }
    });
});


/* 공통 함수 구역 */
function isNotChecked(id) {
    var chkVal = $("input[name='"+id+"']:checked").val();
    return chkVal === "" || chkVal === null || chkVal === undefined;
}
function checkedVal(id) {
    return $("input[name='"+id+"']:checked").val();
}
function checkedEtcChecked(id) {
    return $("input[name='"+id+"']").prev().prev().prop("checked");
}
function checkedLastVal(id) {
    return $("input[name='"+id+"']:checked").last().val();
}
function isTextareaNotWritting(id) {
    return $.trim($("textarea[name='"+id+"']").val()) === "";
}
function isInputNotWritting(id) {
    return $.trim($("input[name='"+id+"']").val()) === "";
}

function formSubmit(){
    $("#completeYn").val('Y');

    Ajax.execute({
        url: '/event/updateEventSurveyComplete',
        data: $("#frmApply").serialize(),
        type: 'post',
        dataType: 'json',
        success: function(data) {
            if(data.response === "0000"){
                $("#topTitle").hide();
                $('html').css('overflow','hidden');  //스크롤바 없애기
                $("#questionnaireDiv").hide();
                $("#frmApply").attr('style','width:850px;');
                $(".btnCloArea").hide();
                $("#completeWrap").show();
                setWindowResizeLast();
                opener.location.reload();
            }else {
                alert("설문 참여가 정상적으로 완료되지 못했습니다.\n\n고객센터(1544-7714)를 통해 문의바랍니다.");
            }
        }
    });
}

/**
 * name 속성으로 항목 컨트롤(disable 처리 및 disable 된 항목 응답 내역 삭제)
 * @param nowQNo
 * @param disableTf
 * @param noFocus
 * @param currentQNo 현재 응답하는 Question-No, 삭제를 방지하고자 할때 파라미터로 넘겨준다
 */
function disableEffectAreaFromName(nowQNo, disableTf, noFocus, currentQNo) {
    if (disableTf) {
        var nowQSurveyDetailId = 0;
        nowQNo.each(function() {
            $(this).attr("disabled", true);
            if ($(this).prop('type') === 'text' || $(this).prop('type') === 'textarea') {
                $(this).val('');
                nowQSurveyDetailId = $(this).data('event-survey-detail-id');
            } else if ($(this).prop('type') === 'radio') {
                $(this).prop('checked',false);
                nowQSurveyDetailId = $(this).data('event-survey-detail-id');
            } else if ($(this).data('etc-input')) {
                $(this).next().next('input.etcReason').val('');
                $(this).next().next('input.etcReason').attr('disabled', true);
                $(this).next().next("input.etcReason").attr("placeholder", "");
            } else if ($(this).prop('type') === 'checkbox') {
                if (currentQNo === undefined) nowQSurveyDetailId = $(this).data('event-survey-detail-id');
                else if ($(this).data('question-no') !== currentQNo) nowQSurveyDetailId = $(this).data('event-survey-detail-id');
            }
        });
        if (nowQSurveyDetailId > 0) deleteSurveyDetail(nowQSurveyDetailId);
    } else {
        nowQNo.each(function() {
            $(this).attr("disabled", false);
        });
        if (!noFocus) nowQNo.focus();
    }
}

function setWindowResize() {
    $(window).scrollTop(0);

    var thisX = 1100;
    var thisY = document.getElementById("questionnaireDiv").scrollHeight+80;
    var maxThisX = screen.width - 50;
    var maxThisY = screen.height - 80;

    var marginY = 0;

    if (navigator.userAgent.indexOf("MSIE 6") > 0) marginY = 45;        //IE 6.x
    else if(navigator.userAgent.indexOf("MSIE 7") > 0) marginY = 75;    //IE 7.x
    else if(navigator.userAgent.indexOf("MSIE 9") > 0) marginY = 100;    //IE 9.x
    else if(navigator.userAgent.indexOf("MSIE 10") > 0) marginY = 100;    //IE 10.x
    else if(navigator.userAgent.indexOf("Firefox") > 0) marginY = 80;   //FF
    else if(navigator.userAgent.indexOf("Opera") > 0) marginY = 30;     //Opera
    else if(navigator.userAgent.indexOf("Chrome") > 0) marginY = 100;     //Chrome
    else if(navigator.userAgent.indexOf("Netscape") > 0) marginY = -2;  //Netscape
    else if(!!navigator.userAgent.match(/Trident\/7\./)) marginY = 100;    //IE 11.x

    if (thisX > maxThisX){
        window.document.body.scroll = "yes";
        thisX = maxThisX;
    }
    if (thisY > maxThisY){
        window.document.body.scroll = "yes";
        thisX += 19;
        thisY = maxThisY - marginY;
    }

    window.resizeTo(thisX+20, thisY+marginY);
}

function setWindowResizeLast(){
    var thisX = 850;
    var thisY = 610+80;
    var maxThisX = screen.width - 50;
    var maxThisY = screen.height - 80;

    var marginY = 0;

    if (navigator.userAgent.indexOf("MSIE 6") > 0) marginY = 27;        //IE 6.x
    else if(navigator.userAgent.indexOf("MSIE 7") > 0) marginY = 47;    //IE 7.x
    else if(navigator.userAgent.indexOf("MSIE 9") > 0) marginY = 47;    //IE 9.x
    else if(navigator.userAgent.indexOf("MSIE 10") > 0) marginY = 47;    //IE 10.x
    else if(navigator.userAgent.indexOf("Firefox") > 0) marginY = 80;   //FF
    else if(navigator.userAgent.indexOf("Opera") > 0) marginY = 30;     //Opera
    else if(navigator.userAgent.indexOf("Chrome") > 0) marginY = 46;     //Chrome
    else if(navigator.userAgent.indexOf("Netscape") > 0) marginY = -2;  //Netscape
    else if(!!navigator.userAgent.match(/Trident\/7\./)) marginY = 47;    //IE 11.x

    if (thisX > maxThisX){
        window.document.body.scroll = "yes";
        thisX = maxThisX;
    }
    if (thisY > maxThisY){
        window.document.body.scroll = "yes";
        thisX += 19;
        thisY = maxThisY - marginY;
    }

    window.resizeTo(thisX+10, thisY+marginY);
}

function popClose(){
    if(confirm('임시저장되었습니다.\n설문을 종료하시겠습니까?')){
        window.open('','_self').close();
    }
}

// 답안 저장 (실시간)
function saveCurrentAnswer(eventSurveyDetailId, currentPage, questionNo, surveyTypeCd, multipleChoice, multipleChoiceEtcReason, subjectiveExpression, subjectiveExpressionReason) {
    $("#eventSurveyDetailId").val(eventSurveyDetailId);
    $("#currentPage").val(currentPage);
    $("#questionNo").val(questionNo);
    $("#surveyTypeCd").val(surveyTypeCd);
    $("#multipleChoice").val(multipleChoice === undefined ? '' : multipleChoice);
    $("#multipleChoiceEtcReason").val(multipleChoiceEtcReason === undefined ? '' : multipleChoiceEtcReason);
    $("#subjectiveExpression").val(subjectiveExpression === undefined ? '' : subjectiveExpression);
    $("#subjectiveExpressionReason").val(subjectiveExpressionReason === undefined ? '' : subjectiveExpressionReason);

    Ajax.execute({
        url: '/event/saveEventSurveyInfoDetail',
        data: $("#frmApply").serialize(),
        type: 'post',
        dataType: 'json',
        success: function(data) {
            if (data.response <= 0) {
                alert('임시저장에 실패하였습니다.');
            } else {
                $("[data-question-no='"+questionNo+"']").each(function () {
                    $(this).data('event-survey-detail-id',data.response);
                });
            }
        }
    });
}

// 하위 항목 컨트롤 (childQuestionNo는 콤마(,)로 멀티 컨트롤 가능)
function childControl(childQuestionNo, childControlType) {
    if (childQuestionNo !== undefined && childControlType !== undefined) {
        var qNoParams = String(childQuestionNo).split(',');
        var noFocus = qNoParams.length > 1; // 멀티 대상 컨트롤이면 포커스 없음
        for (var qNo of qNoParams) {
            var nowQNo = $("[data-question-no='" + qNo +"']");
            if (childControlType === 'CT001') { // 선택한 값에 따라 하위 항목 비활성화
                disableEffectAreaFromName(nowQNo, true, noFocus);
            } else if (childControlType === 'CT002') { // 선택한 값에 따라 하위 항목 활성화 && 포커스
                disableEffectAreaFromName(nowQNo, false, noFocus);
            }
        }
    }
}

// 응답내역 삭제 (기타 항목 초기화 시 삭제 필요함)
function deleteSurveyDetail(nowQSurveyDetailId) {
    if (nowQSurveyDetailId === undefined || nowQSurveyDetailId < 1) return;
    $("#frmDelete").find("input[name='eventSurveyDetailId']").val(nowQSurveyDetailId);

    // 내역 초기화 및 처음부터 진행
    Ajax.execute({
        url: '/event/deleteEventSurveyDetailByPK',
        data: $("#frmDelete").serialize(),
        type: 'post',
        dataType: 'json',
        success: function(data) {
            if(data.response == "0000"){
                $('[data-event-survey-detail-id='+nowQSurveyDetailId+']').data('event-survey-detail-id','0');
            }else {
                console.log("응답 삭제 실패. 디버그 필요");
            }
        }
    });
}