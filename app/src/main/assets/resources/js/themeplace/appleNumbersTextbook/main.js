var DEFAULT_GRADE_TERM_CD = '030';
var GRADE_TERM_CD_ARR = [DEFAULT_GRADE_TERM_CD, '040', '050', '060'];

$(function () {
    var videoPlayer = $('#player')[0];

    $('#tabGrade > li > a').on('click', function (e) {
        var gradeTermCd = $(e.currentTarget).data('grade-term-cd');
        if (!gradeTermCd) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }

        if (GRADE_TERM_CD_ARR.contains(gradeTermCd)) {
            SELECTED_GRADE_TERM_CD = gradeTermCd;
        } else {
            SELECTED_GRADE_TERM_CD = DEFAULT_GRADE_TERM_CD;
        }
    });
});

//다운로드 호출 (contentGubun + '-' + contentId)
function downloadPopup(val){
    var redirectUrl = REQUEST_URL + ((SELECTED_GRADE_TERM_CD && SELECTED_GRADE_TERM_CD !== DEFAULT_GRADE_TERM_CD) ? '?gradeTermCd=' + SELECTED_GRADE_TERM_CD : '');
    if (!SessionUtils.isLogin(redirectUrl)) return;

    // 교사 인증
    SessionUtils.confirmValidMember(function(valid) {
        if (valid) {
            Popup.openFileDownloadDext(val);
        }
    });
}